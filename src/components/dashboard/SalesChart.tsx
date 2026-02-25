"use client";

import { useAppStore } from "@/store/appStore";
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
import { formatCurrency } from "@/data/mockData";

export function SalesChart() {
  const { salesData } = useAppStore();

  const data = salesData.map((d) => ({
    month: d.month,
    ventas: d.sales,
    prediccion: d.prediction,
  }));

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

      <div className="h-80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-violet/5 to-transparent pointer-events-none" />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="60%" stopColor="#8b5cf6" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrediccion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#4b5563"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#4b5563"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 10, 15, 0.85)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "16px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold", marginBottom: "4px" }}
              itemStyle={{ padding: "2px 0" }}
              formatter={(value: number) => [value ? formatCurrency(value) : "N/A", ""]}
              cursor={{ stroke: '#8b5cf6', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorVentas)"
              activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
              name="Ventas Reales"
              animationDuration={2000}
            />
            <Area
              type="monotone"
              dataKey="prediccion"
              stroke="#06b6d4"
              strokeWidth={3}
              strokeDasharray="8 8"
              fillOpacity={1}
              fill="url(#colorPrediccion)"
              activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
              name="Predicción"
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
