import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

function calculateScore(gameState) {
  const { marketShare, budget, kpis, projectAgniProgress, projectVayuProgress, stakeholders } = gameState;

  const marketScore = (marketShare || 0) * 3;
  const budgetScore = ((budget || 0) / 1000000) * 2;
  const kpiAvg = ((kpis?.morale || 0) + (kpis?.productivity || 0) + (kpis?.innovation || 0)) / 3;
  const kpiScore = kpiAvg * 3;
  const projectScore = ((projectAgniProgress || 0) + (projectVayuProgress || 0)) / 2;
  const stakeholderAvg =
    ((stakeholders?.ceo?.satisfaction || 0) +
      (stakeholders?.cfo?.satisfaction || 0) +
      (stakeholders?.cto?.satisfaction || 0)) /
    3;

  return marketScore + budgetScore + kpiScore + projectScore + stakeholderAvg;
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const users = await db.collection("netrvita").find({}).toArray();

  // Step 1: Calculate raw scores for everyone
  let leaderboard = users.map((u) => ({
    name: u.name,
    userId: u.userId,
    score: calculateScore(u.gameState),
    marketShare: u.gameState.marketShare,
    budget: u.gameState.budget,
    updatedAt: u.updatedAt,
  }));

  // Step 2: Sort leaderboard by score (descending)
  leaderboard.sort((a, b) => b.score - a.score);

  // Step 3: Normalize scores (highest = 100)
  const maxScore = leaderboard[0]?.score || 0;
  leaderboard = leaderboard.map((player) => ({
    ...player,
    normalizedScore: maxScore > 0 ? Math.round((player.score / maxScore) * 100) : 0,
  }));

  // Step 4: Calculate percentile
  const totalPlayers = leaderboard.length;
  leaderboard = leaderboard.map((player, index) => {
    const percentile = ((totalPlayers - index - 1) / (totalPlayers - 1)) * 100;
    return { ...player, percentile: Math.round(percentile * 100) / 100 };
  });

  return NextResponse.json(leaderboard);
}
