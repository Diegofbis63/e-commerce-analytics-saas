"use client";

import { useState } from "react";
import { Menu, Search, Bell, Calendar } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-glass-border bg-luxury-900/30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-glass-100 border border-glass-border ${searchOpen ? "w-64" : "w-48"} transition-all`}>
            <Search className="w-4 h-4 text-luxury-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-sm text-white placeholder-luxury-500 focus:outline-none"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Date */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-glass-100 border border-glass-border text-luxury-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">24 Feb 2026</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-rose rounded-full" />
        </button>
      </div>
    </header>
  );
}
