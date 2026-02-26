'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '@/components/Logo';
import {
    CreditCard,
    ArrowLeft,
    ShieldCheck,
    Smartphone,
    Receipt,
    FileText,
    Clock,
    ChevronRight,
    CheckCircle2,
    Bell,
    LogOut,
    MessageSquare,
    ExternalLink,
    MapPin,
    Users,
    LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';
import { GCashPayment } from '@/components/GCashPayment';

export default function PayFeesPage() {
    const [selectedFee, setSelectedFee] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showPayment, setShowPayment] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showManualSuccess, setShowManualSuccess] = useState(false);
    const [userTicket, setUserTicket] = useState<number | null>(null);
    const [nextTicketNumber, setNextTicketNumber] = useState(155);
    const [priorityNumber, setPriorityNumber] = useState(142);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const pendingFees = [
        {
            id: "lib-2026",
            title: "Library Fees",
            type: "Miscellaneous",
            amount: 250.00,
            dueDate: "March 15, 2026",
            description: "Late book return or library resource usage fees.",
            breakdown: [
                { name: "Library Fine", value: 250.00 }
            ]
        },
        {
            id: "enrol-late-2026",
            title: "Late Enrollment Fee",
            type: "Miscellaneous",
            amount: 250.00,
            dueDate: "March 15, 2026",
            description: "Surcharge for processing enrollment after the deadline.",
            breakdown: [
                { name: "Late Enrollment Charge", value: 250.00 }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard/status"
                            className="sm:hidden flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-500 rounded-xl"
                        >
                            <MessageSquare className="w-5 h-5" />
                        </Link>

                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform border border-slate-100">
                                <Logo width={28} height={28} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 leading-none">ARAW<span className="text-accent">.ai</span></h1>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Student Portal</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard/status"
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 hover:bg-accent/10 hover:text-accent-foreground rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-transparent hover:border-accent/20 shadow-sm"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Document Status
                        </Link>

                        <Link
                            href="/dashboard"
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 hover:bg-accent/10 hover:text-accent-foreground rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-transparent hover:border-accent/20 shadow-sm"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Assistant
                        </Link>

                        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

                        <div className="hidden md:flex flex-col items-end mr-4">
                            <p className="text-sm font-bold text-slate-900">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <button className="p-2.5 text-slate-400 hover:text-accent-foreground hover:bg-accent/10 rounded-xl transition-all relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-xl text-sm font-bold transition-all border border-transparent hover:border-rose-100"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all group"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Settle Your Fees</h2>
                        <p className="text-slate-500 font-medium">Select a pending balance to proceed with payment.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {pendingFees.map((fee, index) => (
                        <motion.div
                            key={fee.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedFee(fee)}
                            className="bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all overflow-hidden group cursor-pointer active:scale-[0.98]"
                        >
                            <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                                        <Receipt className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                                                {fee.type}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{fee.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium">{fee.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 italic">Balance Due</p>
                                        <p className="text-3xl font-black text-slate-900 tracking-tighter">₱{fee.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-accent/10 group-hover:text-accent transition-all">
                                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>

                            {/* Fee Details Expansion */}
                            <div className="bg-slate-50/50 border-t border-slate-100 p-6 flex flex-wrap gap-6 items-center">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <Clock className="w-4 h-4" /> Due {fee.dueDate}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <ShieldCheck className="w-4 h-4" /> Verified by Finance
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {selectedFee && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedFee(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
                        >
                            {showPayment ? (
                                <GCashPayment
                                    totalAmount={selectedFee.amount}
                                    onBack={() => setShowPayment(false)}
                                    onSubmit={() => {
                                        setShowPayment(false);
                                        setShowSuccess(true);
                                    }}
                                />
                            ) : (
                                <>
                                    <div className="p-8 bg-slate-50 relative border-b border-slate-100">
                                        <button
                                            onClick={() => setSelectedFee(null)}
                                            className="absolute top-6 right-6 p-2 bg-white rounded-xl text-slate-400 hover:text-slate-900 shadow-sm transition-all"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>

                                        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">Review Payment</h3>
                                        <p className="text-sm text-slate-500 font-medium italic mb-6">Checking out for {selectedFee.title}</p>

                                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group transition-all hover:border-accent/30">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 italic">Payable Amount</p>
                                            <p className="text-4xl font-black text-slate-900 tracking-tighter">₱{selectedFee.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                                                <CreditCard className="w-3 h-3" /> Select Payment Method
                                            </h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                <button
                                                    onClick={() => setShowPayment(true)}
                                                    className="flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-3xl hover:border-accent hover:bg-accent/5 group transition-all"
                                                >
                                                    <div className="flex items-center gap-4 text-left">
                                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                                            <Smartphone className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900">Online Payment</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GCash / Mobile Wallet</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-accent" />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setUserTicket(nextTicketNumber);
                                                        setNextTicketNumber(prev => prev + 1);
                                                        setShowManualSuccess(true);
                                                        setSelectedFee(null);
                                                    }}
                                                    className="flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-3xl hover:border-slate-900 hover:bg-slate-50 group transition-all"
                                                >
                                                    <div className="flex items-center gap-4 text-left">
                                                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                                            <MapPin className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900">Manual Payment</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pay at Cashier Window</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                                                <Receipt className="w-3 h-3" /> Item Breakdown
                                            </h4>
                                            <div className="bg-slate-50 rounded-2xl border border-slate-100 divide-y divide-slate-200">
                                                {selectedFee.breakdown.map((item: any, i: number) => (
                                                    <div key={i} className="flex justify-between p-4 px-6 text-xs font-bold text-slate-600">
                                                        <span>{item.name}</span>
                                                        <span className="text-slate-900 font-black tracking-tight">₱{item.value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 pt-0 text-center">
                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                            Encryption Active <ShieldCheck className="inline-block w-3 h-3 ml-1" />
                                        </p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Manual Success Ticket Modal */}
            <AnimatePresence>
                {showManualSuccess && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowManualSuccess(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
                        >
                            <div className="p-8 bg-slate-900 text-white text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-[0.2em]">Queue Ticket</h3>
                                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Cash Division • Manual Payment</p>
                            </div>

                            <div className="p-8 space-y-8 bg-white text-center">
                                <div>
                                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-2">Your Priority Number</p>
                                    <div className="text-7xl font-black text-slate-900 tracking-tighter">
                                        {userTicket}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 italic">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                    <div className="text-left">
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Est. Serving Time</p>
                                        <p className="text-sm font-bold text-slate-900">Approximately 25 mins</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-dashed border-slate-200">
                                    <div className="flex justify-between text-xs font-bold text-slate-900">
                                        <span className="text-slate-400">Transaction ID</span>
                                        <span>#ARW-QN-{userTicket}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-slate-900">
                                        <span className="text-slate-400">Counter Window</span>
                                        <span>Window 2-4</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 pt-0 bg-white">
                                <button
                                    onClick={() => setShowManualSuccess(false)}
                                    className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-xs uppercase tracking-widest"
                                >
                                    Done, Proceed to Cashier
                                </button>
                                <div className="mt-4 flex justify-between px-2 relative">
                                    <div className="absolute -left-10 top-0 w-6 h-6 bg-slate-50 rounded-full border border-slate-100"></div>
                                    <div className="absolute -right-10 top-0 w-6 h-6 bg-slate-50 rounded-full border border-slate-100"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccess(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mx-auto mb-6 shadow-lg shadow-green-100/50">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2">Transaction Finalized</h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                                Your payment for {selectedFee?.title} has being processed. A receipt has been sent to your email.
                            </p>

                            <button
                                onClick={() => {
                                    setShowSuccess(false);
                                    setSelectedFee(null);
                                }}
                                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-xs uppercase tracking-widest"
                            >
                                Go Back to Dashboard
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
