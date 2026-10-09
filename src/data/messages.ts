import type { ChatMessage, Channel, PinnedCardInfo } from "../types";

export const channels: Channel[] = [
  {
    id: "general",
    name: "call-centre-announcements",
    description: "Company-wide updates, daily targets & QA guidelines",
    unreadCount: 2,
    category: "channel"
  },
  {
    id: "pitch-coaching",
    name: "pitch-coaching-tips",
    description: "Daily objection handling & pitch coaching scripts from AvaniBot",
    unreadCount: 1,
    category: "channel"
  },
  {
    id: "sleep-company",
    name: "the-sleep-company-leads",
    description: "Store floor walk-out recovery coordination for TSC stores",
    unreadCount: 0,
    category: "channel"
  },
  {
    id: "avani-bot",
    name: "AvaniBot (AI Supervisor)",
    description: "Your 24/7 AI Tele-caller Supervisor & Pitch Coach",
    category: "agent"
  },
  {
    id: "sunita-rao",
    name: "Sunita Rao (QA Manager)",
    description: "Call Quality Assurance & Compliance Lead",
    category: "direct"
  },
  {
    id: "mukunda-d",
    name: "Mukunda Dwarkanath (Co-founder)",
    description: "On-Ground.ai Product & Ops Leader",
    category: "direct"
  }
];

export const initialMessagesMap: Record<string, ChatMessage[]> = {
  "general": [
    {
      id: "M001",
      author: "Sunita Rao",
      role: "QA Manager",
      text: "Team, our greeting-in-first-10s QA score is currently at 81.4%, which is slightly below our 85% target.",
      timestamp: "2:05 PM",
      isCurrentUser: false,
      channelId: "general"
    },
    {
      id: "M002",
      author: "Sunita Rao",
      role: "QA Manager",
      text: "Please remember to state the shopper's name immediately when placing or receiving a call. Data shows naming the shopper drives a +23.6pp conversion lift!",
      timestamp: "2:06 PM",
      isCurrentUser: false,
      channelId: "general"
    },
    {
      id: "M003",
      author: "You",
      role: "Call Centre Agent",
      text: "Understood Sunita! I'll make sure to greet every shopper by name within 10s on all calls today.",
      timestamp: "2:10 PM",
      isCurrentUser: true,
      channelId: "general"
    },
    {
      id: "M004",
      author: "Mukunda Dwarkanath",
      role: "Co-founder",
      text: "Great focus team. Breakeven is cleared for Sep 2026, let's keep driving walk-out recovery for The Sleep Company and Furnishka!",
      timestamp: "3:45 PM",
      isCurrentUser: false,
      channelId: "general"
    }
  ],
  "pitch-coaching": [
    {
      id: "M101",
      author: "AvaniBot",
      role: "AI Pitch Coach",
      text: "Tip of the Day: When customers ask 'Why is Smart Ortho pricier than standard foam?', emphasize the 100-night trial + Grid layer temperature regulation.",
      timestamp: "10:00 AM",
      isCurrentUser: false,
      channelId: "pitch-coaching"
    }
  ],
  "sleep-company": [
    {
      id: "M201",
      author: "Indiranagar Store Manager",
      role: "Store Manager",
      text: "Akash Mehta just walked out after trying Ortho King. He left his number. Call him ASAP!",
      timestamp: "10:25 AM",
      isCurrentUser: false,
      channelId: "sleep-company"
    }
  ],
  "avani-bot": [
    {
      id: "M301",
      author: "AvaniBot",
      role: "AI Assistant",
      text: "Hello! I am AvaniBot. You completed 32 calls today with a 66% connect rate. You have 4 follow-ups due. How can I assist your shift?",
      timestamp: "09:00 AM",
      isCurrentUser: false,
      channelId: "avani-bot"
    }
  ]
};

export const samplePinnedCard: PinnedCardInfo = {
  id: "PIN001",
  title: "Needs your input",
  description: "Akash Mehta (L001) missed an incoming callback. The Sleep Company Indiranagar store SOP requires re-engaging within 30 mins to offer the ₹5,000 spot festival discount.",
  options: [
    { label: "Accept & Call Akash Now", actionKey: "call_now" },
    { label: "Re-assign to Next Available Agent", actionKey: "reassign" }
  ]
};
