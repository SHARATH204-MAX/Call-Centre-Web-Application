import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function NoInterestModal() {
  const { activeModal, closeModal, activeCallLead, setLeads } = useApp();
  const [reason, setReason] = useState("Price too high");
  const [otherText, setOtherText] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (activeModal !== "no-interest") return null;

  const handleConfirm = () => {
    if (activeCallLead) {
      const finalReason = reason === "Other" ? otherText || "Other" : reason;
      setLeads((prev) =>
        prev.map((l) =>
          l.id === activeCallLead.id
            ? { ...l, status: "No Interest", noInterestReason: finalReason }
            : l
        )
      );
    }
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      closeModal();
    }, 1200);
  };

  const reasons = ["Price too high", "Went to competitor", "Not ready to buy", "Other"];

  return (
    <Modal
      isOpen={activeModal === "no-interest"}
      onClose={closeModal}
      title="No Interest Lead"
      subtitle={`Customer: ${activeCallLead?.name ?? "Lead"}`}
      headerBg="bg-red-700"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div>
          <span className="font-bold text-gray-800 block mb-2">Why did the customer lose interest?</span>
          <div className="space-y-1.5">
            {reasons.map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs font-semibold"
              >
                <input
                  type="radio"
                  name="noInterestReason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="text-red-600 focus:ring-red-500"
                />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </div>

        {reason === "Other" && (
          <div>
            <label className="font-bold text-gray-700 block mb-1">Explanation:</label>
            <input
              type="text"
              placeholder="Specify reason..."
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-red-500 focus:outline-none"
            />
          </div>
        )}

        {confirmed ? (
          <div className="rounded-xl bg-red-100 p-2.5 text-center text-red-900 font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 size={16} /> Lead marked as No Interest ({reason})!
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirm} className="font-bold">
              Confirm No Interest
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
