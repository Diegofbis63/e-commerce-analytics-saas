-- =============================================
-- E-COMMERCE ANALYTICS SAAS - DATABASE SCHEMA
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLES
-- =============================================

-- Organizations (Tenants)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'manager', 'member')),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    name TEXT NOT NULL,
    sku TEXT,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    cost DECIMAL(12, 2),
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 10,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    address JSONB,
    segment TEXT DEFAULT 'new' CHECK (segment IN ('vip', 'premium', 'regular', 'new', 'inactive')),
    total_purchases DECIMAL(12, 2) DEFAULT 0,
    order_count INTEGER DEFAULT 0,
    first_purchase_date DATE,
    last_purchase_date DATE,
    clv DECIMAL(12, 2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    subtotal DECIMAL(12, 2) NOT NULL,
    tax DECIMAL(12, 2) DEFAULT 0,
    shipping_cost DECIMAL(12, 2) DEFAULT 0,
    total DECIMAL(12, 2) NOT NULL,
    order_date DATE NOT NULL,
    shipped_date DATE,
    delivered_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    total DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stock Movements
CREATE TABLE stock_movements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    type TEXT NOT NULL CHECK (type IN ('in', 'out', 'adjustment', 'return')),
    quantity INTEGER NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX idx_products_organization ON products(organization_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_stock_low ON products(organization_id, stock_quantity) WHERE stock_quantity < min_stock_level;

CREATE INDEX idx_customers_organization ON customers(organization_id);
CREATE INDEX idx_customers_segment ON customers(organization_id, segment);
ers_clv ONCREATE INDEX idx_custom customers(organization_id, clv DESC);

CREATE INDEX idx_orders_organization ON orders(organization_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(organization_id, order_date);
CREATE INDEX idx_orders_status ON orders(organization_id, status);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- =============================================
-- VIEWS FOR ANALYTICS
-- =============================================

-- Customer Lifetime Value (CLV) View
CREATE OR REPLACE VIEW customer_clv AS
SELECT 
    c.id,
    c.organization_id,
    c.email,
    c.name,
    c.segment,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(o.total), 0) as total_revenue,
    COALESCE(AVG(o.total), 0) as avg_order_value,
    MIN(o.order_date) as first_purchase,
    MAX(o.order_date) as last_purchase,
    CASE 
        WHEN COUNT(o.id) > 0 
        THEN EXTRACT(DAYS FROM MAX(o.order_date) - MIN(o.order_date))
        ELSE 0 
    END as days_active,
    CASE 
        WHEN COUNT(o.id) > 0 AND EXTRACT(DAYS FROM MAX(o.order_date) - MIN(o.order_date)) > 0
        THEN SUM(o.total) / NULLIF(EXTRACT(DAYS FROM MAX(o.order_date) - MIN(o.order_date)) / 30, 0)
        ELSE 0 
    END as monthly_avg_revenue,
    CASE 
        WHEN COUNT(o.id) > 0 
        THEN (SUM(o.total) / NULLIF(COUNT(o.id), 0)) * 12
        ELSE 0 
    END as projected_annual_clv
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id AND o.status != 'cancelled'
GROUP BY c.id, c.organization_id, c.email, c.name, c.segment;

-- Sales Analytics View
CREATE OR REPLACE VIEW sales_analytics AS
SELECT 
    o.organization_id,
    o.order_date,
    DATE_TRUNC('month', o.order_date) as month,
    DATE_TRUNC('week', o.order_date) as week,
    COUNT(DISTINCT o.id) as order_count,
    COUNT(DISTINCT o.customer_id) as unique_customers,
    SUM(o.subtotal) as total_sales,
    SUM(o.tax) as total_tax,
    SUM(o.shipping_cost) as total_shipping,
    SUM(o.total) as total_revenue,
    AVG(o.total) as avg_order_value
FROM orders o
WHERE o.status != 'cancelled'
GROUP BY o.organization_id, o.order_date;

-- Stock Alert View
CREATE OR REPLACE VIEW stock_alerts AS
SELECT 
    p.id,
    p.organization_id,
    p.name as product_name,
    c.name as category_name,
    p.stock_quantity,
    p.min_stock_level,
    CASE 
        WHEN p.stock_quantity = 0 THEN 'out_of_stock'
        WHEN p.stock_quantity < p.min_stock_level / 2 THEN 'critical'
        WHEN p.stock_quantity < p.min_stock_level THEN 'low'
        ELSE 'ok'
    END as status
FROM products p
LEFT JOIN categories c ON c.id = p.category_id
WHERE p.is_active = true AND p.stock_quantity <= p.min_stock_level;

-- Revenue by Category View
CREATE OR REPLACE VIEW revenue_by_category AS
SELECT 
    o.organization_id,
    c.id as category_id,
    c.name as category_name,
    COUNT(DISTINCT oi.order_id) as order_count,
    SUM(oi.quantity) as units_sold,
    SUM(oi.total) as revenue
FROM order_items oi
JOIN orders o ON o.id = oi.order_id AND o.status != 'cancelled'
JOIN products p ON p.id = oi.product_id
JOIN categories c ON c.id = p.category_id
GROUP BY o.organization_id, c.id, c.name;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- Organizations: Users can only see their organization
CREATE POLICY "Users can view their organization"
    ON organizations FOR SELECT
    USING (id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

-- All other tables: Organization-based isolation
CREATE POLICY "Users can view their organization's data"
    ON users FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can view their organization's products"
    ON products FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can view their organization's customers"
    ON customers FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can view their organization's orders"
    ON orders FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

-- View policies
CREATE POLICY "Users can view their organization's CLV"
    ON customer_clv FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can view their organization's sales analytics"
    ON sales_analytics FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

CREATE POLICY "Users can view their organization's stock alerts"
    ON stock_alerts FOR SELECT
    USING (organization_id IN (
        SELECT organization_id FROM users WHERE id = auth.uid()
    ));

-- =============================================
-- SEED DATA (DEMO)
-- =============================================

-- Insert demo organization
INSERT INTO organizations (id, name, slug) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Demo E-commerce', 'demo-ecommerce');

-- Insert demo user
INSERT INTO users (id, email, name, role, organization_id)
VALUES ('00000000-0000-0000-0000-000000000002', 'demo@demo.com', 'Demo User', 'admin', '00000000-0000-0000-0000-000000000001');

-- Insert demo categories
INSERT INTO categories (id, organization_id, name) VALUES
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'Electrónica'),
('11111111-1111-1111-1111-111111111112', '00000000-0000-0000-0000-000000000001', 'Ropa'),
('11111111-1111-1111-1111-111111111113', '00000000-0000-0000-0000-000000000001', 'Hogar'),
('11111111-1111-1111-1111-111111111114', '00000000-0000-0000-0000-000000000001', 'Deportes');

-- Insert demo products
INSERT INTO products (id, organization_id, category_id, name, sku, price, cost, stock_quantity, min_stock_level) VALUES
('22222222-2222-2222-2222-222222222221', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'iPhone 15 Pro 256GB', 'IP15PRO256', 1199.00, 850.00, 45, 20),
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Samsung Galaxy S24 Ultra', 'SG24ULTRA', 1099.00, 780.00, 32, 15),
('22222222-2222-2222-2222-222222222223', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'MacBook Air M3', 'MBAIRM3', 1299.00, 920.00, 18, 10),
('22222222-2222-2222-2222-222222222224', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'AirPods Pro 2da Gen', 'APP2GEN', 249.00, 150.00, 89, 25),
('22222222-2222-2222-2222-222222222225', '00000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'iPad Pro 12.9', 'IPADPRO12', 1499.00, 1050.00, 12, 8);

-- Insert demo customers
INSERT INTO customers (id, organization_id, email, name, segment, total_purchases, order_count, clv) VALUES
('33333333-3333-3333-3333-333333333331', '00000000-0000-0000-0000-000000000001', 'vip1@email.com', 'Cliente VIP 1', 'vip', 8500.00, 12, 8500.00),
('33333333-3333-3333-3333-333333333332', '00000000-0000-0000-0000-000000000001', 'vip2@email.com', 'Cliente VIP 2', 'vip', 6200.00, 8, 6200.00),
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000001', 'premium1@email.com', 'Cliente Premium 1', 'premium', 3200.00, 6, 3200.00),
('33333333-3333-3333-3333-333333333334', '00000000-0000-0000-0000-000000000001', 'regular1@email.com', 'Cliente Regular 1', 'regular', 890.00, 3, 890.00),
('33333333-3333-3333-3333-333333333335', '00000000-0000-0000-0000-000000000001', 'new1@email.com', 'Cliente Nuevo 1', 'new', 250.00, 1, 250.00);
