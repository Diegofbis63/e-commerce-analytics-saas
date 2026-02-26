"use client";

import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import {
  Plus, Search, Filter, ShoppingCart,
  Eye, RefreshCw, Clock, CheckCircle2, AlertCircle
} from "lucide-react";
import { formatCurrency } from "@/data/mockData";

const statusConfig: any = {
  pending: { label: "Pendiente", color: "amber", icon: Clock },
  processing: { label: "En Proceso", color: "cyan", icon: RefreshCw },
  shipped: { label: "Enviado", color: "violet", icon: ShoppingCart },
  delivered: { label: "Entregado", color: "emerald", icon: CheckCircle2 },
  cancelled: { label: "Cancelado", color: "rose", icon: AlertCircle },
};

export function OrdersView() {
  const { orders, refreshData, openModal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id?.includes(searchQuery);
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white italic tracking-tighter">
            PEDIDOS <span className="text-accent-violet">/</span>
          </h1>
          <p className="text-sm text-luxury-400 font-medium">Segmentación y seguimiento de transacciones</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal("addOrder")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-accent-violet hover:bg-accent-violet/80 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-accent-violet/20"
          >
            <Plus className="w-4 h-4" />
            Nuevo Pedido
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
          <input
            type="text"
            placeholder="Buscar por ID de pedido o nombre de cliente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-glass-100 border border-white/5 text-white placeholder-luxury-500 focus:outline-none focus:border-accent-violet transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-glass-100 border border-white/5 text-white focus:outline-none focus:border-accent-violet appearance-none transition-all"
          >
            <option value="all">Todos los estados</option>
            {Object.entries(statusConfig).map(([key, config]: [string, any]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order: any) => {
          const status = statusConfig[order.status] || statusConfig.pending;
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => openModal("viewOrder", order)}
              className="glass-card p-6 group hover:scale-[1.02] transition-all cursor-pointer border border-white/5 hover:border-accent-violet/30"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-luxury-900 border border-white/5 text-luxury-400 group-hover:text-accent-violet transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-luxury-500 text-[10px] font-black uppercase tracking-widest block">Pedido ID</span>
                    <span className="text-white font-mono font-bold">#{order.id}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full bg-accent-${status.color}/10 border border-accent-${status.color}/20 text-accent-${status.color} text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-white font-black text-lg tracking-tighter italic">{order.customerName}</p>
                <p className="text-luxury-500 text-xs font-medium">{order.orderDate}</p>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <div>
                  <p className="text-luxury-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Transacción</p>
                  <p className="text-2xl font-black text-white italic tracking-tighter text-gradient">{formatCurrency(order.total || 0)}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 text-luxury-400 group-hover:text-white transition-all">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
