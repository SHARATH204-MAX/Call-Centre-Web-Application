import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { Page, PlanTab } from "../../types";

interface AppShellProps {
  page: Page;
  planTab: PlanTab;
  onNavigate: (page: Page) => void;
  onPlanTabChange: (tab: PlanTab) => void;
  children: React.ReactNode;
}

export default function AppShell({
  page,
  planTab,
  onNavigate,
  onPlanTabChange,
  children,
}: AppShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pageTitles: Record<Page, { title: string; subtitle: string }> = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Shift summary, performance metrics & task queue",
    },
    calls: {
      title: "Plan",
      subtitle: "Call management, lead scoring & call log review",
    },
    practise: {
      title: "Practise a Call",
      subtitle: "AI Pitch Coach call simulation & objection handling workspace",
    },
    calendar: {
      title: "Calendar",
      subtitle: "Scheduled customer callbacks, reviews & store syncs",
    },
    pulse: {
      title: "Pulse",
      subtitle: "Team channels, AI Pitch Coach & supervisor updates",
    },
  };

  const currentHeader = pageTitles[page];

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <Sidebar
        page={page}
        planTab={planTab}
        onNavigate={onNavigate}
        onPlanTabChange={onPlanTabChange}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className="lg:ml-56 flex flex-col min-h-screen transition-all">
        <Topbar
          title={currentHeader.title}
          subtitle={currentHeader.subtitle}
          onMenuToggle={() => setIsMobileOpen(!isMobileOpen)}
        />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
