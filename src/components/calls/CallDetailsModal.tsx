import type { CallRecord } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDuration, formatFriendlyDate } from "../../utils/dateUtils";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { Award, Clock, Phone, Sparkles, CheckCircle2, FileText, User } from "lucide-react";

interface CallDetailsModalProps {
  call: CallRecord | null;
  onClose: () => void;
}

export default function CallDetailsModal({ call, onClose }: CallDetailsModalProps) {
  if (!call) return null;

  return (
    <Modal
      isOpen={!!call}
      onClose={onClose}
      title={`Call Review — ${call.leadName}`}
      subtitle={`Call ID: ${call.id} · Recorded on ${formatFriendlyDate(call.timestamp)}`}
      headerBg="bg-[#123c30]"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs text-gray-800">
        {/* QA Score Header */}
        <div className="flex items-center justify-between rounded-xl bg-purple-50 p-3 border border-purple-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900">Pitch Coach QA Score</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-extrabold text-[#3b1254]">{call.qaScore ?? 88}%</span>
              <span className="text-[10px] text-purple-700 font-semibold">Passed SOP Audit</span>
            </div>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-200 text-[#3b1254] font-bold">
            <Award size={22} />
          </div>
        </div>

        {/* Call Summary Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg bg-gray-50 p-2.5 border border-gray-100">
            <span className="text-gray-500 block">Call Type:</span>
            <span className="font-bold text-gray-900 capitalize">{call.type} Call</span>
          </div>

          <div className="rounded-lg bg-gray-50 p-2.5 border border-gray-100">
            <span className="text-gray-500 block">Duration:</span>
            <span className="font-bold text-gray-900">{formatDuration(call.durationSeconds)}</span>
          </div>

          <div className="rounded-lg bg-gray-50 p-2.5 border border-gray-100">
            <span className="text-gray-500 block">Product:</span>
            <span className="font-bold text-gray-900 truncate block">{call.product}</span>
          </div>

          <div className="rounded-lg bg-gray-50 p-2.5 border border-gray-100">
            <span className="text-gray-500 block">Est. Deal Value:</span>
            <span className="font-bold text-[#1d9e75]">{formatCurrency(call.estimatedValue)}</span>
          </div>
        </div>

        {/* AI Pitch Coach Transmitted Notes */}
        {call.aiNotes && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Sparkles size={14} className="text-emerald-700" />
              <span>Avani AI Transcribed Key Insights:</span>
            </div>
            <p className="text-emerald-950 font-normal leading-relaxed">{call.aiNotes}</p>
          </div>
        )}

        {/* SOP Compliance Step */}
        {call.sopStep && (
          <div className="rounded-xl bg-gray-50 p-3 border border-gray-200 space-y-1">
            <span className="font-bold text-gray-800 block">SOP Guideline Followed:</span>
            <p className="text-gray-600">{call.sopStep}</p>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Review
          </Button>
        </div>
      </div>
    </Modal>
  );
}
