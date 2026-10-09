import { useState } from "react";
import { Bell, Search, Menu, PhoneCall, CheckCircle2, Clock } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}

export default function Topbar({ title, subtitle, onMenuToggle }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#e5e5ea] bg-white px-4 lg:px-6 shadow-2xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Button */}
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

      {/* Action Controls & Profile Avatar */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Global Search Box */}
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads, phone numbers, products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-48 lg:w-64 rounded-full border border-gray-200 bg-gray-50 pl-8 pr-3 text-xs focus:bg-white focus:border-[#1d9e75] focus:outline-none transition-all"
          />
        </div>

        {/* Notifications Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-3 shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between border-b pb-2 mb-2">
                <span className="text-xs font-bold text-gray-800">Notifications</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  2 unread
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer">
                  <PhoneCall size={16} className="text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Missed Call from Akash Mehta</p>
                    <p className="text-[11px] text-gray-500">₹65,000 Ortho King Mattress lead</p>
                    <span className="text-[10px] text-gray-400">10 mins ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <CheckCircle2 size={16} className="text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Pitch Coach QA Score Updated</p>
                    <p className="text-[11px] text-gray-500">Greeting score reached 84% (+2.6%)</p>
                    <span className="text-[10px] text-gray-400">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123c30] text-xs font-bold text-white shadow-inner ring-2 ring-emerald-500/30">
            AR
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-gray-800 leading-none">Ananya Rao</p>
            <p className="text-[10px] text-emerald-700 font-medium leading-tight mt-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
