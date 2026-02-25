"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function RevenueByCategory() {
  const { categoryRevenue } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-indigo/5 rounded-full blur-3xl" />

      <div className="mb-8">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Revenue Distribution <span className="text-luxury-500 text-xs ml-1">(Cat)</span>
        </h3>
        <p className="text-[10px] text-luxury-400 font-bold uppercase tracking-[0.15em] mt-1">
          Distribución de Ingresos por Categoría
        </p>
      </div>

      <div className="h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryRevenue}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              nameKey="name"
              stroke="none"
              animationBegin={500}
              animationDuration={1500}
            >
              {categoryRevenue.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 10, 15, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(20px)",
              }}
              formatter={(value: number) => [`${value}%`, "Market Share"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <p className="text-[10px] text-luxury-500 font-black uppercase tracking-widest">Total</p>
          <p className="text-2xl font-black text-white">$142.5k</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {categoryRevenue.map((cat) => (
          <div key={cat.name} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}40` }} />
            <div className="flex flex-col">
              <span className="text-white text-[11px] font-bold tracking-tight">{cat.name}</span>
              <span className="text-luxury-500 text-[9px] font-black uppercase">Top Performer</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
