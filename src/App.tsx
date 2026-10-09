import { AppProvider, useApp } from "./context/AppContext";
import AppShell from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import PlanPage from "./pages/PlanPage";
import AvaniPage from "./pages/AvaniPage";
import CalendarView from "./components/calendar/CalendarView";
import PulsePage from "./pages/PulsePage";

// Overlays
import OGScoreModal from "./components/overlays/OGScoreModal";
import RankDetailModal from "./components/overlays/RankDetailModal";
import LinkedInModal from "./components/overlays/LinkedInModal";
import DateRangeModal from "./components/overlays/DateRangeModal";
import LeadAnalysisModal from "./components/overlays/LeadAnalysisModal";
import CallWrapupModal from "./components/overlays/CallWrapupModal";
import ConversationSavedModal from "./components/overlays/ConversationSavedModal";
import WhatsAppModal from "./components/overlays/WhatsAppModal";
import SettingsModal from "./components/overlays/SettingsModal";
import AvatarModal from "./components/overlays/AvatarModal";
import NoInterestModal from "./components/overlays/NoInterestModal";
import CameBackModal from "./components/overlays/CameBackModal";
import NotificationModal from "./components/overlays/NotificationModal";
import TagForwardModal from "./components/overlays/TagForwardModal";
import KeypadModal from "./components/overlays/KeypadModal";
import BeforeYouCallSOPModal from "./components/overlays/BeforeYouCallSOPModal";
import EvaluatorTourModal from "./components/overlays/EvaluatorTourModal";
import HotkeysModal from "./components/overlays/HotkeysModal";
import ShiftReportModal from "./components/overlays/ShiftReportModal";
import LeadsModal from "./components/leads/LeadsModal";

function MainContent() {
  const { page, activeModal, closeModal, leads, selectedLeadIndex, startCallForLead } = useApp();

  return (
    <AppShell>
      {/* 1. Dashboard View */}
      {page === "dashboard" && <Dashboard />}

      {/* 2. Plan Calling Workspace View */}
      {page === "plan" && <PlanPage />}

      {/* 3. Avani AI Sales Coach View */}
      {page === "avani" && <AvaniPage />}

      {/* 4. Calendar View */}
      {page === "calendar" && <CalendarView />}

      {/* 5. Pulse Communication Workspace View */}
      {page === "pulse" && <PulsePage />}

      {/* Overlays & Modals Manager */}
      <OGScoreModal />
      <RankDetailModal />
      <LinkedInModal />
      <DateRangeModal />
      <LeadAnalysisModal />
      <CallWrapupModal />
      <ConversationSavedModal />
      <WhatsAppModal />
      <SettingsModal />
      <AvatarModal />
      <NoInterestModal />
      <CameBackModal />
      <NotificationModal />
      <TagForwardModal />
      <KeypadModal />
      <BeforeYouCallSOPModal />
      <EvaluatorTourModal />
      <HotkeysModal />
      <ShiftReportModal />

      {activeModal === "leads" && (
        <LeadsModal
          leads={leads}
          initialIndex={selectedLeadIndex}
          onClose={closeModal}
          onInitiateCall={(lead) => {
            closeModal();
            startCallForLead(lead);
          }}
        />
      )}
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
