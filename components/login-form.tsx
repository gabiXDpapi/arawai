'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    // Immediate navigation for better reliability in preview environment
    // We still show the loader briefly for UX
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* Logo Area */}
      <div className="flex flex-col items-center mb-10">
        <Logo width={48} height={48} />
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">
          ARAW<span className="text-accent">.ai</span>
        </h1>
        <p className="text-sm text-slate-500 text-center max-w-[280px]">
          Automate Registrar and Administrative Workflows
        </p>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/50"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                required
                suppressHydrationWarning
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs font-medium text-accent-foreground hover:text-accent-hover transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                required
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                suppressHydrationWarning
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover active:bg-accent text-slate-900 font-medium py-4 px-6 rounded-2xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden shadow-lg shadow-accent/20"
              suppressHydrationWarning
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-4">
          <p className="text-sm text-slate-500">
            Need access?{' '}
            <a href="#" className="font-medium text-slate-900 hover:text-accent-foreground transition-colors relative inline-block">
              Contact Administrator
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          </p>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="text-xs font-bold text-accent-foreground hover:underline uppercase tracking-widest"
          >
            Demo Login (Bypass)
          </button>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} ARAW.ai. All rights reserved.
        </p>
      </div>
    </div>
  );
}
