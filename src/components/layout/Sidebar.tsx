import { LayoutDashboard, Phone, Sparkles, CalendarDays, MessageSquare, ChevronDown, Mic, Bot } from "lucide-react";
import { useApp } from "../../context/AppContext";
import type { Page, PlanTab } from "../../types";

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isMobileOpen = false, onCloseMobile }: SidebarProps) {
  const { page, setPage, planTab, setPlanTab, employee } = useApp();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 flex-col bg-[#123c30] px-3 py-5 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-3 pb-6 border-b border-emerald-900/40 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-black text-xs">
              OG
            </div>
            <div>
              <span className="block text-sm font-extrabold tracking-tight text-white">On-Ground.ai</span>
              <span className="block text-[10px] text-emerald-300/70 font-medium">The Sleep Company · Call Centre</span>
            </div>
          </div>
        </div>

        {/* 5 Main Navigation Destinations */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {/* 1. Dashboard */}
          <button
            onClick={() => {
              setPage("dashboard");
              if (onCloseMobile) onCloseMobile();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              page === "dashboard"
                ? "bg-white/15 text-white shadow-xs font-semibold border-l-2 border-emerald-400"
                : "text-[#a9c4ba] hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} className={page === "dashboard" ? "text-emerald-300" : ""} />
            <span>Dashboard</span>
          </button>

          {/* 2. Plan */}
          <div>
            <button
              onClick={() => {
                setPage("plan");
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                page === "plan"
                  ? "bg-white/15 text-white shadow-xs font-semibold border-l-2 border-emerald-400"
                  : "text-[#a9c4ba] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Phone size={18} className={page === "plan" ? "text-emerald-300" : ""} />
                <span>Plan</span>
              </div>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${page === "plan" ? "rotate-180 text-white" : "text-[#a9c4ba]"}`}
              />
            </button>

            {/* Sub-tabs under Plan */}
            {page === "plan" && (
              <div className="ml-5 mt-1.5 space-y-1 border-l border-emerald-800/40 pl-2">
                {(
                  [
                    ["outgoing", "Calls to make", "8 leads"],
                    ["incoming", "Incoming", "5 missed"],
                    ["recent", "Recent", "8 calls"]
                  ] as const
                ).map(([tab, label, badge]) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setPlanTab(tab);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-all ${
                      planTab === tab
                        ? "bg-emerald-500/20 text-emerald-200 font-semibold"
                        : "text-[#89a89c] hover:bg-white/5 hover:text-emerald-100"
                    }`}
                  >
                    <span>{label}</span>
                    <span className="text-[10px] opacity-70 font-normal">{badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Avani AI Sales Coach */}
          <button
            onClick={() => {
              setPage("avani");
              if (onCloseMobile) onCloseMobile();
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              page === "avani"
                ? "bg-white/15 text-white shadow-xs font-semibold border-l-2 border-emerald-400"
                : "text-[#a9c4ba] hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <Bot size={18} className={page === "avani" ? "text-emerald-300" : ""} />
              <span>Avani</span>
            </div>
            <span className="text-[9px] uppercase font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-400/30">
              AI Coach
            </span>
          </button>

          {/* 4. Calendar */}
          <button
            onClick={() => {
              setPage("calendar");
              if (onCloseMobile) onCloseMobile();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              page === "calendar"
                ? "bg-white/15 text-white shadow-xs font-semibold border-l-2 border-emerald-400"
                : "text-[#a9c4ba] hover:bg-white/5 hover:text-white"
            }`}
          >
            <CalendarDays size={18} className={page === "calendar" ? "text-emerald-300" : ""} />
            <span>Calendar</span>
          </button>

          {/* 5. Pulse */}
          <button
            onClick={() => {
              setPage("pulse");
              if (onCloseMobile) onCloseMobile();
            }}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              page === "pulse"
                ? "bg-white/15 text-white shadow-xs font-semibold border-l-2 border-emerald-400"
                : "text-[#a9c4ba] hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={18} className={page === "pulse" ? "text-emerald-300" : ""} />
              <span>Pulse</span>
            </div>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-[#123c30]">
              3
            </span>
          </button>
        </nav>

        {/* Employee Profile Footer */}
        <div className="mt-auto border-t border-emerald-900/40 pt-4 px-1">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/30 text-xs font-bold text-emerald-200 border border-emerald-400/40 text-base">
              {employee.avatarEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{employee.name}</p>
              <p className="text-[10px] text-emerald-300/70 truncate">{employee.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
