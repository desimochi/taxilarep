// components/GenderChart.js
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

export default function GenderChart({ data, datas, batch, setBatch }) {
  const pieData = data || [];

  const total = pieData.reduce((sum, item) => sum + item.value, 0) || 1;
  const male = pieData.find((d) => d.name.toLowerCase() === "male")?.value || 0;
  const female = pieData.find((d) => d.name.toLowerCase() === "female")?.value || 0;
  const malePercent = Math.round((male / total) * 100);
  const femalePercent = 100 - malePercent;

  return (
    <div className="bg-white p-2">
        <div className="flex justify-between items-center">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Ratio</h3>
            <select onChange={(e)=>setBatch(e.target.value)} className='border px-2 py-1 rounded-md'>
              {Object.keys(datas.batch_wise_gender_ratio || {}).map((b) => (
                <option
                  key={b}
                  value={b}
                  className={`px-3 py-1 text-sm rounded-md border ${
                    b === batch
                      ? 'bg-red-800 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {b}
                </option>
              ))}
                      </select>
        </div>
     
      <div className="relative w-48 h-48 mx-auto mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{malePercent}% -{femalePercent}%</div>
            <div className="text-sm text-gray-600">Gender Ratio</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-800 rounded-full"></div>
          <span className="text-sm text-gray-600">Males</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Females</span>
        </div>
      </div>
    </div>
  );
}
