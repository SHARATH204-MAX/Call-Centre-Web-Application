import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Calendar as CalendarIcon, Check } from "lucide-react";

export default function DateRangeModal() {
  const { activeModal, closeModal } = useApp();
  const [selectedPreset, setSelectedPreset] = useState<string>("This Week");
  const [fromDate, setFromDate] = useState("2026-10-05");
  const [toDate, setToDate] = useState("2026-10-11");
  const [appliedMsg, setAppliedMsg] = useState(false);

  if (activeModal !== "date-range") return null;

  const presets = ["Today", "This Week", "This Month", "Last 30 Days", "Custom"];

  const handleApply = () => {
    setAppliedMsg(true);
    setTimeout(() => {
      setAppliedMsg(false);
      closeModal();
    }, 1200);
  };

  return (
    <Modal
      isOpen={activeModal === "date-range"}
      onClose={closeModal}
      title="Select Date Range"
      subtitle="Filter dashboard KPIs, earnings & call statistics"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        {/* Presets List */}
        <div className="space-y-1">
          <span className="font-bold text-gray-700 block mb-1">Quick Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setSelectedPreset(preset)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedPreset === preset
                    ? "bg-[#1d9e75] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div>
            <label className="font-bold text-gray-700 block mb-1">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setSelectedPreset("Custom");
              }}
              className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setSelectedPreset("Custom");
              }}
              className="w-full rounded-lg border border-gray-300 p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
            />
          </div>
        </div>

        {appliedMsg ? (
          <div className="rounded-xl bg-emerald-100 p-2.5 text-center text-emerald-900 font-bold flex items-center justify-center gap-1.5">
            <Check size={16} /> Date range applied: {selectedPreset} ({fromDate} to {toDate})
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleApply}>
              Apply Range
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
