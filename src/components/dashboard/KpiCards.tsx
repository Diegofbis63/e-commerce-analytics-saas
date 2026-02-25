"use client";

import { useAppStore } from "@/store/appStore";
import { KpiCard } from "./KpiCard";
import { formatCurrency, formatNumber } from "@/data/mockData";

export function KpiCards() {
  const { kpi } = useAppStore();

  const kpis = [
    {
      title: "Ventas Totales",
      value: formatCurrency(kpi.totalSales),
      change: `${kpi.totalSalesChange > 0 ? "+" : ""}${kpi.totalSalesChange}%`,
      trend: kpi.totalSalesChange >= 0 ? "up" as const : "down" as const,
      icon: "dollar" as const,
      color: "cyan" as const,
    },
    {
      title: "Pedidos",
      value: formatNumber(kpi.totalOrders),
      change: `${kpi.totalOrdersChange > 0 ? "+" : ""}${kpi.totalOrdersChange}%`,
      trend: kpi.totalOrdersChange >= 0 ? "up" as const : "down" as const,
      icon: "shopping-cart" as const,
      color: "violet" as const,
    },
    {
      title: "Clientes VIP",
      value: formatNumber(kpi.vipCustomers),
      change: `${kpi.vipCustomersChange > 0 ? "+" : ""}${kpi.vipCustomersChange}%`,
      trend: kpi.vipCustomersChange >= 0 ? "up" as const : "down" as const,
      icon: "users" as const,
      color: "emerald" as const,
    },
    {
      title: "Ticket Promedio",
      value: formatCurrency(kpi.avgTicket),
      change: `${kpi.avgTicketChange > 0 ? "+" : ""}${kpi.avgTicketChange}%`,
      trend: kpi.avgTicketChange >= 0 ? "up" as const : "down" as const,
      icon: "trending-up" as const,
      color: "amber" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
}
