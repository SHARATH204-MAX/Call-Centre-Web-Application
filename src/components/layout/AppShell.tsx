import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useApp } from "../../context/AppContext";
import type { Page } from "../../types";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const {
    page,
    setPage,
    callStatus,
    setCallStatus,
    isMuted,
    setIsMuted,
    isOnHold,
    setIsOnHold,
    endActiveCall,
    activeModal,
    openModal,
    closeModal
  } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Global enterprise contact-center keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || "").toLowerCase();
      const isInput = activeTag === "input" || activeTag === "textarea" || (document.activeElement as HTMLElement)?.isContentEditable;

      if (e.key === "Escape") {
        if (activeModal) {
          e.preventDefault();
          closeModal();
        }
        return;
      }

      if (isInput) return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        openModal("hotkeys");
        return;
      }

      // Page Navigation: 1 - 5
      if (e.key === "1") setPage("dashboard");
      else if (e.key === "2") setPage("plan");
      else if (e.key === "3") setPage("avani");
      else if (e.key === "4") setPage("calendar");
      else if (e.key === "5") setPage("pulse");

      // Active Call Telephony controls
      if (callStatus === "active" || callStatus === "on-hold") {
        if (e.key.toLowerCase() === "m") {
          setIsMuted(!isMuted);
        } else if (e.key.toLowerCase() === "h") {
          setIsOnHold(!isOnHold);
          setCallStatus(isOnHold ? "active" : "on-hold");
        } else if (e.key.toLowerCase() === "e") {
          endActiveCall();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page, callStatus, isMuted, isOnHold, activeModal]);

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
