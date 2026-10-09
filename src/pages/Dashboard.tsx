import { useState } from "react";
import { dashboardStats, pipelineMetrics } from "../data/dashboard";
import { leads } from "../data/leads";
import StatCard from "../components/dashboard/StatCard";
import EarningsChart from "../components/dashboard/EarningsChart";
import TasksList from "../components/dashboard/TasksList";
import ProgressCards from "../components/dashboard/ProgressCards";
import LeadsModal from "../components/leads/LeadsModal";
import { PhoneCall, TrendingUp, Users, Target, ShieldCheck } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Dashboard() {
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(null);

  const iconsMap = [
    <PhoneCall key="1" size={18} />,
    <Users key="2" size={18} />,
    <Target key="3" size={18} />,
    <TrendingUp key="4" size={18} />
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top Banner Alert / Welcome */}
      <div className="rounded-xl bg-gradient-to-r from-[#123c30] to-[#1d9e75] p-4 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-300 backdrop-blur-xs border border-white/20">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-tight">Shift Active — Tele-caller SOP Guidance On</h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              Remember to state the shopper's name in the first 10 seconds on all calls (+23.6pp conversion boost).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-xs">
            Pipeline: <span className="text-emerald-300 font-extrabold">{formatCurrency(pipelineMetrics.totalPipelineValue)}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            icon={iconsMap[index % iconsMap.length]}
          />
        ))}
      </section>

      {/* Main Charts & Tasks Split */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <EarningsChart />
        <TasksList leads={leads} onSelectLead={(idx) => setSelectedLeadIndex(idx)} />
      </section>

      {/* Progress Indicators & Quality Objectives */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-900 tracking-tight">Quality Objectives & SOP Milestones</h2>
        <ProgressCards />
      </section>

      {/* Leads Modal */}
      {selectedLeadIndex !== null && (
        <LeadsModal
          leads={leads}
          initialIndex={selectedLeadIndex}
          onClose={() => setSelectedLeadIndex(null)}
        />
      )}
    </div>
  );
}
