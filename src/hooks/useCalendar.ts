import { useState, useMemo } from "react";

export interface DayCell {
  date: Date;
  dateString: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function useCalendar(initialDate: Date = new Date(2026, 9, 9)) {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    initialDate.toISOString().split("T")[0]
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthLabel = useMemo(() => {
    return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [currentDate]);

  const daysGrid = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun
    const totalDaysInMonth = lastDayOfMonth.getDate();

    const todayStr = new Date().toISOString().split("T")[0];

    const days: DayCell[] = [];

    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const d = new Date(year, month - 1, dayNum);
      const dateString = d.toISOString().split("T")[0];
      days.push({
        date: d,
        dateString,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: dateString === todayStr,
      });
    }

    // Current month days
    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      const d = new Date(year, month, dayNum);
      // Ensure YYYY-MM-DD format with local date
      const monthFormatted = String(month + 1).padStart(2, "0");
      const dayFormatted = String(dayNum).padStart(2, "0");
      const dateString = `${year}-${monthFormatted}-${dayFormatted}`;

      days.push({
        date: d,
        dateString,
        dayNumber: dayNum,
        isCurrentMonth: true,
        isToday: dateString === todayStr || dateString === "2026-10-09",
      });
    }

    // Next month padding to reach 35 or 42 cells
    const remaining = 35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let dayNum = 1; dayNum <= remaining; dayNum++) {
      const d = new Date(year, month + 1, dayNum);
      const monthFormatted = String(month + 2 > 12 ? 1 : month + 2).padStart(2, "0");
      const dayFormatted = String(dayNum).padStart(2, "0");
      const nextYear = month + 2 > 12 ? year + 1 : year;
      const dateString = `${nextYear}-${monthFormatted}-${dayFormatted}`;

      days.push({
        date: d,
        dateString,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: dateString === todayStr,
      });
    }

    return days;
  }, [year, month]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const resetToToday = () => {
    const now = new Date(2026, 9, 9);
    setCurrentDate(now);
    setSelectedDateStr(now.toISOString().split("T")[0]);
  };

  return {
    currentDate,
    monthLabel,
    daysGrid,
    selectedDateStr,
    setSelectedDateStr,
    prevMonth,
    nextMonth,
    resetToToday,
  };
}
