import { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import type { Lead } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../leads/Pagination";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";
import { ChevronDown, ChevronUp, PhoneCall, Search, Filter } from "lucide-react";

export default function CallsToMake() {
  const { leads, startCallForLead, openModal, setSelectedLeadIndex } = useApp();
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>("L001");
  const [searchQuery, setSearchQuery] = useState("");
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);

  // Sort by lead score, highest first (without mutating original array)
  const sortedLeads = useMemo(() => {
    return [...leads]
      .filter((lead) => {
        const matchesSearch =
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone.includes(searchQuery) ||
          lead.product.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesScore = lead.score >= minScoreFilter;
        return matchesSearch && matchesScore;
      })
      .sort((a, b) => b.score - a.score);
  }, [leads, searchQuery, minScoreFilter]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    totalItems,
    startIndex,
    endIndex,
  } = usePagination({ data: sortedLeads, initialPageSize: 5 });

  const toggleExpand = (id: string) => {
    setExpandedLeadId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#e5e0d5] bg-white p-3.5 shadow-2xs">
        <div>
          <h2 className="text-sm font-bold text-gray-900 tracking-tight">Calls to Make (Planned Outgoing)</h2>
          <p className="text-xs text-gray-500">
            Ranked by lead attractiveness score — tap a lead for the full picture
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Filter leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-36 sm:w-44 rounded-lg border border-gray-200 bg-gray-50 pl-7 pr-2 text-xs focus:bg-white focus:border-[#1d9e75] focus:outline-none"
            />
          </div>

          <select
            value={minScoreFilter}
            onChange={(e) => setMinScoreFilter(Number(e.target.value))}
            className="h-8 rounded-lg border border-gray-200 bg-gray-50 px-2 text-xs font-medium focus:border-[#1d9e75] focus:outline-none"
          >
            <option value={0}>All Scores</option>
            <option value={80}>Score ≥ 80</option>
            <option value={90}>Score ≥ 90</option>
          </select>
        </div>
      </div>

      {/* Leads List Table / Expandable Rows */}
      {paginatedData.length === 0 ? (
        <EmptyState
          title="No calls match your criteria"
          description="Try clearing your search query or adjusting your score filters."
        />
      ) : (
        <div className="space-y-2.5">
          {paginatedData.map((lead) => {
            const isExpanded = expandedLeadId === lead.id;
            const fullIndex = leads.findIndex((l) => l.id === lead.id);

            return (
              <div
                key={lead.id}
                className="rounded-xl border border-[#e5e0d5] bg-white overflow-hidden shadow-2xs hover:border-[#1d9e75]/40 transition-all"
              >
                {/* Compact Main Row */}
                <div
                  onClick={() => toggleExpand(lead.id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-gray-50/70 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-purple-100 text-[#3b1254] font-extrabold text-sm border border-purple-200">
                      <span>{lead.score}%</span>
                      <span className="text-[8px] uppercase tracking-wider -mt-1 opacity-70">ICP</span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{lead.name}</span>
                        <span className="text-[11px] font-medium text-gray-500">{lead.phone}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          {lead.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mt-0.5">{lead.product}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-extrabold text-[#1d9e75] block">
                        {formatCurrency(lead.estimatedValue)}
                      </span>
                      <span className="text-[10px] text-gray-400 block">Intent: {lead.intentScore}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          startCallForLead(lead);
                        }}
                        className="bg-[#1d9e75] hover:bg-[#168260] font-bold"
                      >
                        <PhoneCall size={13} /> Place Call
                      </Button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(lead.id);
                        }}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Expand lead details"
                      >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable Details Drawer */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/60 p-4 space-y-3 animate-in fade-in duration-150 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-bold text-gray-800 block mb-1">Key Buying Signals:</span>
                        <ul className="space-y-1 text-gray-600 pl-4 list-disc font-medium">
                          {lead.buyingSignals.map((signal, idx) => (
                            <li key={idx}>{signal}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="font-bold text-gray-800 block">Next Action:</span>
                          <p className="text-gray-700 bg-white p-2 rounded-lg border border-gray-200 mt-0.5">
                            {lead.nextAction}
                          </p>
                        </div>
                        {lead.store && (
                          <div className="text-gray-500">
                            <span className="font-semibold text-gray-700">Preferred Store:</span> {lead.store}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          setSelectedLeadIndex(fullIndex >= 0 ? fullIndex : 0);
                          openModal("leads");
                        }}
                        className="text-xs font-bold text-[#1d9e75] hover:underline"
                      >
                        Open full lead picture →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        onPageChange={goToPage}
      />
    </div>
  );
}
