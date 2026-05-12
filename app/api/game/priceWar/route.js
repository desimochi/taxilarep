import clientPromise from "@/lib/mongodb";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
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
    const collection = db.collection("priceWar");
    const game = await collection.findOne({ userId });

    return new Response(JSON.stringify(game || {}), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch game" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, gameState } = body;

    if (!userId || !gameState) {
      return new Response(JSON.stringify({ error: "Missing userId or gameState" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("priceWar");

    await collection.updateOne(
      { userId },
      { $set: { userId, gameState, updatedAt: new Date() } },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: "Failed to save game" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}

// NEW: Delete handler for Reset Session
export async function DELETE(req) {
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
    const collection = db.collection("priceWar");

    await collection.deleteOne({ userId });

    return new Response(JSON.stringify({ success: true, message: "Game reset" }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(JSON.stringify({ error: "Failed to reset game" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}
