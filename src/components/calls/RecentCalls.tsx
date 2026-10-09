import { useState, useMemo } from "react";
import { calls as initialCalls } from "../../data/calls";
import type { CallRecord } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDuration, formatFriendlyDate } from "../../utils/dateUtils";
import CallDetailsModal from "./CallDetailsModal";
import EmptyState from "../ui/EmptyState";
import { PhoneOutgoing, PhoneIncoming, PhoneMissed, Clock, ChevronRight, Filter } from "lucide-react";

export default function RecentCalls() {
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  // Sort calls by timestamp, newest first
  const sortedCalls = useMemo(() => {
    return [...initialCalls]
      .filter((c) => {
        if (filterType === "all") return true;
        return c.type === filterType;
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [filterType]);

  const getCallIcon = (type: CallRecord["type"]) => {
    switch (type) {
      case "outgoing":
        return <PhoneOutgoing size={16} className="text-emerald-600" />;
      case "incoming":
        return <PhoneIncoming size={16} className="text-blue-600" />;
      case "missed":
        return <PhoneMissed size={16} className="text-red-600" />;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#e5e0d5] bg-white p-3.5 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">Recent Calls History & Review</h2>
          <p className="text-xs text-gray-500">
            Click any row to inspect AI pitch transcripts, QA compliance scores & next actions
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter size={13} className="text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#1d9e75]"
          >
            <option value="all">All Call Types ({initialCalls.length})</option>
            <option value="outgoing">Outgoing Calls</option>
            <option value="incoming">Incoming Calls</option>
            <option value="missed">Missed Calls</option>
          </select>
        </div>
      </div>

      {/* Calls List */}
      {sortedCalls.length === 0 ? (
        <EmptyState
          title="No recent calls found"
          description="Calls made or received during this shift will appear here."
        />
      ) : (
        <div className="space-y-2">
          {sortedCalls.map((call) => (
            <div
              key={call.id}
              onClick={() => setSelectedCall(call)}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-[#e5e0d5] bg-white hover:border-[#1d9e75]/50 hover:shadow-xs transition-all cursor-pointer group gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 group-hover:bg-emerald-50 transition-colors">
                  {getCallIcon(call.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{call.leadName}</span>
                    <span className="text-xs text-gray-500 font-medium">{call.phone}</span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700 capitalize">
                      {call.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 truncate mt-0.5">{call.product}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-gray-800 block">
                    Duration: {formatDuration(call.durationSeconds)}
                  </span>
                  <span className="text-[10px] text-gray-400 block">{formatFriendlyDate(call.timestamp)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-900 bg-purple-50 px-2 py-1 rounded-md border border-purple-100">
                    QA {call.qaScore ?? 88}%
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center">
                    Review <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call Details Modal */}
      {selectedCall && (
        <CallDetailsModal call={selectedCall} onClose={() => setSelectedCall(null)} />
      )}
    </div>
  );
}
