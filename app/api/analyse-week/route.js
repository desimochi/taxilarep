import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { bigWin, skillFocus, dailyLogs } = body;

    // Validate Input
    if (!bigWin || !skillFocus || !dailyLogs) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const logsText = Object.entries(dailyLogs)
      .filter(([_, log]) => log?.trim())
      .map(([day, log]) => `${day}: ${log}`)
      .join(". ");

    const prompt = `
    Act as a strict academic evaluator.
    Objective: "${bigWin}"
    Skill Focus: "${skillFocus}"
    Total Work Days Available: 5
    Daily Logs: "${logsText}"
    Evaluate if logs show real progress.
    Output ONLY JSON: { "alignmentScore": number, "reason": "string" }
    Rules: <20: Empty, 20-30: Busy work, 31-39: Partial, 40-50: Clear alignment.
    `;

    // 1. USE CORRECT MODEL NAME (1.5-flash)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();

    // 2. CHECK IF API REQUEST FAILED
    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Gemini API Error" },
        { status: response.status }
      );
    }

    // 3. SAFE PARSING
    // If response is blocked due to safety, candidates might be null or empty
    if (!data.candidates || !data.candidates[0]) {
       return NextResponse.json({ error: "No response generated" }, { status: 500 });
    }

    const raw = data.candidates[0].content.parts[0].text
      .replace(/```json|```/g, "")
      .trim();

    const result = JSON.parse(raw);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
