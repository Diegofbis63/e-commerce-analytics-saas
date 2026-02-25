"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, Calendar } from "lucide-react";

const predictionData = {
  nextMonth: "$15,420",
  confidence: "87%",
  trend: "+18%",
  factors: [
    { name: "Temporada alta", impact: "+12%" },
    { name: "Nuevos productos", impact: "+8%" },
    { name: "Marketing", impact: "+5%" },
  ],
};

export function SalesPrediction() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Predicción IA
          </h3>
          <p className="text-sm text-luxury-400">
            Próximo mes
          </p>
        </div>
        <div className="p-2 rounded-lg bg-accent-violet/10">
          <Brain className="w-5 h-5 text-accent-violet" />
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-luxury-400 text-sm mb-1">Ventas Previstas</p>
        <p className="text-4xl font-bold text-gradient">{predictionData.nextMonth}</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <span className="flex items-center gap-1 text-accent-emerald text-sm">
            <TrendingUp className="w-4 h-4" />
            {predictionData.trend}
          </span>
          <span className="text-luxury-500 text-sm">
            Confianza: {predictionData.confidence}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-luxury-400 mb-3">Factores principales:</p>
        {predictionData.factors.map((factor, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-luxury-900/50"
          >
            <span className="text-luxury-300 text-sm">{factor.name}</span>
            <span className="text-accent-emerald text-sm font-medium">
              {factor.impact}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-glass-border">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-glass-100 border border-glass-border text-luxury-300 text-sm font-medium hover:bg-glass-200 transition-colors">
          <Calendar className="w-4 h-4" />
          Ver Predicciones Detalladas
        </button>
      </div>
    </motion.div>
  );
}
