export type Page = "dashboard" | "plan" | "avani" | "calendar" | "pulse";

export type PlanTab = "outgoing" | "incoming" | "recent" | "practise";

export type AvaniMode = "assess" | "learn" | "practise";

export type CallStatusState = "idle" | "incoming" | "ringing" | "active" | "on-hold" | "ended" | "wrapped-up";

export interface EmployeeProfile {
  name: string;
  role: string;
  store: string;
  allocatedStores: string[];
  employeeId: string;
  email: string;
  phone: string;
  queueStatus: "available" | "unavailable";
  avatarPersona: string;
  avatarEmoji: string;
  linkedInUrl?: string;
  ogScore: number;
  ogChange: number;
  rank: number;
  locationGroup: string;
  staffCount: number;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  product: string;
  score: number;
  intentScore: number;
  estimatedValue: number;
  status: string;
  slaTime?: string;
  quoteStatus?: string;
  buyingSignals: string[];
  signalCategories?: {
    category: string;
    description: string;
  }[];
  noInterestReason?: string;
  returnTiming?: string;
  nextAction: string;
  lastContacted?: string;
  notes?: string;
  location?: string;
  store?: string;
  preferredTime?: string;
}

export interface CallRecord {
  id: string;
  leadId: string;
  leadName: string;
  phone: string;
  type: "incoming" | "outgoing" | "missed";
  timestamp: string;
  durationSeconds: number;
  status: "Connected" | "Missed" | "Completed" | "Pending Callback" | "Callback Placed";
  estimatedValue: number;
  product: string;
  sopStep?: string;
  aiNotes?: string;
  qaScore?: number;
  sopResults?: {
    checkpoint: string;
    passed: boolean;
    evidence: string;
  }[];
}

export interface CalendarEvent {
  id: string;
  date: string;
  time?: string;
  title: string;
  type: "store-visit" | "coaching" | "meeting" | "follow-up" | "callback" | "review";
  leadName?: string;
  leadId?: string;
  status?: "pending" | "completed";
}

export interface ChatMessage {
  id: string;
  author: string;
  avatarUrl?: string;
  role?: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
  channelId?: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  unreadCount?: number;
  category?: "agent" | "channel" | "direct" | "custom";
  percentage?: number;
}

export interface CustomerDiscussion {
  id: string;
  customerName: string;
  phone: string;
  channelType: "whatsapp" | "call";
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  isHotLead?: boolean;
  missedCallNotice?: string;
}

export interface KudosItem {
  id: string;
  sender: string;
  role: string;
  timestamp: string;
  message: string;
  emoji: string;
  unread: boolean;
}

export interface AvaniChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: {
    id: string;
    role: "user" | "assistant";
    content: string;
    attachment?: string;
  }[];
}

export interface AvaniLearnModule {
  id: string;
  title: string;
  description: string;
  status: "done" | "in-progress" | "not-started";
  progressPercent: number;
  type: "core" | "personalized";
}

export interface AvaniPractiseStep {
  id: string;
  title: string;
  instructions: string;
  modelExampleDuration: string;
  scriptText: string;
  checks: string[];
}

export interface DashboardStat {
  label: string;
  value: string;
  change: string;
  isPositive?: boolean;
  icon?: string;
  subtitle?: string;
}

export interface WeeklyEarning {
  day: string;
  amount: number;
  target?: number;
}

export interface CsatTrendData {
  day: string;
  csat: number;
  callsHandled: number;
}

export interface ProgressCardData {
  title: string;
  current: number;
  target: number;
  subtitle: string;
  color: string;
}

export interface PinnedCardInfo {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  options: { label: string; actionKey: string }[];
  resolved?: boolean;
  resolutionText?: string;
}

export type ModalType =
  | null
  | "date-range"
  | "leads"
  | "og-score"
  | "rank-detail"
  | "linkedin"
  | "lead-analysis"
  | "call-wrapup"
  | "conversation-saved"
  | "whatsapp-send"
  | "settings"
  | "avatar"
  | "no-interest"
  | "came-back"
  | "notifications"
  | "tag-forward"
  | "keypad"
  | "before-you-call";
