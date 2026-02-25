"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { AlertTriangle, Package, RefreshCw, Eye } from "lucide-react";

export function StockAlert() {
  const { stockAlerts, isLoading, refreshData, openModal, setActiveView } = useAppStore();

  const handleRefresh = () => {
    refreshData();
  };

  const handleViewProducts = () => {
    setActiveView("products");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Stock Crítico
          </h3>
          <p className="text-sm text-luxury-400">
            Productos bajo mínimo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg bg-accent-rose/10 hover:bg-accent-rose/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-accent-rose ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <div className="p-2 rounded-lg bg-accent-rose/10">
            <AlertTriangle className="w-5 h-5 text-accent-rose" />
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto">
        {stockAlerts.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform ${
              item.status === "critical"
                ? "bg-accent-rose/10 border-accent-rose/30"
                : "bg-accent-amber/10 border-accent-amber/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className={`w-4 h-4 ${item.status === "critical" ? "text-accent-rose" : "text-accent-amber"}`} />
                <span className="text-white font-medium text-sm">{item.productName}</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.status === "critical"
                    ? "bg-accent-rose/20 text-accent-rose"
                    : "bg-accent-amber/20 text-accent-amber"
                }`}
              >
                {item.status === "critical" ? "Crítico" : "Bajo"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-luxury-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.status === "critical" ? "bg-accent-rose" : "bg-accent-amber"
                  }`}
                  style={{ width: `${Math.min((item.currentStock / item.minStock) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs text-luxury-400">
                {item.currentStock}/{item.minStock}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleViewProducts}
        className="mt-4 w-full py-2 px-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30 text-accent-violet text-sm font-medium hover:bg-accent-violet/20 transition-colors"
      >
        Ver Todos los Productos
      </button>
    </motion.div>
  );
}
