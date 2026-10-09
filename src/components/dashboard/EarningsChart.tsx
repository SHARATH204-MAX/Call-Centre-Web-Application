import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { csatTrendData, weeklyEarnings } from "../../data/dashboard";
import { formatCurrency } from "../../utils/formatCurrency";

export default function EarningsChart() {
  const [activeTab, setActiveTab] = useState<"csat" | "earnings">("csat");

  return (
    <section className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">
            {activeTab === "csat" ? "CSAT Trend & Calls Handled — Last 7 Days" : "7-Day Earnings & Commission"}
          </h2>
          <p className="text-xs text-gray-500">
            {activeTab === "csat"
              ? "Daily customer satisfaction scores & total call volume"
              : "Commission earned from AI coached walk-out recoveries"}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-0.5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("csat")}
            className={`rounded-md px-2.5 py-1 transition-all ${
              activeTab === "csat" ? "bg-white text-gray-900 shadow-2xs font-bold" : "text-gray-500"
            }`}
          >
            CSAT Trend
          </button>
          <button
            onClick={() => setActiveTab("earnings")}
            className={`rounded-md px-2.5 py-1 transition-all ${
              activeTab === "earnings" ? "bg-white text-gray-900 shadow-2xs font-bold" : "text-gray-500"
            }`}
          >
            Earnings
          </button>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === "csat" ? (
            <LineChart data={csatTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 10, fill: "#6b7280" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "csat" ? `${value}% CSAT` : `${value} calls`,
                  name === "csat" ? "CSAT Score" : "Calls Handled"
                ]}
                contentStyle={{
                  backgroundColor: "#123c30",
                  color: "#ffffff",
                  borderRadius: "8px",
                  fontSize: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                }}
              />
              <Line type="monotone" dataKey="csat" stroke="#1d9e75" strokeWidth={3} dot={{ r: 4, fill: "#1d9e75" }} />
            </LineChart>
          ) : (
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
              <Bar dataKey="amount" fill="#3b1254" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
