import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, Printer } from 'lucide-react';

interface RequestCompleteProps {
  priorityNumber: string | null;
  paymentMethod: 'online' | 'manual' | null;
  totalAmount: number;
  onReset: () => void;
}

export function RequestComplete({ priorityNumber, paymentMethod, totalAmount, onReset }: RequestCompleteProps) {
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

      <div className="bg-slate-50 rounded-3xl p-8 max-w-md mx-auto border border-slate-200 mb-10 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-accent-hover"></div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Priority Number</p>
        <div className="text-5xl font-black text-accent-foreground tracking-tighter mb-8">
          {priorityNumber}
        </div>

        <div className="text-left space-y-5">
          <h4 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Next Steps
          </h4>

          {paymentMethod === 'manual' ? (
            <ul className="text-sm text-slate-600 font-medium space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">1</span>
                <span className="pt-0.5">Proceed to the <strong className="text-slate-900">Cashier's Office</strong> (Bldg A, Room 102).</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">2</span>
                <span className="pt-0.5">Present your Priority Number: <strong className="text-slate-900">{priorityNumber}</strong>.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">3</span>
                <span className="pt-0.5">Pay the total amount of <strong className="text-slate-900">₱{totalAmount.toFixed(2)}</strong>.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">4</span>
                <span className="pt-0.5">Wait for an email notification when your documents are ready for pickup.</span>
              </li>
            </ul>
          ) : (
            <ul className="text-sm text-slate-600 font-medium space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">1</span>
                <span className="pt-0.5">Check your email for the secure payment link.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">2</span>
                <span className="pt-0.5">Complete the online payment of <strong className="text-slate-900">₱{totalAmount.toFixed(2)}</strong>.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">3</span>
                <span className="pt-0.5">Your request will be processed automatically after payment confirmation.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black">4</span>
                <span className="pt-0.5">Wait for an email notification when your documents are ready.</span>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-accent transition-all shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Printer className="w-5 h-5" /> Print Details
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3.5 bg-accent text-slate-900 font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-sm hover:shadow-accent/20 hover:shadow-xl active:scale-95 w-full sm:w-auto justify-center"
        >
          Make Another Request
        </button>
      </div>
    </motion.div>
  );
}
