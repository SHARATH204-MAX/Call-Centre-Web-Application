import { useState } from "react";
import { useApp } from "../../context/AppContext";
import type { CallRecord, Lead } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatFriendlyDate } from "../../utils/dateUtils";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import Modal from "../ui/Modal";
import { PhoneIncoming, PhoneCall, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from "lucide-react";

export default function IncomingCalls() {
  const { calls, setCalls, leads, startCallForLead } = useApp();
  const [activeCallbackModal, setActiveCallbackModal] = useState<CallRecord | null>(null);

  const missedCallsList = calls.filter(
    (c) => c.type === "missed" || c.status === "Missed" || c.status === "Pending Callback" || c.status === "Callback Placed"
  );

  const handleInitiateCallback = (call: CallRecord) => {
    // Open asking dialog box first
    setActiveCallbackModal(call);
  };

  const handleConfirmAndCall = () => {
    if (!activeCallbackModal) return;

    const targetCall = activeCallbackModal;

    // Update call status to Callback Placed
    setCalls((prev) =>
      prev.map((c) =>
        c.id === targetCall.id
          ? { ...c, status: "Callback Placed", sopStep: "Callback Completed · SOP Active" }
          : c
      )
    );

    // Find matching lead or fallback
    const matchedLead: Lead = leads.find((l) => l.name.toLowerCase().includes(targetCall.leadName.toLowerCase())) ?? {
      id: targetCall.leadId ?? `L_${Date.now()}`,
      name: targetCall.leadName,
      phone: targetCall.phone,
      product: targetCall.product,
      score: 88,
      intentScore: 85,
      estimatedValue: targetCall.estimatedValue,
      status: "OPEN",
      buyingSignals: ["Inquired about missed call", "Requested immediate callback"],
      nextAction: "Immediate callback walkthrough"
    };

    // Close asking dialog box
    setActiveCallbackModal(null);

    // Start live call in Plan workspace
    startCallForLead(matchedLead);
  };

  const totalValueAtStake = missedCallsList
    .filter((c) => c.status !== "Callback Placed")
    .reduce((acc, curr) => acc + curr.estimatedValue, 0);

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Banner Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50/60 p-4 text-red-950 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700 font-bold border border-red-200">
            <PhoneIncoming size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Incoming Missed Calls — High Priority</h2>
            <p className="text-xs text-red-800/80 mt-0.5">
              Customers who left store or called during busy hours. SOP requires immediate callback.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white px-3.5 py-1.5 border border-red-200 shadow-2xs text-right">
          <span className="text-[10px] uppercase font-bold text-gray-500 block">Total Value at Stake</span>
          <span className="text-sm font-extrabold text-red-700">{formatCurrency(totalValueAtStake)}</span>
        </div>
      </div>

      {/* Calls List */}
      {missedCallsList.length === 0 ? (
        <EmptyState
          title="No pending missed calls"
          description="All incoming missed calls have been addressed by the call centre team."
        />
      ) : (
        <div className="space-y-2.5">
          {missedCallsList.map((call) => {
            const isPlaced = call.status === "Callback Placed";

            return (
              <div
                key={call.id}
                className={`rounded-xl border p-4 transition-all shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isPlaced
                    ? "bg-emerald-50/40 border-emerald-200 opacity-90"
                    : "bg-white border-[#e5e0d5] hover:border-red-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${
                      isPlaced
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-red-100 text-red-700 border border-red-200 animate-pulse"
                    }`}
                  >
                    <PhoneIncoming size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{call.leadName}</span>
                      <span className="text-xs text-gray-500 font-medium">{call.phone}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isPlaced
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {call.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 truncate">{call.product}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{formatFriendlyDate(call.timestamp)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-extrabold text-[#1d9e75] block">
                      {formatCurrency(call.estimatedValue)}
                    </span>
                    <span className="text-[10px] text-gray-400 block">Value at stake</span>
                  </div>

                  <div>
                    {isPlaced ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg">
                        <CheckCircle2 size={14} /> Callback Placed
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        className="font-bold shadow-xs bg-red-600 hover:bg-red-700"
                        onClick={() => handleInitiateCallback(call)}
                      >
                        <PhoneCall size={14} /> Call Back Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Asking Dialog Box Modal */}
      {activeCallbackModal && (
        <Modal
          isOpen={!!activeCallbackModal}
          onClose={() => setActiveCallbackModal(null)}
          title={`Call back ${activeCallbackModal.leadName}?`}
          subtitle={`Confirm initiating call · Product: ${activeCallbackModal.product}`}
          headerBg="bg-[#123c30]"
        >
          <div className="space-y-4 text-xs text-gray-800">
            <div className="rounded-xl bg-emerald-50 p-3.5 border border-emerald-200 space-y-1">
              <p className="font-bold text-emerald-950">Walk-out Recovery Tele-caller SOP Script:</p>
              <p className="italic text-emerald-900 leading-relaxed">
                "Hello {activeCallbackModal.leadName}! This is Arvind calling from The Sleep Company Koramangala store regarding your inquiry for the {activeCallbackModal.product}..."
              </p>
            </div>

            <div className="space-y-1 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone Number:</span>
                <span className="font-bold">{activeCallbackModal.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Value at Stake:</span>
                <span className="font-bold text-[#1d9e75]">{formatCurrency(activeCallbackModal.estimatedValue)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setActiveCallbackModal(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmAndCall} className="bg-[#1d9e75] hover:bg-[#168260] font-bold">
                <PhoneCall size={14} /> Start Call Now
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
