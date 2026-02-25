"use client";

import { create } from "zustand";
import { 
  mockData, 
  supabase,
  KpiData,
  SalesData,
  CategoryRevenue,
  CustomerSegment,
  StockAlert,
  PredictionData,
  TopProduct,
  Product,
  Customer,
  Order
} from "@/data/mockData";

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

interface AppState {
  // Data
  kpi: KpiData;
  salesData: SalesData[];
  categoryRevenue: CategoryRevenue[];
  customerSegments: CustomerSegment[];
  stockAlerts: StockAlert[];
  prediction: PredictionData;
  topProducts: TopProduct[];
  products: any[];
  customers: any[];
  orders: any[];
  categories: { id: string; name: string; productCount: number }[];
  
  // UI State
  isLoading: boolean;
  isDemo: boolean;
  activeView: "dashboard" | "products" | "orders" | "customers" | "analytics" | "settings";
  selectedDateRange: string;
  sidebarOpen: boolean;
  notification: { message: string; type: "success" | "error" | "info" } | null;
  
  // Modal State
  modalOpen: string | null;
  selectedItem: any;
  
  // Actions
  setActiveView: (view: AppState["activeView"]) => void;
  setDateRange: (range: string) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  showNotification: (message: string, type: "success" | "error" | "info") => void;
  clearNotification: () => void;
  openModal: (modal: string, item?: any) => void;
  closeModal: () => void;
  
  // CRUD Actions
  refreshData: () => Promise<void>;
  addProduct: (product: any) => Promise<void>;
  updateProduct: (id: string, product: any) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCustomer: (customer: any) => Promise<void>;
  updateCustomer: (id: string, customer: any) => Promise<void>;
  addOrder: (order: any) => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial Data
  kpi: mockData.kpi,
  salesData: mockData.salesData,
  categoryRevenue: mockData.categoryRevenue,
  customerSegments: mockData.customerSegments,
  stockAlerts: mockData.stockAlerts,
  prediction: mockData.prediction,
  topProducts: mockData.topProducts,
  products: mockData.products,
  customers: mockData.customers,
  orders: mockData.orders,
  categories: mockData.categories,
  
  // Initial UI State
  isLoading: false,
  isDemo: isDemoMode,
  activeView: "dashboard",
  selectedDateRange: "last30days",
  sidebarOpen: true,
  notification: null,
  modalOpen: null,
  selectedItem: null,
  
  // Actions
  setActiveView: (view) => set({ activeView: view }),
  setDateRange: (range) => {
    set({ selectedDateRange: range });
    get().refreshData();
  },
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
  
  showNotification: (message, type) => {
    set({ notification: { message, type } });
    setTimeout(() => {
      set({ notification: null });
    }, 3000);
  },
  
  clearNotification: () => set({ notification: null }),
  
  openModal: (modal, item = null) => set({ modalOpen: modal, selectedItem: item }),
  closeModal: () => set({ modalOpen: null, selectedItem: null }),
  
  refreshData: async () => {
    const { isDemo } = get();
    if (isDemo) {
      set({ isLoading: true });
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ 
        kpi: mockData.kpi,
        salesData: mockData.salesData,
        categoryRevenue: mockData.categoryRevenue,
        customerSegments: mockData.customerSegments,
        stockAlerts: mockData.stockAlerts,
        prediction: mockData.prediction,
        topProducts: mockData.topProducts,
        isLoading: false 
      });
      return;
    }
    
    set({ isLoading: true });
    
    try {
      // Fetch products
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);
      
      // Fetch customers
      const { data: customers } = await supabase
        .from('customers')
        .select('*');
      
      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false })
        .limit(50);
      
      // Fetch categories
      const { data: categories } = await supabase
        .from('categories')
        .select('*');
      
      // Calculate KPIs
      const totalSales = orders?.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0) || 0;
      const totalOrders = orders?.filter(o => o.status !== 'cancelled').length || 0;
      const vipCustomers = customers?.filter(c => c.segment === 'vip').length || 0;
      const avgTicket = totalOrders > 0 ? totalSales / totalOrders : 0;
      
      // Stock alerts
      const stockAlerts = products
        ?.filter(p => p.stock_quantity <= p.min_stock_level)
        .map(p => ({
          id: p.id,
          productName: p.name,
          currentStock: p.stock_quantity,
          minStock: p.min_stock_level,
          status: p.stock_quantity === 0 ? 'critical' as const : 'warning' as const
        })) || [];
      
      // Customer segments
      const segmentCounts = customers?.reduce((acc, c) => {
        acc[c.segment] = (acc[c.segment] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};
      
      const customerSegments = [
        { name: 'VIP', count: segmentCounts['vip'] || 0, clv: '$2,450', color: '#8b5cf6' },
        { name: 'Premium', count: segmentCounts['premium'] || 0, clv: '$1,120', color: '#06b6d4' },
        { name: 'Regular', count: segmentCounts['regular'] || 0, clv: '$580', color: '#10b981' },
        { name: 'Nuevo', count: segmentCounts['new'] || 0, clv: '$180', color: '#f59e0b' },
        { name: 'Inactivo', count: segmentCounts['inactive'] || 0, clv: '$90', color: '#6b7280' },
      ] as CustomerSegment[];
      
      // Top products
      const topProducts = products?.slice(0, 5).map((p, i) => ({
        id: p.id,
        name: p.name,
        category: 'General',
        sales: Math.floor(Math.random() * 200) + 50,
        revenue: p.price * Math.floor(Math.random() * 100 + 50),
        growth: Math.floor(Math.random() * 30)
      })) || [];
      
      set({
        products: products || [],
        customers: customers || [],
        orders: orders || [],
        categories: categories?.map(c => ({ ...c, productCount: 0 })) || [],
        kpi: {
          totalSales,
          totalSalesChange: 12.5,
          totalOrders,
          totalOrdersChange: 8.2,
          vipCustomers,
          vipCustomersChange: 15.3,
          avgTicket,
          avgTicketChange: -2.1
        },
        stockAlerts,
        customerSegments,
        topProducts,
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ isLoading: false });
      get().showNotification('Error al cargar datos', 'error');
    }
  },
  
  addProduct: async (product) => {
    const { isDemo, refreshData, showNotification } = get();
    
    if (isDemo) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        products: [...state.products, { ...product, id: String(Date.now()) }]
      }));
      showNotification('Producto agregado correctamente', 'success');
      return;
    }
    
    try {
      const { error } = await supabase.from('products').insert([product]);
      if (error) throw error;
      await refreshData();
      showNotification('Producto agregado correctamente', 'success');
    } catch (error) {
      console.error('Error adding product:', error);
      showNotification('Error al agregar producto', 'error');
    }
  },
  
  updateProduct: async (id, product) => {
    const { isDemo, refreshData, showNotification } = get();
    
    if (isDemo) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        products: state.products.map(p => p.id === id ? { ...p, ...product } : p)
      }));
      showNotification('Producto actualizado correctamente', 'success');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('products')
        .update(product)
        .eq('id', id);
      if (error) throw error;
      await refreshData();
      showNotification('Producto actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error updating product:', error);
      showNotification('Error al actualizar producto', 'error');
    }
  },
  
  deleteProduct: async (id) => {
    const { isDemo, refreshData, showNotification } = get();
    
    if (isDemo) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        products: state.products.filter(p => p.id !== id)
      }));
      showNotification('Producto eliminado correctamente', 'success');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
      await refreshData();
      showNotification('Producto eliminado correctamente', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('Error al eliminar producto', 'error');
    }
  },
  
  addCustomer: async (customer) => {
    const { isDemo, refreshData, showNotification } = get();
    
    if (isDemo) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        customers: [...state.customers, { ...customer, id: String(Date.now()) }]
      }));
      showNotification('Cliente agregado correctamente', 'success');
      return;
    }
    
    try {
      const { error } = await supabase.from('customers').insert([customer]);
      if (error) throw error;
      await refreshData();
      showNotification('Cliente agregado correctamente', 'success');
    } catch (error) {
      console.error('Error adding customer:', error);
      showNotification('Error al agregar cliente', 'error');
    }
  },
  
  updateCustomer: async (id, customer) => {
    const { isDemo, refreshData, showNotification } = get();
    
    if (isDemo) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        customers: state.customers.map(c => c.id === id ? { ...c, ...customer } : c)
      }));
      showNotification('Cliente actualizado correctamente', 'success');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('customers')
        .update(customer)
        .eq('id', id);
      if (error) throw error;
      await refreshData();
      showNotification('Cliente actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error updating customer:', error);
      showNotification('Error al actualizar cliente', 'error');
    }
  },
  
  addOrder: async (order) => {
    const { isDemo, refreshData, showNotification } = get();
    
    if (isDemo) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        orders: [{ ...order, id: String(Date.now()) }, ...state.orders]
      }));
      showNotification('Pedido creado correctamente', 'success');
      return;
    }
    
    try {
      const { error } = await supabase.from('orders').insert([order]);
      if (error) throw error;
      await refreshData();
      showNotification('Pedido creado correctamente', 'success');
    } catch (error) {
      console.error('Error adding order:', error);
      showNotification('Error al crear pedido', 'error');
    }
  },
  
  updateOrderStatus: async (id, status) => {
    const { isDemo, refreshData, showNotification } = get();
    
    if (isDemo) {
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      }));
      showNotification('Estado del pedido actualizado', 'success');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      await refreshData();
      showNotification('Estado del pedido actualizado', 'success');
    } catch (error) {
      console.error('Error updating order:', error);
      showNotification('Error al actualizar pedido', 'error');
    }
  },
}));
