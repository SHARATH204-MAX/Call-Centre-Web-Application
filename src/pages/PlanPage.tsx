import { useState } from "react";
import { useApp } from "../context/AppContext";
import CallsToMake from "../components/calls/CallsToMake";
import IncomingCalls from "../components/calls/IncomingCalls";
import RecentCalls from "../components/calls/RecentCalls";
import ActiveCallWorkspace from "../components/plan/Dialer/ActiveCallWorkspace";
import Button from "../components/ui/Button";
import { Phone, PhoneIncoming, Clock, Mic, PhoneOff, CheckCircle2 } from "lucide-react";

export default function PlanPage() {
  const { planTab, setPlanTab, callStatus, setCallStatus, startCallForLead, leads } = useApp();
  const [showIncomingSim, setShowIncomingSim] = useState(false);

  const handleLaunchPractiseCall = () => {
    setShowIncomingSim(true);
  };

  const handleAcceptSimCall = () => {
    setShowIncomingSim(false);
    const rituLead = leads.find((l) => l.name.includes("Ritu")) || leads[0];
    startCallForLead(rituLead);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 4. Plan Heading Header — Dark Navy/Purple Treatment */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1a1a2e] via-[#3b1254] to-[#123c30] p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200 block">Calling Workspace</span>
          <h2 className="text-xl font-extrabold tracking-tight">Today's calling plan — Planner</h2>
          <p className="text-xs text-purple-100/90 mt-0.5 font-medium">
            Prioritized outgoing leads, missed-call recovery, simulated live dialer & AI speech assistance
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLaunchPractiseCall}
            className="font-bold shadow-sm bg-emerald-500 hover:bg-emerald-600 text-[#123c30]"
          >
            <Mic size={14} /> Practise a call
          </Button>
        </div>
      </div>

      {/* Incoming Call Simulation Banner */}
      {showIncomingSim && (
        <div className="rounded-2xl bg-emerald-900 p-4 text-white shadow-xl border border-emerald-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-[#123c30] font-extrabold text-lg animate-bounce">
              <PhoneIncoming size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wide">Incoming Call</span>
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-200">
                  Intent Score: 96
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">Ritu S. (+91 98300 *****)</h3>
              <p className="text-xs text-emerald-200/90">Cooling Memory Foam Pillows inquiry · Visited store today</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIncomingSim(false)}
              className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 flex items-center gap-1 shadow-xs"
            >
              <PhoneOff size={14} /> Decline
            </button>
            <button
              onClick={handleAcceptSimCall}
              className="rounded-xl bg-emerald-400 px-4 py-2 text-xs font-extrabold text-[#123c30] hover:bg-emerald-300 flex items-center gap-1 shadow-md"
            >
              <Phone size={14} /> Accept Call
            </button>
          </div>
        </div>
      )}

      {/* Live Active Dialer Workspace */}
      <ActiveCallWorkspace />

      {/* Plan Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-gray-200 bg-white p-2.5 rounded-xl shadow-2xs">
        <span className="text-xs font-bold text-gray-500 mr-2">Worklists:</span>
        {(
          [
            ["outgoing", "Calls to make"],
            ["incoming", "Incoming (Missed)"],
            ["recent", "Recent Calls"]
          ] as const
        ).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setPlanTab(tab)}
            className={`rounded-xl px-4 py-2 text-xs font-extrabold transition-all ${
              planTab === tab
                ? "bg-[#123c30] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sub-tab Rendering */}
      {planTab === "outgoing" && <CallsToMake />}
      {planTab === "incoming" && <IncomingCalls />}
      {planTab === "recent" && <RecentCalls />}
    </div>
  );
}
