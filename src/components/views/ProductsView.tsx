"use client";

import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import {
  Plus, Search, Filter, MoreHorizontal,
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Package, Tag, Eye, Edit, Trash2
} from "lucide-react";
import { formatCurrency } from "@/data/mockData";

export function ProductsView() {
  const { products, openModal, deleteProduct } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id?.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map((p: any) => p.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white italic tracking-tighter">
            PRODUCTOS <span className="text-accent-violet">/</span>
          </h1>
          <p className="text-sm text-luxury-400 font-medium">Gestión avanzada de inventario y catálogo</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal("addProduct")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-accent-violet hover:bg-accent-violet/80 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-accent-violet/20"
          >
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-glass-100 border border-white/5 text-white placeholder-luxury-500 focus:outline-none focus:border-accent-violet transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-glass-100 border border-white/5 text-white focus:outline-none focus:border-accent-violet appearance-none transition-all"
          >
            <option value="all">Categorías</option>
            {categories.map((cat: any) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden border border-white/5 shadow-2xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left py-5 px-6 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Producto</th>
                <th className="text-left py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Categoría</th>
                <th className="text-right py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Precio</th>
                <th className="text-right py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Stock</th>
                <th className="text-center py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Estado</th>
                <th className="text-center py-5 px-4 text-luxury-500 font-black text-[10px] uppercase tracking-[0.2em]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product: any) => (
                <tr key={product.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-luxury-900 border border-white/5 flex items-center justify-center p-2 group-hover:border-accent-violet/50 transition-colors">
                        <Package className="w-6 h-6 text-luxury-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold tracking-tight">{product.name}</p>
                        <p className="text-[10px] text-luxury-500 font-black uppercase tracking-widest">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-luxury-300 text-[10px] font-black uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-white font-black tracking-tighter italic">{formatCurrency(product.price)}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-black tracking-tighter italic ${product.stock < 10 ? 'text-accent-rose' : 'text-luxury-300'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${product.stock > 0 ? "bg-accent-emerald/10 text-accent-emerald" : "bg-accent-rose/10 text-accent-rose"
                        }`}>
                        {product.stock > 0 ? "Disponible" : "Agotado"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openModal("viewProduct", product)}
                        className="p-2.5 rounded-xl hover:bg-white/5 text-luxury-400 hover:text-white transition-all outline-none"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("editProduct", product)}
                        className="p-2.5 rounded-xl hover:bg-white/5 text-luxury-400 hover:text-white transition-all outline-none"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2.5 rounded-xl hover:bg-accent-rose/10 text-luxury-400 hover:text-accent-rose transition-all outline-none"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
