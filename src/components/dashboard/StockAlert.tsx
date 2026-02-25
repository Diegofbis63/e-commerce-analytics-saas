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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-8 bg-accent-rose/5 rounded-full blur-3xl -mr-10 -mt-10" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Stock Crítico
          </h3>
          <p className="text-xs text-luxury-400 font-medium uppercase tracking-wider">
            Optimización de Inventario
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ rotate: 180 }}
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 border border-white/10"
          >
            <RefreshCw className={`w-4 h-4 text-luxury-200 ${isLoading ? 'animate-spin' : ''}`} />
          </motion.button>
          <div className="p-2.5 rounded-xl bg-accent-rose/20 border border-accent-rose/30 animate-pulse-glow">
            <AlertTriangle className="w-4 h-4 text-accent-rose" />
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-72 overflow-y-auto pr-2 relative z-10 custom-scrollbar">
        {stockAlerts.length > 0 ? stockAlerts.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 5 }}
            className={`p-4 rounded-2xl border transition-all duration-300 ${item.status === "critical"
                ? "bg-accent-rose/5 border-accent-rose/20 hover:border-accent-rose/40"
                : "bg-accent-amber/5 border-accent-amber/20 hover:border-accent-amber/40"
              }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg ${item.status === "critical" ? "bg-accent-rose/20" : "bg-accent-amber/20"}`}>
                  <Package className={`w-3.5 h-3.5 ${item.status === "critical" ? "text-accent-rose" : "text-accent-amber"}`} />
                </div>
                <span className="text-white font-semibold text-sm tracking-tight">{item.productName}</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter ${item.status === "critical"
                    ? "bg-accent-rose text-white"
                    : "bg-accent-amber text-black"
                  }`}
              >
                {item.status === "critical" ? "Agotado" : "Bajo"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-luxury-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((item.currentStock / item.minStock) * 100, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${item.status === "critical" ? "bg-gradient-to-r from-accent-rose to-red-400" : "bg-gradient-to-r from-accent-amber to-yellow-300"
                    }`}
                />
              </div>
              <span className="text-[11px] font-mono text-luxury-300">
                {item.currentStock}<span className="text-luxury-500 mx-0.5">/</span>{item.minStock}
              </span>
            </div>
          </motion.div>
        )) : (
          <div className="py-8 text-center">
            <p className="text-sm text-luxury-500 italic">No hay alertas de stock</p>
          </div>
        )}
      </div>

      <button
        onClick={handleViewProducts}
        className="mt-6 w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-accent-violet/50 transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          Inventario Completo
          <Eye className="w-4 h-4 group-hover:text-accent-violet transition-colors" />
        </span>
      </button>
    </motion.div>
  );
}
