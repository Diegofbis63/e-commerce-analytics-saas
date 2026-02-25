"use client";

import { KpiCard, KpiCardProps } from "./KpiCard";

const kpis: KpiCardProps[] = [
  {
    title: "Ventas Totales",
    value: "$124,563",
    change: "+12.5%",
    trend: "up",
    icon: "dollar",
    color: "cyan",
  },
  {
    title: "Pedidos",
    value: "1,284",
    change: "+8.2%",
    trend: "up",
    icon: "shopping-cart",
    color: "violet",
  },
  {
    title: "Clientes VIP",
    value: "342",
    change: "+15.3%",
    trend: "up",
    icon: "users",
    color: "emerald",
  },
  {
    title: "Ticket Promedio",
    value: "$97.03",
    change: "-2.1%",
    trend: "down",
    icon: "trending-up",
    color: "amber",
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
}
