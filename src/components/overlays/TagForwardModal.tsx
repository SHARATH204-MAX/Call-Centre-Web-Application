import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { UserPlus, Share2, CheckCircle2 } from "lucide-react";

export default function TagForwardModal() {
  const { activeModal, closeModal, selectedCustomer } = useApp();
  const [selectedStaff, setSelectedStaff] = useState<string[]>(["Sunita Rao"]);
  const [actionDone, setActionDone] = useState<string | null>(null);

  if (activeModal !== "tag-forward") return null;

  const staffMembers = [
    { name: "Sunita Rao", role: "Store Manager" },
    { name: "Priya Krishnan", role: "Sales Associate" },
    { name: "Raju Kumar", role: "Sales Associate" }
  ];

  const toggleStaff = (name: string) => {
    setSelectedStaff((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const handleTag = () => {
    setActionDone(`Tagged ${selectedStaff.join(", ")} in chat`);
    setTimeout(() => {
      setActionDone(null);
      closeModal();
    }, 1400);
  };

  const handleForward = () => {
    setActionDone(`Forwarded conversation to ${selectedStaff.join(", ")}`);
    setTimeout(() => {
      setActionDone(null);
      closeModal();
    }, 1400);
  };

  return (
    <Modal
      isOpen={activeModal === "tag-forward"}
      onClose={closeModal}
      title="Tag or Forward Conversation"
      subtitle={`Loop in a teammate or manager for ${selectedCustomer?.customerName ?? "Customer"}`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div>
          <span className="font-bold text-gray-800 block mb-2">Select Staff Members:</span>
          <div className="space-y-1.5">
            {staffMembers.map((m) => (
              <label
                key={m.name}
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  selectedStaff.includes(m.name)
                    ? "border-[#1d9e75] bg-emerald-50 text-emerald-950 font-bold"
                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStaff.includes(m.name)}
                    onChange={() => toggleStaff(m.name)}
                    className="text-[#1d9e75] rounded focus:ring-[#1d9e75]"
                  />
                  <span>{m.name}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-normal">{m.role}</span>
              </label>
            ))}
          </div>
        </div>

        {actionDone ? (
          <div className="rounded-xl bg-emerald-100 p-2.5 text-center text-emerald-900 font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 size={16} /> {actionDone}!
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={handleTag}>
              Tag in Chat
            </Button>
            <Button variant="primary" size="sm" onClick={handleForward} className="bg-[#1d9e75]">
              Forward Chat
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
