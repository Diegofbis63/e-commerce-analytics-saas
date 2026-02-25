"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Calendar, RefreshCw, ExternalLink } from "lucide-react";
import { formatCurrency } from "@/data/mockData";

export function SalesPrediction() {
  const { prediction, isLoading, refreshData } = useAppStore();

  const handleRefresh = () => {
    refreshData();
  };

  const handleViewPredictions = () => {
    console.log("Navigate to detailed predictions");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-12 bg-accent-violet/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent-violet/10 transition-all duration-700" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            AI Sales Predictions <span className="text-accent-violet animate-pulse text-xs">●</span>
          </h3>
          <p className="text-[10px] text-luxury-400 font-bold uppercase tracking-[0.15em] mt-1">
            Pronósticos Predictivos de IA
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-luxury-300 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </motion.button>
          <div className="p-2.5 rounded-2xl bg-accent-violet/20 border border-accent-violet/30 shadow-lg shadow-accent-violet/10">
            <Brain className="w-4 h-4 text-accent-violet" />
          </div>
        </div>
      </div>

      <div className="text-center mb-10 relative z-10">
        <p className="text-[10px] text-luxury-500 font-black uppercase tracking-[0.2em] mb-2">Next Month Projected Revenue</p>
        <p className="text-5xl font-black tracking-tighter text-white italic">
          <span className="text-gradient drop-shadow-sm">{formatCurrency(prediction.nextMonthPrediction)}</span>
        </p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
            <TrendingUp className="w-3.5 h-3.5 text-accent-emerald" />
            <span className="text-accent-emerald text-xs font-black">+{prediction.trend}%</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="text-luxury-400 text-[10px] font-bold uppercase tracking-widest">Confidence:</span>
            <span className="text-white text-xs font-black">{prediction.confidence}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <p className="text-[10px] text-luxury-500 font-black uppercase tracking-[0.15em] mb-1">Key Growth Drivers</p>
        {prediction.factors.map((factor, index) => (
          <div
            key={index}
            className="group/item flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all"
          >
            <span className="text-luxury-200 text-sm font-semibold tracking-tight">{factor.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-accent-emerald text-xs font-black uppercase tracking-tighter">
                {factor.impact}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
        <button
          onClick={handleViewPredictions}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-accent-violet text-white text-xs font-black uppercase tracking-widest hover:bg-accent-indigo transition-all shadow-lg shadow-accent-violet/20 group/btn"
        >
          <Calendar className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          View Detailed Analytics
          <ExternalLink className="w-3.5 h-3.5 opacity-50" />
        </button>
      </div>
    </motion.div>
  );
}
