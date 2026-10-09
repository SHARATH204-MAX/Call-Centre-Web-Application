import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Bell, Search, Menu, User, Settings, LogOut, Sparkles } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function Topbar({ title, subtitle, onMenuToggle }: TopbarProps) {
  const { employee, openModal, setPage } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#e5e5ea] bg-white px-4 lg:px-6 shadow-2xs">
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
          {subtitle && <p className="text-[11px] text-gray-500 font-normal">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search Box */}
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ask AvaniBot or search Pulse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setPage("pulse");
            }}
            className="h-8 w-48 lg:w-64 rounded-full border border-gray-200 bg-gray-50 pl-8 pr-3 text-xs focus:bg-white focus:border-[#1d9e75] focus:outline-none transition-all"
          />
        </div>

        {/* Notifications Button */}
        <button
          onClick={() => openModal("notifications")}
          aria-label="Notifications"
          className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Bell size={18} />
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
