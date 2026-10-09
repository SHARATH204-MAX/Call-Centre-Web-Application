import { useState } from "react";
import { useApp } from "../context/AppContext";
import { pulseChannels, customerDiscussionsList } from "../data/pulse";
import type { CustomerDiscussion, Channel } from "../types";
import Button from "../components/ui/Button";
import { MessageSquare, Plus, Search, Bot, Award, ChevronDown, ChevronUp, ChevronRight, Phone, Send, User, Sparkles, Hash, ArrowLeft } from "lucide-react";

export default function PulsePage() {
  const {
    openModal,
    setSelectedCustomer,
    setPage,
    startCallForLead,
    leads,
    kudosList
  } = useApp();

  const [showNewMsgMenu, setShowNewMsgMenu] = useState(false);
  const [showCustomAgents, setShowCustomAgents] = useState(true);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activeCustomer, setActiveCustomer] = useState<CustomerDiscussion | null>(null);
  const [commMode, setCommMode] = useState<"whatsapp" | "call">("whatsapp");
  const [chatMessages, setChatMessages] = useState<string[]>([
    "Sunita Rao: Team, our greeting-in-first-10s QA score is at 81.4%, slightly below our 85% target.",
    "Sunita Rao: Naming the shopper immediately drives a +23.6pp conversion lift!",
    "Arvind Rajan: Understood! I'll ensure every call opens with the greeting script."
  ]);
  const [msgInput, setMsgInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojis = ["👍", "🙌", "🔥", "💪", "🏆", "😊", "✅", "❤️", "🎉", "📢", "💡", "🛏️"];

  const handleSendTeamMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setChatMessages((prev) => [...prev, `Arvind Rajan: ${msgInput.trim()}`]);
    setMsgInput("");
  };

  const handleInsertEmoji = (emoji: string) => {
    setMsgInput((prev) => prev + emoji);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 7.1 Pulse Header & Store Context */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123c30] to-[#3b1254] p-5 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold tracking-tight">Pulse Workspace</h2>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-400/30">
              The Sleep Company · Koramangala
            </span>
          </div>
          <p className="text-xs text-purple-100/90 mt-0.5 font-medium">
            Team channels, direct messages, customer discussions & AI agent updates
          </p>
        </div>

        <div className="relative">
          <Button
            variant="primary"
            size="md"
            onClick={() => setShowNewMsgMenu(!showNewMsgMenu)}
            className="font-bold shadow-md bg-emerald-500 hover:bg-emerald-600 text-[#123c30]"
          >
            <Plus size={16} /> New Message
          </Button>

          {/* New Message Recipient Menu */}
          {showNewMsgMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 text-xs font-semibold text-gray-800 shadow-xl border border-gray-200 z-50 animate-in fade-in">
              <span className="text-[10px] text-gray-400 font-bold block px-2.5 py-1 uppercase">Direct Message:</span>
              {(["Sunita Rao (Store Manager)", "Priya Krishnan (Sales)", "Raju Kumar (Sales)"] as const).map((person) => (
                <button
                  key={person}
                  onClick={() => {
                    setShowNewMsgMenu(false);
                    setActiveChannel({
                      id: "dm",
                      name: person.split(" ")[0],
                      description: person,
                      category: "direct"
                    });
                  }}
                  className="flex w-full items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-left"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#123c30] text-white font-bold text-[10px]">
                    {person.slice(0, 2).toUpperCase()}
                  </div>
                  <span>{person}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 7.2 AvaniBot Card & Search Pulse */}
      <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-900 text-white font-bold shadow-xs">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#3b1254] text-xs">AvaniBot</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.2 text-[9px] font-extrabold text-emerald-800">
                  ALWAYS ON
                </span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Ask me about Pulse activity, daily briefs & action items</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setPage("avani");
              }}
              className="font-bold text-[#3b1254]"
            >
              Daily Brief
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setPage("avani");
              }}
              className="font-bold bg-[#3b1254]"
            >
              Ask a Question
            </Button>
          </div>
        </div>
      </div>

      {/* 7.3 Custom Agents Section (Expandable) */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-2xs space-y-3">
        <button
          onClick={() => setShowCustomAgents(!showCustomAgents)}
          className="flex w-full items-center justify-between text-xs font-bold text-gray-800 uppercase tracking-wider"
        >
          <span>Custom Agents (Set up by Manager)</span>
          {showCustomAgents ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showCustomAgents && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {pulseChannels
              .filter((c) => c.category === "custom" || c.category === "agent")
              .map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveChannel(agent)}
                  className="p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all text-left space-y-1"
                >
                  <span className="font-bold text-gray-900 block truncate">#{agent.name}</span>
                  <p className="text-[10px] text-gray-500 line-clamp-2">{agent.description}</p>
                </button>
              ))}
          </div>
        )}
      </div>

      {/* 7.4 Customer Discussions Section (Relayed via WhatsApp Business) */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-950">Customer Discussions</h3>
              <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-[10px] font-extrabold text-emerald-900">
                2 open items · WhatsApp Business Relay
              </span>
            </div>
            <p className="text-xs text-emerald-800 font-medium mt-0.5">
              1 unanswered call & 1 unreplied chat need attention!
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {customerDiscussionsList.map((cust) => (
            <div
              key={cust.id}
              onClick={() => setActiveCustomer(cust)}
              className="flex items-center justify-between p-3 rounded-xl bg-white border border-emerald-200 hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-900 text-xs">
                  {cust.customerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-xs">{cust.customerName}</span>
                    <span className="text-[10px] text-gray-400">{cust.phone}</span>
                    {cust.isHotLead && (
                      <span className="rounded bg-red-100 text-red-800 px-1.5 py-0.2 text-[9px] font-bold">
                        Hot Lead
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{cust.lastMessage}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {cust.channelType === "call" ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      const matchLead = leads.find((l) => l.name.includes(cust.customerName)) || leads[0];
                      startCallForLead(matchLead);
                    }}
                    className="bg-red-600 hover:bg-red-700 font-bold"
                  >
                    Call Back
                  </Button>
                ) : (
                  <span className="text-xs font-bold text-[#1d9e75]">Open Chat →</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7.5 Customer Chat Overlay Modal */}
      {activeCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col h-[520px]">
            {/* Header */}
            <div className="flex items-center justify-between bg-[#123c30] p-4 text-white">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveCustomer(null)} className="p-1 text-white/80 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h3 className="font-bold text-sm">{activeCustomer.customerName}</h3>
                  <p className="text-[11px] text-emerald-200">{activeCustomer.phone}</p>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedCustomer(activeCustomer);
                  openModal("tag-forward");
                }}
              >
                Tag / Forward
              </Button>
            </div>

            {/* Mode Switcher */}
            <div className="flex border-b text-xs font-bold">
              <button
                onClick={() => setCommMode("whatsapp")}
                className={`flex-1 py-2 text-center transition-all ${
                  commMode === "whatsapp" ? "bg-emerald-50 text-emerald-900 border-b-2 border-[#1d9e75]" : "text-gray-500"
                }`}
              >
                WhatsApp Message
              </button>
              <button
                onClick={() => setCommMode("call")}
                className={`flex-1 py-2 text-center transition-all ${
                  commMode === "call" ? "bg-purple-50 text-[#3b1254] border-b-2 border-[#3b1254]" : "text-gray-500"
                }`}
              >
                Voice Call Mode
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto text-xs space-y-2">
              <div className="rounded-lg bg-white p-3 border border-gray-200 text-gray-800">
                <strong>Customer:</strong> {activeCustomer.lastMessage}
              </div>
            </div>

            {/* Composer */}
            {commMode === "whatsapp" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveCustomer(null);
                }}
                className="p-3 border-t bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Message on WhatsApp..."
                  className="flex-1 rounded-lg border p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
                />
                <Button type="submit" variant="primary" size="sm" className="bg-[#25D366]">
                  <Send size={14} /> Send
                </Button>
              </form>
            ) : (
              <div className="p-4 border-t bg-white text-center">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    const matchLead = leads.find((l) => l.name.includes(activeCustomer.customerName)) || leads[0];
                    setActiveCustomer(null);
                    startCallForLead(matchLead);
                  }}
                  className="w-full bg-[#123c30]"
                >
                  <Phone size={16} /> Start On-ground Call
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Team Channels & Direct Messages Grid */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Team Channels & Direct Messages</h3>

        <div className="divide-y divide-gray-100">
          {pulseChannels.map((chan) => (
            <button
              key={chan.id}
              onClick={() => setActiveChannel(chan)}
              className="flex w-full items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 font-bold text-xs text-gray-700">
                  #
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-xs block">#{chan.name}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{chan.description}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Active Team Chat Overlay */}
      {activeChannel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col h-[520px]">
            <div className="flex items-center justify-between bg-[#123c30] p-4 text-white">
              <div className="flex items-center gap-2">
                <button onClick={() => setActiveChannel(null)} className="p-1 text-white/80 hover:text-white">
                  <ArrowLeft size={18} />
                </button>
                <h3 className="font-bold text-sm">#{activeChannel.name}</h3>
              </div>
            </div>

            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto text-xs space-y-2">
              {chatMessages.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-gray-200 font-medium">
                  {m}
                </div>
              ))}
            </div>

            {/* Emoji Picker Bar */}
            {showEmojiPicker && (
              <div className="p-2 bg-gray-100 border-t flex flex-wrap gap-1.5 justify-center">
                {emojis.map((e) => (
                  <button key={e} onClick={() => handleInsertEmoji(e)} className="text-base p-1 hover:bg-white rounded">
                    {e}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSendTeamMsg} className="p-3 border-t bg-white flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1.5 text-gray-500 hover:text-gray-800"
              >
                😊
              </button>
              <input
                type="text"
                placeholder={`Message #${activeChannel.name}...`}
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                className="flex-1 rounded-lg border p-2 text-xs focus:border-[#1d9e75] focus:outline-none"
              />
              <Button type="submit" variant="primary" size="sm" className="bg-[#123c30]">
                <Send size={14} /> Send
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
