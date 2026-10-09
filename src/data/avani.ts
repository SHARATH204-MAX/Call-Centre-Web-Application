import type { AvaniChatSession, AvaniLearnModule, AvaniPractiseStep } from "../types";

export const initialAvaniSessions: AvaniChatSession[] = [
  {
    id: "SESH_01",
    title: "100-Night Trial Explanation",
    timestamp: "Today, 10:15 AM",
    messages: [
      {
        id: "M01",
        role: "user",
        content: "How do I explain the 100-night trial when a customer says foam mattresses get hot?"
      },
      {
        id: "M02",
        role: "assistant",
        content: "Great question! Explain that the SmartGRID structure contains 2,500+ air channels for continuous airflow, and the 100-night trial gives them zero-risk home testing. Emphasize: 'Try it in your own bedroom for 100 nights — if you don't sleep cooler, we collect it with 100% full refund!'"
      }
    ]
  },
  {
    id: "SESH_02",
    title: "Price Objection Handler",
    timestamp: "Yesterday, 4:20 PM",
    messages: [
      {
        id: "M03",
        role: "user",
        content: "Customer says Ortho GRID is price-anchored against cheap local foam."
      },
      {
        id: "M04",
        role: "assistant",
        content: "Highlight cost-per-night value: Over 10 years warranty, Ortho GRID costs under ₹1.50 per night for spine alignment support. Then pitch the 0% HDFC 12-month EMI scheme."
      }
    ]
  }
];

export const avaniLearnModules: AvaniLearnModule[] = [
  {
    id: "MOD_01",
    title: "Product Foundations — GRID vs Luxe",
    description: "Foam types, SmartGRID technology, density specs, and SKU differentiation.",
    status: "done",
    progressPercent: 100,
    type: "core"
  },
  {
    id: "MOD_02",
    title: "Warranty & Trial Policy",
    description: "100-night risk-free trial, return pickup SOP, and 10-year warranty key scripts.",
    status: "in-progress",
    progressPercent: 40,
    type: "core"
  },
  {
    id: "MOD_03",
    title: "Objection Handling — Price & Competitors",
    description: "Handling local foam comparisons and financing / 0% EMI walkthroughs.",
    status: "in-progress",
    progressPercent: 65,
    type: "personalized"
  },
  {
    id: "MOD_04",
    title: "Walk-out Recovery SOP 1",
    description: "Re-engaging shoppers within 15 minutes of store departure.",
    status: "not-started",
    progressPercent: 0,
    type: "personalized"
  }
];

export const avaniPractiseSteps: AvaniPractiseStep[] = [
  {
    id: "STEP_01",
    title: "First 10s Name Greeting",
    instructions: "Greet the customer by name within the first 10 seconds of the call to drive +23.6pp conversion lift.",
    modelExampleDuration: "0:42",
    scriptText: "Hello MK Mukunda! This is Arvind calling from The Sleep Company Koramangala store regarding your Ortho GRID inquiry.",
    checks: ["Named customer in first 10s", "Stated store location", "Friendly tone"]
  },
  {
    id: "STEP_02",
    title: "100-Night Trial Risk Reduction",
    instructions: "Reassure customer by highlighting the zero-risk 100-night trial and free pickup.",
    modelExampleDuration: "0:50",
    scriptText: "You get 100 nights to test the Ortho GRID in your own bedroom. If it doesn't give you backache relief, we pick it up with 100% refund.",
    checks: ["Stated 100-night trial", "Mentioned full refund", "Addressed spine support"]
  },
  {
    id: "STEP_03",
    title: "0% EMI Financing Offer",
    instructions: "Walk customer through HDFC 12-month zero downpayment financing.",
    modelExampleDuration: "0:35",
    scriptText: "We can break the ₹5,400 down into simple 0% interest EMIs of just ₹450 per month with zero processing fees.",
    checks: ["Stated monthly amount", "Mentioned 0% interest", "Explained HDFC card process"]
  }
];
