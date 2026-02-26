import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, Banknote, ChevronLeft, ChevronRight } from 'lucide-react';
import { DOCUMENT_TYPES } from './DocumentSelection';

interface PaymentMethodProps {
  selectedDocs: string[];
  totalAmount: number;
  paymentMethod: 'online' | 'manual' | null;
  setPaymentMethod: (method: 'online' | 'manual') => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PaymentMethod({ selectedDocs, totalAmount, paymentMethod, setPaymentMethod, onNext, onPrev }: PaymentMethodProps) {
  return (
    <motion.div 
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Method</h2>
        <p className="text-slate-500">Choose how you want to pay for your requested documents.</p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-200 shadow-inner">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Order Summary</h3>
        <div className="space-y-3 mb-4">
          {selectedDocs.map(docId => {
            const doc = DOCUMENT_TYPES.find(d => d.id === docId);
            return (
              <div key={docId} className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">{doc?.label}</span>
                <span className="font-bold text-slate-900">₱{doc?.price.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
          <span className="font-bold text-slate-900">Total to pay</span>
          <span className="text-3xl font-black text-emerald-500">₱{totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          onClick={() => setPaymentMethod('online')}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${
            paymentMethod === 'online' ? 'border-emerald-500 bg-emerald-50/50 shadow-sm shadow-emerald-100' : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
            paymentMethod === 'online' ? 'bg-emerald-500 text-white shadow-emerald-200/50' : 'bg-white border border-slate-200 text-slate-400'
          }`}>
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Online Payment</h3>
            <p className="text-sm text-slate-500 font-medium">Pay via GCash, Maya, or Credit/Debit Card</p>
          </div>
        </div>

        <div 
          onClick={() => setPaymentMethod('manual')}
          className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${
            paymentMethod === 'manual' ? 'border-emerald-500 bg-emerald-50/50 shadow-sm shadow-emerald-100' : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${
            paymentMethod === 'manual' ? 'bg-emerald-500 text-white shadow-emerald-200/50' : 'bg-white border border-slate-200 text-slate-400'
          }`}>
            <Banknote className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Manual Payment</h3>
            <p className="text-sm text-slate-500 font-medium">Pay at the Cashier's Office on campus</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
        <button 
          onClick={onPrev}
          className="px-6 py-3 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button 
          onClick={onNext}
          disabled={!paymentMethod}
          className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-sm hover:shadow-emerald-200/50 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Confirm Request <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
