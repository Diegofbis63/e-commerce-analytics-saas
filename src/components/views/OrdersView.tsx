"use client";

import { useAppStore } from "@/store/appStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Search, Filter, Eye, RefreshCw, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/data/mockData";

const statusConfig: any = {
  pending: { label: "Pendiente", color: "amber", icon: Clock },
  processing: { label: "Procesando", color: "cyan", icon: Package },
  shipped: { label: "Enviado", color: "violet", icon: Truck },
  delivered: { label: "Entregado", color: "emerald", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "rose", icon: XCircle },
};

export function OrdersView() {
  const { orders, isLoading, refreshData, openModal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = orders.filter((order: any) => {
    const matchesSearch = order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           order.id?.includes(searchQuery);
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 px-6 flex items-center justify-between border-b border-glass-border bg-luxury-900/30">
          <div>
            <h1 className="text-xl font-bold text-white">Pedidos</h1>
            <p className="text-sm text-luxury-400">{orders.length} pedidos totales</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={() => openModal("addOrder")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo Pedido
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
              <input
                type="text"
                placeholder="Buscar pedidos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white placeholder-luxury-500 focus:outline-none focus:border-accent-violet"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-luxury-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white focus:outline-none focus:border-accent-violet"
              >
                <option value="all">Todos los estados</option>
                {Object.entries(statusConfig).map(([key, config]: [string, any]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order: any) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => openModal("viewOrder", order)}
                  className="glass-card p-4 hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-luxury-400" />
                      <span className="text-luxury-400 text-sm">#{order.id}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full bg-accent-${status.color}/20 text-accent-${status.color} text-xs flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-white font-medium">{order.customerName}</p>
                    <p className="text-luxury-400 text-sm">{order.orderDate}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                    <div>
                      <p className="text-luxury-500 text-xs">Total</p>
                      <p className="text-lg font-bold text-white">{formatCurrency(order.total || 0)}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 hover:text-white transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
