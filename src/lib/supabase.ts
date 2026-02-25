import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          settings: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          settings?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          settings?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          role: string;
          organization_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          role?: string;
          organization_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          role?: string;
          organization_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          organization_id: string;
          category_id: string | null;
          name: string;
          sku: string | null;
          description: string | null;
          price: number;
          cost: number | null;
          stock_quantity: number;
          min_stock_level: number;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          category_id?: string | null;
          name: string;
          sku?: string | null;
          description?: string | null;
          price: number;
          cost?: number | null;
          stock_quantity?: number;
          min_stock_level?: number;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          category_id?: string | null;
          name?: string;
          sku?: string | null;
          description?: string | null;
          price?: number;
          cost?: number | null;
          stock_quantity?: number;
          min_stock_level?: number;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          organization_id: string;
          email: string;
          name: string;
          phone: string | null;
          address: Record<string, unknown> | null;
          segment: string;
          total_purchases: number;
          order_count: number;
          first_purchase_date: string | null;
          last_purchase_date: string | null;
          clv: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          email: string;
          name: string;
          phone?: string | null;
          address?: Record<string, unknown> | null;
          segment?: string;
          total_purchases?: number;
          order_count?: number;
          first_purchase_date?: string | null;
          last_purchase_date?: string | null;
          clv?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          email?: string;
          name?: string;
          phone?: string | null;
          address?: Record<string, unknown> | null;
          segment?: string;
          total_purchases?: number;
          order_count?: number;
          first_purchase_date?: string | null;
          last_purchase_date?: string | null;
          clv?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          organization_id: string;
          customer_id: string | null;
          status: string;
          subtotal: number;
          tax: number;
          shipping_cost: number;
          total: number;
          order_date: string;
          shipped_date: string | null;
          delivered_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          customer_id?: string | null;
          status?: string;
          subtotal: number;
          tax?: number;
          shipping_cost?: number;
          total: number;
          order_date: string;
          shipped_date?: string | null;
          delivered_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          customer_id?: string | null;
          status?: string;
          subtotal?: number;
          tax?: number;
          shipping_cost?: number;
          total?: number;
          order_date?: string;
          shipped_date?: string | null;
          delivered_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
