"use client"

import BackButton from "@/components/ui/Backbutton"
import { useEffect, useState } from "react"

export default function LeaderboardPage() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/game/interAsset/leaderboard", {
          cache: "no-store",
        })

        const data = await res.json()

        if (data.success) {
          setPlayers(data.data)
        }
      } catch (error) {
        console.error(error)
      }

      setLoading(false)
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading Leaderboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <BackButton/>
      <h1 className="text-3xl font-bold text-center mb-8">
        🏆 Trading Game Leaderboard
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Player</th>
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-right">Cash</th>
            </tr>
          </thead>

          <tbody>
            {players.map((player, index) => (
              <tr
                key={player.userId}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && `#${index + 1}`}
                </td>

                <td className="p-4 font-medium">
                  {player.playerName}
                </td>

                <td className="p-4 text-gray-500">
                  {player.userId}
                </td>

                <td className="p-4 text-right font-semibold text-green-600">
                  ₹{player.cash.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}