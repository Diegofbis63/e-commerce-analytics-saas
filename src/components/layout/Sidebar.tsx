"use client";

import { useAppStore } from "@/store/appStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
  TrendingUp,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, labelKey: "dashboard" as const, id: "dashboard" as const },
  { icon: Package, labelKey: "inventory" as const, id: "products" as const },
  { icon: ShoppingCart, labelKey: "orders" as const, id: "orders" as const },
  { icon: Users, labelKey: "customers" as const, id: "customers" as const },
  { icon: BarChart3, labelKey: "analytics" as const, id: "analytics" as const },
  { icon: TrendingUp, labelKey: "predictions" as const, id: "predictions" as const },
  { icon: Settings, labelKey: "settings" as const, id: "settings" as const },
  { icon: HelpCircle, labelKey: "help" as const, id: "help" as const },
];

export function Sidebar() {
  const { sidebarOpen, activeView, setActiveView, toggleSidebar, t } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 88 }}
      className="h-screen bg-luxury-950/40 backdrop-blur-2xl border-r border-white/5 flex flex-col relative z-50 shadow-2xl"
    >
      {/* Branding */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-accent-violet via-accent-cyan to-accent-indigo flex items-center justify-center shadow-lg shadow-accent-violet/20 group cursor-pointer">
                <Zap className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-tighter text-lg leading-tight uppercase">Quantix</span>
                <span className="text-[10px] text-accent-cyan font-bold tracking-[0.2em] uppercase opacity-80">AI Analytics</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl hover:bg-white/5 text-luxury-400 hover:text-white transition-all border border-transparent hover:border-white/10"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.labelKey}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${activeView === item.id
              ? "bg-white/5 text-white shadow-inner shadow-white/5 border border-white/10"
              : "text-luxury-400 hover:text-white hover:bg-white/[0.02]"
              }`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${activeView === item.id ? "text-accent-violet scale-110" : "group-hover:scale-110"}`} />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm font-semibold tracking-tight text-left"
                >
                  {t(item.labelKey)}
                </motion.span>
              )}
            </AnimatePresence>
            {activeView === item.id && (
              <motion.div
                layoutId="active-nav-indicator"
                className="absolute left-0 w-1.5 h-6 bg-accent-violet rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)] z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Pro Badge */}
      {sidebarOpen && (
        <div className="px-6 py-6 border-t border-white/5">
          <div className="relative p-5 rounded-3xl bg-gradient-to-br from-luxury-900/60 to-black/40 border border-white/10 overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent-violet/10 blur-3xl -mr-10 -mt-10 group-hover:bg-accent-violet/20 transition-all" />
            <div className="relative z-10">
              <p className="text-[10px] font-black text-accent-violet uppercase tracking-widest mb-1">Status: Operational</p>
              <p className="text-sm font-bold text-white mb-3">Enterprise Plan</p>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                <div className="w-3/4 h-full bg-accent-violet rounded-full" />
              </div>
              <p className="text-[10px] text-luxury-500 font-medium">92% AI Accuracy</p>
            </div>
          </div>
        </div>
      )}

      {/* User Session */}
      <div className="p-4 border-t border-white/5 bg-black/20">
        <div className={`flex items-center gap-4 p-3 rounded-2xl border border-transparent transition-all ${sidebarOpen ? "hover:bg-white/5 hover:border-white/5" : "justify-center"}`}>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center text-white text-base font-black shadow-lg">
              F
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-emerald border-2 border-luxury-950 rounded-full" />
          </div>
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 truncate"
              >
                <p className="text-sm text-white font-bold tracking-tight">Federico</p>
                <p className="text-[10px] text-luxury-500 font-bold uppercase tracking-widest text-left">Chief Executive</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
