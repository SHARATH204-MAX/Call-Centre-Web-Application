import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Keyboard, Command, Sparkles } from "lucide-react";

export default function HotkeysModal() {
  const { activeModal, closeModal } = useApp();

  if (activeModal !== "hotkeys") return null;

  const hotkeysList = [
    { key: "1", description: "Switch to Dashboard overview" },
    { key: "2", description: "Switch to Plan Calling Workspace" },
    { key: "3", description: "Switch to Avani AI Sales Coach" },
    { key: "4", description: "Switch to Calendar schedule" },
    { key: "5", description: "Switch to Pulse communications" },
    { key: "M", description: "Toggle Mute on active call" },
    { key: "H", description: "Toggle Call Hold on active call" },
    { key: "E", description: "End active call & open wrap-up" },
    { key: "?", description: "Open this hotkeys cheatsheet" },
    { key: "Esc", description: "Close any open dialog or modal" },
  ];

  return (
    <Modal
      isOpen={activeModal === "hotkeys"}
      onClose={closeModal}
      title="⌨️ Enterprise Agent Hotkeys"
      subtitle="High-speed keyboard navigation shortcuts for tele-callers"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div className="rounded-xl bg-gray-50 p-3 border border-gray-200">
          <p className="text-gray-600 font-medium">
            Power tele-callers can execute core shift workflows without lifting hands from the keyboard:
          </p>
        </div>

        <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden bg-white">
          {hotkeysList.map((item) => (
            <div key={item.key} className="flex items-center justify-between px-3.5 py-2 hover:bg-gray-50/70">
              <span className="text-gray-700 font-medium">{item.description}</span>
              <kbd className="min-w-[28px] text-center px-2 py-1 bg-gray-100 border border-gray-300 rounded-md font-mono text-xs font-extrabold text-gray-800 shadow-2xs">
                {item.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="primary" size="sm" onClick={closeModal} className="bg-[#123c30] font-bold">
            Got it
          </Button>
        </div>
      </div>
    </Modal>
  );
}
