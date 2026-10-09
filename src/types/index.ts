export type Page = "dashboard" | "calls" | "calendar" | "pulse" | "practise";

export type PlanTab = "outgoing" | "incoming" | "recent";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  product: string;
  score: number; // ICP score e.g. 87%
  intentScore: number; // Intent score e.g. 91
  estimatedValue: number; // e.g. 5400
  status: string; // e.g. "OPEN", "Follow-up due", "Interested", "New lead"
  slaTime?: string; // e.g. "2h left"
  quoteStatus?: string; // e.g. "Quote to be given to customer"
  buyingSignals: string[];
  signalCategories?: {
    category: string;
    description: string;
  }[];
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
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  time?: string;
  title: string;
  type: "follow-up" | "callback" | "review" | "meeting";
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
  isDM?: boolean;
  category?: "agent" | "channel" | "direct";
  percentage?: number;
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
