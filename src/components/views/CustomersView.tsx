"use client";

import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import {
  Plus, Search, Filter, Eye, Edit,
  Crown, User, UserPlus, Users, Ghost
} from "lucide-react";
import { formatCurrency } from "@/data/mockData";

const segmentConfig: any = {
  vip: { label: "VIP (Ballena)", color: "violet", icon: Crown },
  loyal: { label: "Leal", color: "emerald", icon: Users },
  new: { label: "Nuevo", color: "cyan", icon: UserPlus },
  regular: { label: "Regular", color: "amber", icon: User },
  at_risk: { label: "En Riesgo", color: "rose", icon: Ghost },
};

export function CustomersView() {
  const { customers, openModal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");

  const filteredCustomers = customers.filter((customer: any) => {
    const matchesSearch = customer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white italic tracking-tighter">
            CLIENTES <span className="text-accent-violet">/</span>
          </h1>
          <p className="text-sm text-luxury-400 font-medium">Análisis de segmentos y fidelización</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal("addCustomer")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-accent-violet hover:bg-accent-violet/80 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-accent-violet/20"
          >
            <Plus className="w-4 h-4" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(segmentConfig).map(([key, config]: [string, any]) => {
          const count = customers.filter((c: any) => c.segment === key).length;
          const SegmentIcon = config.icon;

          return (
            <motion.button
              key={key}
              onClick={() => setSelectedSegment(selectedSegment === key ? "all" : key)}
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-card p-4 text-left transition-all border ${selectedSegment === key ? "border-accent-violet bg-accent-violet/5 scale-105 z-10" : "border-white/5"
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-accent-${config.color}/10 border border-accent-${config.color}/20 text-accent-${config.color}`}>
                  <SegmentIcon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-luxury-500 text-[10px] font-black uppercase tracking-widest block mb-1">{config.label}</span>
                <p className="text-2xl font-black text-white italic tracking-tighter">{count}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-glass-100 border border-white/5 text-white placeholder-luxury-500 focus:outline-none focus:border-accent-violet transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-glass-100 border border-white/5 text-white focus:outline-none focus:border-accent-violet appearance-none transition-all"
          >
            <option value="all">Todos los segmentos</option>
            {Object.entries(segmentConfig).map(([key, config]: [string, any]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden border border-white/5 shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left py-5 px-6 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Cliente</th>
                <th className="text-left py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Segmento</th>
                <th className="text-right py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Pedidos</th>
                <th className="text-right py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Inversión Total</th>
                <th className="text-right py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Value (CLV)</th>
                <th className="text-center py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCustomers.map((customer: any) => {
                const segment = segmentConfig[customer.segment] || segmentConfig.new;
                const SegmentIcon = segment.icon;

                return (
                  <tr key={customer.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-violet to-accent-cyan p-[1px] group-hover:scale-110 transition-transform">
                          <div className="w-full h-full rounded-2xl bg-luxury-900 flex items-center justify-center text-white font-black italic">
                            {customer.name?.charAt(0) || "?"}
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-bold tracking-tight">{customer.name}</p>
                          <p className="text-[10px] text-luxury-500 font-medium">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full bg-accent-${segment.color}/10 border border-accent-${segment.color}/20 text-accent-${segment.color} text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit`}>
                        <SegmentIcon className="w-3 h-3" />
                        {segment.label}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-luxury-300 font-black tracking-tighter italic">{customer.orderCount || customer.order_count || 0}</span>
                    </td>
                    <td className="py-4 px-4 text-right text-white font-black tracking-tighter italic">
                      {formatCurrency(customer.totalPurchases || customer.total_purchases || 0)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-accent-violet font-black tracking-tighter italic text-gradient">
                        {formatCurrency(customer.clv || 0)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openModal("viewCustomer", customer)}
                          className="p-2.5 rounded-xl hover:bg-white/5 text-luxury-400 hover:text-white transition-all outline-none"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openModal("editCustomer", customer)}
                          className="p-2.5 rounded-xl hover:bg-white/5 text-luxury-400 hover:text-white transition-all outline-none"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
