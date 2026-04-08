"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalMockToaster() {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const btn = e.target.closest("button");
            if (!btn) return;

            // Optional: Skip tab bar buttons
            // if (btn.closest('.scrollbar-hide') || btn.closest('nav')) return;

            // Get textual content of the button
            const text = Array.from(btn.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .filter(Boolean)
                .join(" ") || btn.title || btn.textContent.trim().replace(/[^a-zA-Z0-9 ]/g, '') || "Action executed";

            // If it's just a tab switch, we skip the toast to avoid spamming
            if (['dashboard', 'leads', 'crm', 'pipeline', 'productivity', 'listings', 'financials', 'predictor', 'discovery', 'saved', 'actions', 'journey', 'smart', 'pricing', 'performance', 'visits', 'documents', 'promotion', 'ai', 'clear all', 'reschedule'].includes(text.toLowerCase())) return;

            const newToast = { id: Date.now(), text: `Action simulated: ${text}` };
            setToasts((prev) => [...prev, newToast]);

            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
            }, 3000);
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="bg-black/80 backdrop-blur-xl border border-white/20 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                            <span className="material-symbols-outlined text-green-400 text-sm">check</span>
                        </div>
                        <span className="font-bold text-xs uppercase tracking-widest">{toast.text}</span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
