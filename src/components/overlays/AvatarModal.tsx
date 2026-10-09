import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CheckCircle2, UserCheck } from "lucide-react";

export default function AvatarModal() {
  const { activeModal, closeModal, employee, setEmployee } = useApp();

  const personas = [
    { persona: "Captain", emoji: "🦸‍♂️", desc: "Leader & conversion driver" },
    { persona: "Valkyrie", emoji: "🦸‍♀️", desc: "Concierge & premium care" },
    { persona: "Vortex", emoji: "🦹‍♀️", desc: "Fast-closer & SOP master" },
    { persona: "Blaze", emoji: "🦹‍♂️", desc: "High-volume outgoing specialist" },
    { persona: "Shadow", emoji: "🥷", desc: "Objection handler & analyst" }
  ];

  const [selected, setSelected] = useState(employee.avatarPersona);
  const [savedMsg, setSavedMsg] = useState(false);

  if (activeModal !== "avatar") return null;

  const handleSave = () => {
    const item = personas.find((p) => p.persona === selected) || personas[0];
    setEmployee((prev) => ({
      ...prev,
      avatarPersona: item.persona,
      avatarEmoji: item.emoji
    }));
    setSavedMsg(true);
    setTimeout(() => {
      setSavedMsg(false);
      closeModal();
    }, 1200);
  };

  return (
    <Modal
      isOpen={activeModal === "avatar"}
      onClose={closeModal}
      title="Select Selling-Persona Avatar"
      subtitle="Choose a selling persona badge displayed on your employee profile"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div className="space-y-2">
          {personas.map((p) => (
            <div
              key={p.persona}
              onClick={() => setSelected(p.persona)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                selected === p.persona
                  ? "border-[#1d9e75] bg-emerald-50 text-emerald-950 ring-2 ring-[#1d9e75]/30 font-bold"
                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <span className="text-xs font-extrabold block">{p.persona}</span>
                  <span className="text-[11px] font-normal text-gray-500">{p.desc}</span>
                </div>
              </div>
              {selected === p.persona && <CheckCircle2 size={18} className="text-[#1d9e75]" />}
            </div>
          ))}
        </div>

        {savedMsg ? (
          <div className="rounded-xl bg-emerald-100 p-2.5 text-center text-emerald-900 font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 size={16} /> Persona badge updated to {selected}!
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} className="bg-[#1d9e75]">
              Save Avatar
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
