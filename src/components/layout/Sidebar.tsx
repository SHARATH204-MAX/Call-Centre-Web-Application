import { LayoutDashboard, Phone, CalendarDays, MessageSquare, ChevronDown, Sparkles } from "lucide-react";
import type { Page, PlanTab } from "../../types";

interface SidebarProps {
  page: Page;
  planTab: PlanTab;
  onNavigate: (page: Page) => void;
  onPlanTabChange: (tab: PlanTab) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({
  page,
  planTab,
  onNavigate,
  onPlanTabChange,
  isMobileOpen = false,
  onCloseMobile
}: SidebarProps) {
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 shadow-inner">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="block text-sm font-extrabold tracking-tight text-white">On-Ground.ai</span>
              <span className="block text-[10px] text-emerald-300/70 font-medium">Call Centre Hub · Retail</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {/* Dashboard */}
          <button
            onClick={() => {
              onNavigate("dashboard");
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

          {/* Plan (Calls) */}
          <div>
            <button
              onClick={() => {
                onNavigate("calls");
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                page === "calls"
                  ? "bg-white/15 text-white shadow-xs font-semibold border-l-2 border-emerald-400"
                  : "text-[#a9c4ba] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Phone size={18} className={page === "calls" ? "text-emerald-300" : ""} />
                <span>Plan</span>
              </div>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${page === "calls" ? "rotate-180 text-white" : "text-[#a9c4ba]"}`}
              />
            </button>

            {/* Sub-tabs under Plan */}
            {page === "calls" && (
              <div className="ml-5 mt-1.5 space-y-1 border-l border-emerald-800/40 pl-2">
                {(
                  [
                    ["outgoing", "Calls to make", "8 leads"],
                    ["incoming", "Incoming", "2 missed"],
                    ["recent", "Recent", "History"],
                  ] as const
                ).map(([tab, label, badge]) => (
                  <button
                    key={tab}
                    onClick={() => {
                      onPlanTabChange(tab);
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

          {/* Calendar */}
          <button
            onClick={() => {
              onNavigate("calendar");
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

          {/* Pulse */}
          <button
            onClick={() => {
              onNavigate("pulse");
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

        {/* Agent Profile Footer */}
        <div className="mt-auto border-t border-emerald-900/40 pt-4 px-1">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/30 text-xs font-bold text-emerald-200 border border-emerald-400/40">
              AR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Ananya Rao</p>
              <p className="text-[10px] text-emerald-300/70 truncate">Tele-caller · Shift Active</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
