"use client";

import { useState, Suspense } from "react";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { ProductsView } from "@/components/views/ProductsView";
import { OrdersView } from "@/components/views/OrdersView";
import { CustomersView } from "@/components/views/CustomersView";
import { useAppStore } from "@/store/appStore";

function DashboardWithView() {
  const { activeView } = useAppStore();

  switch (activeView) {
    case "products":
      return <ProductsView />;
    case "orders":
      return <OrdersView />;
    case "customers":
      return <CustomersView />;
    case "analytics":
      return <DashboardContent />;
    case "settings":
      return (
        <main className="min-h-screen bg-luxury-950 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Configuración</h1>
            <p className="text-luxury-400">Panel de configuracióncoming soon...</p>
          </div>
        </main>
      );
    default:
      return <DashboardContent />;
  }
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardWithView />
    </Suspense>
  );
}
