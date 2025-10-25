import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId for internal MongoDB IDs

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*", // allow all origins
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}

export async function OPTIONS() {
    return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const companyId = searchParams.get("companyId"); // Added: Use companyId/Join Code for multiplayer lookup

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("pm");

        let query = {};

        if (companyId) {
            // PRIORITY 1: Load by Company/Join Code (used for polling, joining, and AI)
            // This ensures all players/AI access the correct, shared document.
            query = { name: companyId };
        } else if (userId) {
            // FALLBACK: If only userId is provided (e.g., initial load attempt by client),
            // we search for any game where this userId is a known active participant.
            // This is a complex query, but necessary for the fallback.
            query = { activeUserIds: userId }; 
        } else {
            return new Response(JSON.stringify({ error: "Missing userId or companyId" }), {
                status: 400,
                headers: corsHeaders(),
            });
        }

        const game = await collection.findOne(query);

        // The frontend expects the actual game state object under the 'data' key, 
        // which is stored as 'gameState' in the DB document.
        if (game) {
            // We return game.gameState if it exists, otherwise the whole document (for legacy or AI initial state where gameState might be top-level)
            return new Response(JSON.stringify({ data: game.gameState || game }), {
                status: 200,
                headers: corsHeaders(),
            });
        }
        
        // Return 404 for not found to trigger client's error handling for non-existent games
        return new Response(JSON.stringify({ error: "Game not found." }), {
            status: 404, 
            headers: corsHeaders(),
        });
        
    } catch (error) {
        console.error("❌ Error loading game:", error);
        return new Response(JSON.stringify({ error: "Failed to load game" }), {
            status: 500,
            headers: corsHeaders(),
        });
    }
}


export async function POST(req) {
    try {
        // The client sends: { userId, name (which is companyId), playerName, gameState (which is the data object) }
        const { userId, name: companyId, playerName, gameState: data } = await req.json();

        if (!companyId || !data) {
            return new Response(JSON.stringify({ error: "Missing companyId or gameState" }), {
                status: 400,
                headers: corsHeaders(),
            });
        }

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection("pm");

        // Use the companyId (name field from payload) as the primary ID for the document.
        // This allows all players in the company to update the same game document.
        const result = await collection.updateOne(
            { name: companyId }, // Find by company/join code
            { 
                $set: { 
                    gameState: data, // The full game state (companyData object)
                    name: companyId, // Ensure the company ID (join code) is stored as 'name' for lookup
                    updatedByUserId: userId, 
                    updatedAt: new Date() 
                },
                $addToSet: {
                    // Track which user IDs have contributed to this game/company
                    activeUserIds: userId,
                    playerNames: playerName
                }
            },
            { upsert: true }
        );

        return new Response(JSON.stringify({ success: true, companyId: companyId }), {
            status: 200,
            headers: corsHeaders(),
        });
    } catch (error) {
        console.error("❌ Error saving game:", error);
        return new Response(JSON.stringify({ error: "Failed to save game" }), {
            status: 500,
            headers: corsHeaders(),
        });
    }
}   
