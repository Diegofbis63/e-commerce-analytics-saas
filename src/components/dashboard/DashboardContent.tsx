"use client";

import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
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
        </main>
      </div>
    </div>
  );
}
