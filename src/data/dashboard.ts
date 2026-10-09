import type { DashboardStat, WeeklyEarning, ProgressCardData } from "../types";

export const dashboardStats: DashboardStat[] = [
  {
    label: "Calls made",
    value: "32",
    change: "+8 today vs target",
    isPositive: true
  },
  {
    label: "Connected",
    value: "21",
    change: "66% connect rate (+4.2%)",
    isPositive: true
  },
  {
    label: "Follow-ups",
    value: "12",
    change: "4 due today",
    isPositive: false
  },
  {
    label: "Earnings",
    value: "₹12,500",
    change: "This week (₹2.4k today)",
    isPositive: true
  }
];

export const weeklyEarnings: WeeklyEarning[] = [
  { day: "Mon", amount: 2400, target: 2000 },
  { day: "Tue", amount: 3100, target: 2000 },
  { day: "Wed", amount: 1800, target: 2000 },
  { day: "Thu", amount: 3600, target: 2000 },
  { day: "Fri", amount: 2800, target: 2000 },
  { day: "Sat", amount: 4200, target: 2500 },
  { day: "Sun", amount: 3200, target: 2500 }
];

export const progressCards: ProgressCardData[] = [
  {
    title: "Greeting in first 10s",
    current: 84,
    target: 85,
    subtitle: "+23.6pp conversion when naming shopper",
    color: "#1d9e75"
  },
  {
    title: "Walk-out recovery rate",
    current: 68,
    target: 70,
    subtitle: "Re-engaged within 15 min SOP target",
    color: "#3b1254"
  },
  {
    title: "Weekly commission target",
    current: 12500,
    target: 15000,
    subtitle: "83% of ₹15,000 weekly goal reached",
    color: "#2563eb"
  }
];

export const pipelineMetrics = {
  totalPipelineValue: 436000,
  activeLeadsCount: 8,
  highIntentCount: 5,
  avgDealSize: 54500,
  walkoutRecoveriesToday: 3
};
