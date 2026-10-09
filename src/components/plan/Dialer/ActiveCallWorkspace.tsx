import { useState, useRef, useEffect } from "react";
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
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript container to bottom as new messages arrive
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTo({
        top: transcriptContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [transcriptLines.length]);

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
    <div id="active-call-workspace" className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden space-y-4 p-5 animate-in fade-in duration-300">
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
        <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 space-y-3 flex flex-col justify-between h-[380px] shadow-inner">
          <div className="flex items-center justify-between border-b pb-2.5">
            <span className="font-extrabold text-gray-900 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" /> Live Speech Transcript (Real-Time)
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Sentiment: Highly Positive
            </span>
          </div>

          <div ref={transcriptContainerRef} className="space-y-3 overflow-y-auto flex-1 pr-2 font-medium leading-relaxed text-gray-800">
            {transcriptLines.map((line, idx) => {
              const isCaller = line.includes("Arvind");
              const timeMatch = line.match(/^\[(.*?)\]/);
              const timestamp = timeMatch ? timeMatch[1] : "";
              const contentWithoutTime = line.replace(/^\[.*?\]\s*/, "");

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs sm:text-sm shadow-2xs space-y-1 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    isCaller
                      ? "bg-emerald-50/90 border-emerald-200 text-emerald-950 font-medium ml-2"
                      : "bg-white border-gray-200 text-gray-900 mr-2"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-xs ${isCaller ? "text-emerald-900" : "text-purple-900"}`}>
                      {isCaller ? "Tele-caller Arvind" : lead.name}
                    </span>
                    {timestamp && (
                      <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 text-xs sm:text-sm leading-relaxed">
                    {contentWithoutTime.replace(/^(Tele-caller Arvind|.*?):\s*/, "")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Assist Panel */}
        <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-4 space-y-3 flex flex-col justify-between h-[380px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-purple-200 pb-2.5">
              <span className="font-extrabold text-[#3b1254] uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Sparkles size={16} className="text-purple-700" /> AI Assist & SOP Checklist
              </span>
              <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                Value: {formatCurrency(lead.estimatedValue)}
              </span>
            </div>

            <div className="rounded-xl bg-white p-3 border border-purple-200 space-y-1 shadow-2xs">
              <span className="font-extrabold text-[#3b1254] block text-xs">Primary Call Objective:</span>
              <p className="text-purple-950 font-medium text-xs sm:text-sm leading-relaxed">
                Address EMI terms, state 100-night trial period guarantee, and dispatch store location + quote link via WhatsApp.
              </p>
            </div>

            {aiAnswer ? (
              <div className="rounded-xl bg-emerald-100 p-3 border border-emerald-300 text-emerald-950 font-bold text-xs sm:text-sm animate-in fade-in shadow-2xs">
                {aiAnswer}
              </div>
            ) : (
              <div className="rounded-xl bg-purple-100/50 p-3 border border-purple-200 text-purple-900 text-xs font-medium space-y-1">
                <span className="font-bold text-purple-950 block">AI Speech Recommendation:</span>
                <p className="italic">"Explain the 0% interest EMI options starting at ₹450/month and remind customer of 100-night trial."</p>
              </div>
            )}
          </div>

          {/* Ask AI Input */}
          <form onSubmit={handleAskAI} className="flex items-center gap-2 pt-3 border-t border-purple-200">
            <input
              type="text"
              placeholder="Ask Avani AI about this call..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1 rounded-xl border border-purple-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#3b1254] shadow-2xs"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#3b1254] px-4 py-2 text-xs font-extrabold text-white hover:bg-purple-900 flex items-center gap-1 shadow-xs"
            >
              <Send size={14} /> Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
