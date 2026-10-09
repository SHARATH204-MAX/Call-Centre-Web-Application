import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { weeklyEarnings } from "../../data/dashboard";
import { formatCurrency } from "../../utils/formatCurrency";

export default function EarningsChart() {
  const [activeRange, setActiveRange] = useState<"7d" | "30d">("7d");

  const totalEarnings = weeklyEarnings.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">7-Day Earnings & Commission</h2>
          <p className="text-xs text-gray-500">
            Total this week: <span className="font-bold text-emerald-700">{formatCurrency(totalEarnings)}</span>
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 text-xs font-semibold">
          <button
            onClick={() => setActiveRange("7d")}
            className={`rounded-md px-2.5 py-1 transition-all ${
              activeRange === "7d" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-500"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setActiveRange("30d")}
            className={`rounded-md px-2.5 py-1 transition-all ${
              activeRange === "30d" ? "bg-white text-gray-900 shadow-2xs" : "text-gray-500"
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyEarnings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => [`${formatCurrency(value)}`, "Commission Earned"]}
              contentStyle={{
                backgroundColor: "#123c30",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            />
            <Bar dataKey="amount" fill="#1d9e75" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
