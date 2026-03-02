import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const name = searchParams.get("name");

  const apiKey = process.env.GOOGLE_API_KEY; // PRIVATE KEY

  const encodedUser = encodeURIComponent(userId);
  const encodedName = encodeURIComponent(name);

  const finalUrl = `/newinter.html?userId=${encodedUser}&name=${encodedName}&apiKey=${apiKey}`;

  return NextResponse.json({ url: finalUrl });
}
