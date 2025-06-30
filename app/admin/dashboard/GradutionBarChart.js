"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function GraduationBarChart({ data }) {
  if (!data) return null;

  const barData = Object.entries(data).map(([batch, degrees]) => ({
    batch,
    ...degrees, // dynamic keys like BTech, BBA, etc.
  }));

  const keys = Object.values(data).flatMap(Object.keys);
  const uniqueKeys = [...new Set(keys)]; // ensures no duplicates

  const colors = [
    '#991b1b', '#6b7280', '#10b981', '#3b82f6', '#eab308', '#8b5cf6', '#f97316'
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Graduation Background (Batch-wise)</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <XAxis dataKey="batch" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {uniqueKeys.map((key, index) => (
              <Bar key={key} dataKey={key} stackId="a" fill={colors[index % colors.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
