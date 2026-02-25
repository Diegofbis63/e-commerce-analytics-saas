"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { ArrowUpDown, ChevronUp, ChevronDown, RefreshCw } from "lucide-react";
import { useState } from "react";
import { formatCurrency, formatNumber } from "@/data/mockData";

type SortField = "name" | "category" | "sales" | "revenue" | "growth";
type SortDirection = "asc" | "desc";

export function TopProducts() {
  const { topProducts, isLoading, refreshData } = useAppStore();
  const [sortField, setSortField] = useState<SortField>("revenue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedProducts = [...topProducts].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      case "sales":
        comparison = a.sales - b.sales;
        break;
      case "revenue":
        comparison = a.revenue - b.revenue;
        break;
      case "growth":
        comparison = a.growth - b.growth;
        break;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleRefresh = () => {
    refreshData();
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Productos Más Vendidos
          </h3>
          <p className="text-sm text-luxury-400">
            Top 5 por ingresos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-glass-100 border border-glass-border text-luxury-400 text-sm hover:bg-glass-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
          <button 
            onClick={() => handleSort("revenue")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-glass-100 border border-glass-border text-luxury-400 text-sm hover:bg-glass-200 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Ordenar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="text-left py-3 px-4 text-luxury-400 font-medium text-sm">
                #
              </th>
              <th 
                className="text-left py-3 px-4 text-luxury-400 font-medium text-sm cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Producto
                  <SortIcon field="name" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-luxury-400 font-medium text-sm cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-1">
                  Categoría
                  <SortIcon field="category" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-luxury-400 font-medium text-sm cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("sales")}
              >
                <div className="flex items-center justify-end gap-1">
                  Ventas
                  <SortIcon field="sales" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-luxury-400 font-medium text-sm cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("revenue")}
              >
                <div className="flex items-center justify-end gap-1">
                  Ingresos
                  <SortIcon field="revenue" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-luxury-400 font-medium text-sm cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort("growth")}
              >
                <div className="flex items-center justify-end gap-1">
                  Crecimiento
                  <SortIcon field="growth" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-glass-border/50 hover:bg-glass-100 transition-colors cursor-pointer"
              >
                <td className="py-4 px-4 text-luxury-500 text-sm">
                  {index + 1}
                </td>
                <td className="py-4 px-4">
                  <span className="text-white font-medium">{product.name}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 rounded-full bg-accent-violet/10 text-accent-violet text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-right text-luxury-300">
                  {formatNumber(product.sales)}
                </td>
                <td className="py-4 px-4 text-right text-white font-medium">
                  {formatCurrency(product.revenue)}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`flex items-center justify-end gap-1 text-sm ${
                    product.growth >= 0 ? "text-accent-emerald" : "text-accent-rose"
                  }`}>
                    {product.growth >= 0 ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                    {Math.abs(product.growth)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
