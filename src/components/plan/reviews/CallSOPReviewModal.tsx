import { useApp } from "../../../context/AppContext";
import type { CallRecord } from "../../../types";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { CheckCircle2, XCircle, Award, FileText } from "lucide-react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDuration } from "../../../utils/dateUtils";

interface CallSOPReviewModalProps {
  call: CallRecord | null;
  onClose: () => void;
}

export default function CallSOPReviewModal({ call, onClose }: CallSOPReviewModalProps) {
  if (!call) return null;

  const sopChecks = call.sopResults ?? [
    { checkpoint: "1. Opening & Intent Confirm", passed: true, evidence: "Arvind greeted customer by name within first 10 seconds." },
    { checkpoint: "2. Needs Discovery", passed: true, evidence: "Asked customer about mattress firmness preference & backache relief." },
    { checkpoint: "3. Product Pitch", passed: true, evidence: "Explained SmartGRID temperature regulation & 2,500+ air channels." },
    { checkpoint: "4. EMI / Financing Mention", passed: true, evidence: "Walked through 0% HDFC 12-month zero downpayment EMI terms." },
    { checkpoint: "5. Warranty Mention", passed: true, evidence: "Highlighted 100-night risk-free trial and 10-year warranty." },
    { checkpoint: "6. Closing / Callback Booking", passed: true, evidence: "Dispatched quotation via WhatsApp & confirmed evening callback slot." }
  ];

  return (
    <Modal
      isOpen={!!call}
      onClose={onClose}
      title={`Call SOP Review — ${call.leadName}`}
      subtitle={`Call Duration: ${formatDuration(call.durationSeconds)} · Recorded on ${call.timestamp.slice(0, 10)}`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        {/* QA Score Header */}
        <div className="flex items-center justify-between rounded-xl bg-purple-50 p-3.5 border border-purple-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900">Overall SOP Audit Score</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-[#3b1254]">{call.qaScore ?? 94}%</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Passed</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-200 text-[#3b1254] font-bold">
            <Award size={22} />
          </div>
        </div>

        {/* 6 SOP Checkpoints Checklist */}
        <div className="space-y-2">
          <span className="font-bold text-gray-900 text-xs uppercase tracking-wider block">6 SOP Checkpoints Audit:</span>
          <div className="space-y-1.5 divide-y divide-gray-100">
            {sopChecks.map((chk, idx) => (
              <div key={idx} className="pt-1.5 first:pt-0 flex items-start gap-2">
                {chk.passed ? (
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-gray-900 block">{chk.checkpoint}</span>
                  <p className="text-gray-600 text-[11px] leading-relaxed italic font-medium">{chk.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Review
          </Button>
        </div>
      </div>
    </Modal>
  );
}
