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
    const collection = db.collection("titan");
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

export async function PATCH(req) {
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
    const collection = db.collection("titan");
    const game = await collection.deleteOne({ userId });

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
    const { userId, name, payload } = await req.json();
    if (!userId || !payload) {
      return new Response(JSON.stringify({ error: "Missing userId or gameState" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("titan");

    // Fix: Destructure the _id field to remove it from the gameState object before updating.
    const { _id, ...stateToSave } = payload;

    await collection.updateOne(
      { userId },
      { $set: { ...stateToSave, userId, name, updatedAt: new Date() } },
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