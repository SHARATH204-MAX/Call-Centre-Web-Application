import type { CallRecord } from "../types";

export const calls: CallRecord[] = [
  {
    id: "C001",
    leadId: "L004",
    leadName: "Faizan A.",
    phone: "+91 97400 11223",
    type: "missed",
    timestamp: "2026-10-08T10:55:00",
    durationSeconds: 0,
    status: "Missed",
    estimatedValue: 14000,
    product: "Hybrid Latex Mattress (Queen)",
    sopStep: "SOP 1: Immediate callback for missed inbound call",
    aiNotes: "Missed Yesterday 10:55 AM. Visited store / in CRM. High intent shopper.",
    qaScore: 0
  },
  {
    id: "C002",
    leadId: "L005",
    leadName: "Kavitha R.",
    phone: "+91 96118 77665",
    type: "missed",
    timestamp: "2026-10-08T16:40:00",
    durationSeconds: 0,
    status: "Missed",
    estimatedValue: 9800,
    product: "Executive Teak Desk Combo",
    sopStep: "SOP 2: Custom wood finish consultation",
    aiNotes: "Missed Yesterday 4:40 PM. Warm lead. Requested swatches.",
    qaScore: 0
  },
  {
    id: "C003",
    leadId: "L008",
    leadName: "Divya R.",
    phone: "+91 97110 22334",
    type: "missed",
    timestamp: "2026-10-08T14:35:00",
    durationSeconds: 0,
    status: "Missed",
    estimatedValue: 2400,
    product: "Ergonomic Study Table",
    sopStep: "SOP 3: Follow-up re-engagement",
    aiNotes: "Missed Yesterday 2:35 PM. Cold lead.",
    qaScore: 0
  },
  {
    id: "C004",
    leadId: "L006",
    leadName: "Ritu S.",
    phone: "+91 98300 44556",
    type: "missed",
    timestamp: "2026-10-09T11:20:00",
    durationSeconds: 0,
    status: "Missed",
    estimatedValue: 5500,
    product: "Cooling Memory Foam Pillows",
    sopStep: "SOP 1: Re-engage walk-in shopper within 15 min",
    aiNotes: "Missed Today 11:20 AM. Visited store / in CRM.",
    qaScore: 0
  },
  {
    id: "C005",
    leadId: "L099",
    leadName: "Unknown",
    phone: "+91 90000 00000",
    type: "missed",
    timestamp: "2026-10-08T18:00:00",
    durationSeconds: 0,
    status: "Missed",
    estimatedValue: 0,
    product: "General Enquiry",
    sopStep: "SOP 4: Unknown caller triage",
    aiNotes: "Missed Yesterday. No prior record. Time expired.",
    qaScore: 0
  },
  {
    id: "C006",
    leadId: "L001",
    leadName: "Mukunda R.",
    phone: "+91 98765 43210",
    type: "outgoing",
    timestamp: "2026-10-09T10:45:00",
    durationSeconds: 252, // 4m 12s
    status: "Completed",
    estimatedValue: 5400,
    product: "Ortho GRID Mattress",
    sopStep: "SOP 2: Highlight Grid layer spine alignment & offer 100-night trial",
    aiNotes: "Agent Arvind named customer within first 10 seconds (+23.6pp conversion). Customer requested quotation.",
    qaScore: 94
  },
  {
    id: "C007",
    leadId: "L005",
    leadName: "Kavitha R.",
    phone: "+91 96118 77665",
    type: "incoming",
    timestamp: "2026-10-08T16:40:00",
    durationSeconds: 125, // 2m 05s
    status: "Completed",
    estimatedValue: 9800,
    product: "Executive Teak Desk Combo",
    sopStep: "SOP 3: Wood finish sample walkthrough",
    aiNotes: "Customer requested wood sample photos over WhatsApp.",
    qaScore: 88
  },
  {
    id: "C008",
    leadId: "L004",
    leadName: "Faizan A.",
    phone: "+91 97400 11223",
    type: "outgoing",
    timestamp: "2026-10-07T14:45:00",
    durationSeconds: 310, // 5m 10s
    status: "Completed",
    estimatedValue: 14000,
    product: "Hybrid Latex Mattress (Queen)",
    sopStep: "SOP 4: Organic latex certification walkthrough",
    aiNotes: "Explained 100% natural organic latex certification.",
    qaScore: 92
  }
];
