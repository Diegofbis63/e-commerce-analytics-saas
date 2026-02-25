"use client";

import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Menu, Search, Bell, Calendar, RefreshCw, ChevronDown } from "lucide-react";

const dateRanges = [
  { id: "today", label: "Hoy" },
  { id: "yesterday", label: "Ayer" },
  { id: "last7days", label: "Últimos 7 días" },
  { id: "last30days", label: "Últimos 30 días" },
  { id: "thisMonth", label: "Este mes" },
  { id: "lastMonth", label: "Mes pasado" },
];

export function Header() {
  const { selectedDateRange, setDateRange, isLoading, refreshData, toggleSidebar } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentDateRange = dateRanges.find(d => d.id === selectedDateRange);
  const currentDate = new Date().toLocaleDateString("es-AR", {
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
              placeholder="Buscar..."
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
        {/* Date Range Selector */}
        <div className="relative">
          <button 
            onClick={() => setDateOpen(!dateOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-glass-100 border border-glass-border text-luxury-400 hover:text-white transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{currentDateRange?.label}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {dateOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setDateOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl bg-luxury-900 border border-glass-border shadow-lg z-50">
                {dateRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => {
                      setDateRange(range.id);
                      setDateOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-glass-100 transition-colors ${
                      selectedDateRange === range.id 
                        ? "text-accent-violet" 
                        : "text-luxury-400"
                    }`}
                  >
                    {range.label}
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
        <button className="relative p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent-rose rounded-full" />
        </button>
      </div>
    </header>
  );
}
