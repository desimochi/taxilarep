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




export async function POST(req) {
  try {
    const { userId, session } = await req.json();

    if (!userId || !session) {
      return new Response(JSON.stringify({ error: "Missing userId or session" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("publicSpeaking");

    // Store all sessions in an array for each user
    await collection.updateOne(
      { userId },
      {
        $push: { sessions: { ...session, createdAt: new Date() } }, // append new session
        $setOnInsert: { userId, createdAt: new Date() }, // only set when first created
        $set: { updatedAt: new Date() } // update timestamp each time
      },
      { upsert: true }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("❌ Error saving session:", error);
    return new Response(JSON.stringify({ error: "Failed to save session" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}
