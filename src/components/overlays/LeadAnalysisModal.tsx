import { useApp } from "../../context/AppContext";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { TrendingUp, PieChart, DollarSign, Target, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

export default function LeadAnalysisModal() {
  const { activeModal, closeModal } = useApp();

  if (activeModal !== "lead-analysis") return null;

  return (
    <Modal
      isOpen={activeModal === "lead-analysis"}
      onClose={closeModal}
      title="Lead Analysis Overview"
      subtitle="Period: This Week · Performance & pipeline metrics"
      headerBg="bg-[#123c30]"
      maxWidth="max-w-lg"
    >
      <div className="space-y-4 text-xs text-gray-800">
        {/* KPI Grid */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100">
            <span className="text-[10px] text-gray-500 font-bold block uppercase">Captured Leads</span>
            <span className="text-xl font-extrabold text-emerald-800">6</span>
          </div>

          <div className="rounded-xl bg-purple-50 p-3 border border-purple-100">
            <span className="text-[10px] text-gray-500 font-bold block uppercase">Conversion Rate</span>
            <span className="text-xl font-extrabold text-[#3b1254]">17%</span>
          </div>

          <div className="rounded-xl bg-amber-50 p-3 border border-amber-100">
            <span className="text-[10px] text-gray-500 font-bold block uppercase">Ageing Leads</span>
            <span className="text-xl font-extrabold text-amber-800">1</span>
          </div>
        </div>

        {/* Detailed Metrics List */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 space-y-2">
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="text-gray-600">Missed Captures:</span>
            <span className="font-bold text-red-600">2</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="text-gray-600">Store Floor Capture Rate:</span>
            <span className="font-bold text-gray-900">67%</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="text-gray-600">Closed Won Rate:</span>
            <span className="font-bold text-emerald-700">17% (3 / 18 leads closed)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="text-gray-600">SLA On-time Rate:</span>
            <span className="font-bold text-gray-900">50%</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-200">
            <span className="text-gray-600">Total Pipeline Value:</span>
            <span className="font-bold text-[#1d9e75]">{formatCurrency(150000)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Average Deal Size:</span>
            <span className="font-bold text-gray-900">{formatCurrency(50000)}</span>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" size="sm" onClick={closeModal}>
            Close Analysis
          </Button>
        </div>
      </div>
    </Modal>
  );
}
