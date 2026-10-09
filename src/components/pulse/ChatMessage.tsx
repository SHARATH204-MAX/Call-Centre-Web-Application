import type { ChatMessage as ChatMessageType } from "../../types";
import { Sparkles, UserCheck } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isMe = message.isCurrentUser;

  return (
    <div className={`flex items-start gap-2.5 my-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-2xs ${
          isMe
            ? "bg-[#123c30] text-white"
            : message.author === "AvaniBot"
            ? "bg-purple-700 text-white"
            : "bg-emerald-100 text-emerald-900 border border-emerald-300"
        }`}
      >
        {isMe ? "You" : message.author.slice(0, 2).toUpperCase()}
      </div>

      {/* Bubble Content */}
      <div className={`max-w-[75%] sm:max-w-[65%] space-y-1 ${isMe ? "items-end text-right" : "items-start text-left"}`}>
        <div className="flex items-center gap-2 px-1 text-[11px]">
          <span className="font-bold text-gray-800">{message.author}</span>
          {message.role && (
            <span className="rounded bg-gray-100 px-1.5 py-0.2 text-[9px] font-semibold text-gray-600">
              {message.role}
            </span>
          )}
          <span className="text-gray-400 text-[10px]">{message.timestamp}</span>
        </div>

        <div
          className={`rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-2xs ${
            isMe
              ? "bg-[#1d9e75] text-white rounded-tr-xs"
              : message.author === "AvaniBot"
              ? "bg-purple-900 text-white rounded-tl-xs border border-purple-800"
              : "bg-white text-gray-900 border border-gray-200 rounded-tl-xs"
          }`}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}
