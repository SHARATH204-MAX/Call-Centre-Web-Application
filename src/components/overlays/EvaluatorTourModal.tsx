import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import {
  Sparkles,
  PhoneCall,
  PhoneIncoming,
  Bot,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileText
} from "lucide-react";
import { playCallConnectSound, playButtonBeep } from "../../utils/audioEffects";

export default function EvaluatorTourModal() {
  const {
    activeModal,
    closeModal,
    setPage,
    setPlanTab,
    startCallForLead,
    leads,
    openModal
  } = useApp();

  if (activeModal !== "evaluator-tour") return null;

  const handleLaunchCallDemo = () => {
    closeModal();
    playCallConnectSound();
    const rituLead = leads.find((l) => l.name.includes("Ritu")) || leads[0];
    startCallForLead(rituLead);
  };

  const handleLaunchCallbackDemo = () => {
    closeModal();
    playButtonBeep();
    setPage("plan");
    setPlanTab("incoming");
  };

  const handleLaunchAvaniDemo = () => {
    closeModal();
    playButtonBeep();
    setPage("avani");
  };

  const handleLaunchPerformanceDemo = () => {
    closeModal();
    playButtonBeep();
    openModal("og-score");
  };

  return (
    <Modal
      isOpen={activeModal === "evaluator-tour"}
      onClose={closeModal}
      title="✨ Evaluator Guided Showcase Tour"
      subtitle="Experience the top interactive highlights of the OnGround Call Centre app in 1 click"
      headerBg="bg-gradient-to-r from-[#123c30] via-[#3b1254] to-[#123c30]"
      maxWidth="max-w-xl"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div className="rounded-xl bg-purple-50 p-3.5 border border-purple-200 space-y-1">
          <div className="flex items-center gap-1.5 font-extrabold text-[#3b1254] text-xs">
            <Sparkles size={16} className="text-purple-700" />
            <span>Welcome Evaluator / Hiring Team!</span>
          </div>
          <p className="text-purple-950 font-medium leading-relaxed">
            This React + TypeScript application faithfully recreates the full On-Ground.ai call centre specification with local state simulation, 17 interactive modal overlays, speech-to-text progression, and Avani AI sales copilot.
          </p>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="space-y-2.5">
          {/* 1. Live Active Call & SOP Copilot */}
          <button
            onClick={handleLaunchCallDemo}
            className="w-full text-left p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-emerald-950 text-xs">1. Live Call Dialer & SOP Copilot</h4>
                  <span className="rounded bg-emerald-200 text-emerald-900 px-1.5 py-0.2 text-[9px] font-extrabold">
                    Recommended
                  </span>
                </div>
                <p className="text-[11px] text-emerald-900/80 mt-0.5">
                  Launches real-time streaming speech transcript, audio waveform, and live-ticking SOP commitments.
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-emerald-700 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 2. Walkout Missed Call Recovery */}
          <button
            onClick={handleLaunchCallbackDemo}
            className="w-full text-left p-3.5 rounded-xl border border-red-200 bg-red-50/60 hover:bg-red-50 hover:border-red-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <PhoneIncoming size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-red-950 text-xs">2. Walkout Recovery & Callback Confirmation</h4>
                <p className="text-[11px] text-red-900/80 mt-0.5">
                  Inspect incoming missed calls table, values at stake, and confirmation dialog box workflow.
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-red-700 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 3. Avani AI Sales Coach */}
          <button
            onClick={handleLaunchAvaniDemo}
            className="w-full text-left p-3.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-50 hover:border-purple-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#3b1254] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-purple-950 text-xs">3. Avani AI Sales Coach (Assess · Learn · Practise)</h4>
                <p className="text-[11px] text-purple-900/80 mt-0.5">
                  Interactive multi-session AI coaching, audio response evaluations, and roleplay checklist audits.
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-purple-700 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 4. Shift Performance & OG Score */}
          <button
            onClick={handleLaunchPerformanceDemo}
            className="w-full text-left p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-50 hover:border-amber-400 hover:shadow-xs transition-all flex items-center justify-between group"
          >
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-amber-950 text-xs">4. OG Score™ Breakdown & QA Audit</h4>
                <p className="text-[11px] text-amber-900/80 mt-0.5">
                  Detailed 86/100 composite performance formula, category weights, and peer leaderboard rankings.
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-amber-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-[11px] text-gray-500 font-medium">Press <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-[10px] font-mono">?</kbd> anytime for Hotkeys</span>
          <Button variant="primary" size="sm" onClick={handleLaunchCallDemo} className="bg-[#123c30] font-bold">
            <Sparkles size={14} /> Start Demo Call
          </Button>
        </div>
      </div>
    </Modal>
  );
}
