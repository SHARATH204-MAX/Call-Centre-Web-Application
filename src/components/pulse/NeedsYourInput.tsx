import { useState } from "react";
import type { PinnedCardInfo } from "../../types";
import Button from "../ui/Button";
import { AlertCircle, CheckCircle2, PhoneCall, Sparkles, Send } from "lucide-react";

interface NeedsYourInputProps {
  card: PinnedCardInfo;
}

export default function NeedsYourInput({ card }: NeedsYourInputProps) {
  const [resolvedOption, setResolvedOption] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [repliedText, setRepliedText] = useState<string | null>(null);

  const handleAction = (optionKey: string, label: string) => {
    setResolvedOption(label);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setRepliedText(replyText);
    setReplyText("");
  };

  return (
    <div className="sticky top-0 z-10 border-b border-amber-200 bg-amber-50/95 p-3.5 backdrop-blur-xs shadow-xs transition-all">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-200 text-amber-900 font-bold border border-amber-300">
          <AlertCircle size={18} />
        </div>

        <div className="flex-1 min-w-0 text-xs text-amber-950">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px]">
              Pinned Priority Task — Needs your input
            </span>
            {resolvedOption && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 size={12} /> Action Taken: {resolvedOption}
              </span>
            )}
          </div>

          <p className="mt-1 leading-relaxed font-medium text-amber-900">{card.description}</p>

          {/* Action Buttons */}
          {!resolvedOption && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {card.options.map((opt) => (
                <button
                  key={opt.actionKey}
                  onClick={() => handleAction(opt.actionKey, opt.label)}
                  className="rounded-lg bg-amber-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-950 transition-colors shadow-2xs"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Quick Reply Box */}
          {repliedText ? (
            <div className="mt-2 rounded-lg bg-white/80 p-2 text-[11px] font-semibold text-emerald-900 border border-emerald-200">
              Note recorded: "{repliedText}"
            </div>
          ) : (
            <form onSubmit={handleReplySubmit} className="mt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type quick response or instruction for AvaniBot..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 rounded-lg border border-amber-300 bg-white/90 px-3 py-1 text-xs focus:bg-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="rounded-lg bg-amber-800 px-3 py-1 text-xs font-bold text-white hover:bg-amber-900 flex items-center gap-1"
              >
                <Send size={12} /> Reply
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
