import { useState } from "react";
import type { Lead } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { ChevronRight, PhoneCall, Filter } from "lucide-react";

interface TasksListProps {
  leads: Lead[];
  onSelectLead: (leadIndex: number) => void;
}

export default function TasksList({ leads, onSelectLead }: TasksListProps) {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus === "all") return true;
    return lead.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  return (
    <div className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2.5">
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">Tasks to Complete (Who is waiting)</h2>
          <p className="text-xs text-gray-500">Sorted by lead score & SOP urgency</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Filter size={13} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-semibold focus:outline-none focus:border-[#1d9e75]"
          >
            <option value="all">All Tasks ({leads.length})</option>
            <option value="follow-up">Follow-up due</option>
            <option value="interested">Interested</option>
            <option value="new lead">New lead</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-gray-100 overflow-y-auto max-h-72 flex-1 pr-1">
        {filteredLeads.map((lead, index) => {
          const originalIndex = leads.findIndex((l) => l.id === lead.id);
          return (
            <button
              key={lead.id}
              onClick={() => onSelectLead(originalIndex)}
              className="flex w-full items-center justify-between py-3 text-left hover:bg-gray-50/80 px-2 rounded-lg transition-colors group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-xs text-[#3b1254] mt-0.5">
                  {lead.score}%
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900 truncate">{lead.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full">
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{lead.nextAction}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-[#1d9e75] block">{formatCurrency(lead.estimatedValue)}</span>
                  <span className="text-[10px] text-gray-400 block">{lead.product.split(' ')[0]}</span>
                </div>
                <span className="flex items-center text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                  View lead <ChevronRight size={15} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
