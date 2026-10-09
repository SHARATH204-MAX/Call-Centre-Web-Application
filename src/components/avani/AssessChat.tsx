import { useState } from "react";
import { useApp } from "../../context/AppContext";
import Button from "../ui/Button";
import { Send, Mic, Paperclip, X, Sparkles, MessageSquare, History, Plus } from "lucide-react";

export default function AssessChat() {
  const { avaniSessions, setAvaniSessions } = useApp();
  const [activeSessionId, setActiveSessionId] = useState<string>("SESH_01");
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [inputMsg, setInputMsg] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null);
  const [isMicActive, setIsMicActive] = useState(false);

  const currentSession = avaniSessions.find((s) => s.id === activeSessionId) || avaniSessions[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userMsg = {
      id: `M_${Date.now()}`,
      role: "user" as const,
      content: inputMsg.trim(),
      attachment: attachment ?? undefined
    };

    const updatedMessages = [...currentSession.messages, userMsg];

    setAvaniSessions((prev) =>
      prev.map((s) => (s.id === activeSessionId ? { ...s, messages: updatedMessages } : s))
    );

    setInputMsg("");
    setAttachment(null);

    // AI Mock Response
    setTimeout(() => {
      const assistantMsg = {
        id: `M_AI_${Date.now()}`,
        role: "assistant" as const,
        content: `Avani Coach: Great question! To address "${userMsg.content.slice(0, 30)}...", state the 100-night trial first, then walk through the ₹450/month HDFC 0% EMI option.`
      };

      setAvaniSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId ? { ...s, messages: [...s.messages, assistantMsg] } : s
        )
      );
    }, 1000);
  };

  const handleNewChat = () => {
    const newSesh = {
      id: `SESH_${Date.now()}`,
      title: "New Coaching Session",
      timestamp: "Just now",
      messages: [
        {
          id: "M0",
          role: "assistant" as const,
          content: "Hello Arvind! I'm Avani, your 24/7 AI sales coach. Ask me about product specs, objection handling, or warranty policy."
        }
      ]
    };
    setAvaniSessions((prev) => [newSesh, ...prev]);
    setActiveSessionId(newSesh.id);
  };

  const quickChips = [
    "100-night trial",
    "Price objection",
    "My weak areas",
    "Warranty quiz"
  ];

  return (
    <div className="space-y-4">
      {/* Session Header Controls */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-2xs text-xs">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleNewChat}>
            <Plus size={14} /> New Chat
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)}>
            <History size={14} /> History ({avaniSessions.length})
          </Button>
        </div>
        <span className="font-bold text-gray-800">{currentSession.title}</span>
      </div>

      {/* Sessions History Drawer */}
      {showHistory && (
        <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 space-y-1 text-xs animate-in fade-in">
          <span className="font-bold text-[#3b1254] block mb-1">Previous Conversations:</span>
          {avaniSessions.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveSessionId(s.id);
                setShowHistory(false);
              }}
              className={`flex w-full items-center justify-between p-2 rounded-lg text-left transition-colors ${
                s.id === activeSessionId ? "bg-[#3b1254] text-white font-bold" : "hover:bg-purple-100 text-gray-800"
              }`}
            >
              <span>{s.title}</span>
              <span className="text-[10px] opacity-70">{s.timestamp}</span>
            </button>
          ))}
        </div>
      )}

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="font-bold text-gray-500 mr-1">Quick Prompts:</span>
        {quickChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setInputMsg(`Explain how to handle ${chip}`)}
            className="rounded-full bg-purple-50 hover:bg-purple-100 text-[#3b1254] px-3 py-1 text-xs font-bold border border-purple-200 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Main Chat Messages Log */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3 min-h-[220px] max-h-[360px] overflow-y-auto shadow-2xs">
        {currentSession.messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col text-xs ${m.role === "user" ? "items-end text-right" : "items-start text-left"}`}
          >
            <span className="text-[10px] text-gray-400 font-bold mb-0.5">
              {m.role === "user" ? "You (Arvind)" : "Avani AI Coach"}
            </span>
            <div
              className={`rounded-2xl px-4 py-2.5 max-w-[80%] leading-relaxed font-medium ${
                m.role === "user"
                  ? "bg-[#1d9e75] text-white rounded-tr-xs"
                  : "bg-purple-900 text-white rounded-tl-xs"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Attachment Preview Chip */}
      {attachment && (
        <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 border">
          <Paperclip size={13} /> {attachment}
          <button onClick={() => setAttachment(null)} className="text-gray-400 hover:text-red-600">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Input Composer */}
      <form onSubmit={handleSend} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-gray-200 shadow-2xs">
        <button
          type="button"
          onClick={() => setAttachment("Ortho_GRID_Spec_Sheet.pdf")}
          className="p-2 text-gray-500 hover:text-gray-800"
          title="Attach document"
        >
          <Paperclip size={18} />
        </button>

        <button
          type="button"
          onClick={() => setIsMicActive(!isMicActive)}
          className={`p-2 rounded-lg transition-colors ${
            isMicActive ? "bg-red-100 text-red-600" : "text-gray-500 hover:text-gray-800"
          }`}
          title="Microphone voice input"
        >
          <Mic size={18} />
        </button>

        <input
          type="text"
          placeholder="Ask Avani about product specs, objections, or warranty scripts..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          className="flex-1 text-xs font-medium text-gray-900 focus:outline-none"
        />

        <Button type="submit" variant="primary" size="sm" className="font-bold bg-[#3b1254] hover:bg-purple-900">
          <Send size={14} /> Send
        </Button>
      </form>

      <p className="text-[10px] text-gray-400 text-center italic">
        ⚠️ Warning: Avani may make mistakes. Verify critical store policies with manager Sunita Rao.
      </p>
    </div>
  );
}
