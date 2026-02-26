"use client";

import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Menu, Search, Bell, Calendar, RefreshCw, ChevronDown } from "lucide-react";

const dateRanges = [
  { id: "today", labelKey: "today" as const },
  { id: "yesterday", labelKey: "yesterday" as const },
  { id: "last7days", labelKey: "last_7_days" as const },
  { id: "last30days", labelKey: "last_30_days" as const },
  { id: "thisMonth", labelKey: "this_month" as const },
  { id: "lastMonth", labelKey: "last_month" as const },
];

export function Header() {
  const { selectedDateRange, setDateRange, isLoading, refreshData, toggleSidebar, t, language, showNotification } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentDateRange = dateRanges.find(d => d.id === selectedDateRange);
  const currentDate = new Date().toLocaleDateString(language === "es" ? "es-AR" : language === "en" ? "en-US" : "pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRefresh = () => {
    refreshData();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-glass-border bg-luxury-900/30">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-glass-100 border border-glass-border ${searchOpen ? "w-64" : "w-48"} transition-all`}>
            <Search className="w-4 h-4 text-luxury-400" />
            <input
              type="text"
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder-luxury-500 focus:outline-none"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <p className="hidden xl:block text-[10px] text-luxury-500 font-bold uppercase tracking-widest mr-4 opacity-60">
          {currentDate}
        </p>

        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setDateOpen(!dateOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-glass-100 border border-glass-border text-luxury-400 hover:text-white transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{currentDateRange ? t(currentDateRange.labelKey) : ""}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {dateOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDateOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl bg-luxury-900 border border-white/5 shadow-2xl z-50 backdrop-blur-3xl">
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => {
                      setDateRange(range.id);
                      setDateOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-glass-100 transition-colors ${selectedDateRange === range.id
                      ? "text-accent-violet font-bold"
                      : "text-luxury-400"
                      }`}
                  >
                    {t(range.labelKey)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>

        {/* Notifications */}
        <button
          onClick={() => showNotification("Info system update successful", "info")}
          className="relative p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-rose rounded-full animate-pulse" />
        </button>

        {/* Profile */}
        <div className="relative ml-2">
          <button
            onClick={() => useAppStore.getState().setActiveView("settings")}
            className="flex items-center gap-3 p-1 rounded-full bg-glass-100 border border-white/5 hover:border-accent-violet/30 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan p-0.5">
              <div className="w-full h-full rounded-full bg-luxury-900 flex items-center justify-center">
                <span className="text-[10px] font-black text-white">AD</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
