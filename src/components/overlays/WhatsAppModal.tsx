import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Send, CheckCircle2, FileText, FileSpreadsheet, ShieldCheck, DollarSign } from "lucide-react";

export default function WhatsAppModal() {
  const { activeModal, closeModal, activeCallLead } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<string>("Product Quote");
  const [sentMsg, setSentMsg] = useState(false);

  if (activeModal !== "whatsapp-send") return null;

  const handleSend = () => {
    setSentMsg(true);
    setTimeout(() => {
      setSentMsg(false);
      closeModal();
    }, 1500);
  };

  const options = [
    { id: "Product Quote", label: "Product Quote", icon: <DollarSign size={16} /> },
    { id: "Brochure PDF", label: "Brochure PDF", icon: <FileText size={16} /> },
    { id: "EMI Options", label: "EMI Options", icon: <FileSpreadsheet size={16} /> },
    { id: "Warranty Info", label: "Warranty Info", icon: <ShieldCheck size={16} /> }
  ];

  return (
    <Modal
      isOpen={activeModal === "whatsapp-send"}
      onClose={closeModal}
      title="Send via WhatsApp"
      subtitle={`Customer: ${activeCallLead?.name ?? "MK Mukunda"} (${activeCallLead?.phone ?? "+91 98765 43210"})`}
      headerBg="bg-[#25D366]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div>
          <span className="font-bold text-gray-800 block mb-2">Select Content to Send:</span>
          <div className="grid grid-cols-2 gap-2">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDoc(opt.id)}
                className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all ${
                  selectedDoc === opt.id
                    ? "border-[#25D366] bg-emerald-50 text-emerald-950 ring-2 ring-[#25D366]/30"
                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className="text-[#25D366]">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {sentMsg ? (
          <div className="rounded-xl bg-emerald-100 p-3 text-center font-bold text-emerald-900 flex items-center justify-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-700" />
            {selectedDoc} sent to {activeCallLead?.name ?? "Mukunda"}'s WhatsApp!
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSend} className="bg-[#25D366] hover:bg-[#1da851] text-white">
              <Send size={14} /> Send on WhatsApp
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
