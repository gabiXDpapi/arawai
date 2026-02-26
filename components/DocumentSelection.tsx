import React from 'react';
import { motion } from 'motion/react';
import { Check, ChevronRight } from 'lucide-react';

export type DocumentType = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export const DOCUMENT_TYPES: DocumentType[] = [
  { id: 'cor_ecopy', label: 'COR (e-copy)', description: 'Certificate of Registration electronic copy', price: 50 },
  { id: 'cor_validation', label: 'COR (Validation)', description: 'Certificate of Registration for validation', price: 50 },
  { id: 'cog', label: 'Certificate of Grades (COG)', description: 'Official copy of your grades', price: 100 },
  { id: 'tor', label: 'Transcript of Records (TOR)', description: 'Complete academic record', price: 150 },
];

interface DocumentSelectionProps {
  selectedDocs: string[];
  toggleDocument: (id: string) => void;
  totalAmount: number;
  onNext: () => void;
}

export function DocumentSelection({ selectedDocs, toggleDocument, totalAmount, onNext }: DocumentSelectionProps) {
  return (
    <motion.div 
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Documents</h2>
        <p className="text-slate-500">Choose the documents you need to request. You can select multiple items.</p>
      </div>

      <div className="space-y-3">
        {DOCUMENT_TYPES.map((doc) => {
          const isSelected = selectedDocs.includes(doc.id);
          return (
            <div 
              key={doc.id}
              onClick={() => toggleDocument(doc.id)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                isSelected ? 'border-emerald-500 bg-emerald-50/50 shadow-sm shadow-emerald-100' : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className={`font-semibold ${isSelected ? 'text-emerald-900' : 'text-slate-900'}`}>
                    {doc.label}
                  </h3>
                  <p className="text-sm text-slate-500">{doc.description}</p>
                </div>
              </div>
              <div className="font-bold text-slate-700">
                ₱{doc.price.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
        <div className="text-slate-500">
          Total Amount: <span className="text-2xl font-black text-slate-900 ml-2">₱{totalAmount.toFixed(2)}</span>
        </div>
        <button 
          onClick={onNext}
          disabled={selectedDocs.length === 0}
          className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-sm hover:shadow-emerald-200/50 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
