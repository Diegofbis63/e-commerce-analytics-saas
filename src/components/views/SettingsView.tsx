"use client";

import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, LogOut, ChevronRight } from "lucide-react";

export function SettingsView() {
    const { showNotification, openModal, t } = useAppStore();

    const settingsSections = [
        {
            titleKey: "account" as const,
            icon: User,
            color: "accent-violet",
            items: [
                { labelKey: "profile_edit" as const, modal: "editProfile" },
                { labelKey: "preferences" as const, modal: "notificationSettings" },
                { labelKey: "system_language" as const, modal: "selectLanguage" }
            ]
        },
        {
            titleKey: "notifications" as const,
            icon: Bell,
            color: "accent-rose",
            items: [
                { labelKey: "push_alerts" as const, modal: "notificationSettings" },
                { labelKey: "monthly_reports" as const, modal: "notificationSettings" },
                { labelKey: "stock_alerts_full" as const, modal: "notificationSettings" }
            ]
        },
        {
            titleKey: "security" as const,
            icon: Shield,
            color: "accent-emerald",
            items: [
                { labelKey: "password" as const, modal: "changePassword" },
                { labelKey: "access_logs" as const, modal: "viewSecurityLogs" }
            ]
        },
        {
            titleKey: "billing" as const,
            icon: CreditCard,
            color: "accent-cyan",
            items: [
                { labelKey: "current_plan" as const, modal: "viewBilling" },
                { labelKey: "payment_methods" as const, modal: "viewBilling" },
                { labelKey: "history" as const, modal: "viewBilling" }
            ]
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                        {t("settings")} <span className="text-accent-violet">/</span>
                    </h1>
                    <p className="text-sm text-luxury-400 font-medium">Control total de tu ecosistema analytics</p>
                </div>
                <button
                    onClick={() => {
                        showNotification(t("logout"), "success");
                        // In a real app, we would clear session here
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-luxury-200 text-xs font-black uppercase tracking-widest transition-all border border-white/5"
                >
                    <LogOut className="w-4 h-4 text-accent-rose" />
                    {t("logout_confirm")}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {settingsSections.map((section, idx) => (
                    <motion.div
                        key={section.titleKey}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-xl bg-${section.color}/10 border border-${section.color}/20 text-${section.color}`}>
                                <section.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-black text-white italic tracking-tighter uppercase">{t(section.titleKey)}</h3>
                        </div>

                        <div className="space-y-2">
                            {section.items.map((item) => (
                                <button
                                    key={item.labelKey}
                                    onClick={() => openModal(item.modal)}
                                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all group"
                                >
                                    <span className="text-luxury-200 font-bold text-sm tracking-tight">{t(item.labelKey)}</span>
                                    <ChevronRight className="w-4 h-4 text-luxury-500 group-hover:text-white transition-colors" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
