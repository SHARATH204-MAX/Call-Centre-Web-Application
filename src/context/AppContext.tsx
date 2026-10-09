import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  Page,
  PlanTab,
  AvaniMode,
  CallStatusState,
  EmployeeProfile,
  Lead,
  CallRecord,
  CalendarEvent,
  ChatMessage,
  CustomerDiscussion,
  KudosItem,
  ModalType,
  AvaniChatSession
} from "../types";

import { initialEmployee } from "../data/employee";
import { leads as initialLeads } from "../data/leads";
import { calls as initialCalls } from "../data/calls";
import { calendarEvents as initialCalendarEvents } from "../data/calendar";
import { pulseChannels, customerDiscussionsList } from "../data/pulse";
import { initialMessagesMap } from "../data/messages";
import { initialKudosList } from "../data/kudos";
import { initialAvaniSessions } from "../data/avani";

interface AppContextType {
  // Navigation & Tabs
  page: Page;
  setPage: (p: Page) => void;
  planTab: PlanTab;
  setPlanTab: (tab: PlanTab) => void;
  avaniMode: AvaniMode;
  setAvaniMode: (m: AvaniMode) => void;
  activeChannelId: string | null;
  setActiveChannelId: (ch: string | null) => void;

  // Shared Entities State
  employee: EmployeeProfile;
  setEmployee: React.Dispatch<React.SetStateAction<EmployeeProfile>>;
  leads: Lead[];
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  calls: CallRecord[];
  setCalls: React.Dispatch<React.SetStateAction<CallRecord[]>>;
  calendarEvents: CalendarEvent[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  customerDiscussions: CustomerDiscussion[];
  setCustomerDiscussions: React.Dispatch<React.SetStateAction<CustomerDiscussion[]>>;
  kudosList: KudosItem[];
  setKudosList: React.Dispatch<React.SetStateAction<KudosItem[]>>;
  avaniSessions: AvaniChatSession[];
  setAvaniSessions: React.Dispatch<React.SetStateAction<AvaniChatSession[]>>;

  // Active Selected Lead & Customer
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  selectedLeadIndex: number;
  setSelectedLeadIndex: (idx: number) => void;
  selectedCustomer: CustomerDiscussion | null;
  setSelectedCustomer: (c: CustomerDiscussion | null) => void;

  // Call Dialer State Machine
  callStatus: CallStatusState;
  setCallStatus: (s: CallStatusState) => void;
  activeCallLead: Lead | null;
  setActiveCallLead: (l: Lead | null) => void;
  isMuted: boolean;
  setIsMuted: (m: boolean) => void;
  isOnHold: boolean;
  setIsOnHold: (h: boolean) => void;
  callTimer: number;
  setCallTimer: React.Dispatch<React.SetStateAction<number>>;
  transcriptLines: string[];
  setTranscriptLines: React.Dispatch<React.SetStateAction<string[]>>;

  // Overlay Modal Manager
  activeModal: ModalType;
  setActiveModal: (m: ModalType) => void;
  openModal: (m: ModalType) => void;
  closeModal: () => void;

  // Actions
  toggleQueueStatus: () => void;
  startCallForLead: (lead: Lead) => void;
  endActiveCall: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<Page>("dashboard");
  const [planTab, setPlanTab] = useState<PlanTab>("outgoing");
  const [avaniMode, setAvaniMode] = useState<AvaniMode>("assess");
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  const [employee, setEmployee] = useState<EmployeeProfile>(initialEmployee);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [calls, setCalls] = useState<CallRecord[]>(initialCalls);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);
  const [customerDiscussions, setCustomerDiscussions] = useState<CustomerDiscussion[]>(customerDiscussionsList);
  const [kudosList, setKudosList] = useState<KudosItem[]>(initialKudosList);
  const [avaniSessions, setAvaniSessions] = useState<AvaniChatSession[]>(initialAvaniSessions);

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>("L001");
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number>(0);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDiscussion | null>(null);

  // Call State Machine
  const [callStatus, setCallStatus] = useState<CallStatusState>("idle");
  const [activeCallLead, setActiveCallLead] = useState<Lead | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isOnHold, setIsOnHold] = useState<boolean>(false);
  const [callTimer, setCallTimer] = useState<number>(0);
  const [transcriptLines, setTranscriptLines] = useState<string[]>([]);
  const [fullScriptLines, setFullScriptLines] = useState<string[]>([]);

  // Modal State Manager
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Active call timer ticker
  useEffect(() => {
    let interval: any = null;
    if (callStatus === "active") {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else if (callStatus === "idle") {
      setCallTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStatus]);

  // Stream transcript messages one by one during active call
  useEffect(() => {
    if (callStatus !== "active" || isOnHold || fullScriptLines.length === 0) return;

    if (transcriptLines.length >= fullScriptLines.length) return;

    const timer = setTimeout(() => {
      setTranscriptLines((prev) => {
        if (prev.length < fullScriptLines.length) {
          return [...prev, fullScriptLines[prev.length]];
        }
        return prev;
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [callStatus, isOnHold, transcriptLines.length, fullScriptLines]);

  const toggleQueueStatus = () => {
    setEmployee((prev) => ({
      ...prev,
      queueStatus: prev.queueStatus === "available" ? "unavailable" : "available"
    }));
  };

  const startCallForLead = (lead: Lead) => {
    setActiveCallLead(lead);
    setCallStatus("active");
    setCallTimer(0);
    setIsMuted(false);
    setIsOnHold(false);
    const fullScript = [
      `[00:01] Tele-caller Arvind: Hello ${lead.name}! This is Arvind calling from The Sleep Company Koramangala flagship store...`,
      `[00:04] ${lead.name}: Hi Arvind! Yes, I was checking out the ${lead.product} online and visited the store earlier today.`,
      `[00:10] Tele-caller Arvind: Fantastic! I noticed you were looking at back-support mattresses. Were you specifically looking for firm lumbar support or pressure-relieving comfort?`,
      `[00:18] ${lead.name}: Mostly looking for back-pain relief and cooling comfort, but I wanted to confirm the 100-night trial period and EMI options before deciding.`,
      `[00:26] Tele-caller Arvind: Excellent question! We offer a 100-night risk-free home trial with zero-cost EMI starting from ₹450/month, plus free door-step delivery & installation!`,
      `[00:34] ${lead.name}: That sounds very reasonable. Can you send me the detailed quotation and store direction link on WhatsApp so I can review with my family?`,
      `[00:41] Tele-caller Arvind: Absolutely! I am dispatching the official quote, EMI breakdown, and digital catalog directly to your WhatsApp right now!`
    ];
    setFullScriptLines(fullScript);
    setTranscriptLines([fullScript[0]]); // Start with first line only, rest will stream one by one
    setPage("plan");

    // Scroll back to call section smoothly
    setTimeout(() => {
      const callElem = document.getElementById("active-call-workspace") || document.getElementById("call-section");
      if (callElem) {
        callElem.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const endActiveCall = () => {
    setCallStatus("wrapped-up");
    setActiveModal("call-wrapup");
  };

  const openModal = (m: ModalType) => setActiveModal(m);
  const closeModal = () => setActiveModal(null);

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        planTab,
        setPlanTab,
        avaniMode,
        setAvaniMode,
        activeChannelId,
        setActiveChannelId,

        employee,
        setEmployee,
        leads,
        setLeads,
        calls,
        setCalls,
        calendarEvents,
        setCalendarEvents,
        customerDiscussions,
        setCustomerDiscussions,
        kudosList,
        setKudosList,
        avaniSessions,
        setAvaniSessions,

        selectedLeadId,
        setSelectedLeadId,
        selectedLeadIndex,
        setSelectedLeadIndex,
        selectedCustomer,
        setSelectedCustomer,

        callStatus,
        setCallStatus,
        activeCallLead,
        setActiveCallLead,
        isMuted,
        setIsMuted,
        isOnHold,
        setIsOnHold,
        callTimer,
        setCallTimer,
        transcriptLines,
        setTranscriptLines,

        activeModal,
        setActiveModal,
        openModal,
        closeModal,

        toggleQueueStatus,
        startCallForLead,
        endActiveCall
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
