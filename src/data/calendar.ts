import type { CalendarEvent } from "../types";

export const calendarEvents: CalendarEvent[] = [
  {
    id: "E001",
    date: "2026-10-09",
    time: "10:30 AM",
    title: "Call Akash Mehta — Smart Ortho King",
    type: "follow-up",
    leadName: "Akash Mehta",
    leadId: "L001",
    status: "pending"
  },
  {
    id: "E002",
    date: "2026-10-09",
    time: "02:00 PM",
    title: "Urgent Callback — Priya Nair (Missed Inbound)",
    type: "callback",
    leadName: "Priya Nair",
    leadId: "L004",
    status: "pending"
  },
  {
    id: "E003",
    date: "2026-10-09",
    time: "04:30 PM",
    title: "Brochure Dispatch — Meera Sharma",
    type: "follow-up",
    leadName: "Meera Sharma",
    leadId: "L002",
    status: "completed"
  },
  {
    id: "E004",
    date: "2026-10-10",
    time: "11:00 AM",
    title: "Recliner Bed Demo — Rahul Verma",
    type: "follow-up",
    leadName: "Rahul Verma",
    leadId: "L003",
    status: "pending"
  },
  {
    id: "E005",
    date: "2026-10-12",
    time: "03:00 PM",
    title: "Leather Swatch Concierge Dispatch — Vikramaditya",
    type: "callback",
    leadName: "Vikramaditya Joshi",
    leadId: "L007",
    status: "pending"
  },
  {
    id: "E006",
    date: "2026-10-14",
    time: "11:30 AM",
    title: "Weekly QA Call Audit & Pitch Coach Review",
    type: "review",
    status: "pending"
  },
  {
    id: "E007",
    date: "2026-10-15",
    time: "05:00 PM",
    title: "Mid-Month Conversion & Revenue Review Meeting",
    type: "meeting",
    status: "pending"
  },
  {
    id: "E008",
    date: "2026-10-20",
    time: "10:00 AM",
    title: "The Sleep Company Store Manager Sync",
    type: "meeting",
    status: "pending"
  }
];
