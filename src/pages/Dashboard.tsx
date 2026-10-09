import { useApp } from "../context/AppContext";
import { dashboardStats, pipelineMetrics, csatTrendData } from "../data/dashboard";
import StatCard from "../components/dashboard/StatCard";
import EarningsChart from "../components/dashboard/EarningsChart";
import TasksList from "../components/dashboard/TasksList";
import ProgressCards from "../components/dashboard/ProgressCards";
import { PhoneCall, TrendingUp, Users, Target, ShieldCheck, Calendar as CalendarIcon, Award, PieChart, ChevronRight } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const { employee, toggleQueueStatus, setPage, openModal, setSelectedLeadIndex, leads } = useApp();

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 3.1 Employee Header & Greeting */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123c30] to-[#1d9e75] p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 backdrop-blur-xs border border-white/20 text-xl font-bold">
            {employee.avatarEmoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-200 font-medium">Good afternoon 👋</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">{employee.name}</h2>
            <p className="text-xs text-emerald-100/90 font-medium">{employee.store}</p>
          </div>
        </div>

        {/* Status Pill & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={toggleQueueStatus}
            className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-2xs ${
              employee.queueStatus === "available"
                ? "bg-emerald-400 text-[#123c30]"
                : "bg-amber-400 text-amber-950"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                employee.queueStatus === "available" ? "bg-[#123c30] animate-pulse" : "bg-amber-950"
              }`}
            />
            {employee.queueStatus === "available" ? "On Queue · Available" : "Unavailable"}
          </button>

          <Button variant="outline" size="sm" onClick={() => openModal("date-range")} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <CalendarIcon size={14} /> This Week
          </Button>

          <Button variant="outline" size="sm" onClick={() => openModal("lead-analysis")} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <PieChart size={14} /> Lead Analysis
          </Button>

          <Button variant="outline" size="sm" onClick={() => openModal("shift-report")} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Award size={14} /> Shift Report
          </Button>
        </div>
      </div>

      {/* 3.2 Performance KPI Cards Grid */}
      <section className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {/* OG Score Card */}
        <div
          onClick={() => openModal("og-score")}
          className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs hover:border-[#1d9e75] hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">OG Score™</span>
            <span className="rounded-lg bg-emerald-50 p-1.5 text-emerald-700">
              <Award size={16} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#1a1a1a] tracking-tight">{employee.ogScore}</p>
          <p className="mt-1 text-xs font-bold text-emerald-700">▲ +{employee.ogChange} vs last week</p>
          <span className="mt-2 text-[10px] text-gray-400 block font-medium group-hover:text-[#1d9e75] transition-colors">
            Tap for score & rank breakdown →
          </span>
        </div>

        {/* Avg Handle Time Card */}
        <div className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Avg Handle Time</span>
            <span className="rounded-lg bg-blue-50 p-1.5 text-blue-700">
              <PhoneCall size={16} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#1a1a1a] tracking-tight">4m 12s</p>
          <p className="mt-1 text-xs font-bold text-emerald-700">▼ 8% speed improvement</p>
          <span className="mt-2 text-[10px] text-gray-400 block font-medium">Target: 4m 30s</span>
        </div>

        {/* CSAT Today Card */}
        <div className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">CSAT Today</span>
            <span className="rounded-lg bg-purple-50 p-1.5 text-purple-700">
              <Target size={16} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#1a1a1a] tracking-tight">94%</p>
          <p className="mt-1 text-xs font-bold text-emerald-700">▲ 2pt increase</p>
          <span className="mt-2 text-[10px] text-gray-400 block font-medium">4.8 / 5.0 Star Rating</span>
        </div>

        {/* In Queue Card -> Navigates to Plan */}
        <div
          onClick={() => setPage("plan")}
          className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs hover:border-[#1d9e75] hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">In Queue</span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-[#1a1a1a] tracking-tight">2</p>
          <p className="mt-1 text-xs font-bold text-emerald-700">● Live Waiting Items</p>
          <span className="mt-2 text-[10px] text-gray-400 block font-medium group-hover:text-[#1d9e75] transition-colors">
            Click to open Plan workspace →
          </span>
        </div>
      </section>

      {/* 3.4 My Progress Today & Earnings Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Card */}
        <div className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">My Progress · Today</h3>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-gray-50 p-2.5 border">
              <span className="text-xs text-gray-500 block font-medium">Leads Created</span>
              <span className="text-xl font-extrabold text-gray-900">3</span>
              <span className="text-[10px] font-bold text-emerald-700 block">+1 today</span>
            </div>
            <div className="rounded-lg bg-gray-50 p-2.5 border">
              <span className="text-xs text-gray-500 block font-medium">Leads Called</span>
              <span className="text-xl font-extrabold text-gray-900">2</span>
              <span className="text-[10px] font-bold text-emerald-700 block">+2 today</span>
            </div>
          </div>
        </div>

        {/* Store Rank Card */}
        <div
          onClick={() => openModal("rank-detail")}
          className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs hover:border-[#1d9e75] cursor-pointer group"
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Store Group Rank</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-extrabold text-gray-900">#{employee.rank}</span>
              <span className="text-xs font-bold text-gray-500 block">in {employee.locationGroup}</span>
            </div>
            <span className="text-xs font-bold text-[#1d9e75] group-hover:translate-x-0.5 transition-transform">
              View details →
            </span>
          </div>
        </div>

        {/* Monthly Earnings Card */}
        <div className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">My Earnings This Month</h3>
          <span className="text-2xl font-extrabold text-[#1d9e75] block">{formatCurrency(5200)}</span>
          <p className="text-[11px] text-gray-500 font-medium">₹800 to ₹6,000 commission slab</p>
          <span className="text-[10px] font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded inline-block mt-1 border border-purple-100">
            {formatCurrency(1700)} from coached moves
          </span>
        </div>
      </section>

      {/* 3.8 Main Charts & Tasks Split */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <EarningsChart />
        <TasksList
          leads={leads}
          onSelectLead={(idx) => {
            setSelectedLeadIndex(idx);
            openModal("leads");
          }}
        />
      </section>

      {/* Progress Indicators & Quality Objectives */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-gray-900 tracking-tight">Quality Objectives & SOP Milestones</h2>
        <ProgressCards />
      </section>
    </div>
  );
}
