"use client";

import { motion } from "framer-motion";
import { ArrowUpDown, ChevronUp } from "lucide-react";

const topProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro 256GB",
    category: "Electrónica",
    sales: 234,
    revenue: "$215,780",
    growth: "+23%",
  },
  {
    id: 2,
    name: "MacBook Air M3",
    category: "Electrónica",
    sales: 156,
    revenue: "$187,344",
    growth: "+18%",
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    category: "Electrónica",
    sales: 142,
    revenue: "$156,578",
    growth: "+12%",
  },
  {
    id: 4,
    name: "AirPods Pro 2da Gen",
    category: "Audio",
    sales: 289,
    revenue: "$72,311",
    growth: "+31%",
  },
  {
    id: 5,
    name: "iPad Pro 12.9",
    category: "Electrónica",
    sales: 98,
    revenue: "$147,098",
    growth: "+8%",
  },
];

export function TopProducts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Productos Más Vendidos
          </h3>
          <p className="text-sm text-luxury-400">
            Top 5 por ingresos
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-glass-100 border border-glass-border text-luxury-400 text-sm hover:bg-glass-200 transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          Ordenar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="text-left py-3 px-4 text-luxury-400 font-medium text-sm">
                Producto
              </th>
              <th className="text-left py-3 px-4 text-luxury-400 font-medium text-sm">
                Categoría
              </th>
              <th className="text-right py-3 px-4 text-luxury-400 font-medium text-sm">
                Ventas
              </th>
              <th className="text-right py-3 px-4 text-luxury-400 font-medium text-sm">
                Ingresos
              </th>
              <th className="text-right py-3 px-4 text-luxury-400 font-medium text-sm">
                Crecimiento
              </th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-glass-border/50 hover:bg-glass-100 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-luxury-500 text-sm">#{index + 1}</span>
                    <span className="text-white font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 rounded-full bg-accent-violet/10 text-accent-violet text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-right text-luxury-300">
                  {product.sales}
                </td>
                <td className="py-4 px-4 text-right text-white font-medium">
                  {product.revenue}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="flex items-center justify-end gap-1 text-accent-emerald text-sm">
                    <ChevronUp className="w-4 h-4" />
                    {product.growth}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
