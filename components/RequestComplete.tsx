import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Download, X, Eye, FileText } from 'lucide-react';
import { DOCUMENT_TYPES } from './DocumentSelection';

interface RequestCompleteProps {
  priorityNumber: string | null;
  paymentMethod: 'online' | 'manual' | null;
  totalAmount: number;
  selectedDocs: string[];
  onReset: () => void;
}

export function RequestComplete({ priorityNumber, paymentMethod, totalAmount, selectedDocs, onReset }: RequestCompleteProps) {
  const [showModal, setShowModal] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 text-center"
    >
      <div className="w-24 h-24 bg-accent/20 text-accent-foreground rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm shadow-accent/10">
        <CheckCircle className="w-12 h-12" />
      </div>

      <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Request Submitted!</h2>
      <p className="text-lg text-slate-500 font-medium mb-10">Your document request has been successfully recorded.</p>

      <div
        className="bg-slate-50/50 rounded-3xl p-8 max-w-md mx-auto border border-slate-100 mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-accent-hover"></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Priority Number</p>
        <div className="text-5xl font-black text-accent-foreground tracking-tighter mb-4">
          {priorityNumber}
        </div>
        <p className="text-xs font-bold text-accent-foreground/60 uppercase tracking-widest mb-0">Visayas State University</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-accent transition-all shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Eye className="w-5 h-5" /> View Summary (Screenshot)
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3.5 bg-accent text-slate-900 font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-sm hover:shadow-accent/20 hover:shadow-xl active:scale-95 w-full sm:w-auto justify-center"
        >
          Make Another Request
        </button>
      </div>

      {/* Screenshot Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#f8fafc] rounded-[40px] shadow-2xl overflow-y-auto max-h-[90vh] border border-white/20 p-1 custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 backdrop-blur-md hover:bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-sm transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-10 text-center">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#fece00] to-[#e5b900]"></div>

                {/* Receipt Header */}
                <div className="flex items-center justify-between mb-8 text-left">
                  <div>
                    <div className="font-black text-slate-900 text-xl tracking-tighter leading-none mb-1">
                      ARAW<span className="text-[#fece00]">.ai</span>
                    </div>
                    <p className="text-[9px] font-black text-[#fece00] uppercase tracking-widest">Registrar System</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Date</p>
                    <p className="text-[10px] font-bold text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>

                <div className="py-6 border-y border-slate-200/60 mb-8 border-dashed flex items-center justify-between px-2 bg-white/40 rounded-xl">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Priority No.</p>
                    <div className="text-6xl font-black text-[#4a3e00] tracking-tighter leading-none">{priorityNumber}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Amount Due</p>
                    <div className="text-2xl font-black text-slate-900 tracking-tighter">
                      {totalAmount > 0 ? `₱${totalAmount.toFixed(2)}` : <span className="text-emerald-500 uppercase">Free</span>}
                    </div>
                  </div>
                </div>

                {/* Requested Documents Section */}
                <div className="text-left mb-8">
                  <h4 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-widest mb-4">
                    <FileText className="w-4 h-4 text-accent-foreground" /> Requested Documents
                  </h4>
                  <div className="bg-white/50 border border-slate-100 rounded-2xl p-4 space-y-3">
                    {selectedDocs.map(docId => {
                      const doc = DOCUMENT_TYPES.find(d => d.id === docId);
                      return (
                        <div key={docId} className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700">{doc?.label}</span>
                          <span className="font-black text-slate-900">
                            {doc?.price && doc.price > 0 ? `₱${doc.price.toFixed(2)}` : <span className="text-emerald-500 font-black">FREE</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-left space-y-6 mb-10">
                  <h4 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-widest leading-none">
                    <AlertCircle className="w-4 h-4 text-[#f59e0b]" /> Instructions
                  </h4>

                  <div className="space-y-4">
                    {totalAmount === 0 ? (
                      <div className="flex gap-4">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black">✓</span>
                        <p className="text-sm font-medium text-slate-600">This request is free. We will process your documents and notify you via email once they are ready for pickup or download.</p>
                      </div>
                    ) : paymentMethod === 'manual' ? (
                      <>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">1</span>
                          <p className="text-sm font-medium text-slate-600">Proceed to <strong className="text-slate-900">Cashier</strong> (Bldg A, RM 102).</p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">2</span>
                          <p className="text-sm font-medium text-slate-600">Present this Priority Number: <strong className="text-slate-900">{priorityNumber}</strong>.</p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">3</span>
                          <p className="text-sm font-medium text-slate-600">Pay the total: <strong className="text-slate-900">₱{totalAmount.toFixed(2)}</strong>.</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">1</span>
                          <p className="text-sm font-medium text-slate-600">Verify payment in your registered email.</p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">2</span>
                          <p className="text-sm font-medium text-slate-600">Total amount paid: <strong className="text-slate-900">₱{totalAmount.toFixed(2)}</strong>.</p>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-black">3</span>
                          <p className="text-sm font-medium text-slate-600">Processing will be done automatically.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-center gap-2 mb-8">
                  <Download className="w-4 h-4 text-slate-400" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Screenshot this for your records</p>
                </div>

                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
                  Visayas State University Registrar Portal<br />
                  ARAW.ai Automation System
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
