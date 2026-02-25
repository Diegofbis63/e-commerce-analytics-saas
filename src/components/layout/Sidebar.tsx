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
  Bell,
  Search,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" as const },
  { icon: Package, label: "Productos", id: "products" as const },
  { icon: ShoppingCart, label: "Pedidos", id: "orders" as const },
  { icon: Users, label: "Clientes", id: "customers" as const },
  { icon: BarChart3, label: "Analytics", id: "analytics" as const },
  { icon: TrendingUp, label: "Predicciones", id: "analytics" as const },
  { icon: Settings, label: "Configuración", id: "settings" as const },
  { icon: HelpCircle, label: "Ayuda", id: "settings" as const },
];

export function Sidebar() {
  const { sidebarOpen, activeView, setActiveView, toggleSidebar } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 80 }}
      className="h-screen bg-luxury-900/80 backdrop-blur-xl border-r border-glass-border flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-glass-border">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">E-Analytics</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              activeView === item.id
                ? "bg-accent-violet/20 text-accent-violet border border-accent-violet/30"
                : "text-luxury-400 hover:bg-glass-100 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* Quick Stats */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 border-t border-glass-border"
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 border border-accent-violet/30">
            <p className="text-xs text-luxury-400 mb-1">Ventas del día</p>
            <p className="text-lg font-bold text-white">$4,523</p>
            <p className="text-xs text-accent-emerald">+12% vs ayer</p>
          </div>
        </motion.div>
      )}

      {/* User */}
      <div className="p-3 border-t border-glass-border">
        <div className={`flex items-center gap-3 p-3 rounded-xl bg-glass-100 ${!sidebarOpen ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center text-white text-sm font-bold">
            F
          </div>
          <AnimatePresence mode="wait">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1"
              >
                <p className="text-sm text-white font-medium">Federico</p>
                <p className="text-xs text-luxury-500">Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
