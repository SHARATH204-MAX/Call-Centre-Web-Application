import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { PhoneCall, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function BeforeYouCallSOPModal() {
  const { activeModal, closeModal, activeCallLead, startCallForLead, leads } = useApp();

  if (activeModal !== "before-you-call") return null;

  const targetLead = activeCallLead ?? leads[0];

  const handleStart = () => {
    closeModal();
    startCallForLead(targetLead);
  };

  return (
    <Modal
      isOpen={activeModal === "before-you-call"}
      onClose={closeModal}
      title="Before You Call — Lead SOP Review"
      subtitle={`Customer: ${targetLead.name} · ${targetLead.product}`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div className="rounded-xl bg-purple-50 p-3.5 border border-purple-200 text-purple-950 space-y-1">
          <div className="flex items-center justify-between font-bold text-xs text-[#3b1254]">
            <span>Lead Attractiveness: {targetLead.score}%</span>
            <span className="text-[#1d9e75] font-extrabold">{formatCurrency(targetLead.estimatedValue)}</span>
          </div>
          <p className="text-xs text-purple-900 leading-relaxed">
            Review SOP checkpoints before placing call to maximize walk-out recovery probability.
          </p>
        </div>

        {/* SOP Checkpoints */}
        <div className="space-y-2 border rounded-xl border-gray-200 bg-gray-50 p-3">
          <span className="font-bold text-gray-900 block uppercase text-[11px]">SOP Objectives Checklist:</span>
          <ul className="space-y-1.5 text-gray-700 pl-4 list-disc font-medium">
            <li>Name customer within first 10 seconds (+23.6pp conversion).</li>
            <li>Address primary concern ({targetLead.product} trial / EMI terms).</li>
            <li>State 100-night trial period & free home collection guarantee.</li>
          </ul>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={handleStart}>
            Skip · Place the Call
          </Button>

          <Button variant="primary" size="sm" onClick={handleStart} className="font-bold bg-[#1d9e75]">
            <PhoneCall size={14} /> Start Call Now
          </Button>
        </div>
      </div>
    </Modal>
  );
}
