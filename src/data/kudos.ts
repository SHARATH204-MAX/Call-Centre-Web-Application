import type { KudosItem } from "../types";

export const initialKudosList: KudosItem[] = [
  {
    id: "KUDO_01",
    sender: "Sunita Rao",
    role: "Store Manager",
    timestamp: "Today, 1:30 PM",
    message: "Great work with Mukunda — closed that price objection beautifully and secured the Ortho GRID quotation!",
    emoji: "🏆",
    unread: true
  },
  {
    id: "KUDO_02",
    sender: "Raju Kumar",
    role: "Sales Associate",
    timestamp: "Yesterday, 5:10 PM",
    message: "Praised Arvind for a fantastic cross-sell combo recommendation on the ergonomic chair set.",
    emoji: "🔥",
    unread: true
  },
  {
    id: "KUDO_03",
    sender: "Sunita Rao",
    role: "Store Manager",
    timestamp: "Oct 7, 3:00 PM",
    message: "Recognized strong SOP score (94%) on greeting shoppers by name within first 10 seconds.",
    emoji: "⭐",
    unread: false
  }
];
