import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CheckCircle2, RotateCcw } from "lucide-react";

export default function CameBackModal() {
  const { activeModal, closeModal, activeCallLead, setLeads } = useApp();
  const [timing, setTiming] = useState<string>("Today (already in store)");
  const [customDate, setCustomDate] = useState("2026-10-10");
  const [confirmed, setConfirmed] = useState(false);

  if (activeModal !== "came-back") return null;

  const handleConfirm = () => {
    if (activeCallLead) {
      const finalTiming = timing === "Specific date" ? customDate : timing;
      setLeads((prev) =>
        prev.map((l) =>
          l.id === activeCallLead.id
            ? { ...l, status: "Came Back", returnTiming: finalTiming }
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

  const options = ["Today (already in store)", "This week", "Specific date"];

  return (
    <Modal
      isOpen={activeModal === "came-back"}
      onClose={closeModal}
      title="Came Back Lead"
      subtitle={`Customer: ${activeCallLead?.name ?? "Lead"}`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div>
          <span className="font-bold text-gray-800 block mb-2">When did/will the customer come back?</span>
          <div className="space-y-1.5">
            {options.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 p-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer text-xs font-semibold"
              >
                <input
                  type="radio"
                  name="cameBackTiming"
                  checked={timing === opt}
                  onChange={() => setTiming(opt)}
                  className="text-[#1d9e75] focus:ring-[#1d9e75]"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {timing === "Specific date" && (
          <div>
            <label className="font-bold text-gray-700 block mb-1">Select Return Date:</label>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
            />
          </div>
        )}

        {confirmed ? (
          <div className="rounded-xl bg-emerald-100 p-2.5 text-center text-emerald-900 font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 size={16} /> Customer return recorded ({timing})!
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirm} className="bg-[#1d9e75]">
              Confirm Return
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
