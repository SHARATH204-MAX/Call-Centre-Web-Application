import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Award, TrendingUp, Sparkles, Share2, Target, CheckCircle2 } from "lucide-react";

export default function OGScoreModal() {
  const { activeModal, closeModal, openModal, setPage, setAvaniMode } = useApp();

  if (activeModal !== "og-score") return null;

  return (
    <Modal
      isOpen={activeModal === "og-score"}
      onClose={closeModal}
      title="OG Score™ Performance Breakdown"
      subtitle="Overall AI pitch quality & SOP adherence evaluation"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 text-xs text-gray-800">
        {/* Main Score Header */}
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#123c30] to-[#1d9e75] p-4 text-white shadow-md">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Overall Score</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold">{76} / 100</span>
              <span className="rounded-full bg-emerald-400/30 px-2 py-0.5 text-xs font-extrabold text-emerald-200">
                ▲ +13 pts
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/90 mt-1">
              Top 28% across retail tele-callers · 72nd Percentile
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xs text-emerald-300 font-bold border border-white/20">
            <Award size={28} />
          </div>
        </div>

        {/* Earning Potential Note */}
        <div className="rounded-xl bg-purple-50 p-3.5 border border-purple-200 text-purple-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-xs text-[#3b1254]">
            <Sparkles size={15} /> Commission & Earning Potential Connection:
          </div>
          <p className="text-xs leading-relaxed font-medium">
            Gaining just <strong>5 additional points</strong> (target: 81) unlocks an extra <strong>4% earning potential</strong> on your monthly walk-out commission slab!
          </p>
        </div>

        {/* Top Improvement Opportunities */}
        <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3.5 space-y-2">
          <span className="font-bold text-gray-900 text-xs uppercase tracking-wider block">
            Top Improvement Opportunities:
          </span>
          <ul className="space-y-1.5 text-gray-700 pl-4 list-disc font-medium">
            <li>Name customer in first 10 seconds on incoming callbacks (+23.6pp conversion).</li>
            <li>Proactively mention the 100-night trial on Ortho GRID price objections.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              closeModal();
              openModal("linkedin");
            }}
            className="w-full sm:w-auto font-bold"
          >
            <Share2 size={14} /> Announce on LinkedIn
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              closeModal();
              setPage("avani");
              setAvaniMode("practise");
            }}
            className="w-full sm:w-auto font-bold bg-[#1d9e75]"
          >
            <Target size={14} /> Practise these 2 skills
          </Button>
        </div>
      </div>
    </Modal>
  );
}
