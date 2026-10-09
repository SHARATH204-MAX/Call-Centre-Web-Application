import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { formatDurationDigital } from "../../../utils/dateUtils";
import { formatCurrency } from "../../../utils/formatCurrency";
import Button from "../../ui/Button";
import { Mic, MicOff, PhoneOff, Pause, Play, Grid, Sparkles, Send, User, ShieldCheck } from "lucide-react";

export default function ActiveCallWorkspace() {
  const {
    activeCallLead,
    callTimer,
    callStatus,
    setCallStatus,
    isMuted,
    setIsMuted,
    isOnHold,
    setIsOnHold,
    transcriptLines,
    setTranscriptLines,
    endActiveCall,
    openModal
  } = useApp();

  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  if (callStatus !== "active" && callStatus !== "on-hold") return null;

  const lead = activeCallLead ?? {
    name: "MK Mukunda",
    phone: "+91 98765 43210",
    product: "Ortho GRID Mattress",
    estimatedValue: 5400,
    score: 87
  };

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setAiAnswer(
      `Avani AI Suggestion: For price objections on the ${lead.product}, explain the ₹450/month 0% EMI option and highlight the 100-night risk-free trial!`
    );
    setAiQuestion("");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden space-y-4 p-5 animate-in fade-in duration-300">
      {/* Caller Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123c30] font-extrabold text-white text-lg shadow-md">
            {lead.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-gray-900">{lead.name}</h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-900 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live Call
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{lead.phone} · {lead.product}</p>
          </div>
        </div>

        {/* Timer & Call Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="rounded-xl bg-gray-100 px-3.5 py-1.5 text-center border border-gray-200">
            <span className="text-[10px] uppercase font-bold text-gray-500 block">Call Duration</span>
            <span className="text-sm font-mono font-extrabold text-gray-900">
              {formatDurationDigital(callTimer)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`rounded-xl p-2.5 transition-all ${
                isMuted ? "bg-red-100 text-red-700 ring-2 ring-red-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button
              onClick={() => {
                setIsOnHold(!isOnHold);
                setCallStatus(isOnHold ? "active" : "on-hold");
              }}
              className={`rounded-xl p-2.5 transition-all ${
                isOnHold ? "bg-amber-100 text-amber-800 ring-2 ring-amber-500" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title={isOnHold ? "Resume" : "Hold"}
            >
              {isOnHold ? <Play size={18} /> : <Pause size={18} />}
            </button>

            <button
              onClick={() => openModal("keypad")}
              className="rounded-xl p-2.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              title="Keypad"
            >
              <Grid size={18} />
            </button>

            <Button
              variant="danger"
              size="md"
              onClick={endActiveCall}
              className="font-bold shadow-md bg-red-600 hover:bg-red-700"
            >
              <PhoneOff size={16} /> End Call
            </Button>
          </div>
        </div>
      </div>

      {/* Main Split: Live Transcript & AI Assist Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
        {/* Live Transcript Box */}
        <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 space-y-2 flex flex-col justify-between h-64">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold text-gray-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Speech Transcript
            </span>
            <span className="text-[10px] text-gray-500">Sentiment: Positive</span>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1 pr-1 font-medium leading-relaxed text-gray-800">
            {transcriptLines.map((line, idx) => (
              <p key={idx} className={line.includes("Arvind") ? "text-emerald-900 font-bold" : "text-gray-700"}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* AI Assist Panel */}
        <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-purple-200 pb-2">
              <span className="font-bold text-[#3b1254] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles size={14} className="text-purple-700" /> AI Assist & SOP Checklist
              </span>
              <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                Value: {formatCurrency(lead.estimatedValue)}
              </span>
            </div>

            <div className="rounded-lg bg-white p-2.5 border border-purple-200 space-y-1">
              <span className="font-bold text-purple-950 block">Main Objective:</span>
              <p className="text-purple-900 font-medium">
                Address EMI terms, state 100-night trial period, and dispatch quotation via WhatsApp.
              </p>
            </div>

            {aiAnswer && (
              <div className="rounded-lg bg-emerald-100 p-2.5 border border-emerald-300 text-emerald-950 font-bold animate-in fade-in">
                {aiAnswer}
              </div>
            )}
          </div>

          {/* Ask AI Input */}
          <form onSubmit={handleAskAI} className="flex items-center gap-2 pt-2 border-t border-purple-200">
            <input
              type="text"
              placeholder="Ask AI about this call..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1 rounded-lg border border-purple-300 bg-white px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:border-[#3b1254]"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#3b1254] px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-900 flex items-center gap-1"
            >
              <Send size={12} /> Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
