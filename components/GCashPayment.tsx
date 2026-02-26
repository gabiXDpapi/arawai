'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

interface GCashPaymentProps {
    totalAmount: number;
    onSubmit: () => void;
    onBack: () => void;
}

export function GCashPayment({ totalAmount, onSubmit, onBack }: GCashPaymentProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onSubmit();
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-center p-8 min-h-[500px]"
        >
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
                <div className="bg-[#007DFE] p-8 text-white">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                                <Smartphone className="w-7 h-7 text-[#007DFE]" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl tracking-tight">GCash</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Official Payment</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Amount Due</p>
                            <p className="text-3xl font-black">₱{totalAmount.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full w-fit text-[10px] font-bold uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" /> Secure Transaction
                    </div>
                </div>

                <form onSubmit={handlePay} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">GCash Number</label>
                            <input
                                type="text"
                                placeholder="09XX XXX XXXX"
                                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="As registered in GCash"
                                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-2 space-y-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-[#007DFE] hover:bg-[#0066CC] active:bg-[#005bb8] text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Pay Now <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onBack}
                            disabled={isSubmitting}
                            className="w-full py-2 text-slate-400 hover:text-slate-600 font-bold text-xs uppercase tracking-widest transition-colors"
                        >
                            Cancel Payment
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
