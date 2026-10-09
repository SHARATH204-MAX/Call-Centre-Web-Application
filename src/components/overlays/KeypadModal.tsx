import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Phone, Delete, X } from "lucide-react";

export default function KeypadModal() {
  const { activeModal, closeModal } = useApp();
  const [digits, setDigits] = useState("");

  if (activeModal !== "keypad") return null;

  const handleNumClick = (n: string) => {
    setDigits((prev) => prev + n);
  };

  const handleDelete = () => {
    setDigits((prev) => prev.slice(0, -1));
  };

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <Modal
      isOpen={activeModal === "keypad"}
      onClose={closeModal}
      title="In-Call Keypad / DTMF"
      subtitle="Enter numeric codes or dial DTMF tones"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-xs"
    >
      <div className="space-y-4 text-xs text-gray-800 text-center">
        {/* Digits Display */}
        <div className="flex items-center justify-between rounded-xl bg-gray-100 p-3 border border-gray-200">
          <span className="text-xl font-mono font-bold tracking-widest text-gray-900 min-h-[28px] flex items-center">
            {digits || "Enter number..."}
          </span>
          {digits && (
            <button onClick={handleDelete} className="p-1 text-gray-500 hover:text-red-600">
              <Delete size={18} />
            </button>
          )}
        </div>

        {/* 3x4 Grid Keypad */}
        <div className="grid grid-cols-3 gap-2">
          {keys.map((k) => (
            <button
              key={k}
              onClick={() => handleNumClick(k)}
              className="flex h-12 items-center justify-center rounded-xl bg-gray-50 text-base font-bold text-gray-800 hover:bg-emerald-100 hover:text-[#123c30] transition-colors border border-gray-200 shadow-2xs"
            >
              {k}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" size="sm" onClick={closeModal}>
            Close Keypad
          </Button>
        </div>
      </div>
    </Modal>
  );
}
