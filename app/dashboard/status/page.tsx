'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  Receipt, 
  Package, 
  CreditCard, 
  AlertCircle, 
  Users, 
  LogOut,
  ChevronRight,
  Clock,
  Bell,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [priorityNumber, setPriorityNumber] = useState(142);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const documentStatuses = [
    {
      id: 1,
      title: 'Official Receipt',
      status: 'To Receive',
      description: 'Your payment has been verified. Please proceed to the window to receive your receipt.',
      icon: Receipt,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      id: 2,
      title: 'Application Documents',
      status: 'To Pickup',
      description: 'Your requested documents are ready for collection at the Registrar\'s office.',
      icon: Package,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
    {
      id: 3,
      title: 'Enrollment Fees',
      status: 'To Pay',
      description: 'Pending payment for the current semester. Please settle at the Cashier.',
      icon: CreditCard,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
    {
      id: 4,
      title: 'Library Fines',
      status: 'Pending Fine',
      description: 'Overdue book return detected. Please settle your fine of ₱50.00.',
      icon: AlertCircle,
      color: 'bg-rose-500',
      lightColor: 'bg-rose-50',
      textColor: 'text-rose-700',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard"
              className="sm:hidden flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-500 rounded-xl"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>
            
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200/50 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none">ARAW<span className="text-emerald-500">.ai</span></h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Student Portal</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
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

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Status Area */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Document Status</h2>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full">4 Active Tasks</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documentStatuses.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${item.lightColor} rounded-2xl flex items-center justify-center ${item.textColor} group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 ${item.lightColor} ${item.textColor} text-[10px] font-black uppercase tracking-widest rounded-full`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{item.description}</p>
                    <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:gap-2 transition-all">
                      View Details <ChevronRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Application History Placeholder */}
            <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Recent Applications</h2>
              </div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Transcript of Records Request</p>
                        <p className="text-xs text-slate-400">Submitted on Feb 20, 2026</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Completed</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar / Priority Number */}
          <div className="space-y-8">
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-[40px] p-8 text-white shadow-2xl shadow-emerald-200 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold uppercase tracking-widest opacity-90">Cash Division</h2>
                </div>

                <div className="text-center mb-8">
                  <p className="text-sm font-medium opacity-80 mb-2">Current Priority Number</p>
                  <div className="text-7xl font-black tracking-tighter mb-2">{priorityNumber}</div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
                    <Clock className="w-3 h-3" /> Estimated Wait: 15 mins
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-white text-emerald-600 font-black rounded-2xl shadow-lg hover:bg-emerald-50 transition-all active:scale-95">
                    Refresh Status
                  </button>
                  <p className="text-[10px] text-center opacity-60 font-medium">Last updated: Just now</p>
                </div>
              </div>
            </motion.section>

            {/* Quick Actions */}
            <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-[24px] hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100 group">
                  <FileText className="w-6 h-6 mb-2 text-slate-400 group-hover:text-emerald-500" />
                  <span className="text-xs font-bold">Request Doc</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-[24px] hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-100 group">
                  <CreditCard className="w-6 h-6 mb-2 text-slate-400 group-hover:text-emerald-500" />
                  <span className="text-xs font-bold">Pay Fees</span>
                </button>
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
