import type { DashboardStat, WeeklyEarning, CsatTrendData, ProgressCardData } from "../types";

export const dashboardStats: DashboardStat[] = [
  {
    label: "OG SCORE",
    value: "76",
    change: "+4.5 vs last week",
    isPositive: true,
    subtitle: "AI Pitch & SOP Adherence"
  },
  {
    label: "AVG HANDLE TIME",
    value: "4m 12s",
    change: "-12s speed improvement",
    isPositive: true,
    subtitle: "Target: 4m 30s"
  },
  {
    label: "CSAT TODAY",
    value: "94%",
    change: "+2% customer satisfaction",
    isPositive: true,
    subtitle: "4.8 / 5.0 Star Rating"
  },
  {
    label: "IN QUEUE",
    value: "2",
    change: "+1 new lead waiting",
    isPositive: false,
    subtitle: "SLA: < 15 mins"
  }
];

export const csatTrendData: CsatTrendData[] = [
  { day: "Mon", csat: 86, callsHandled: 28 },
  { day: "Tue", csat: 90, callsHandled: 34 },
  { day: "Wed", csat: 88, callsHandled: 25 },
  { day: "Thu", csat: 92, callsHandled: 38 },
  { day: "Fri", csat: 94, callsHandled: 32 },
  { day: "Sat", csat: 91, callsHandled: 42 },
  { day: "Sun", csat: 94, callsHandled: 36 }
];

export const weeklyEarnings: WeeklyEarning[] = [
  { day: "Mon", amount: 800, target: 1000 },
  { day: "Tue", amount: 1200, target: 1000 },
  { day: "Wed", amount: 600, target: 1000 },
  { day: "Thu", amount: 1400, target: 1000 },
  { day: "Fri", amount: 900, target: 1000 },
  { day: "Sat", amount: 1600, target: 1200 },
  { day: "Sun", amount: 1200, target: 1200 }
];

export const progressCards: ProgressCardData[] = [
  {
    title: "Greeting in first 10s QA Score",
    current: 84,
    target: 85,
    subtitle: "+23.6pp conversion when naming shopper in first 10s",
    color: "#1d9e75"
  },
  {
    title: "Walk-out recovery SOP Adherence",
    current: 76,
    target: 80,
    subtitle: "Re-engaged within 15 min SOP target",
    color: "#3b1254"
  },
  {
    title: "Monthly Coached Earnings",
    current: 5200,
    target: 7000,
    subtitle: "₹5,200 earned from AI coached moves this month",
    color: "#2563eb"
  }
];

export const pipelineMetrics = {
  totalPipelineValue: 137100,
  activeLeadsCount: 8,
  highIntentCount: 5,
  avgDealSize: 17137,
  walkoutRecoveriesToday: 3,
  agentName: "Arvind Rajan",
  storeName: "The Sleep Company - Koramangala"
};
