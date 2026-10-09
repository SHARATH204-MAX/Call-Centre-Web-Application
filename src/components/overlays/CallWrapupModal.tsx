import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CheckCircle2, PhoneOff, FileText } from "lucide-react";
import { formatDuration } from "../../utils/dateUtils";

export default function CallWrapupModal() {
  const { activeModal, closeModal, activeCallLead, callTimer, setCalls, openModal } = useApp();
  const [summary, setSummary] = useState(
    "Customer inquired about 100-night risk-free trial and HDFC 0% 12-month EMI scheme. Pitch coach score: 94%."
  );
  const [outcome, setOutcome] = useState("Quotation Provided");

  if (activeModal !== "call-wrapup") return null;

  const handleSaveToCRM = () => {
    if (activeCallLead) {
      const newRecord = {
        id: `C_${Date.now()}`,
        leadId: activeCallLead.id,
        leadName: activeCallLead.name,
        phone: activeCallLead.phone,
        type: "outgoing" as const,
        timestamp: new Date().toISOString(),
        durationSeconds: callTimer,
        status: "Completed" as const,
        estimatedValue: activeCallLead.estimatedValue,
        product: activeCallLead.product,
        sopStep: "Call Wrap-up Saved to CRM",
        aiNotes: summary,
        qaScore: 94
      };
      setCalls((prev) => [newRecord, ...prev]);
    }
    closeModal();
    openModal("conversation-saved");
  };

  return (
    <Modal
      isOpen={activeModal === "call-wrapup"}
      onClose={closeModal}
      title="Call Wrapped Up"
      subtitle={`Duration: ${formatDuration(callTimer)} · Customer: ${activeCallLead?.name ?? "Customer"}`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div>
          <label className="font-bold text-gray-800 block mb-1">AI-Drafted Call Summary (Editable):</label>
          <textarea
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2.5 text-xs text-gray-900 focus:border-[#1d9e75] focus:outline-none"
          />
        </div>

        <div>
          <label className="font-bold text-gray-800 block mb-1">Call Outcome:</label>
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-xs font-semibold focus:border-[#1d9e75] focus:outline-none"
          >
            <option value="Quotation Provided">Quotation Provided</option>
            <option value="Store Demo Scheduled">Store Demo Scheduled</option>
            <option value="Callback Requested">Callback Requested</option>
            <option value="No Interest">No Interest</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <Button variant="ghost" size="sm" onClick={closeModal}>
            Skip
          </Button>

          <Button variant="primary" size="sm" onClick={handleSaveToCRM} className="font-bold bg-[#1d9e75]">
            <CheckCircle2 size={14} /> Save to CRM
          </Button>
        </div>
      </div>
    </Modal>
  );
}
