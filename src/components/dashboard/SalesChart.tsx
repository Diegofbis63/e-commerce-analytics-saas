"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Ene", ventas: 4200, prediccion: null },
  { month: "Feb", ventas: 3800, prediccion: null },
  { month: "Mar", ventas: 5100, prediccion: null },
  { month: "Abr", ventas: 4600, prediccion: null },
  { month: "May", ventas: 5800, prediccion: null },
  { month: "Jun", ventas: 6200, prediccion: null },
  { month: "Jul", ventas: 7100, prediccion: null },
  { month: "Ago", ventas: 6800, prediccion: null },
  { month: "Sep", ventas: 7900, prediccion: null },
  { month: "Oct", ventas: 8200, prediccion: null },
  { month: "Nov", ventas: null, prediccion: 9100 },
  { month: "Dic", ventas: null, prediccion: 10500 },
];

export function SalesChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Tendencia de Ventas
          </h3>
          <p className="text-sm text-luxury-400">
            Histórico + Predicción IA
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-violet" />
            <span className="text-luxury-300">Real</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-cyan" />
            <span className="text-luxury-300">Predicción</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrediccion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                backdropFilter: "blur(10px)",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#9ca3af" }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Ventas"]}
            />
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVentas)"
            />
            <Area
              type="monotone"
              dataKey="prediccion"
              stroke="#06b6d4"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorPrediccion)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
