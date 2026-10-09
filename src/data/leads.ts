import type { Lead } from "../types";

export const leads: Lead[] = [
  {
    id: "L001",
    name: "MK Mukunda",
    phone: "+91 98765 43210",
    product: "Ortho GRID Mattress",
    score: 87,
    intentScore: 91,
    estimatedValue: 5400,
    status: "OPEN",
    slaTime: "2h left",
    quoteStatus: "Quote to be given to customer",
    buyingSignals: [
      "Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker",
      "Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number",
      "Hasn't raised warranty yet — worth proactively mentioning the 10-year trial period to reduce perceived risk"
    ],
    signalCategories: [
      {
        category: "Financing Related",
        description: "Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker"
      },
      {
        category: "Quotation Demanded",
        description: "Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number"
      },
      {
        category: "Warranty Related",
        description: "Hasn't raised warranty yet — worth proactively mentioning the 10-year trial period to reduce perceived risk"
      },
      {
        category: "CUMULATIVE MISSED",
        description: "Expired without close, visible to manager"
      }
    ],
    nextAction: "Provide competitor price match quotation & offer 0% HDFC EMI walkthrough",
    lastContacted: "Today, 10:45 AM",
    notes: "High-intent shopper for The Sleep Company. Interested in Ortho GRID 100-night trial.",
    location: "Koramangala, Bengaluru",
    store: "The Sleep Company - Koramangala Experience Centre",
    preferredTime: "4:30 PM - 6:00 PM"
  },
  {
    id: "L002",
    name: "Rita S.",
    phone: "+91 98112 34567",
    product: "Smart Luxe Mattress (King)",
    score: 95,
    intentScore: 90,
    estimatedValue: 23000,
    status: "Interested",
    slaTime: "4h left",
    quoteStatus: "Trial brochure sent",
    buyingSignals: [
      "Tested Smart Luxe at Koramangala store yesterday",
      "Asked about 100-night risk-free home trial",
      "Requested instant delivery to HSR Layout"
    ],
    signalCategories: [
      {
        category: "Store Visit Confirmed",
        description: "Tested Smart Luxe at Koramangala store yesterday"
      },
      {
        category: "Delivery Urgency",
        description: "Requested instant delivery to HSR Layout"
      }
    ],
    nextAction: "Confirm delivery slot & offer complimentary gel pillow set",
    lastContacted: "Today, 11:30 AM",
    notes: "Very close to closing. Needs final approval on delivery timeline.",
    location: "HSR Layout, Bengaluru",
    store: "The Sleep Company - Koramangala"
  },
  {
    id: "L003",
    name: "Priya Iyer",
    phone: "+91 99001 88223",
    product: "Ergonomic Smart Chair Pro",
    score: 84,
    intentScore: 82,
    estimatedValue: 45000,
    status: "Walk-out 4h ago",
    slaTime: "1h left",
    quoteStatus: "Re-engaged before",
    buyingSignals: [
      "Walked out of store 4h ago after testing lumbar support",
      "Requested callback regarding billing dispute / discount match",
      "Checked competitor price online"
    ],
    signalCategories: [
      {
        category: "Walk-out Recovery SOP 1",
        description: "Walked out of store 4h ago after testing lumbar support"
      }
    ],
    nextAction: "Call to offer ₹2,500 walk-out spot discount code",
    lastContacted: "Today, 12:15 PM",
    notes: "Walk-out lead from Indiranagar store. Re-engage before 5:00 PM.",
    location: "Indiranagar, Bengaluru",
    store: "The Sleep Company - Indiranagar"
  },
  {
    id: "L004",
    name: "Faizan A.",
    phone: "+91 97400 11223",
    product: "Hybrid Latex Mattress (Queen)",
    score: 81,
    intentScore: 78,
    estimatedValue: 14000,
    status: "Missed Yesterday",
    slaTime: "Immediate",
    quoteStatus: "Visited store / in CRM",
    buyingSignals: [
      "Visited store yesterday at 10:55 AM",
      "Inquired about natural organic latex certification"
    ],
    nextAction: "Immediate callback for missed inbound call",
    lastContacted: "Yesterday, 10:55 AM",
    notes: "High value lead in CRM.",
    location: "Jayanagar, Bengaluru",
    store: "Furnishka - Jayanagar"
  },
  {
    id: "L005",
    name: "Kavitha R.",
    phone: "+91 96118 77665",
    product: "Executive Teak Desk Combo",
    score: 78,
    intentScore: 74,
    estimatedValue: 9800,
    status: "Warm lead",
    slaTime: "Today",
    quoteStatus: "Swatches requested",
    buyingSignals: [
      "Inquired about custom walnut vs teak finish",
      "Missed call yesterday at 4:40 PM"
    ],
    nextAction: "Send teak wood sample photos via WhatsApp",
    lastContacted: "Yesterday, 4:40 PM",
    notes: "Setting up home office in JP Nagar.",
    location: "JP Nagar, Bengaluru",
    store: "Furnishka - Bannerghatta"
  },
  {
    id: "L006",
    name: "Ritu S.",
    phone: "+91 98300 44556",
    product: "Cooling Memory Foam Pillows",
    score: 72,
    intentScore: 68,
    estimatedValue: 5500,
    status: "Visited store / in CRM",
    slaTime: "Today",
    quoteStatus: "Visited store today 11:20 AM",
    buyingSignals: [
      "Tested neck support pillows at store",
      "Asked about bundle discount for set of 4"
    ],
    nextAction: "Send 15% limited time promo discount coupon",
    lastContacted: "Today, 11:20 AM",
    notes: "Visited store today at 11:20 AM.",
    location: "Bellandur, Bengaluru",
    store: "The Sleep Company - Indiranagar"
  },
  {
    id: "L007",
    name: "Suresh Nair",
    phone: "+91 99887 66554",
    product: "Motorized Recliner Bed",
    score: 89,
    intentScore: 86,
    estimatedValue: 32000,
    status: "Plan upgrade enquiry",
    slaTime: "3h left",
    quoteStatus: "Upgrade quote pending",
    buyingSignals: [
      "Enquired about upgrading from manual recliner to motorized bed",
      "Asked for exchange value for 2-year old recliner"
    ],
    nextAction: "Share motorized bed demo video & exchange valuation quote",
    lastContacted: "Today, 1:45 PM",
    notes: "Looking to upgrade existing bed.",
    location: "Whitefield, Bengaluru",
    store: "The Sleep Company - Whitefield"
  },
  {
    id: "L008",
    name: "Divya R.",
    phone: "+91 97110 22334",
    product: "Ergonomic Study Table",
    score: 65,
    intentScore: 60,
    estimatedValue: 2400,
    status: "Cold lead",
    slaTime: "Tomorrow",
    quoteStatus: "Cold lead follow-up",
    buyingSignals: [
      "Missed call yesterday at 2:35 PM"
    ],
    nextAction: "Schedule follow-up call",
    lastContacted: "Yesterday, 2:35 PM",
    notes: "Cold lead.",
    location: "Hebbal, Bengaluru",
    store: "Furnishka - Sahakarnagar"
  }
];
