import { useState } from "react";
import { ChevronLeft, ChevronRight, X, PhoneCall, CheckCircle2, ChevronDown, ChevronUp, Clock, Store, AlertCircle } from "lucide-react";
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
        {/* Dark Purple Header matching PDF Page 5 exact text */}
        <header className="flex items-center justify-between bg-[#3b1254] px-5 py-3.5 text-white">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="lead-title" className="text-base font-bold tracking-tight">
                Leads
              </h2>
              <span className="text-xs text-purple-200/90 font-medium">
                Lead {index + 1} of {leads.length} · SLA to close
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-purple-200 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>

        {/* Modal Body */}
        <div className="space-y-4 p-5 overflow-y-auto flex-1 text-gray-800 text-sm">
          {/* Status Badge & Product Subtitle */}
          <div className="flex items-start justify-between border-b border-gray-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900 uppercase tracking-wide">
                  {lead.status}
                </span>
                {lead.slaTime && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock size={11} /> {lead.slaTime}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-extrabold text-gray-900 mt-1">{lead.name}</h3>
              <p className="text-xs text-gray-600 font-semibold">
                Interested, {lead.product} · <span className="text-[#1d9e75] font-extrabold">{formatCurrency(lead.estimatedValue)}</span>
              </p>
            </div>
          </div>

          {/* Quote Status Banner */}
          {lead.quoteStatus && (
            <div className="rounded-lg bg-purple-50 p-2.5 border border-purple-100 text-xs font-semibold text-purple-900 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-purple-600" />
              <span>{lead.quoteStatus}</span>
            </div>
          )}

          {/* Score Metrics Grid: ICP % and Lead Intent Score */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-purple-50/70 p-3 border border-purple-100">
              <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider block">ICP</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <p className="text-2xl font-extrabold text-[#3b1254]">{lead.score}%</p>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-purple-200 overflow-hidden">
                <div className="h-full rounded-full bg-[#3b1254]" style={{ width: `${lead.score}%` }} />
              </div>
            </div>

            <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">Lead Intent Score</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <p className="text-2xl font-extrabold text-[#1d9e75]">{lead.intentScore}</p>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-emerald-200 overflow-hidden">
                <div className="h-full rounded-full bg-[#1d9e75]" style={{ width: `${lead.intentScore}%` }} />
              </div>
            </div>
          </div>

          {/* WHERE WE PICKED UP SIGNALS Section matching PDF Page 5 */}
          <div className="border rounded-xl border-gray-200 overflow-hidden">
            <button
              onClick={() => setShowSignals((prev) => !prev)}
              className="flex w-full items-center justify-between bg-gray-50 px-3.5 py-2.5 text-xs font-bold text-gray-900 hover:bg-gray-100 transition-colors uppercase tracking-wider"
            >
              <span>WHERE WE PICKED UP SIGNALS</span>
              {showSignals ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showSignals && (
              <div className="divide-y divide-gray-100 bg-white p-3 text-xs space-y-2.5">
                {lead.signalCategories ? (
                  lead.signalCategories.map((sig, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 space-y-0.5">
                      <span className="font-bold text-amber-900 text-[11px] block uppercase tracking-wide">
                        ⚡ {sig.category}
                      </span>
                      <p className="text-gray-700 leading-relaxed font-normal pl-3 border-l-2 border-amber-300">
                        {sig.description}
                      </p>
                    </div>
                  ))
                ) : (
                  lead.buyingSignals.map((signal, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      • {signal}
                    </p>
                  ))
                )}
              </div>
            )}
          </div>

          {/* SOP Recommended Action */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3">
            <p className="text-[11px] font-bold text-amber-950 uppercase tracking-wide">Recommended SOP Action</p>
            <p className="mt-1 text-xs font-medium text-amber-950">{lead.nextAction}</p>
          </div>

          {/* Action Button */}
          {callPlaced ? (
            <div className="rounded-xl bg-emerald-100 border border-emerald-300 p-3 text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-700" />
              Call Connected with {lead.name} — SOP Pitch Coach Active
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              className="w-full font-bold shadow-md bg-[#1d9e75] hover:bg-[#168260]"
              onClick={() => {
                setCallPlaced(true);
                if (onInitiateCall) onInitiateCall(lead);
              }}
            >
              <PhoneCall size={16} /> Call {lead.name}
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
            {index + 1} of {leads.length}
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
