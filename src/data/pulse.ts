import type { Channel, CustomerDiscussion } from "../types";

export const pulseChannels: Channel[] = [
  {
    id: "callcentre-team",
    name: "callcentre-team",
    description: "Manager asks team to review call QA scores & greeting adherence",
    unreadCount: 2,
    category: "channel"
  },
  {
    id: "all-stores",
    name: "all-stores",
    description: "New Ortho GRID campaign update & retail store stock sync",
    unreadCount: 1,
    category: "channel"
  },
  {
    id: "avani-coaching",
    name: "avani-coaching",
    description: "Warranty score dropped 12% this week — review coaching scripts",
    unreadCount: 0,
    category: "agent",
    percentage: 81
  },
  {
    id: "manage-shipment",
    name: "manage-shipment",
    description: "Ortho GRID Pro is ready for instant delivery in Bengaluru",
    unreadCount: 0,
    category: "custom"
  },
  {
    id: "quotation-tickets",
    name: "quotation-tickets",
    description: "Quotation approvals awaiting store manager sign-off",
    unreadCount: 0,
    category: "custom"
  },
  {
    id: "new-hire-onboarding",
    name: "new-hire-onboarding",
    description: "Welcome-to-the-team messages & training orientation",
    unreadCount: 0,
    category: "custom"
  }
];

export const customerDiscussionsList: CustomerDiscussion[] = [
  {
    id: "CUST_01",
    customerName: "Mukunda",
    phone: "+91 98765 43210",
    channelType: "whatsapp",
    lastMessage: "Quote for Ortho GRID sent, awaiting reply",
    timestamp: "2:40 PM",
    unread: true,
    isHotLead: true
  },
  {
    id: "CUST_02",
    customerName: "Kavitha R.",
    phone: "+91 96118 77665",
    channelType: "whatsapp",
    lastMessage: "Asking when she can visit to see the hybrid mattress",
    timestamp: "11:15 AM",
    unread: true
  },
  {
    id: "CUST_03",
    customerName: "Ali",
    phone: "+91 97400 11223",
    channelType: "call",
    lastMessage: "Missed call at 9:40 AM and not returned yet",
    timestamp: "9:40 AM",
    unread: true,
    missedCallNotice: "Unreturned call — SLA 15 min exceeded"
  }
];
