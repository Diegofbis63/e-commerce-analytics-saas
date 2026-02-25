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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`glass-card p-6 ${colors.glow} transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <span
          className={`text-sm font-medium ${
            trend === "up" ? "text-accent-emerald" : "text-accent-rose"
          }`}
        >
          {change}
        </span>
      </div>
      <h3 className="text-luxury-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
}
