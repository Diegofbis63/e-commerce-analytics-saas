"use client";

import { create } from "zustand";
import { 
  mockData, 
  Product, 
  Customer, 
  Order, 
  KpiData,
  SalesData,
  CategoryRevenue,
  CustomerSegment,
  StockAlert,
  PredictionData,
  TopProduct
} from "@/data/mockData";

interface AppState {
  // Data
  kpi: KpiData;
  salesData: SalesData[];
  categoryRevenue: CategoryRevenue[];
  customerSegments: CustomerSegment[];
  stockAlerts: StockAlert[];
  prediction: PredictionData;
  topProducts: TopProduct[];
  products: Product[];
  customers: Customer[];
  orders: Order[];
  categories: { id: string; name: string; productCount: number }[];
  
  // UI State
  isLoading: boolean;
  activeView: "dashboard" | "products" | "orders" | "customers" | "analytics" | "settings";
  selectedDateRange: string;
  sidebarOpen: boolean;
  
  // Actions
  setActiveView: (view: AppState["activeView"]) => void;
  setDateRange: (range: string) => void;
  toggleSidebar: () => void;
  setLoading: (loading: boolean) => void;
  refreshData: () => void;
}

export const useAppStore = create<AppState>((set) => ({
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
  activeView: "dashboard",
  selectedDateRange: "last30days",
  sidebarOpen: true,
  
  // Actions
  setActiveView: (view) => set({ activeView: view }),
  setDateRange: (range) => set({ selectedDateRange: range }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
  
  refreshData: () => {
    set({ isLoading: true });
    // Simulate API call
    setTimeout(() => {
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
    }, 1000);
  },
}));
