"use client";

import { useAppStore } from "@/store/appStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { Users, Plus, Search, Filter, Eye, Edit, RefreshCw, Crown, Star, User, UserPlus, UserMinus } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/data/mockData";

const segmentConfig = {
  vip: { label: "VIP", color: "violet", icon: Crown },
  premium: { label: "Premium", color: "cyan", icon: Star },
  regular: { label: "Regular", color: "emerald", icon: User },
  new: { label: "Nuevo", color: "amber", icon: UserPlus },
  inactive: { label: "Inactivo", color: "gray", icon: UserMinus },
};

export function CustomersView() {
  const { customers, isLoading, refreshData } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment;
    return matchesSearch && matchesSegment;
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
            <h1 className="text-xl font-bold text-white">Clientes</h1>
            <p className="text-sm text-luxury-400">{customers.length} clientes registrados</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white font-medium transition-colors">
              <Plus className="w-4 h-4" />
              Nuevo Cliente
            </button>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {Object.entries(segmentConfig).map(([key, config]) => {
              const count = customers.filter(c => c.segment === key).length;
              const SegmentIcon = config.icon;
              
              return (
                <motion.button
                  key={key}
                  onClick={() => setSelectedSegment(selectedSegment === key ? "all" : key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`glass-card p-4 text-left transition-all ${
                    selectedSegment === key ? "border-accent-violet" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <SegmentIcon className={`w-4 h-4 text-accent-${config.color}`} />
                    <span className="text-luxury-400 text-sm">{config.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{count}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white placeholder-luxury-500 focus:outline-none focus:border-accent-violet"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-luxury-400" />
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white focus:outline-none focus:border-accent-violet"
              >
                <option value="all">Todos los segmentos</option>
                {Object.entries(segmentConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Customers Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-hidden"
          >
            <table className="w-full">
              <thead className="bg-luxury-900/50">
                <tr>
                  <th className="text-left py-4 px-6 text-luxury-400 font-medium text-sm">Cliente</th>
                  <th className="text-left py-4 px-4 text-luxury-400 font-medium text-sm">Segmento</th>
                  <th className="text-right py-4 px-4 text-luxury-400 font-medium text-sm">Pedidos</th>
                  <th className="text-right py-4 px-4 text-luxury-400 font-medium text-sm">Total Comprado</th>
                  <th className="text-right py-4 px-4 text-luxury-400 font-medium text-sm">CLV</th>
                  <th className="text-center py-4 px-4 text-luxury-400 font-medium text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => {
                  const segment = segmentConfig[customer.segment];
                  const SegmentIcon = segment.icon;
                  
                  return (
                    <tr key={customer.id} className="border-t border-glass-border hover:bg-glass-100 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center text-white font-bold">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium">{customer.name}</p>
                            <p className="text-luxury-500 text-sm">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full bg-accent-${segment.color}/10 text-accent-${segment.color} text-xs flex items-center gap-1 w-fit`}>
                          <SegmentIcon className="w-3 h-3" />
                          {segment.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-luxury-300">
                        {customer.orderCount}
                      </td>
                      <td className="py-4 px-4 text-right text-white font-medium">
                        {formatCurrency(customer.totalPurchases)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-accent-violet font-medium">
                          {formatCurrency(customer.clv)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 hover:text-white transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 hover:text-white transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
