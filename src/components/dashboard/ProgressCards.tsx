import { progressCards, pipelineMetrics } from "../../data/dashboard";
import { formatCurrency } from "../../utils/formatCurrency";
import { Award, Zap, TrendingUp } from "lucide-react";

export default function ProgressCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {progressCards.map((card, idx) => (
        <div key={idx} className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800">{card.title}</h3>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {card.current > 100 ? `${Math.round((card.current / card.target) * 100)}%` : `${card.current}%`}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[11px] font-semibold text-gray-600 mb-1">
              <span>Current: {card.current > 100 ? formatCurrency(card.current) : `${card.current}%`}</span>
              <span>Target: {card.target > 100 ? formatCurrency(card.target) : `${card.target}%`}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (card.current / card.target) * 100)}%`,
                  backgroundColor: card.color
                }}
              />
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-500 font-medium">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
