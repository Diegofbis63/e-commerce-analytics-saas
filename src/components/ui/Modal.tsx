"use client";

import { useAppStore } from "@/store/appStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

export function Notification() {
  const { notification, clearNotification } = useAppStore();

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: "bg-accent-emerald/20 border-accent-emerald/50 text-accent-emerald",
    error: "bg-accent-rose/20 border-accent-rose/50 text-accent-rose",
    info: "bg-accent-cyan/20 border-accent-cyan/50 text-accent-cyan",
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          className={`fixed top-4 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border ${colors[notification.type]} backdrop-blur-xl`}
        >
          {notification.type === "success" && <CheckCircle className="w-5 h-5" />}
          {notification.type === "error" && <XCircle className="w-5 h-5" />}
          {notification.type === "info" && <Info className="w-5 h-5" />}
          <span className="text-white font-medium">{notification.message}</span>
          <button onClick={clearNotification} className="ml-2 hover:opacity-70">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Modal() {
  const { modalOpen, selectedItem, closeModal, isDemo } = useAppStore();

  if (!modalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={closeModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card p-6 w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {modalOpen === "addProduct" && <AddProductForm />}
          {modalOpen === "editProduct" && <EditProductForm product={selectedItem} />}
          {modalOpen === "addCustomer" && <AddCustomerForm />}
          {modalOpen === "editCustomer" && <EditCustomerForm customer={selectedItem} />}
          {modalOpen === "addOrder" && <AddOrderForm />}
          {modalOpen === "viewOrder" && <OrderDetail order={selectedItem} />}
          {modalOpen === "viewProduct" && <ProductDetail product={selectedItem} />}
          {modalOpen === "viewCustomer" && <CustomerDetail customer={selectedItem} />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AddProductForm() {
  const { closeModal, addProduct } = useAppStore();
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "Electrónica",
    price: 0,
    cost: 0,
    stock_quantity: 0,
    min_stock_level: 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct({
      ...form,
      is_active: true,
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white">Nuevo Producto</h2>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white placeholder-luxury-500"
        required
      />
      <input
        type="text"
        placeholder="SKU"
        value={form.sku}
        onChange={(e) => setForm({ ...form, sku: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white placeholder-luxury-500"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
          required
        />
        <input
          type="number"
          placeholder="Costo"
          value={form.cost}
          onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Stock"
          value={form.stock_quantity}
          onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
          required
        />
        <input
          type="number"
          placeholder="Stock mínimo"
          value={form.min_stock_level}
          onChange={(e) => setForm({ ...form, min_stock_level: Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2 rounded-xl bg-accent-violet text-white hover:bg-accent-violet/80">
          Guardar
        </button>
      </div>
    </form>
  );
}

function EditProductForm({ product }: { product: any }) {
  const { closeModal, updateProduct } = useAppStore();
  const [form, setForm] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    price: product?.price || 0,
    stock_quantity: product?.stockQuantity || 0,
    min_stock_level: product?.minStockLevel || 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(product.id, form);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white">Editar Producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock_quantity}
          onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
          required
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2 rounded-xl bg-accent-violet text-white hover:bg-accent-violet/80">
          Guardar
        </button>
      </div>
    </form>
  );
}

function AddCustomerForm() {
  const { closeModal, addCustomer } = useAppStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    segment: "new",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCustomer({
      ...form,
      total_purchases: 0,
      order_count: 0,
      clv: 0,
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white">Nuevo Cliente</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        required
      />
      <select
        value={form.segment}
        onChange={(e) => setForm({ ...form, segment: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
      >
        <option value="new">Nuevo</option>
        <option value="regular">Regular</option>
        <option value="premium">Premium</option>
        <option value="vip">VIP</option>
        <option value="inactive">Inactivo</option>
      </select>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2 rounded-xl bg-accent-violet text-white hover:bg-accent-violet/80">
          Guardar
        </button>
      </div>
    </form>
  );
}

function EditCustomerForm({ customer }: { customer: any }) {
  const { closeModal, updateCustomer } = useAppStore();
  const [form, setForm] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    segment: customer?.segment || "new",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCustomer(customer.id, form);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white">Editar Cliente</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        required
      />
      <select
        value={form.segment}
        onChange={(e) => setForm({ ...form, segment: e.target.value })}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
      >
        <option value="new">Nuevo</option>
        <option value="regular">Regular</option>
        <option value="premium">Premium</option>
        <option value="vip">VIP</option>
        <option value="inactive">Inactivo</option>
      </select>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2 rounded-xl bg-accent-violet text-white hover:bg-accent-violet/80">
          Guardar
        </button>
      </div>
    </form>
  );
}

function AddOrderForm() {
  const { closeModal, addOrder, customers } = useAppStore();
  const [form, setForm] = useState({
    customer_id: "",
    customer_name: "",
    subtotal: 0,
    tax: 0,
    shipping_cost: 0,
    total: 0,
  });

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    setForm({
      ...form,
      customer_id: customerId,
      customer_name: customer?.name || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addOrder({
      ...form,
      status: "pending",
      order_date: new Date().toISOString().split("T")[0],
    });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white">Nuevo Pedido</h2>
      <select
        value={form.customer_id}
        onChange={(e) => handleCustomerChange(e.target.value)}
        className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        required
      >
        <option value="">Seleccionar cliente</option>
        {customers.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Subtotal"
          value={form.subtotal}
          onChange={(e) => setForm({ ...form, subtotal: Number(e.target.value), total: Number(e.target.value) + form.tax + form.shipping_cost })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
          required
        />
        <input
          type="number"
          placeholder="Envío"
          value={form.shipping_cost}
          onChange={(e) => setForm({ ...form, shipping_cost: Number(e.target.value), total: form.subtotal + form.tax + Number(e.target.value) })}
          className="w-full px-4 py-2 rounded-xl bg-glass-100 border border-glass-border text-white"
        />
      </div>
      <div className="p-4 rounded-xl bg-luxury-900/50 text-right">
        <span className="text-luxury-400">Total: </span>
        <span className="text-xl font-bold text-white">${form.total.toFixed(2)}</span>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2 rounded-xl bg-accent-violet text-white hover:bg-accent-violet/80">
          Crear Pedido
        </button>
      </div>
    </form>
  );
}

function OrderDetail({ order }: { order: any }) {
  const { closeModal, updateOrderStatus } = useAppStore();
  
  const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Detalle del Pedido</h2>
      <div className="space-y-2">
        <p><span className="text-luxury-400">Cliente:</span> <span className="text-white">{order?.customerName}</span></p>
        <p><span className="text-luxury-400">Fecha:</span> <span className="text-white">{order?.orderDate}</span></p>
        <p><span className="text-luxury-400">Total:</span> <span className="text-white">${order?.total?.toFixed(2)}</span></p>
        <p><span className="text-luxury-400">Estado:</span> <span className="text-white capitalize">{order?.status}</span></p>
      </div>
      
      <div className="pt-4 border-t border-glass-border">
        <p className="text-luxury-400 mb-2">Cambiar estado:</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(status => (
            <button
              key={status}
              onClick={() => updateOrderStatus(order.id, status)}
              className={`px-3 py-1 rounded-full text-xs capitalize ${
                order?.status === status 
                  ? "bg-accent-violet text-white" 
                  : "bg-glass-100 text-luxury-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cerrar
        </button>
      </div>
    </div>
  );
}

function ProductDetail({ product }: { product: any }) {
  const { closeModal, deleteProduct } = useAppStore();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">{product?.name}</h2>
      <div className="space-y-2">
        <p><span className="text-luxury-400">SKU:</span> <span className="text-white">{product?.sku}</span></p>
        <p><span className="text-luxury-400">Precio:</span> <span className="text-white">${product?.price}</span></p>
        <p><span className="text-luxury-400">Stock:</span> <span className="text-white">{product?.stockQuantity}</span></p>
        <p><span className="text-luxury-400">Stock mínimo:</span> <span className="text-white">{product?.minStockLevel}</span></p>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cerrar
        </button>
        <button 
          onClick={() => { deleteProduct(product.id); closeModal(); }} 
          className="flex-1 py-2 rounded-xl bg-accent-rose text-white hover:bg-accent-rose/80"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

function CustomerDetail({ customer }: { customer: any }) {
  const { closeModal } = useAppStore();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">{customer?.name}</h2>
      <div className="space-y-2">
        <p><span className="text-luxury-400">Email:</span> <span className="text-white">{customer?.email}</span></p>
        <p><span className="text-luxury-400">Segmento:</span> <span className="text-white capitalize">{customer?.segment}</span></p>
        <p><span className="text-luxury-400">Pedidos:</span> <span className="text-white">{customer?.orderCount || customer?.order_count}</span></p>
        <p><span className="text-luxury-400">Total compras:</span> <span className="text-white">${customer?.totalPurchases || customer?.total_purchases}</span></p>
        <p><span className="text-luxury-400">CLV:</span> <span className="text-white">${customer?.clv}</span></p>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button onClick={closeModal} className="flex-1 py-2 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100">
          Cerrar
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
