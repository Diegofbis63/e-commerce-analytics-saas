"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const segmentData = [
  { name: "VIP", value: 342, clv: "$2,450", color: "#8b5cf6" },
  { name: "Premium", value: 856, clv: "$1,120", color: "#06b6d4" },
  { name: "Regular", value: 1240, clv: "$580", color: "#10b981" },
  { name: "Nuevo", value: 420, clv: "$180", color: "#f59e0b" },
  { name: "Inactivo", value: 180, clv: "$90", color: "#6b7280" },
];

export function CustomerSegments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Segmentación de Clientes
        </h3>
        <p className="text-sm text-luxury-400">
          Por CLV (Customer Lifetime Value)
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={segmentData} layout="vertical">
            <XAxis type="number" stroke="#6b7280" fontSize={10} />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#6b7280"
              fontSize={12}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {segmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {segmentData.map((segment) => (
          <div
            key={segment.name}
            className="flex justify-between text-sm p-2 rounded-lg bg-luxury-900/50"
          >
            <span className="text-luxury-400">{segment.name}</span>
            <span className="text-white font-medium">{segment.clv}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
