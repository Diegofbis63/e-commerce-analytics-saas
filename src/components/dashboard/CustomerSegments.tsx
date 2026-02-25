"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function CustomerSegments() {
  const { customerSegments } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-violet to-accent-cyan opacity-30" />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Customer Segmentation <span className="text-luxury-500 text-xs ml-1">(CLV)</span>
          </h3>
          <p className="text-[10px] text-luxury-400 font-bold uppercase tracking-[0.15em] mt-1">
            Segmentación de Clientes por Valor
          </p>
        </div>
      </div>

      <div className="h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/5 to-transparent pointer-events-none" />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={customerSegments} layout="vertical" margin={{ left: -10, right: 10 }}>
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#94a3b8"
              fontSize={11}
              width={80}
              tickLine={false}
              axisLine={false}
              tick={{ fontWeight: 'bold' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 10, 15, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              formatter={(value: number) => [`${value} Customers`, "Population"]}
            />
            <Bar dataKey="count" name="Customers" radius={[0, 6, 6, 0]} barSize={32}>
              {customerSegments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 space-y-2">
        {customerSegments.map((segment) => (
          <div
            key={segment.name}
            className="group flex flex-col p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-default"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="text-white font-bold text-sm">{segment.name}</span>
              </div>
              <span className="text-white font-black text-sm">{segment.clv}</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-luxury-500 font-bold uppercase">Average Value</span>
              <span className="text-accent-emerald font-bold">Growth: +12%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
