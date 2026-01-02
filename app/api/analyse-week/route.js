import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      bigWin,
      skillFocus,
      dailyLogs,
    } = body;

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

Daily Logs:
"${logsText}"

Evaluate if logs show real progress.

Output ONLY JSON:
{
  "alignmentScore": number_0_to_50,
  "reason": "200 word explanation"
}

Rules:
- <20: Empty / irrelevant
- 20–30: Busy work
- 31–39: Partial progress
- 40–50: Clear objective alignment
- 30 if AI-generated style detected
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
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
    const raw = data.candidates[0].content.parts[0].text
      .replace(/```json|```/g, "")
      .trim();

    const result = JSON.parse(raw);

    return NextResponse.json(result);
  } catch (err) {
    console.error("AI Analysis Error:", err);
    return NextResponse.json(
      { error: "AI analysis failed" },
      { status: 500 }
    );
  }
}
