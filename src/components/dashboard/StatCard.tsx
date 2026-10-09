import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, change, isPositive = true, icon }: StatCardProps) {
  return (
    <article className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        {icon && <div className="rounded-lg bg-emerald-50 p-1.5 text-emerald-700">{icon}</div>}
      </div>
      <p className="mt-2 text-2xl font-extrabold text-[#1a1a1a] tracking-tight">{value}</p>
      <div className="mt-2 flex items-center gap-1">
        <span
          className={`text-xs font-semibold ${
            isPositive ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          {change}
        </span>
      </div>
    </article>
  );
}
