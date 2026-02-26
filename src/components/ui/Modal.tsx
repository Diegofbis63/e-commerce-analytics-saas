"use client";

import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";
import { Language } from "@/lib/i18n";

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
          {modalOpen === "editProfile" && <EditProfileForm />}
          {modalOpen === "changePassword" && <ChangePasswordForm />}
          {modalOpen === "viewBilling" && <BillingDetail />}
          {modalOpen === "notificationSettings" && <NotificationSettingsForm />}
          {modalOpen === "selectLanguage" && <LanguageSelectionForm />}
          {modalOpen === "viewSecurityLogs" && <SecurityLogsView />}
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
              className={`px-3 py-1 rounded-full text-xs capitalize ${order?.status === status
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


function EditProfileForm() {
  const { closeModal, showNotification } = useAppStore();
  const [form, setForm] = useState({
    name: "Alejandro Domínguez",
    email: "alejandro@example.com",
    role: "Admin"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Perfil actualizado correctamente", "success");
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Editar Perfil</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-luxury-400 uppercase font-black mb-1 block">Nombre Completo</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-glass-100 border border-glass-border text-white focus:border-accent-violet outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-xs text-luxury-400 uppercase font-black mb-1 block">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-glass-100 border border-glass-border text-white focus:border-accent-violet outline-none transition-all"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-glass-border text-luxury-400 hover:bg-glass-100 font-bold">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-xl bg-accent-violet text-white hover:bg-accent-violet/80 font-bold shadow-lg shadow-accent-violet/20">
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}

function ChangePasswordForm() {
  const { closeModal, showNotification } = useAppStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Contraseña actualizada con éxito", "success");
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Cambiar Contraseña</h2>
      <input
        type="password"
        placeholder="Contraseña Actual"
        className="w-full px-4 py-2.5 rounded-xl bg-glass-100 border border-glass-border text-white outline-none"
      />
      <input
        type="password"
        placeholder="Nueva Contraseña"
        className="w-full px-4 py-2.5 rounded-xl bg-glass-100 border border-glass-border text-white outline-none"
      />
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-glass-border text-luxury-400 font-bold">
          Cancelar
        </button>
        <button type="submit" className="flex-1 py-2.5 rounded-xl bg-accent-emerald text-white hover:bg-accent-emerald/80 font-bold shadow-lg shadow-accent-emerald/20">
          Actualizar
        </button>
      </div>
    </form>
  );
}

function BillingDetail() {
  const { closeModal } = useAppStore();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Detalles de Facturación</h2>
      <div className="p-4 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-luxury-400 text-sm">Plan Actual</span>
          <span className="px-2 py-0.5 rounded bg-accent-cyan text-white text-[10px] font-black uppercase">Enterprise</span>
        </div>
        <p className="text-2xl font-black text-white">$499<span className="text-sm font-normal text-luxury-500">/mes</span></p>
      </div>
      <div className="space-y-2">
        <h4 className="text-xs font-black text-luxury-400 uppercase">Últimas Transacciones</h4>
        {[1, 2].map(i => (
          <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 text-xs">
            <span className="text-white">Factura #INV-00{i}</span>
            <span className="text-luxury-400">Feb 0{i}, 2026</span>
            <span className="font-bold text-white">$499.00</span>
          </div>
        ))}
      </div>
      <button onClick={closeModal} className="w-full py-2.5 rounded-xl bg-glass-100 text-white font-bold hover:bg-glass-200 transition-all">
        Cerrar
      </button>
    </div>
  );
}

function NotificationSettingsForm() {
  const { closeModal, showNotification, notificationPrefs, setNotificationPrefs } = useAppStore();
  const [prefs, setPrefs] = useState(notificationPrefs);

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Ajustes de Notificaciones</h2>
      <div className="space-y-4">
        {[
          { id: 'push', label: "Alertas Push" },
          { id: 'email', label: "Reportes Mensuales" },
          { id: 'stock', label: "Alertas de Stock Ilimitadas" }
        ].map((pref) => (
          <div key={pref.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
            <span className="text-white text-sm font-bold">{pref.label}</span>
            <button
              onClick={() => togglePref(pref.id as any)}
              className={`w-10 h-6 rounded-full transition-colors p-1 flex ${prefs[pref.id as keyof typeof prefs] ? 'bg-accent-violet justify-end' : 'bg-glass-300 justify-start'}`}
            >
              <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setNotificationPrefs(prefs);
          showNotification("Preferencias guardadas", "success");
          closeModal();
        }}
        className="w-full py-2.5 rounded-xl bg-accent-violet text-white font-bold shadow-lg shadow-accent-violet/20"
      >
        Guardar Preferencias
      </button>
    </div>
  );
}

function LanguageSelectionForm() {
  const { closeModal, showNotification, language, setLanguage } = useAppStore();
  const [lang, setLang] = useState<Language>(language);
  const languages = [
    { id: "es", name: "Español", flag: "🇪🇸" },
    { id: "en", name: "English", flag: "🇺🇸" },
    { id: "pt", name: "Português", flag: "🇧🇷" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Idioma del Sistema</h2>
      <div className="grid grid-cols-1 gap-2">
        {languages.map(l => (
          <button
            key={l.id}
            onClick={() => setLang(l.id as Language)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${lang === l.id ? 'bg-accent-violet/20 border-accent-violet' : 'bg-white/5 border-transparent hover:border-white/10'}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{l.flag}</span>
              <span className="text-white font-bold">{l.name}</span>
            </div>
            {lang === l.id && <CheckCircle className="w-5 h-5 text-accent-violet" />}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setLanguage(lang);
          showNotification("Idioma actualizado", "success");
          closeModal();
        }}
        className="w-full py-2.5 rounded-xl bg-accent-violet text-white font-bold"
      >
        Confirmar Selección
      </button>
    </div>
  );
}

function SecurityLogsView() {
  const { closeModal } = useAppStore();
  const logs = [
    { id: 1, event: "Inicio de sesión", device: "Chrome / Windows", date: "Hace 2 horas", ip: "192.168.1.1" },
    { id: 2, event: "Cambio de contraseña", device: "Safari / iPhone", date: "Ayer", ip: "10.0.0.5" },
    { id: 3, event: "Acceso fallido", device: "Firefox / Linux", date: "Hace 3 días", ip: "172.16.0.1" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Logs de Acceso</h2>
      <div className="space-y-3">
        {logs.map(log => (
          <div key={log.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex justify-between items-start mb-1">
              <span className="text-white font-bold text-sm">{log.event}</span>
              <span className="text-[10px] text-luxury-500 font-black uppercase">{log.date}</span>
            </div>
            <p className="text-xs text-luxury-400">{log.device} • {log.ip}</p>
          </div>
        ))}
      </div>
      <button onClick={closeModal} className="w-full py-2.5 rounded-xl border border-glass-border text-luxury-400 font-bold">
        Cerrar
      </button>
    </div>
  );
}
