"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock_quantity: number;
  min_stock_level: number;
  image_url?: string;
  is_active: boolean;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone?: string;
  segment: "vip" | "premium" | "regular" | "new" | "inactive";
  total_purchases: number;
  order_count: number;
  clv: number;
}

export interface Order {
  id: string;
  customer_id: string;
  customer_name: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  tax: number;
  shipping_cost: number;
  total: number;
  order_date: string;
}

export interface KpiData {
  totalSales: number;
  totalSalesChange: number;
  totalOrders: number;
  totalOrdersChange: number;
  vipCustomers: number;
  vipCustomersChange: number;
  avgTicket: number;
  avgTicketChange: number;
}

export interface SalesData {
  month: string;
  sales: number;
  prediction: number | null;
}

export interface CategoryRevenue {
  name: string;
  value: number;
  color: string;
}

export interface CustomerSegment {
  name: string;
  count: number;
  clv: string;
  color: string;
}

export interface StockAlert {
  id: string;
  productName: string;
  currentStock: number;
  minStock: number;
  status: "critical" | "warning" | "ok";
}

export interface PredictionData {
  nextMonthPrediction: number;
  confidence: number;
  trend: number;
  factors: { name: string; impact: string }[];
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
}

export const mockData = {
  kpi: {
    totalSales: 124563,
    totalSalesChange: 12.5,
    totalOrders: 1284,
    totalOrdersChange: 8.2,
    vipCustomers: 342,
    vipCustomersChange: 15.3,
    avgTicket: 97.03,
    avgTicketChange: -2.1,
  } as KpiData,

  salesData: [
    { month: "Ene", sales: 4200, prediction: null },
    { month: "Feb", sales: 3800, prediction: null },
    { month: "Mar", sales: 5100, prediction: null },
    { month: "Abr", sales: 4600, prediction: null },
    { month: "May", sales: 5800, prediction: null },
    { month: "Jun", sales: 6200, prediction: null },
    { month: "Jul", sales: 7100, prediction: null },
    { month: "Ago", sales: 6800, prediction: null },
    { month: "Sep", sales: 7900, prediction: null },
    { month: "Oct", sales: 8200, prediction: null },
    { month: "Nov", sales: null, prediction: 9100 },
    { month: "Dic", sales: null, prediction: 10500 },
  ] as SalesData[],

  categoryRevenue: [
    { name: "Electrónica", value: 35, color: "#8b5cf6" },
    { name: "Ropa", value: 25, color: "#06b6d4" },
    { name: "Hogar", value: 20, color: "#10b981" },
    { name: "Deportes", value: 12, color: "#f59e0b" },
    { name: "Otros", value: 8, color: "#6b7280" },
  ] as CategoryRevenue[],

  customerSegments: [
    { name: "VIP", count: 342, clv: "$2,450", color: "#8b5cf6" },
    { name: "Premium", count: 856, clv: "$1,120", color: "#06b6d4" },
    { name: "Regular", count: 1240, clv: "$580", color: "#10b981" },
    { name: "Nuevo", count: 420, clv: "$180", color: "#f59e0b" },
    { name: "Inactivo", count: 180, clv: "$90", color: "#6b7280" },
  ] as CustomerSegment[],

  stockAlerts: [
    { id: "1", productName: "iPhone 15 Pro", currentStock: 5, minStock: 20, status: "critical" as const },
    { id: "2", productName: "Samsung Galaxy S24", currentStock: 8, minStock: 15, status: "warning" as const },
    { id: "3", productName: "MacBook Air M3", currentStock: 3, minStock: 10, status: "critical" as const },
    { id: "4", productName: "AirPods Pro 2", currentStock: 12, minStock: 25, status: "warning" as const },
    { id: "5", productName: "iPad Air", currentStock: 6, minStock: 12, status: "warning" as const },
  ] as StockAlert[],

  prediction: {
    nextMonthPrediction: 15420,
    confidence: 87,
    trend: 18,
    factors: [
      { name: "Temporada alta", impact: "+12%" },
      { name: "Nuevos productos", impact: "+8%" },
      { name: "Marketing", impact: "+5%" },
    ],
  } as PredictionData,

  topProducts: [
    { id: "1", name: "iPhone 15 Pro 256GB", category: "Electrónica", sales: 234, revenue: 215780, growth: 23 },
    { id: "2", name: "MacBook Air M3", category: "Electrónica", sales: 156, revenue: 187344, growth: 18 },
    { id: "3", name: "Samsung Galaxy S24 Ultra", category: "Electrónica", sales: 142, revenue: 156578, growth: 12 },
    { id: "4", name: "AirPods Pro 2da Gen", category: "Audio", sales: 289, revenue: 72311, growth: 31 },
    { id: "5", name: "iPad Pro 12.9", category: "Electrónica", sales: 98, revenue: 147098, growth: 8 },
  ] as TopProduct[],

  products: [
    { id: "1", name: "iPhone 15 Pro 256GB", sku: "IP15PRO256", category: "Electrónica", price: 1199, cost: 850, stockQuantity: 45, minStockLevel: 20, isActive: true },
    { id: "2", name: "Samsung Galaxy S24 Ultra", sku: "SG24ULTRA", category: "Electrónica", price: 1099, cost: 780, stockQuantity: 32, minStockLevel: 15, isActive: true },
    { id: "3", name: "MacBook Air M3", sku: "MBAIRM3", category: "Electrónica", price: 1299, cost: 920, stockQuantity: 18, minStockLevel: 10, isActive: true },
    { id: "4", name: "AirPods Pro 2da Gen", sku: "APP2GEN", category: "Audio", price: 249, cost: 150, stockQuantity: 89, minStockLevel: 25, isActive: true },
    { id: "5", name: "iPad Pro 12.9", sku: "IPADPRO12", category: "Electrónica", price: 1499, cost: 1050, stockQuantity: 12, minStockLevel: 8, isActive: true },
    { id: "6", name: "Apple Watch Series 9", sku: "AWS9", category: "Wearables", price: 399, cost: 250, stockQuantity: 56, minStockLevel: 20, isActive: true },
    { id: "7", name: "Sony WH-1000XM5", sku: "SONYXM5", category: "Audio", price: 349, cost: 180, stockQuantity: 34, minStockLevel: 15, isActive: true },
    { id: "8", name: "Nintendo Switch OLED", sku: "NSOLED", category: "Gaming", price: 349, cost: 220, stockQuantity: 0, minStockLevel: 10, isActive: true },
  ] as any,

  customers: [
    { id: "1", email: "vip1@email.com", name: "Carlos García", segment: "vip" as const, totalPurchases: 8500, orderCount: 12, clv: 8500 },
    { id: "2", email: "vip2@email.com", name: "María López", segment: "vip" as const, totalPurchases: 6200, orderCount: 8, clv: 6200 },
    { id: "3", email: "premium1@email.com", name: "Juan Martínez", segment: "premium" as const, totalPurchases: 3200, orderCount: 6, clv: 3200 },
    { id: "4", email: "regular1@email.com", name: "Ana Rodríguez", segment: "regular" as const, totalPurchases: 890, orderCount: 3, clv: 890 },
    { id: "5", email: "new1@email.com", name: "Pedro Sánchez", segment: "new" as const, totalPurchases: 250, orderCount: 1, clv: 250 },
  ] as any,

  orders: [
    { id: "1", customerId: "1", customerName: "Carlos García", status: "delivered" as const, subtotal: 1199, tax: 95.92, shippingCost: 0, total: 1294.92, orderDate: "2026-02-24" },
    { id: "2", customerId: "2", customerName: "María López", status: "processing" as const, subtotal: 2498, tax: 199.84, shippingCost: 0, total: 2697.84, orderDate: "2026-02-23" },
    { id: "3", customerId: "3", customerName: "Juan Martínez", status: "shipped" as const, subtotal: 799, tax: 63.92, shippingCost: 15, total: 877.92, orderDate: "2026-02-22" },
    { id: "4", customerId: "4", customerName: "Ana Rodríguez", status: "pending" as const, subtotal: 449, tax: 35.92, shippingCost: 15, total: 499.92, orderDate: "2026-02-21" },
    { id: "5", customerId: "5", customerName: "Pedro Sánchez", status: "cancelled" as const, subtotal: 199, tax: 15.92, shippingCost: 0, total: 0, orderDate: "2026-02-20" },
  ] as any,

  categories: [
    { id: "1", name: "Electrónica", productCount: 156 },
    { id: "2", name: "Ropa", productCount: 89 },
    { id: "3", name: "Hogar", productCount: 67 },
    { id: "4", name: "Deportes", productCount: 45 },
    { id: "5", name: "Audio", productCount: 34 },
  ],
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-AR').format(value);
}
