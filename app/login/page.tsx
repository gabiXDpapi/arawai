import Link from 'next/link';
import { LoginForm } from '@/components/login-form';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-amber-50/30 blur-[100px]" />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20">
        <Link
          href="/"
          className="group flex items-center gap-3 text-slate-500 hover:text-accent-foreground font-bold transition-all duration-300"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 group-hover:border-accent group-hover:shadow-accent/20 group-hover:shadow-xl transition-all active:scale-90">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="hidden md:inline-block text-sm uppercase tracking-widest">Back to Admissions</span>
        </Link>
      </div>

      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </main>
  );
}
