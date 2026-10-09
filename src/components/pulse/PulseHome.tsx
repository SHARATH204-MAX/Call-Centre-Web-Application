import { channels } from "../../data/messages";
import { Sparkles, MessageSquare, Bot, Award, Users, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import Button from "../ui/Button";

interface PulseHomeProps {
  onOpenChannel: (channelId: string) => void;
}

export default function PulseHome({ onOpenChannel }: PulseHomeProps) {
  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* AvaniBot Header Card */}
      <div className="rounded-xl bg-gradient-to-r from-[#3b1254] to-[#123c30] p-5 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-purple-200 backdrop-blur-xs border border-white/20">
              <Bot size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold tracking-tight">AvaniBot — Tele-caller AI Supervisor</h2>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-400/30">
                  Online 24/7
                </span>
              </div>
              <p className="text-xs text-purple-100/80 mt-1 max-w-xl leading-relaxed">
                AvaniBot analyses call audio, alerts on walk-out leads, and provides real-time objection handling scripts for offline retail stores.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => onOpenChannel("avani-bot")}
            className="self-start md:self-auto font-bold shadow-md bg-emerald-500 hover:bg-emerald-600 text-[#123c30]"
          >
            <MessageSquare size={16} /> Open AvaniBot Chat
          </Button>
        </div>
      </div>

      {/* Role & Task Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onOpenChannel("pitch-coaching")}
          className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs hover:border-[#1d9e75] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold">
              <Zap size={18} />
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Pitch Coach
            </span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1d9e75] transition-colors">
            Walk-out Pitch Coach
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Real-time SOP pitch assistance, objection handlers & warranty scripts.
          </p>
        </div>

        <div
          onClick={() => onOpenChannel("sleep-company")}
          className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs hover:border-[#1d9e75] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700 font-bold">
              <Users size={18} />
            </span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              Store Sync
            </span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1d9e75] transition-colors">
            The Sleep Company Channel
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Direct feed from Indiranagar & Whitefield store managers.
          </p>
        </div>

        <div
          onClick={() => onOpenChannel("general")}
          className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs hover:border-[#1d9e75] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 font-bold">
              <ShieldCheck size={18} />
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              QA Audit
            </span>
          </div>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1d9e75] transition-colors">
            Call Centre Announcements
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            QA guidelines from Sunita Rao & conversion target updates.
          </p>
        </div>
      </div>

      {/* Unified Channels List */}
      <div className="rounded-xl border border-[#e5e0d5] bg-white p-4 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Pulse Channels & Direct Messages</h3>

        <div className="divide-y divide-gray-100">
          {channels.map((chan) => (
            <button
              key={chan.id}
              onClick={() => onOpenChannel(chan.id)}
              className="flex w-full items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700 font-bold group-hover:bg-emerald-50 group-hover:text-[#1d9e75]">
                  #
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-[#1d9e75]">{chan.name}</span>
                    {chan.unreadCount && chan.unreadCount > 0 && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                        {chan.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{chan.description}</p>
                </div>
              </div>

              <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>

      {/* Kudos Section */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 shadow-2xs flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-200 text-amber-900 font-bold">
          <Award size={22} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">Weekly Kudos Leaderboard</h4>
          <p className="text-xs text-amber-900 mt-0.5">
            🏆 <strong>Ananya Rao</strong> earned +₹1,200 commission bonus for 94% QA greeting score on smart mattress calls!
          </p>
        </div>
      </div>
    </div>
  );
}
