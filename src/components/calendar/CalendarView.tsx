import { useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { calendarEvents as initialEvents } from "../../data/calendar";
import type { CalendarEvent } from "../../types";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus, CheckCircle2, User } from "lucide-react";
import Button from "../ui/Button";

export default function CalendarView() {
  const {
    currentDate,
    monthLabel,
    daysGrid,
    selectedDateStr,
    setSelectedDateStr,
    prevMonth,
    nextMonth,
    resetToToday,
  } = useCalendar(new Date(2026, 9, 9)); // October 2026

  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Filter events for selected date
  const selectedDateEvents = events.filter((e) => e.date === selectedDateStr);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const newEv: CalendarEvent = {
      id: `E${Date.now()}`,
      date: selectedDateStr,
      time: "02:00 PM",
      title: newEventTitle,
      type: "follow-up",
      status: "pending"
    };

    setEvents((prev) => [...prev, newEv]);
    setNewEventTitle("");
    setShowAddEvent(false);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Calendar Header & Month Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">Call Centre Schedule & Callbacks</h2>
          <p className="text-xs text-gray-500">Plan customer follow-ups, store manager syncs & QA reviews</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetToToday}>
            Today
          </Button>

          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
            <button
              onClick={prevMonth}
              className="rounded-md p-1.5 text-gray-600 hover:bg-white hover:shadow-2xs transition-all"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 text-xs font-bold text-gray-800 min-w-[110px] text-center">
              {monthLabel}
            </span>
            <button
              onClick={nextMonth}
              className="rounded-md p-1.5 text-gray-600 hover:bg-white hover:shadow-2xs transition-all"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid & Events Sidebar Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Month Grid (2 Columns on desktop) */}
        <div className="lg:col-span-2 rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold text-gray-500 border-b pb-2">
            {weekdays.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Cells Grid */}
          <div className="grid grid-cols-7 gap-1">
            {daysGrid.map((dayCell, idx) => {
              const dayEvents = events.filter((e) => e.date === dayCell.dateString);
              const isSelected = selectedDateStr === dayCell.dateString;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDateStr(dayCell.dateString)}
                  className={`min-h-[64px] sm:min-h-[72px] p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    isSelected
                      ? "border-[#1d9e75] bg-emerald-50/60 ring-2 ring-[#1d9e75]/30 shadow-xs"
                      : dayCell.isCurrentMonth
                      ? "border-gray-100 bg-white hover:bg-gray-50/80"
                      : "border-transparent bg-gray-50/40 text-gray-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold flex h-6 w-6 items-center justify-center rounded-full ${
                        dayCell.isToday
                          ? "bg-[#1d9e75] text-white"
                          : isSelected
                          ? "text-[#1d9e75]"
                          : dayCell.isCurrentMonth
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {dayCell.dayNumber}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        {dayEvents.length}
                      </span>
                    )}
                  </div>

                  {/* Event Indicators / Dots */}
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] font-semibold truncate px-1 rounded ${
                          ev.type === "callback"
                            ? "bg-amber-100 text-amber-800"
                            : ev.type === "review"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[8px] text-gray-400 font-bold block pl-1">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events Panel */}
        <div className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between border-b pb-3 mb-3">
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Scheduled Events</h3>
              <p className="text-xs font-bold text-[#1d9e75] mt-0.5">{selectedDateStr}</p>
            </div>

            <Button variant="secondary" size="sm" onClick={() => setShowAddEvent(!showAddEvent)}>
              <Plus size={14} /> Add Event
            </Button>
          </div>

          {/* Add Event Form */}
          {showAddEvent && (
            <form onSubmit={handleAddEvent} className="mb-3 space-y-2 p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
              <input
                type="text"
                placeholder="Callback title or lead name..."
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
                autoFocus
              />
              <div className="flex justify-end gap-1.5">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddEvent(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save
                </Button>
              </div>
            </form>
          )}

          {/* Events List */}
          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-80 pr-1">
            {selectedDateEvents.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500">
                <CalendarIcon size={28} className="mx-auto text-gray-300 mb-2" />
                No events scheduled for this date.
              </div>
            ) : (
              selectedDateEvents.map((ev) => (
                <div key={ev.id} className="p-3 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900">{ev.title}</span>
                    <span className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                      <Clock size={11} /> {ev.time ?? "All Day"}
                    </span>
                  </div>
                  {ev.leadName && (
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <User size={12} /> Lead: {ev.leadName}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        ev.type === "callback"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {ev.type}
                    </span>
                    <button
                      onClick={() =>
                        setEvents((prev) =>
                          prev.map((e) => (e.id === ev.id ? { ...e, status: "completed" } : e))
                        )
                      }
                      className={`text-[10px] font-bold flex items-center gap-1 ${
                        ev.status === "completed" ? "text-emerald-700" : "text-gray-400 hover:text-emerald-700"
                      }`}
                    >
                      <CheckCircle2 size={12} /> {ev.status === "completed" ? "Done" : "Mark done"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
