"use client";

import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: "dollar" | "shopping-cart" | "users" | "trending-up";
  color: "cyan" | "violet" | "emerald" | "amber";
}

const colorClasses = {
  cyan: {
    bg: "bg-accent-cyan/10",
    text: "text-accent-cyan",
    glow: "shadow-glow-cyan",
  },
  violet: {
    bg: "bg-accent-violet/10",
    text: "text-accent-violet",
    glow: "glow-violet",
  },
  emerald: {
    bg: "bg-accent-emerald/10",
    text: "text-accent-emerald",
    glow: "glow-emerald",
  },
  amber: {
    bg: "bg-accent-amber/10",
    text: "text-accent-amber",
    glow: "glow-cyan",
  },
};

const iconMap = {
  dollar: DollarSign,
  "shopping-cart": ShoppingCart,
  users: Users,
  "trending-up": TrendingUp,
};

export function KpiCard({ title, value, change, trend, icon, color }: KpiCardProps) {
  const colors = colorClasses[color];
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        translateY: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
      }}
      className={`relative overflow-hidden glass-card p-6 ${colors.glow} group transition-all duration-500`}
    >
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`p-4 rounded-2xl ${colors.bg} relative overflow-hidden group-hover:glow-cyan transition-all duration-300`}>
          <Icon className={`w-6 h-6 ${colors.text} relative z-10`} />
        </div>
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${trend === "up" ? "bg-accent-emerald/20 text-accent-emerald" : "bg-accent-rose/20 text-accent-rose"
          }`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
          {change}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-luxury-400 text-sm font-semibold tracking-wide uppercase mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white tracking-tight leading-none italic">
          <span className="text-gradient">{value}</span>
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
    </motion.div>
  );
}
