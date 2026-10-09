import { useState, useRef, useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { formatDurationDigital } from "../../../utils/dateUtils";
import { formatCurrency } from "../../../utils/formatCurrency";
import Button from "../../ui/Button";
import {
  Mic,
  MicOff,
  PhoneOff,
  Pause,
  Play,
  Grid,
  Sparkles,
  Send,
  User,
  ShieldCheck,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Lightbulb,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Store,
  PhoneMissed,
  Award,
  Trophy,
  MessageSquare,
  Repeat
} from "lucide-react";

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
    endActiveCall,
    openModal
  } = useApp();

  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [showCaseHistory, setShowCaseHistory] = useState(true);
  const [quickActionNotice, setQuickActionNotice] = useState<string | null>(null);
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
    id: "L002",
    name: "Ritu S.",
    phone: "+91 98300 12345",
    product: "Smart Luxe Mattress",
    estimatedValue: 13390,
    score: 94,
    intentScore: 96,
    status: "OPEN",
    buyingSignals: ["Asked for delivery timeline immediately", "Quotation Demanded"],
    nextAction: "Immediate callback walkthrough"
  };

  const lineCount = transcriptLines.length;

  // SOP items & real-time commitment completion tracking
  const SOP_ITEMS = [
    { key: "opening", label: "Opening & Intent Confirm", isDone: lineCount >= 1 },
    { key: "needs", label: "Needs Discovery", isDone: lineCount >= 3 },
    { key: "pitch", label: "Product Pitch", isDone: lineCount >= 5 },
    { key: "financing", label: "EMI / Financing Mention", isDone: lineCount >= 6 },
    { key: "warranty", label: "Warranty Mention", isDone: lineCount >= 8 },
    { key: "closing", label: "Closing / Callback Booking", isDone: lineCount >= 9 }
  ];

  // Drifting off SOP detection: pitch is done (step 5) but EMI hasn't come up yet
  const isOffSop = lineCount === 5;

  // Real-time live drafting summary
  const liveSummaryText =
    lineCount < 3
      ? "Building as the call progresses… Aditi connected with Ritu S. regarding Smart Luxe enquiry."
      : lineCount < 6
      ? `${lead.name}, this is Aditi — following up after your visit to our RT Nagar store on the Smart Luxe. Delivery inside the city is usually 2-3 days — can I check your address is still the one on file from the visit? For the Smart Luxe it comes to ₹13,390 including free delivery and setup.`
      : `${lead.name}, this is Aditi — following up after your visit to our RT Nagar store on the Smart Luxe. Delivery inside the city is usually 2-3 days — confirmed address is still on file. For the Smart Luxe it comes to ₹13,390 with free delivery and setup, plus 0% EMI and 10-year warranty. Customer agreed to proceed, quotation dispatched via WhatsApp.`;

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const q = aiQuestion.toLowerCase();
    if (q.includes("return") || q.includes("policy")) {
      setAiAnswer(
        "Avani AI Coach: We offer a 100-night risk-free trial. If not satisfied, customers receive 100% full refund with complimentary doorstep mattress collection!"
      );
    } else if (q.includes("budget") || q.includes("price") || q.includes("emi")) {
      setAiAnswer(
        "Avani AI Coach: Surface the 0% interest EMI plan from ₹1,115/month — this overcomes price hesitation and closes 32% faster."
      );
    } else {
      setAiAnswer(
        `Avani AI Coach: For ${lead.name}, confirm the 48-hour delivery timeline to RT Nagar and dispatch the official payment quotation directly to WhatsApp right away.`
      );
    }
    setAiQuestion("");
  };

  const handleAction = (type: string) => {
    if (type === "whatsapp") {
      openModal("whatsapp-send");
    } else if (type === "callback") {
      setQuickActionNotice("📅 Follow-up callback slot scheduled for tomorrow, 11:30 AM.");
      setTimeout(() => setQuickActionNotice(null), 4000);
    } else if (type === "warranty") {
      setAiAnswer(
        "Avani AI Coach: Tell customer: 'The 10-year warranty covers all natural sagging and core defects with 100% repair or replacement guarantee.'"
      );
    } else if (type === "escalate") {
      openModal("tag-forward");
    }
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

      {/* Main Split: Live Transcript & Rich AI Assist Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
        {/* Left Column: Live Transcript Box */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 space-y-3 flex flex-col justify-between h-[580px] shadow-inner">
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
              const isCaller = line.includes("Aditi") || line.includes("Arvind");
              const timeMatch = line.match(/^\[(.*?)\]/);
              const timestamp = timeMatch ? timeMatch[1] : "";
              const contentWithoutTime = line.replace(/^\[.*?\]\s*/, "");

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm shadow-2xs space-y-1 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                    isCaller
                      ? "bg-emerald-50/90 border-emerald-200 text-emerald-950 font-medium ml-2"
                      : "bg-white border-gray-200 text-gray-900 mr-2"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-xs ${isCaller ? "text-emerald-900" : "text-purple-900"}`}>
                      {isCaller ? "Tele-caller Aditi" : lead.name}
                    </span>
                    {timestamp && (
                      <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {timestamp}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 text-xs sm:text-sm leading-relaxed">
                    {contentWithoutTime.replace(/^(Tele-caller Aditi|Tele-caller Arvind|.*?):\s*/, "")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
            <span>Progressive AI Audio Transcriber active</span>
            <span className="font-semibold text-emerald-700">{lineCount} turns logged</span>
          </div>
        </div>

        {/* Right Column: Complete OnGround AI Assist Copilot */}
        <div className="rounded-2xl border border-purple-200 bg-white p-4 space-y-3.5 flex flex-col justify-between h-[580px] overflow-y-auto shadow-sm">
          <div className="space-y-3.5">
            {/* 1. Header with Live & Unlock Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#3b1254] uppercase tracking-wider text-sm flex items-center gap-1.5">
                  <Sparkles size={16} className="text-purple-700" /> AI Assist
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="bg-emerald-50 text-emerald-900 font-extrabold text-[11px] px-2 py-0.5 rounded-md border border-emerald-200">
                  ₹13,390 unlock
                </span>
                <span className="bg-purple-50 text-[#3b1254] font-extrabold text-[11px] px-2 py-0.5 rounded-md border border-purple-200">
                  +8 pts OG Score™
                </span>
                <span className="bg-amber-50 text-amber-900 font-extrabold text-[11px] px-2 py-0.5 rounded-md border border-amber-200">
                  #1 rank if closed
                </span>
              </div>
            </div>

            {/* 2. Main Objective — What to offer */}
            <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-wide text-purple-900">
                  Main objective — what to offer
                </span>
                <span className="rounded-full bg-red-100 text-red-800 px-2 py-0.5 text-[10px] font-extrabold">
                  Quotation Demanded
                </span>
              </div>

              <div className="rounded-lg bg-white p-2.5 border border-purple-100 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🛋️</span>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-xs">Smart Luxe Mattress · ₹13,390</h4>
                    <p className="text-[11px] text-gray-500">Interested: Smart Luxe Mattress · ₹13,390</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white p-2 rounded-lg border border-purple-100 flex items-center gap-2 shadow-2xs">
                  <Repeat size={14} className="text-purple-600 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-500 block text-[10px] uppercase">Cross-sell this</span>
                    <span className="font-extrabold text-gray-900">Mattress Protector · ₹1,999</span>
                  </div>
                </div>

                <div className="bg-white p-2 rounded-lg border border-purple-100 flex items-center gap-2 shadow-2xs">
                  <CreditCard size={14} className="text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-gray-500 block text-[10px] uppercase">EMI to offer</span>
                    <span className="font-bold text-gray-800 line-clamp-1">
                      {lineCount >= 6 ? "0% EMI plan from ₹1,115/mo" : "Not yet discussed — surface it early"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SOP Checklist — Dynamic Live Commitments Ticking */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-gray-900 text-[11px] uppercase tracking-wider">
                  SOP checklist — this call
                </span>
                <span className="text-[10px] font-bold text-gray-500">
                  {SOP_ITEMS.filter((i) => i.isDone).length}/{SOP_ITEMS.length} completed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {SOP_ITEMS.map((item) => (
                  <div
                    key={item.key}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11px] transition-all ${
                      item.isDone
                        ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-extrabold shadow-2xs animate-in zoom-in-95 duration-200"
                        : "bg-gray-50 border-gray-200 text-gray-500 font-medium"
                    }`}
                  >
                    {item.isDone ? (
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    ) : (
                      <Circle size={13} className="text-gray-300 shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Drifting off SOP Alert Box */}
            {isOffSop && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-950 space-y-1 animate-in fade-in slide-in-from-top-1 duration-200 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase">
                  <AlertTriangle size={15} className="text-amber-600" />
                  <span>Drifting off SOP</span>
                </div>
                <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
                  EMI hasn't come up yet and the pitch is done — this customer responds well to financing options. Mention the no-cost EMI plan before moving to close.
                </p>
              </div>
            )}

            {/* 5. Buying Signal Tip Box */}
            {lineCount >= 2 && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-2.5 text-blue-950 flex items-start gap-2 shadow-2xs">
                <Lightbulb size={15} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[11px] font-bold leading-relaxed text-blue-900">
                  Tip: Asked "how soon can this be delivered" — very high buying signal, close fast.
                </p>
              </div>
            )}

            {/* 6. Quick Action Triggers */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider">
                Quick Action Triggers
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleAction("whatsapp")}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1.5 flex items-center gap-1 shadow-2xs transition-all"
                >
                  <MessageSquare size={12} /> Send price on WhatsApp
                </button>
                <button
                  onClick={() => handleAction("callback")}
                  className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-[11px] px-2.5 py-1.5 transition-all"
                >
                  Offer callback slot
                </button>
                <button
                  onClick={() => handleAction("warranty")}
                  className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-[11px] px-2.5 py-1.5 transition-all"
                >
                  Explain warranty terms
                </button>
                <button
                  onClick={() => handleAction("escalate")}
                  className="rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-[11px] px-2.5 py-1.5 transition-all"
                >
                  Escalate to manager
                </button>
              </div>

              {quickActionNotice && (
                <p className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg animate-in fade-in">
                  {quickActionNotice}
                </p>
              )}
            </div>

            {/* 7. Summary, Drafting as You Talk */}
            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider block">
                Summary, drafting as you talk
              </span>
              <p className="text-gray-800 font-medium text-[11px] leading-relaxed italic">
                "{liveSummaryText}"
              </p>
            </div>

            {/* 8. 📋 Case History & Lead Intelligence Accordion */}
            <div className="rounded-xl border border-purple-200 overflow-hidden bg-white shadow-2xs">
              <button
                onClick={() => setShowCaseHistory(!showCaseHistory)}
                className="w-full p-2.5 bg-purple-50/50 flex items-center justify-between text-left font-bold text-xs text-[#3b1254]"
              >
                <span className="flex items-center gap-1.5">
                  📋 Case History & Customer Intelligence
                </span>
                {showCaseHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showCaseHistory && (
                <div className="p-3 space-y-3 text-xs animate-in fade-in">
                  {/* Scores Grid */}
                  <div className="grid grid-cols-5 gap-1.5 text-center">
                    <div className="bg-purple-50 p-1.5 rounded-lg border border-purple-100">
                      <span className="font-mono font-extrabold text-[#3b1254] text-xs block">96</span>
                      <span className="text-[8px] uppercase font-bold text-purple-900 block">Intent</span>
                    </div>
                    <div className="bg-purple-50 p-1.5 rounded-lg border border-purple-100">
                      <span className="font-mono font-extrabold text-[#3b1254] text-xs block">94%</span>
                      <span className="text-[8px] uppercase font-bold text-purple-900 block">ICP Fit</span>
                    </div>
                    <div className="bg-purple-50 p-1.5 rounded-lg border border-purple-100">
                      <span className="font-mono font-extrabold text-[#3b1254] text-xs block">90%</span>
                      <span className="text-[8px] uppercase font-bold text-purple-900 block">Budget</span>
                    </div>
                    <div className="bg-purple-50 p-1.5 rounded-lg border border-purple-100">
                      <span className="font-mono font-extrabold text-[#3b1254] text-xs block">88%</span>
                      <span className="text-[8px] uppercase font-bold text-purple-900 block">Need</span>
                    </div>
                    <div className="bg-purple-50 p-1.5 rounded-lg border border-purple-100">
                      <span className="font-mono font-extrabold text-[#3b1254] text-xs block">85%</span>
                      <span className="text-[8px] uppercase font-bold text-purple-900 block">Stage</span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-1.5 text-[11px]">
                    <span className="font-bold text-gray-500 uppercase text-[10px] block">
                      How they've interacted with us
                    </span>
                    <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <Store size={14} className="text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-gray-900">Store Visit</strong>
                          <span className="text-gray-400 text-[10px]">28 May</span>
                        </div>
                        <p className="text-gray-600 text-[10px]">Visited RT Nagar store, tried the Smart Luxe in person</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <PhoneMissed size={14} className="text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-gray-900">Missed Call</strong>
                          <span className="text-gray-400 text-[10px]">30 May</span>
                        </div>
                        <p className="text-gray-600 text-[10px]">Called back after store visit, missed — needs a callback</p>
                      </div>
                    </div>
                  </div>

                  {/* What they liked / concerned about */}
                  <div className="rounded-lg bg-amber-50/70 p-2 border border-amber-200 text-[11px] space-y-0.5">
                    <span className="font-bold text-amber-950 block text-[10px] uppercase">
                      What they liked / are concerned about
                    </span>
                    <p className="text-amber-900 font-medium">
                      <strong>Quotation Demanded:</strong> Asked for delivery timeline immediately — ready to commit once price is confirmed.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 9. Unlock Banner */}
            <div className="rounded-xl bg-gradient-to-r from-[#123c30] to-[#3b1254] p-3 text-white flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Close this, unlock</span>
                <span className="font-extrabold text-sm text-white">₹13,390 Deal value</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-extrabold text-purple-200 block">+8 pts OG Score™ boost</span>
                <span className="text-[10px] font-bold text-emerald-300">#1 Leaderboard rank</span>
              </div>
            </div>

            {aiAnswer && (
              <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-300 text-emerald-950 font-bold text-xs animate-in fade-in shadow-2xs">
                {aiAnswer}
              </div>
            )}
          </div>

          {/* 10. Ask AI Input */}
          <form onSubmit={handleAskAI} className="flex items-center gap-2 pt-2.5 border-t border-purple-200">
            <input
              type="text"
              placeholder="e.g. what's our return policy? has he mentioned budget?"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1 rounded-xl border border-purple-300 bg-white px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#3b1254] shadow-2xs"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#3b1254] px-3.5 py-2 text-xs font-extrabold text-white hover:bg-purple-900 flex items-center gap-1 shadow-xs"
            >
              <Send size={13} /> Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
