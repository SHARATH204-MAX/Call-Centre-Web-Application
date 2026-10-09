import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Trophy, TrendingUp, Users } from "lucide-react";

export default function RankDetailModal() {
  const { activeModal, closeModal, employee } = useApp();

  if (activeModal !== "rank-detail") return null;

  return (
    <Modal
      isOpen={activeModal === "rank-detail"}
      onClose={closeModal}
      title="Store Rank Details"
      subtitle={`${employee.locationGroup} · Tele-caller Leaderboard`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4 border border-amber-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">Current Store Rank</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-amber-950">#{employee.rank}</span>
              <span className="text-xs font-bold text-amber-800">out of {employee.staffCount} staff</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-200 text-amber-900 font-bold">
            <Trophy size={22} />
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-3 border border-gray-200 space-y-1">
          <span className="font-bold text-gray-900 block">How Rank is Calculated:</span>
          <p className="text-gray-600 leading-relaxed">
            Rank is derived from a combination of walk-out lead conversion rate, OG Score adherence, and daily call volume across the {employee.locationGroup}.
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-emerald-950 font-medium">
          💡 <strong>Tip to reach #2:</strong> Closing just 1 additional lead today would propel your rank to #2!
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
