import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CheckCircle2, LayoutDashboard, ChevronDown, ChevronUp } from "lucide-react";

export default function ConversationSavedModal() {
  const { activeModal, closeModal, setPage } = useApp();
  const [customerType, setCustomerType] = useState<"First Time" | "Repeat" | "Not sure">("First Time");
  const [wantsQuote, setWantsQuote] = useState<boolean>(true);
  const [showIcpFit, setShowIcpFit] = useState<boolean>(false);

  if (activeModal !== "conversation-saved") return null;

  return (
    <Modal
      isOpen={activeModal === "conversation-saved"}
      onClose={closeModal}
      title="Conversation Saved to CRM"
      subtitle="Optional customer detail capture & ICP fit log"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-emerald-900 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-700" />
          <span>Call record & outcome saved to local frontend CRM state!</span>
        </div>

        {/* Customer Type Selector */}
        <div>
          <span className="font-bold text-gray-800 block mb-1.5">Customer Type:</span>
          <div className="flex gap-2">
            {(["First Time", "Repeat", "Not sure"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setCustomerType(type)}
                className={`flex-1 rounded-lg py-1.5 px-2 text-xs font-bold transition-all ${
                  customerType === type
                    ? "bg-[#123c30] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Wants Quote Choice */}
        <div>
          <span className="font-bold text-gray-800 block mb-1.5">Quote Status:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setWantsQuote(true)}
              className={`flex-1 rounded-lg py-1.5 px-2 text-xs font-bold transition-all ${
                wantsQuote ? "bg-[#1d9e75] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              Wants a Quote
            </button>
            <button
              onClick={() => setWantsQuote(false)}
              className={`flex-1 rounded-lg py-1.5 px-2 text-xs font-bold transition-all ${
                !wantsQuote ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              No Quote Needed
            </button>
          </div>
        </div>

        {/* ICP Fit Collapsible Section */}
        <div className="border rounded-xl border-gray-200 overflow-hidden">
          <button
            onClick={() => setShowIcpFit(!showIcpFit)}
            className="flex w-full items-center justify-between bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-800"
          >
            <span>ICP Fit — This Lead</span>
            {showIcpFit ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          {showIcpFit && (
            <div className="p-3 bg-white text-xs text-gray-600 space-y-1">
              <p>• High intent score (87%) · Matched Ortho GRID 100-night trial requirement.</p>
              <p>• Preferred store: The Sleep Company - Koramangala.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <button
            onClick={() => {
              closeModal();
              setPage("dashboard");
            }}
            className="text-xs font-bold text-[#1d9e75] hover:underline flex items-center gap-1"
          >
            <LayoutDashboard size={14} /> See your last conversation in Dashboard →
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={closeModal}
            className="font-bold bg-[#1d9e75]"
          >
            Save & Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
