import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Bell, Search, Menu, User, Settings, LogOut, Sparkles, Volume2, VolumeX, Keyboard, FileText } from "lucide-react";
import { toggleAudio, getAudioEnabled, playButtonBeep } from "../../utils/audioEffects";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function Topbar({ title, subtitle, onMenuToggle }: TopbarProps) {
  const { employee, openModal, setPage } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [soundOn, setSoundOn] = useState(getAudioEnabled());

  const handleToggleSound = () => {
    const next = toggleAudio();
    setSoundOn(next);
    if (next) playButtonBeep();
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#e5e5ea] bg-white px-3 sm:px-4 lg:px-6 shadow-2xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-base font-bold text-[#1a1a1a] tracking-tight">{title}</h1>
          {subtitle && <p className="text-[11px] text-gray-500 font-normal hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* ✨ Evaluator Showcase Tour Button */}
        <button
          onClick={() => {
            playButtonBeep();
            openModal("evaluator-tour");
          }}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-[#123c30] to-[#3b1254] px-3 py-1.5 text-[11px] font-extrabold text-white shadow-xs hover:opacity-95 hover:scale-[1.02] transition-all animate-pulse"
          title="Click to run 1-click guided recruiter demos"
        >
          <Sparkles size={13} className="text-emerald-300" />
          <span className="hidden sm:inline">✨ Evaluator Tour</span>
          <span className="sm:hidden">✨ Tour</span>
        </button>

        {/* Export Shift Report Button */}
        <button
          onClick={() => {
            playButtonBeep();
            openModal("shift-report");
          }}
          className="hidden md:flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          title="Export Shift Summary Report"
        >
          <FileText size={12} className="text-[#123c30]" /> Report
        </button>

        {/* Sound Toggle Button */}
        <button
          onClick={handleToggleSound}
          aria-label="Toggle Sound Effects"
          title={soundOn ? "Mute audio telephony effects" : "Enable telephony sound effects"}
          className={`rounded-full p-2 transition-colors ${
            soundOn ? "text-emerald-700 hover:bg-emerald-50" : "text-gray-400 hover:bg-gray-100"
          }`}
        >
          {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
        </button>

        {/* Hotkeys Cheatsheet Button */}
        <button
          onClick={() => {
            playButtonBeep();
            openModal("hotkeys");
          }}
          aria-label="Keyboard Shortcuts"
          title="Keyboard shortcuts (?)"
          className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors hidden sm:block"
        >
          <Keyboard size={17} />
        </button>

        {/* Global Search Box */}
        <div className="relative hidden lg:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads, calls, Pulse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setPage("pulse");
            }}
            className="h-8 w-44 rounded-full border border-gray-200 bg-gray-50 pl-8 pr-3 text-xs focus:bg-white focus:border-[#1d9e75] focus:outline-none transition-all"
          />
        </div>

        {/* Notifications Button */}
        <button
          onClick={() => openModal("notifications")}
          aria-label="Notifications"
          className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 text-left p-1 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123c30] text-sm font-bold text-white shadow-inner ring-2 ring-emerald-500/30">
              {employee.avatarEmoji}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-gray-800 leading-none">{employee.name}</p>
              <p className="text-[10px] text-emerald-700 font-medium leading-tight mt-0.5">
                {employee.queueStatus === "available" ? "On Queue" : "Unavailable"}
              </p>
            </div>
          </button>

          {/* Employee Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-2 text-xs font-semibold text-gray-800 shadow-xl border border-gray-100 z-50 animate-in fade-in">
              <div className="px-3 py-2 border-b mb-1">
                <p className="font-extrabold text-gray-900">{employee.name}</p>
                <p className="text-[10px] text-gray-500">{employee.store}</p>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  openModal("avatar");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
              >
                <User size={14} className="text-[#1d9e75]" /> Avatar Persona
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  openModal("settings");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-left"
              >
                <Settings size={14} className="text-gray-600" /> Employee Settings
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  alert("Local Prototype Mode: Authentication session simulated!");
                }}
                className="flex w-full items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-left"
              >
                <LogOut size={14} /> Logout (Simulated)
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
