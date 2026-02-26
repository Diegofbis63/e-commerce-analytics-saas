"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { HelpCircle, Book, MessageSquare, Phone, Search, ChevronRight } from "lucide-react";

export function HelpView() {
    const { showNotification } = useAppStore();

    const faqs = [
        { q: "¿Cómo integro mi tienda Shopify?", a: "Accediendo a Configuración > Integraciones y seleccionando el módulo Shopify Engine." },
        { q: "¿Cómo se calculan las predicciones?", a: "Utilizamos modelos LSTM y Transformers basados en tu historial de ventas de los últimos 24 meses." },
        { q: "¿Puedo exportar mis datos?", a: "Sí, todos los reportes son exportables en formato CSV, JSON y PDF de alta fidelidad." },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white italic tracking-tighter">
                        CENTRO DE AYUDA <span className="text-accent-violet">/</span>
                    </h1>
                    <p className="text-sm text-luxury-400 font-medium">Soporte premium y documentación técnica</p>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-luxury-400" />
                <input
                    type="text"
                    placeholder="¿En qué podemos ayudarte hoy?"
                    className="w-full pl-16 pr-6 py-5 rounded-3xl bg-glass-100 border border-white/5 text-white text-lg placeholder-luxury-500 focus:outline-none focus:border-accent-violet transition-all backdrop-blur-xl shadow-2xl"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Book, title: "Documentación", desc: "Guías detalladas paso a paso" },
                    { icon: MessageSquare, title: "Chat en Vivo", desc: "Atención 24/7 con expertos" },
                    { icon: Phone, title: "Soporte VIP", desc: "Llamada directa con tu account" },
                ].map((item, idx) => (
                    <motion.div
                        key={item.title}
                        whileHover={{ scale: 1.02, translateY: -5 }}
                        className="glass-card p-6 cursor-pointer group"
                    >
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-luxury-300 group-hover:text-accent-violet transition-colors mb-4 w-fit">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-white italic tracking-tighter mb-2 uppercase">{item.title}</h3>
                        <p className="text-luxury-400 text-sm font-medium">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card p-8">
                <h3 className="text-sm font-black text-luxury-500 uppercase tracking-[0.2em] mb-6">Preguntas Frecuentes</h3>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-white font-bold">{faq.q}</p>
                                <HelpCircle className="w-4 h-4 text-accent-violet" />
                            </div>
                            <p className="text-luxury-400 text-sm font-medium leading-relaxed">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
