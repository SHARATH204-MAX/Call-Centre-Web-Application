import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Share2, CheckCircle2, Globe } from "lucide-react";

export default function LinkedInModal() {
  const { activeModal, closeModal, employee } = useApp();
  const [posted, setPosted] = useState(false);

  if (activeModal !== "linkedin") return null;

  const handlePost = () => {
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      closeModal();
    }, 2000);
  };

  return (
    <Modal
      isOpen={activeModal === "linkedin"}
      onClose={closeModal}
      title="Announce Milestone on LinkedIn"
      subtitle="Share your OG Score™ achievement with your network"
      headerBg="bg-[#0077b5]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 space-y-2">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
            <Globe size={16} /> Draft Milestone Post:
          </div>
          <p className="text-gray-700 leading-relaxed font-medium bg-white p-2.5 rounded-lg border border-gray-200">
            "Excited to reach an OG Score of {employee.ogScore} (+{employee.ogChange} pts) in retail walk-out lead recovery at {employee.store}! Special thanks to On-Ground.ai pitch coaching & AI supervisor tools."
          </p>
        </div>

        {posted ? (
          <div className="rounded-xl bg-emerald-100 p-3 text-center text-emerald-900 font-bold flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-700" /> Milestone post simulated on LinkedIn!
          </div>
        ) : (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handlePost} className="bg-[#0077b5] hover:bg-[#005885]">
              <Share2 size={14} /> Post to LinkedIn
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
