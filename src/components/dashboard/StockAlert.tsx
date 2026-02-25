"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Package, X } from "lucide-react";

const stockAlerts = [
  { id: 1, product: "iPhone 15 Pro", current: 5, min: 20, status: "critical" },
  { id: 2, product: "Samsung Galaxy S24", current: 8, min: 15, status: "warning" },
  { id: 3, product: "MacBook Air M3", current: 3, min: 10, status: "critical" },
  { id: 4, product: "AirPods Pro 2", current: 12, min: 25, status: "warning" },
  { id: 5, product: "iPad Air", current: 6, min: 12, status: "warning" },
];

export function StockAlert() {
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
        <div className="p-2 rounded-lg bg-accent-rose/10">
          <AlertTriangle className="w-5 h-5 text-accent-rose" />
        </div>
      </div>

      <div className="space-y-3">
        {stockAlerts.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl border ${
              item.status === "critical"
                ? "bg-accent-rose/10 border-accent-rose/30"
                : "bg-accent-amber/10 border-accent-amber/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className={`w-4 h-4 ${item.status === "critical" ? "text-accent-rose" : "text-accent-amber"}`} />
                <span className="text-white font-medium text-sm">{item.product}</span>
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
                  style={{ width: `${(item.current / item.min) * 100}%` }}
                />
              </div>
              <span className="text-xs text-luxury-400">
                {item.current}/{item.min}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2 px-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30 text-accent-violet text-sm font-medium hover:bg-accent-violet/20 transition-colors">
        Ver Todos los Productos
      </button>
    </motion.div>
  );
}
