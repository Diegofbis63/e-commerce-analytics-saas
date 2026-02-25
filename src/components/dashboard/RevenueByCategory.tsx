"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const categoryData = [
  { name: "Electrónica", value: 35, color: "#8b5cf6" },
  { name: "Ropa", value: 25, color: "#06b6d4" },
  { name: "Hogar", value: 20, color: "#10b981" },
  { name: "Deportes", value: 12, color: "#f59e0b" },
  { name: "Otros", value: 8, color: "#6b7280" },
];

export function RevenueByCategory() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white">
          Ingresos por Categoría
        </h3>
        <p className="text-sm text-luxury-400">
          Distribución de ventas
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Porcentaje"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-luxury-300 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
