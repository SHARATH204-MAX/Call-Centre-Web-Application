import { useState } from "react";
import { initialMessagesMap, channels, samplePinnedCard } from "../../data/messages";
import type { ChatMessage as ChatMessageType } from "../../types";
import ChatMessage from "./ChatMessage";
import NeedsYourInput from "./NeedsYourInput";
import { ArrowLeft, Send, Sparkles, Hash, PhoneCall } from "lucide-react";
import Button from "../ui/Button";

interface PulseChannelProps {
  channel: string;
  onBack: () => void;
}

export default function PulseChannel({ channel, onBack }: PulseChannelProps) {
  const currentChannelObj = channels.find((c) => c.id === channel) || {
    id: channel,
    name: channel,
    description: "Channel conversation"
  };

  const [messages, setMessages] = useState<ChatMessageType[]>(() => {
    return initialMessagesMap[channel] || [
      {
        id: "M_DEF",
        author: "AvaniBot",
        role: "AI Supervisor",
        text: `Welcome to #${currentChannelObj.name}. Feel free to ask questions or post call updates here!`,
        timestamp: "Just now",
        isCurrentUser: false,
        channelId: channel
      }
    ];
  });

  const [inputDraft, setInputDraft] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDraft.trim()) return;

    const newMsg: ChatMessageType = {
      id: `M_${Date.now()}`,
      author: "You",
      role: "Call Centre Agent",
      text: inputDraft.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
      channelId: channel
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputDraft("");

    // Simulate AvaniBot response if chatting with AvaniBot
    if (channel === "avani-bot" || channel === "pitch-coaching") {
      setTimeout(() => {
        const botReply: ChatMessageType = {
          id: `M_BOT_${Date.now()}`,
          author: "AvaniBot",
          role: "AI Supervisor",
          text: `Understood! I've noted your update regarding "${newMsg.text.slice(0, 30)}..." and updated your shift log.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false,
          channelId: channel
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] rounded-xl border border-[#e5e0d5] bg-white shadow-2xs overflow-hidden animate-in fade-in duration-200">
      {/* Channel Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Pulse
          </button>

          <div className="h-4 w-px bg-gray-200" />

          <div>
            <div className="flex items-center gap-1.5">
              <Hash size={16} className="text-emerald-700" />
              <h2 className="text-sm font-bold text-gray-900">{currentChannelObj.name}</h2>
            </div>
            <p className="text-[11px] text-gray-500 hidden sm:block">{currentChannelObj.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Active Shift Channel
          </span>
        </div>
      </header>

      {/* Pinned "Needs Your Input" Card */}
      <NeedsYourInput card={samplePinnedCard} />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#fdfdfc]">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 bg-white p-3 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message #${currentChannelObj.name}...`}
            value={inputDraft}
            onChange={(e) => setInputDraft(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 bg-gray-50/80 px-4 py-2 text-xs font-medium text-gray-900 focus:bg-white focus:border-[#1d9e75] focus:outline-none transition-all"
          />
          <Button type="submit" variant="primary" size="md" className="font-bold shadow-xs">
            <Send size={15} /> Send
          </Button>
        </div>
      </form>
    </div>
  );
}
