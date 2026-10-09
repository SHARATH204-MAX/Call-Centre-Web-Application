import { useState } from "react";
import { useApp } from "../context/AppContext";
import AssessChat from "../components/avani/AssessChat";
import LearnPath from "../components/avani/LearnPath";
import PractiseFlow from "../components/avani/PractiseFlow";
import { Sparkles, Bot, BookOpen, Mic, MessageSquare } from "lucide-react";

export default function AvaniPage() {
  const { avaniMode, setAvaniMode } = useApp();
  const [avatarStyle, setAvatarStyle] = useState<string>("Contemporary");

  const avatarStyles = [
    { id: "Traditional", label: "Traditional", emoji: "👩‍💼" },
    { id: "Contemporary", label: "Contemporary", emoji: "👩‍💻" },
    { id: "Professional", label: "Professional", emoji: "👩‍🏫" },
    { id: "Smart Casual", label: "Smart Casual", emoji: "👩‍🎨" }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Avani Brand Header & Persona Selector */}
      <div className="rounded-xl bg-gradient-to-r from-[#3b1254] to-[#123c30] p-5 text-white shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-purple-200 backdrop-blur-xs border border-white/20 text-2xl">
              {avatarStyles.find((a) => a.id === avatarStyle)?.emoji ?? "👩‍💻"}
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">Avani — AI Sales Coach & Tele-caller Supervisor</h2>
              <p className="text-xs text-purple-100/90 mt-0.5">
                Persona: <strong>{avatarStyle}</strong> · Real-time objection scripts, learning modules & speaking practice
              </p>
            </div>
          </div>

          {/* Choose Your Avani Styles */}
          <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl backdrop-blur-xs border border-white/10 self-start sm:self-auto">
            <span className="text-[10px] uppercase font-bold text-purple-200 px-1.5 hidden md:block">Choose Avani:</span>
            {avatarStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setAvatarStyle(style.id)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all flex items-center gap-1 ${
                  avatarStyle === style.id
                    ? "bg-white text-[#3b1254] shadow-xs"
                    : "text-purple-200 hover:bg-white/10"
                }`}
              >
                <span>{style.emoji}</span>
                <span className="hidden lg:inline">{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Tabs Switcher */}
        <div className="flex items-center gap-2 border-t border-purple-800/40 pt-3">
          {(
            [
              ["assess", "Assess Mode", <MessageSquare key="1" size={15} />],
              ["learn", "Learn Path", <BookOpen key="2" size={15} />],
              ["practise", "Practise Flow", <Mic key="3" size={15} />]
            ] as const
          ).map(([mode, label, icon]) => (
            <button
              key={mode}
              onClick={() => setAvaniMode(mode as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition-all ${
                avaniMode === mode
                  ? "bg-white text-[#3b1254] shadow-md"
                  : "text-purple-200 hover:bg-white/10"
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Sub-View Rendering */}
      {avaniMode === "assess" && <AssessChat />}
      {avaniMode === "learn" && <LearnPath />}
      {avaniMode === "practise" && <PractiseFlow />}
    </div>
  );
}
