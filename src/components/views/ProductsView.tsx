"use client";

import { useAppStore } from "@/store/appStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { Package, Plus, Search, Filter, Edit, Trash2, Eye, RefreshCw } from "lucide-react";
import { useState } from "react";
import { formatCurrency, formatNumber } from "@/data/mockData";

export function ProductsView() {
  const { products, isLoading, refreshData, openModal } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map((p: any) => p.category).filter(Boolean)));

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 px-6 flex items-center justify-between border-b border-glass-border bg-luxury-900/30">
          <div>
            <h1 className="text-xl font-bold text-white">Productos</h1>
            <p className="text-sm text-luxury-400">{products.length} productos en inventario</p>
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
              onClick={() => openModal("addProduct")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-violet hover:bg-accent-violet/80 text-white font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo Producto
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
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white placeholder-luxury-500 focus:outline-none focus:border-accent-violet"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-luxury-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white focus:outline-none focus:border-accent-violet"
              >
                <option value="all">Todas las categorías</option>
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
            className="glass-card overflow-hidden"
          >
            <table className="w-full">
              <thead className="bg-luxury-900/50">
                <tr>
                  <th className="text-left py-4 px-6 text-luxury-400 font-medium text-sm">Producto</th>
                  <th className="text-left py-4 px-4 text-luxury-400 font-medium text-sm">SKU</th>
                  <th className="text-left py-4 px-4 text-luxury-400 font-medium text-sm">Categoría</th>
                  <th className="text-right py-4 px-4 text-luxury-400 font-medium text-sm">Precio</th>
                  <th className="text-right py-4 px-4 text-luxury-400 font-medium text-sm">Stock</th>
                  <th className="text-center py-4 px-4 text-luxury-400 font-medium text-sm">Estado</th>
                  <th className="text-center py-4 px-4 text-luxury-400 font-medium text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => (
                  <tr key={product.id} className="border-t border-glass-border hover:bg-glass-100 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-violet/20 flex items-center justify-center">
                          <Package className="w-5 h-5 text-accent-violet" />
                        </div>
                        <span className="text-white font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-luxury-300 font-mono text-sm">{product.sku}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-white font-medium">
                      {formatCurrency(product.price || 0)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${
                        (product.stockQuantity || 0) <= (product.minStockLevel || 0) 
                          ? (product.stockQuantity || 0) === 0 
                            ? "text-accent-rose" 
                            : "text-accent-amber"
                          : "text-luxury-300"
                      }`}>
                        {formatNumber(product.stockQuantity || 0)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {(product.stockQuantity || 0) === 0 ? (
                        <span className="px-2 py-1 rounded-full bg-accent-rose/20 text-accent-rose text-xs">
                          Sin stock
                        </span>
                      ) : (product.stockQuantity || 0) <= (product.minStockLevel || 0) ? (
                        <span className="px-2 py-1 rounded-full bg-accent-amber/20 text-accent-amber text-xs">
                          Bajo
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-accent-emerald/20 text-accent-emerald text-xs">
                          Disponible
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => openModal("viewProduct", product)}
                          className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openModal("editProduct", product)}
                          className="p-2 rounded-lg hover:bg-glass-100 text-luxury-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { openModal("viewProduct", product); }}
                          className="p-2 rounded-lg hover:bg-glass-100 text-accent-rose hover:text-accent-rose transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
