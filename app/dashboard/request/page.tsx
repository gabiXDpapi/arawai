'use client';

import { useState, useEffect } from 'react';
import {
    ShieldCheck,
    LogOut,
    Bell,
    LayoutDashboard,
    MessageSquare,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { DocumentRequestFlow } from '@/components/DocumentRequestFlow';
import { Logo } from '@/components/Logo';

export default function DocumentRequestPage() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200/20 group-hover:scale-105 transition-transform border border-slate-100">
                                <Logo width={28} height={28} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 leading-none">ARAW<span className="text-emerald-500">.ai</span></h1>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Student Portal</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard/status"
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-transparent hover:border-emerald-100 shadow-sm"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Document Status
                        </Link>

                        <Link
                            href="/dashboard"
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-transparent hover:border-emerald-100 shadow-sm"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Assistant
                        </Link>

                        <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

                        <div className="hidden md:flex flex-col items-end mr-4">
                            <p className="text-sm font-bold text-slate-900">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>

                        <button className="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all relative">
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

            <div className="flex-1 flex flex-col max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-white rounded-[20px] shadow-sm border border-slate-100 flex items-center justify-center text-emerald-500">
                        <FileText className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Request Documents</h2>
                        <p className="text-sm text-slate-500 font-medium">Follow the steps below to request your academic documents.</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    <DocumentRequestFlow />
                </div>
            </div>
        </main>
    );
}
