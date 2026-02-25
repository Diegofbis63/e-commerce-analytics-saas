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

export function DashboardContent() {
  const { sidebarOpen, isLoading } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-violet"></div>
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <KpiCards />
              
              {/* Main Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart />
                <RevenueByCategory />
              </div>
              
              {/* Secondary Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CustomerSegments />
                <StockAlert />
                <SalesPrediction />
              </div>
              
              {/* Top Products Table */}
              <TopProducts />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
