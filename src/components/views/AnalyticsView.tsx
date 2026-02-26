"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, ShoppingBag, Globe, ArrowUpRight, Zap, Activity } from "lucide-react";
import { formatCurrency } from "@/data/mockData";

export function AnalyticsView() {
    const { activeView } = useAppStore();
    const isPredictions = activeView === "predictions";

    const stats = [
        { label: "Visitas Totales", value: "2.4M", change: "+12.5%", icon: Globe, color: "accent-cyan" },
        { label: "Conversión", value: "3.2%", change: "+2.4%", icon: Zap, color: "accent-violet" },
        { label: "Tiempo In", value: "4:12", change: "+1.2%", icon: Activity, color: "accent-emerald" },
        { label: "Revenue/Visita", value: "$4.8", change: "+5.6%", icon: TrendingUp, color: "accent-cyan" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                        {isPredictions ? "PREDICCIONES IA" : "ANALYTICS"} <span className="text-accent-violet">/</span>
                    </h1>
                    <p className="text-sm text-luxury-400 font-medium">
                        {isPredictions ? "Modelos predictivos y proyección de tendencia" : "Análisis profundo de métricas y rendimiento"}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg bg-${stat.color}/10 border border-${stat.color}/20 text-${stat.color}`}>
                                <stat.icon className="w-4 h-4" />
                            </div>
                            <span className="text-accent-emerald text-[10px] font-black tracking-widest">{stat.change}</span>
                        </div>
                        <p className="text-luxury-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 via-transparent to-transparent opacity-50" />
                    <BarChart3 className="w-12 h-12 text-luxury-700 mb-4 animate-pulse" />
                    <p className="text-luxury-400 font-medium italic tracking-tight">Cargando modelos de Deep Learning...</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-rose/5 via-transparent to-transparent opacity-50" />
                    <div className="w-full h-48 mb-8 relative">
                        {/* Visual placeholder for prediction chart */}
                        <div className="absolute inset-0 flex items-end justify-around px-8">
                            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                                    className="w-4 bg-gradient-to-t from-accent-violet to-accent-cyan rounded-t-full opacity-40"
                                />
                            ))}
                        </div>
                    </div>
                    <p className="text-white font-black text-xl italic tracking-tighter mb-2 uppercase">Proyección Q3 2026</p>
                    <p className="text-luxury-400 text-sm font-medium text-center px-12">
                        Nuestro motor predictivo anticipa un crecimiento del <span className="text-accent-emerald font-black">24%</span> en ventas orgánicas para el próximo trimestre.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
