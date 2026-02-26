import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface IdentityVerificationProps {
  idFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function IdentityVerification({ idFile, onFileChange, onNext, onPrev }: IdentityVerificationProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Identity Verification</h2>
        <p className="text-slate-500">Please upload a clear photo of your valid Student ID for verification.</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all ${idFile ? 'border-accent bg-accent/10 shadow-inner' : 'border-slate-300 hover:border-accent bg-slate-50/50'
          }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="image/*"
          className="hidden"
        />

        {idFile ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-accent/20 text-accent-foreground rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>
            <p className="font-bold text-slate-900 mb-1">{idFile.name}</p>
            <p className="text-sm text-slate-500 mb-6">{(idFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-bold text-accent-foreground hover:text-accent-hover transition-colors"
            >
              Upload a different file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white border border-slate-200 text-slate-400 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Upload className="w-8 h-8" />
            </div>
            <p className="font-bold text-slate-900 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-slate-500 mb-6">SVG, PNG, JPG or GIF (max. 5MB)</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-accent transition-all shadow-sm"
            >
              Select File
            </button>
          </div>
        )}
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
          disabled={!idFile}
          className="px-6 py-3 bg-accent text-slate-900 font-bold rounded-2xl hover:bg-accent-hover transition-all shadow-sm hover:shadow-accent/20 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
