'use client';

import { motion } from 'motion/react';
import { Chatbot } from '@/components/chatbot';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-amber-50/30 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16 backdrop-blur-xl border-b border-white/20">
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            ARAW<span className="text-accent">.ai</span>
          </h1>
        </div>

        <Link
          href="/login"
          className="group flex items-center gap-3 bg-white hover:bg-accent text-slate-700 hover:text-slate-900 font-bold py-3 px-6 rounded-2xl border border-slate-200 hover:border-accent transition-all duration-300 shadow-sm hover:shadow-accent/50 hover:shadow-xl active:scale-95"
        >
          <span className="text-sm">Student Login</span>
          <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
              The Future of <span className="text-accent">VSU Admissions</span> is Here.
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              I&apos;m your virtual assistant for Visayas State University. Ask me anything about the application process, document requirements, or freshman enrollment.
            </p>
          </motion.div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          <Chatbot />
        </div>
      </div>
    </main>
  );
}
