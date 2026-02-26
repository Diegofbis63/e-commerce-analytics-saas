"use client";

import { useAppStore } from "@/store/appStore";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { StockAlert } from "@/components/dashboard/StockAlert";
import { CustomerSegments } from "@/components/dashboard/CustomerSegments";
import { SalesPrediction } from "@/components/dashboard/SalesPrediction";
import { RevenueByCategory } from "@/components/dashboard/RevenueByCategory";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { ProductsView } from "@/components/views/ProductsView";
import { OrdersView } from "@/components/views/OrdersView";
import { CustomersView } from "@/components/views/CustomersView";
import { SettingsView } from "@/components/views/SettingsView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { HelpView } from "@/components/views/HelpView";
import { motion } from "framer-motion";

export function DashboardContent() {
  const { sidebarOpen, isLoading, activeView } = useAppStore();

  console.log("Rendering DashboardContent, activeView:", activeView);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <>
            <KpiCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SalesChart />
              <RevenueByCategory />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CustomerSegments />
              <StockAlert />
              <SalesPrediction />
            </div>
            <TopProducts />
          </>
        );
      case "products":
        return <ProductsView />;
      case "orders":
        return <OrdersView />;
      case "customers":
        return <CustomersView />;
      case "settings":
        return <SettingsView />;
      case "analytics":
        return <AnalyticsView />;
      case "predictions":
        return <AnalyticsView />; // For now sharing AnalyticsView or I can create a PredictionsView
      case "help":
        return <HelpView />;
      default:
        const viewName = activeView as string;
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-8 rounded-3xl bg-luxury-900/50 border border-white/5 backdrop-blur-xl">
              <h2 className="text-2xl font-black text-white italic mb-2 tracking-tighter">
                <span className="text-gradient">
                  {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                </span>
              </h2>
              <p className="text-luxury-400 text-sm">Esta sección está siendo procesada por nuestro motor de IA.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-luxury-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-violet"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-accent-violet/20 blur-sm animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-6 h-full"
            >
              {renderView()}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
