import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Bell, PhoneCall, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotificationModal() {
  const { activeModal, closeModal, openModal } = useApp();
  const [filter, setFilter] = useState<"All" | "Needs action" | "Alerts">("All");

  if (activeModal !== "notifications") return null;

  const notificationsList = [
    {
      id: "N1",
      title: "Missed Call from MK Mukunda",
      desc: "₹5,400 Ortho GRID lead — re-engage within 15 min SOP target",
      time: "10 mins ago",
      type: "Needs action",
      actionModal: "leads"
    },
    {
      id: "N2",
      title: "Pitch Coach QA Score Updated",
      desc: "Greeting-in-first-10s score reached 84% (+2.6%)",
      time: "1 hour ago",
      type: "Alerts"
    },
    {
      id: "N3",
      title: "Sunita Rao tagged you in Kudos",
      desc: "Great work with Mukunda price objection handling!",
      time: "2 hours ago",
      type: "All"
    }
  ];

  const filtered = notificationsList.filter((n) => {
    if (filter === "All") return true;
    return n.type === filter || (filter === "Needs action" && n.type === "Needs action");
  });

  return (
    <Modal
      isOpen={activeModal === "notifications"}
      onClose={closeModal}
      title="Notifications & Alerts"
      subtitle="Shift announcements, missed calls & QA alerts"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        {/* Filter Switcher */}
        <div className="flex gap-1.5 border-b pb-2">
          {(["All", "Needs action", "Alerts"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                filter === f
                  ? "bg-[#123c30] text-white shadow-2xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-emerald-50/50 cursor-pointer transition-colors space-y-1"
              onClick={() => {
                if (n.actionModal) {
                  closeModal();
                  openModal(n.actionModal as any);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">{n.title}</span>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" size="sm" onClick={closeModal}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
