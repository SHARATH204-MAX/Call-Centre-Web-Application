import { useState } from "react";
import { ChevronLeft, ChevronRight, X, PhoneCall, CheckCircle2, ChevronDown, ChevronUp, MapPin, Store, Clock } from "lucide-react";
import type { Lead } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../ui/Button";

interface LeadsModalProps {
  leads: Lead[];
  initialIndex: number;
  onClose: () => void;
  onInitiateCall?: (lead: Lead) => void;
}

export default function LeadsModal({
  leads,
  initialIndex,
  onClose,
  onInitiateCall
}: LeadsModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [showSignals, setShowSignals] = useState(true);
  const [callPlaced, setCallPlaced] = useState(false);

  const lead = leads[index];

  if (!lead) return null;

  const handleNext = () => {
    if (index < leads.length - 1) {
      setIndex(index + 1);
      setCallPlaced(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setCallPlaced(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-purple-100 flex flex-col max-h-[90vh]"
      >
        {/* Header matching dark purple color theme #3b1254 from HTML mock */}
        <header className="flex items-center justify-between bg-[#3b1254] px-5 py-4 text-white">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="lead-title" className="text-base font-bold tracking-tight">
                Lead Intelligence Card
              </h2>
              <span className="rounded-full bg-purple-900/60 px-2 py-0.5 text-[10px] font-semibold text-purple-200 border border-purple-400/30">
                SOP SOP-1
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-0.5">
              Lead {index + 1} of {leads.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-purple-200 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* Modal Scrollable Body */}
        <div className="space-y-4 p-5 overflow-y-auto flex-1 text-gray-800 text-sm">
          {/* Main Info Box */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
              <p className="text-xs font-medium text-emerald-700">{lead.phone}</p>
              <p className="mt-1 text-xs text-gray-600 font-semibold">{lead.product}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Est. Value</span>
              <p className="text-base font-extrabold text-[#1d9e75]">{formatCurrency(lead.estimatedValue)}</p>
              <span className="inline-block mt-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                {lead.status}
              </span>
            </div>
          </div>

          {/* Scores Grid: ICP score & Lead Intent score */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-purple-50/60 p-3 border border-purple-100/60">
              <p className="text-[11px] font-semibold text-purple-900/70">ICP Fit Score</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <p className="text-2xl font-extrabold text-[#3b1254]">{lead.score}%</p>
                <span className="text-[10px] font-semibold text-emerald-700">High Match</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-purple-200/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#3b1254]"
                  style={{ width: `${lead.score}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-emerald-50/60 p-3 border border-emerald-100/60">
              <p className="text-[11px] font-semibold text-emerald-900/70">Intent Score</p>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <p className="text-2xl font-extrabold text-[#1d9e75]">{lead.intentScore}%</p>
                <span className="text-[10px] font-semibold text-emerald-700">Hot Lead</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-emerald-200/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1d9e75]"
                  style={{ width: `${lead.intentScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Location & Store Metadata */}
          {(lead.store || lead.location) && (
            <div className="rounded-lg bg-gray-50 p-2.5 space-y-1 text-xs text-gray-600 border border-gray-100">
              {lead.store && (
                <div className="flex items-center gap-1.5">
                  <Store size={14} className="text-emerald-700" />
                  <span className="font-semibold text-gray-800">Store:</span> {lead.store}
                </div>
              )}
              {lead.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-purple-700" />
                  <span className="font-semibold text-gray-800">Location:</span> {lead.location}
                </div>
              )}
              {lead.preferredTime && (
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-blue-600" />
                  <span className="font-semibold text-gray-800">Preferred Slot:</span> {lead.preferredTime}
                </div>
              )}
            </div>
          )}

          {/* Collapsible Buying Signals Section */}
          <div className="border rounded-xl border-gray-200 overflow-hidden">
            <button
              onClick={() => setShowSignals((prev) => !prev)}
              className="flex w-full items-center justify-between bg-gray-50 px-3.5 py-2.5 text-xs font-bold text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>Buying Signals</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800 font-bold">
                  {lead.buyingSignals.length} detected
                </span>
              </span>
              {showSignals ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showSignals && (
              <ul className="divide-y divide-gray-100 bg-white px-3.5 py-1 text-xs text-gray-700">
                {lead.buyingSignals.map((signal, idx) => (
                  <li key={idx} className="py-2 flex items-start gap-2">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 mt-0.5">
                      ✓
                    </span>
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Next Action Box */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">Recommended Next SOP Action</p>
            <p className="mt-1 text-xs font-medium text-amber-950">{lead.nextAction}</p>
          </div>

          {/* Action Button */}
          {callPlaced ? (
            <div className="rounded-xl bg-emerald-100 border border-emerald-300 p-3 text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700" />
              Call Initiated with {lead.name} — SOP Pitch Assistant Active
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              className="w-full font-bold shadow-md"
              onClick={() => {
                setCallPlaced(true);
                if (onInitiateCall) onInitiateCall(lead);
              }}
            >
              <PhoneCall size={16} /> Start Call to {lead.name}
            </Button>
          )}
        </div>

        {/* Modal Footer with Previous / Next Controls */}
        <footer className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3">
          <button
            disabled={index === 0}
            onClick={handlePrev}
            className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} /> Previous Lead
          </button>

          <span className="text-xs font-semibold text-gray-500">
            {index + 1} / {leads.length}
          </span>

          <button
            disabled={index === leads.length - 1}
            onClick={handleNext}
            className="flex items-center gap-1 rounded-xl bg-[#1d9e75] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#168260] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
          >
            Next Lead <ChevronRight size={16} />
          </button>
        </footer>
      </section>
    </div>
  );
}
