import clientPromise from "@/lib/mongodb";
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

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("consumer");
    const game = await collection.findOne({ userId });
    
    return new Response(JSON.stringify(game || {}), {
      status: 200,
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
    const { userId, gameState } = await req.json();
    if (!userId || !gameState) {
      return new Response(JSON.stringify({ error: "Missing userId or gameState" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("consumer");


    await collection.updateOne(
      { userId },
      { $set: { gameState, userId, updatedAt: new Date() } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true }), {
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