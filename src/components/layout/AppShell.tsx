import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useApp } from "../../context/AppContext";
import type { Page } from "../../types";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { page } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pageTitles: Record<Page, { title: string; subtitle: string }> = {
    dashboard: {
      title: "Dashboard",
      subtitle: "Employee performance metrics, queue status & daily tasks",
    },
    plan: {
      title: "Today's calling plan — Planner",
      subtitle: "Prioritized outgoing leads, missed calls & active calling workspace",
    },
    avani: {
      title: "Avani — AI Sales Coach",
      subtitle: "Sales coaching, product learning path & role-play practice",
    },
    calendar: {
      title: "Calendar",
      subtitle: "Scheduled store visits, coaching sessions & meeting invites",
    },
    pulse: {
      title: "Pulse Workspace",
      subtitle: "Team channels, direct messages & customer WhatsApp discussions",
    },
  };

  const currentHeader = pageTitles[page] || pageTitles.dashboard;

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <Sidebar
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
