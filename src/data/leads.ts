import type { Lead } from "../types";

export const leads: Lead[] = [
  {
    id: "L001",
    name: "Akash Mehta",
    phone: "+91 98765 43210",
    product: "Smart Ortho Mattress (King Size)",
    score: 94,
    intentScore: 89,
    estimatedValue: 65000,
    status: "Follow-up due",
    buyingSignals: [
      "Asked about 100-night trial period & warranty details",
      "Compared Ortho Luxury vs Smart Ortho side-by-side",
      "Specifically requested callback during evening (6-8 PM)",
      "Inquired about 0% EMI options via HDFC Credit Card"
    ],
    nextAction: "Call back to finalize Ortho King order & confirm delivery date",
    lastContacted: "Yesterday, 4:30 PM",
    notes: "Customer was very enthusiastic about spine alignment support. Mentioned backache relief.",
    location: "Koramangala, Bengaluru",
    store: "The Sleep Company - Indiranagar Experience Centre",
    preferredTime: "6:00 PM - 8:00 PM"
  },
  {
    id: "L002",
    name: "Meera Sharma",
    phone: "+91 98112 34567",
    product: "Ergonomic Smart Chair Pro",
    score: 88,
    intentScore: 82,
    estimatedValue: 32000,
    status: "Interested",
    buyingSignals: [
      "Visited product demo page 4 times in 2 days",
      "Asked about lumbar support adjustability & armrest angles",
      "Requested official product brochure via WhatsApp"
    ],
    nextAction: "Share product spec brochure & dispatch store trial invite",
    lastContacted: "Today, 11:15 AM",
    notes: "Works from home, looking for high-back ergonomic mesh chair. Needs quick delivery.",
    location: "HSR Layout, Bengaluru",
    store: "Furnishka - HSR Store"
  },
  {
    id: "L003",
    name: "Rahul Verma",
    phone: "+91 99001 88223",
    product: "Elevate Adjustable Recliner Bed",
    score: 82,
    intentScore: 76,
    estimatedValue: 88000,
    status: "New lead",
    buyingSignals: [
      "Filled lead form on Instagram ad campaign",
      "Checked zero-downpayment financing schemes",
      "Opened WhatsApp catalog link"
    ],
    nextAction: "Schedule initial intro call & assess bed size requirement",
    lastContacted: "Today, 9:00 AM",
    notes: "Interested in motorized reclining bed for senior parents.",
    location: "Whitefield, Bengaluru",
    store: "The Sleep Company - Whitefield"
  },
  {
    id: "L004",
    name: "Priya Nair",
    phone: "+91 97400 11223",
    product: "Hybrid Latex Mattress (Queen Size)",
    score: 79,
    intentScore: 71,
    estimatedValue: 48000,
    status: "Callback requested",
    buyingSignals: [
      "Asked if latex is 100% natural organic",
      "Inquired about old mattress trade-in exchange bonus"
    ],
    nextAction: "Call to offer ₹3,000 exchange bonus discount",
    lastContacted: "Oct 8, 2:15 PM",
    notes: "Has existing spring mattress, wants eco-friendly natural latex option.",
    location: "Jayanagar, Bengaluru",
    store: "Duroflex - Jayanagar"
  },
  {
    id: "L005",
    name: "Siddharth Rao",
    phone: "+91 96118 77665",
    product: "Executive Solid Teak Desk & Chair Combo",
    score: 75,
    intentScore: 68,
    estimatedValue: 52000,
    status: "Follow-up due",
    buyingSignals: [
      "Asked about wood finish custom polish (Walnut vs Teak)",
      "Checked physical store stock availability"
    ],
    nextAction: "Send teak wood sample photos via WhatsApp",
    lastContacted: "Oct 7, 5:45 PM",
    notes: "Setting up new home office, demands solid wood finish.",
    location: "JP Nagar, Bengaluru",
    store: "Furnishka - Bannerghatta"
  },
  {
    id: "L006",
    name: "Ananya Gupta",
    phone: "+91 98300 44556",
    product: "Cooling Gel Memory Foam Pillows (Set of 2)",
    score: 68,
    intentScore: 60,
    estimatedValue: 12000,
    status: "New lead",
    buyingSignals: [
      "Click-through from email newsletter promo code"
    ],
    nextAction: "Send 15% limited time coupon discount code",
    lastContacted: "Oct 8, 10:00 AM",
    notes: "Looking for neck pain support pillows.",
    location: "Bellandur, Bengaluru",
    store: "The Sleep Company - Online"
  },
  {
    id: "L007",
    name: "Vikramaditya Joshi",
    phone: "+91 99887 66554",
    product: "Motorized Recliner Sofa 3-Seater",
    score: 91,
    intentScore: 85,
    estimatedValue: 115000,
    status: "Follow-up due",
    buyingSignals: [
      "Visited showroom on Sunday & tested leather recliner",
      "Requested custom fabric swatch sample delivery home",
      "Asked for architect/designer discount quote"
    ],
    nextAction: "Confirm leather swatch dispatch & offer free home delivery",
    lastContacted: "Oct 8, 6:30 PM",
    notes: "High-net-worth customer furnishing new villa in Sarjapur Road.",
    location: "Sarjapur Road, Bengaluru",
    store: "Furnishka - Domlur"
  },
  {
    id: "L008",
    name: "Kavita Reddy",
    phone: "+91 97110 22334",
    product: "Ergonomic Kids Study Table Set",
    score: 72,
    intentScore: 65,
    estimatedValue: 24000,
    status: "Interested",
    buyingSignals: [
      "Asked about height adjustment mechanism for growing children"
    ],
    nextAction: "Share height adjustment video demonstration",
    lastContacted: "Oct 7, 1:20 PM",
    notes: "Buying for 8-year-old child.",
    location: "Hebbal, Bengaluru",
    store: "Furnishka - Sahakarnagar"
  }
];
