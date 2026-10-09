import React from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({
  title = "No records found",
  description = "There are no items to display in this list right now.",
  icon = <Inbox size={36} className="text-gray-400" />,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
      <div className="mb-3 rounded-full bg-white p-3 shadow-xs border border-gray-100">{icon}</div>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 text-xs text-gray-500 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
