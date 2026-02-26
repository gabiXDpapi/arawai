'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '@/components/Logo';
import {
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
  MessageSquare,
  X,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import { GCashPayment } from '@/components/GCashPayment';

export default function DashboardPage() {
  const [priorityNumber, setPriorityNumber] = useState(142);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showManualSuccess, setShowManualSuccess] = useState(false);
  const [userTicket, setUserTicket] = useState<number | null>(null);
  const [nextTicketNumber, setNextTicketNumber] = useState(155);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setPriorityNumber(prev => prev + Math.floor(Math.random() * 3) + 1);
      setIsRefreshing(false);
    }, 1500);
  };

  const documentStatuses = [
    {
      id: 1,
      title: 'Official Receipt',
      status: 'To Receive',
      description: 'Your payment has been verified. Please proceed to the window to receive your receipt.',
      icon: Receipt,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      details: {
        number: 'OR-2026-0422',
        date: 'Feb 22, 2026',
        amount: '₱550.00',
        method: 'GCash',
        location: 'Cashier Window 3',
        timeline: [
          { label: 'Payment Submitted', date: 'Feb 21, 2026', completed: true },
          { label: 'Verification Process', date: 'Feb 21, 2026', completed: true },
          { label: 'Receipt Printed', date: 'Feb 22, 2026', completed: true },
          { label: 'Ready for Pickup', date: 'Today', completed: false }
        ]
      }
    },
    {
      id: 2,
      title: 'Application Documents',
      status: 'To Pickup',
      description: "Your requested documents are ready for collection at the Registrar's office.",
      icon: Package,
      color: 'bg-accent',
      lightColor: 'bg-accent/10',
      textColor: 'text-accent-foreground',
      details: {
        number: 'REQ-2026-8812',
        date: 'Feb 20, 2026',
        items: ['Transcript of Records (Official Copy)', 'Certificate of Registration (Validated)'],
        location: "Registrar's Office - Window 1",
        timeline: [
          { label: 'Request Filed', date: 'Feb 18, 2026', completed: true },
          { label: 'Payment Confirmed', date: 'Feb 18, 2026', completed: true },
          { label: 'Processing', date: 'Feb 19, 2026', completed: true },
          { label: 'Available for Pickup', date: 'Feb 20, 2026', completed: true }
        ]
      }
    },
    {
      id: 3,
      title: 'Admin Fees',
      status: 'To Pay',
      description: 'Pending payment for the current semester. Please settle at the Cashier.',
      icon: CreditCard,
      color: 'bg-amber-600',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      details: {
        number: 'SEM-2026-2',
        period: 'Second Semester 2025-2026',
        amount: '₱500.000',
        dueDate: 'March 15, 2026',
        breakdown: [
          { name: 'Library Fees', value: '₱250.00' },
          { name: 'Late Enrollment Fee', value: '₱250.00' }
        ]
      }
    },
    {
      id: 4,
      title: 'Pending Documents',
      status: 'In Review',
      description: 'Your submitted admission requirements are currently being verified by the Registrar.',
      icon: FileText,
      color: 'bg-indigo-600',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      details: {
        number: 'SUB-2026-015',
        type: 'Admission Requirements',
        dateSubmitted: 'Feb 24, 2026',
        documents: [
          { name: 'Transcript of Records', status: 'Verified' },
          { name: 'Copy of Grades', status: 'In Review' },
          { name: 'Transfer Credentials', status: 'Verified' }
        ],
        estimatedDays: '2-3 working days'
      }
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

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Status Area */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Document Status</h2>
                <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-[10px] font-black uppercase tracking-widest rounded-full">4 Active Tasks</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documentStatuses.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowPayment(false);
                    }}
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
                    <div className="flex items-center text-xs font-bold text-accent-foreground group-hover:gap-2 transition-all">
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
              className="bg-gradient-to-br from-accent to-accent-hover rounded-[40px] p-8 text-slate-900 shadow-2xl shadow-accent/20 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold uppercase tracking-widest opacity-90">Cash Division</h2>
                </div>

                <div className="text-center mb-8 text-white">
                  <p className="text-sm font-medium opacity-80 mb-2">
                    {userTicket ? 'Your Priority Number' : 'Current Priority Number'}
                  </p>
                  <div className="text-7xl font-black tracking-tighter mb-2">
                    {userTicket || priorityNumber}
                  </div>
                  {userTicket ? (
                    <div className="inline-flex flex-col items-center gap-1">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Users className="w-3 h-3" /> Now Serving: #{priorityNumber}
                      </div>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-2">{userTicket - priorityNumber} people ahead of you</p>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> Estimated Wait: 15 mins
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="w-full py-4 bg-white text-accent-foreground font-black rounded-2xl shadow-lg hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Checking...' : 'Refresh Status'}
                  </button>
                  <p className="text-[10px] text-center opacity-60 font-medium">Last updated: {isRefreshing ? 'Updating...' : 'Just now'}</p>
                </div>
              </div>
            </motion.section>

            {/* Quick Actions */}
            <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard/request"
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-[24px] hover:bg-accent/10 hover:text-accent-foreground transition-all border border-transparent hover:border-accent/20 group"
                >
                  <FileText className="w-6 h-6 mb-2 text-slate-400 group-hover:text-accent" />
                  <span className="text-xs font-bold">Request Doc</span>
                </Link>
                <Link
                  href="/dashboard/payfees"
                  className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-[24px] hover:bg-accent/10 hover:text-accent-foreground transition-all border border-transparent hover:border-accent/20 group text-center w-full"
                >
                  <CreditCard className="w-6 h-6 mb-2 text-slate-400 group-hover:text-accent" />
                  <span className="text-xs font-bold">Pay Fees</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Status Detail Popup */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
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
                  totalAmount={parseFloat(selectedItem.details.amount.replace('₱', '').replace(',', ''))}
                  onBack={() => setShowPayment(false)}
                  onSubmit={() => {
                    setShowPayment(false);
                    setShowSuccess(true);
                    // Update status locally for feedback
                    if (selectedItem) {
                      selectedItem.status = 'Processing';
                    }
                  }}
                />
              ) : (
                <>
                  {/* Modal Header */}
                  <div className={`p-8 ${selectedItem.lightColor} relative`}>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-xl text-slate-500 hover:text-slate-900 transition-all z-10"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-5 mb-6 relative z-0">
                      <div className={`w-16 h-16 ${selectedItem.color} rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-slate-200/50 rotate-3`}>
                        <selectedItem.icon className="w-8 h-8 -rotate-3" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedItem.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 ${selectedItem.color} text-white rounded-lg`}>
                            {selectedItem.status}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            {selectedItem.details.number}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Modal Body */}
                  <div className="p-8 space-y-6 max-h-[50vh] overflow-y-auto">
                    {selectedItem.id === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 bg-slate-50 rounded-[24px] border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 italic">Total Paid</p>
                            <p className="text-xl font-black text-slate-900">{selectedItem.details.amount}</p>
                          </div>
                          <div className="p-5 bg-slate-50 rounded-[24px] border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 italic">Channel</p>
                            <p className="text-xl font-black text-slate-900">{selectedItem.details.method}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-2 px-1">
                            <Clock className="w-3 h-3" /> Status Timeline
                          </h4>
                          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                            {selectedItem.details.timeline.map((step: any, i: number) => (
                              <div key={i} className="flex items-start gap-4 relative z-10">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${step.completed ? 'bg-green-500 text-white' : 'bg-slate-200 text-white'}`}>
                                  <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                                  <p className="text-[10px] text-slate-400">{step.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedItem.id === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-1">Included Documents</h4>
                          {selectedItem.details.items.map((doc: string, i: number) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-accent/20 transition-all cursor-default">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-accent shadow-sm">
                                <FileText className="w-5 h-5" />
                              </div>
                              <p className="text-sm font-bold text-slate-900">{doc}</p>
                            </div>
                          ))}
                        </div>
                        <div className="p-5 bg-accent/5 border-2 border-dashed border-accent/20 rounded-3xl flex items-center gap-4 text-accent-foreground">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-accent/10">
                            <MapPin className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-[10px] opacity-70 font-black uppercase tracking-widest">Collector Window</p>
                            <p className="text-sm font-black">{selectedItem.details.location}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedItem.id === 3 && (
                      <div className="space-y-6">
                        <div className="p-8 bg-amber-50 rounded-[32px] border border-amber-100 text-center relative overflow-hidden">
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl"></div>
                          <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-2">Total Balance Due</p>
                          <p className="text-4xl font-black text-amber-700">{selectedItem.details.amount}</p>
                          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                            <Calendar className="w-3 h-3" /> {selectedItem.details.dueDate}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-1 italic">Payment Details</h4>
                          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
                            {selectedItem.details.breakdown.map((fee: any, i: number) => (
                              <div key={i} className="flex justify-between p-4 px-6">
                                <span className="text-sm font-medium text-slate-500">{fee.name}</span>
                                <span className="text-sm font-bold text-slate-900">{fee.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedItem.id === 4 && (
                      <div className="space-y-6">
                        <div className="p-6 bg-indigo-50 rounded-[32px] border border-indigo-100 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest mb-1 italic">Verification Status</p>
                            <p className="text-xl font-black text-indigo-900">Processing</p>
                          </div>
                          <div className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-indigo-100">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-center">EST. WAIT</p>
                            <p className="text-sm font-black text-indigo-600 text-center">{selectedItem.details.estimatedDays}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-1 italic">Submission Details</p>
                          <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-50 overflow-hidden">
                            {selectedItem.details.documents.map((doc: any, i: number) => (
                              <div key={i} className="flex justify-between items-center p-4 px-6 hover:bg-slate-50 transition-colors">
                                <span className="text-sm font-bold text-slate-700">{doc.name}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${doc.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                  {doc.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                          <p className="text-xs font-medium text-blue-700 leading-relaxed">
                            We will notify you once all documents are verified. Please keep your original copies ready.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-8 pt-0 bg-white">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all active:scale-95 text-xs uppercase tracking-widest"
                      >
                        Dismiss
                      </button>
                      {selectedItem.status === 'To Pay' ? (
                        <>
                          <button
                            onClick={() => {
                              setUserTicket(nextTicketNumber);
                              setNextTicketNumber(prev => prev + 1);
                              setShowManualSuccess(true);
                              setSelectedItem(null);
                            }}
                            className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                          >
                            <MapPin className="w-4 h-4" /> Manual
                          </button>
                          <button
                            onClick={() => setShowPayment(true)}
                            className={`flex-1 py-4 ${selectedItem.color} text-white font-black rounded-2xl shadow-xl hover:brightness-110 transition-all active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-2`}
                          >
                            <CreditCard className="w-4 h-4" /> Online
                          </button>
                        </>
                      ) : (
                        <button className={`flex-[1.5] py-4 ${selectedItem.color} text-white font-black rounded-2xl shadow-xl hover:brightness-110 transition-all active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-2`}>
                          <ExternalLink className="w-4 h-4" /> View Full Details
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-center text-slate-400 mt-6 font-bold uppercase tracking-[0.2em]">ARAW.ai Security Verified</p>
                  </div>
                </>
              )}
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

              <h3 className="text-2xl font-black text-slate-900 mb-2">Payment Successful!</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
                Your payment has been received and is now being processed. We'll notify you once it's finalized.
              </p>

              <button
                onClick={() => {
                  setShowSuccess(false);
                  setSelectedItem(null);
                }}
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                Got it, thanks!
              </button>
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
    </main>
  );
}
