import { useState } from "react";
import type { PinnedCardInfo } from "../../types";
import { AlertCircle, CheckCircle2, Clock, Send } from "lucide-react";

interface NeedsYourInputProps {
  card?: PinnedCardInfo;
}

export default function NeedsYourInput({ card }: NeedsYourInputProps) {
  const [resolvedStatus, setResolvedStatus] = useState<string | null>(null);
  const [showReschedulePicker, setShowReschedulePicker] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [repliedNotes, setRepliedNotes] = useState<string | null>(null);

  const handleConfirmed = () => {
    setResolvedStatus("Confirmed for 4:30 PM");
    setShowReschedulePicker(false);
  };

  const handleRescheduleSelect = (timeSlot: string) => {
    setResolvedStatus(`Rescheduled to ${timeSlot}`);
    setShowReschedulePicker(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setRepliedNotes(replyText);
    setReplyText("");
  };

  return (
    <div className="sticky top-0 z-10 border-b border-amber-200 bg-amber-50/95 p-3.5 backdrop-blur-xs shadow-xs transition-all">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-200 text-amber-900 font-bold border border-amber-300">
          <AlertCircle size={18} />
        </div>

        <div className="flex-1 min-w-0 text-xs text-amber-950">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>Pinned Priority Task</span>
              <span className="rounded bg-amber-200 px-1.5 py-0.2 text-[9px] text-amber-900 font-bold">
                Needs your input
              </span>
            </span>

            {resolvedStatus && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1 border border-emerald-300">
                <CheckCircle2 size={12} /> {resolvedStatus}
              </span>
            )}
          </div>

          <p className="mt-1 leading-relaxed font-semibold text-amber-950">
            Confirm the 4:30pm callback — Priya Iyer — Likely billing dispute
          </p>

          {/* Action Buttons: Confirmed & Reschedule matching PDF Page 5 */}
          {!resolvedStatus && (
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <button
                onClick={handleConfirmed}
                className="rounded-lg bg-[#1d9e75] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#168260] transition-colors shadow-2xs flex items-center gap-1"
              >
                <CheckCircle2 size={13} /> Confirmed
              </button>

              <button
                onClick={() => setShowReschedulePicker(!showReschedulePicker)}
                className="rounded-lg bg-white border border-amber-300 px-3.5 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors shadow-2xs flex items-center gap-1"
              >
                <Clock size={13} /> Reschedule
              </button>
            </div>
          )}

          {/* Reschedule Picker Dropdown */}
          {showReschedulePicker && !resolvedStatus && (
            <div className="mt-2.5 flex items-center gap-2 bg-white p-2 rounded-lg border border-amber-300 animate-in fade-in">
              <span className="text-[11px] font-semibold text-gray-700">Select new time:</span>
              {(["5:00 PM Today", "5:30 PM Today", "Tomorrow 10:00 AM"] as const).map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleRescheduleSelect(slot)}
                  className="rounded bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-900 hover:bg-amber-200"
                >
                  {slot}
                </button>
              ))}
            </div>
          )}

          {/* Quick Reply Form */}
          {repliedNotes ? (
            <div className="mt-2 rounded-lg bg-white/90 p-2 text-[11px] font-semibold text-emerald-900 border border-emerald-200">
              Agent instruction saved: "{repliedNotes}"
            </div>
          ) : (
            <form onSubmit={handleReplySubmit} className="mt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Or type your answer..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 rounded-lg border border-amber-300 bg-white/90 px-3 py-1 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-900 px-3 py-1 text-xs font-bold text-white hover:bg-amber-950 flex items-center gap-1"
              >
                <Send size={12} /> Reply
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
