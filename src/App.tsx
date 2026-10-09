import { useState } from "react";
import AppShell from "./components/layout/AppShell";
import type { Page, PlanTab } from "./types";
import Dashboard from "./pages/Dashboard";
import CallsToMake from "./components/calls/CallsToMake";
import IncomingCalls from "./components/calls/IncomingCalls";
import RecentCalls from "./components/calls/RecentCalls";
import CalendarView from "./components/calendar/CalendarView";
import PulseHome from "./components/pulse/PulseHome";
import PulseChannel from "./components/pulse/PulseChannel";
import PractiseCall from "./pages/PractiseCall";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [planTab, setPlanTab] = useState<PlanTab>("outgoing");
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  function handleNavigate(nextPage: Page) {
    setPage(nextPage);
    if (nextPage === "pulse") {
      setActiveChannel(null);
    }
  }

  return (
    <AppShell
      page={page}
      planTab={planTab}
      onNavigate={handleNavigate}
      onPlanTabChange={setPlanTab}
    >
      {/* 1. Dashboard View */}
      {page === "dashboard" && <Dashboard />}

      {/* 2, 3, 4. Plan Views (Calls to Make, Incoming, Recent) */}
      {page === "calls" && (
        <div className="space-y-4">
          {/* Sub-tab Navigation Switcher Bar */}
          <div className="flex items-center gap-1 border-b border-gray-200 bg-white px-4 py-2 rounded-xl shadow-2xs">
            <span className="text-xs font-bold text-gray-500 mr-2">Plan Tabs:</span>
            {(
              [
                ["outgoing", "Calls to make"],
                ["incoming", "Incoming (Missed)"],
                ["recent", "Recent Calls"],
              ] as const
            ).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setPlanTab(tab)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                  planTab === tab
                    ? "bg-[#123c30] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {planTab === "outgoing" && <CallsToMake />}
          {planTab === "incoming" && <IncomingCalls />}
          {planTab === "recent" && <RecentCalls />}
        </div>
      )}

      {/* Bonus. Practise a Call */}
      {page === "practise" && <PractiseCall />}

      {/* 5. Calendar View */}
      {page === "calendar" && <CalendarView />}

      {/* 6 & 7. Pulse Home & Pulse Channel Views */}
      {page === "pulse" && (
        activeChannel ? (
          <PulseChannel
            channel={activeChannel}
            onBack={() => setActiveChannel(null)}
          />
        ) : (
          <PulseHome onOpenChannel={setActiveChannel} />
        )
      )}
    </AppShell>
  );
}
