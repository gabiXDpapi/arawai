'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import {
  Send,
  Bot,
  User,
  Sparkles,
  CreditCard,
  Smartphone,
  Users,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Info,
  FileText
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'itinerary' | 'fines_choice' | 'priority_number' | 'gcash_form';
  data?: any;
};

const SYSTEM_INSTRUCTION = `You are the ARAW.ai (Automate Registrar and Administrative Workflows) student assistant for Visayas State University (VSU). 
Your primary role is to assist CURRENTLY ENROLLED students with their administrative needs.

KEY CAPABILITIES:
1. PAYMENT GUIDANCE: When a student asks "how can I pay" or similar, you MUST provide a step-by-step itinerary using this EXACT format:
[PAYMENT_ITINERARY]
- Step 1: Description
- Step 2: Description
- Step 3: Description
[/PAYMENT_ITINERARY]

2. ADMIN FINES: If a student mentions "admin fines", "library fines", or "penalties", you MUST ask them if they want to pay "Online" or "Actual" (in-person). 
Use this EXACT format to trigger the choice buttons:
[FINES_CHOICE]
Would you like to settle your administrative fines online via GCash or in-person at the Cash Division?
[/FINES_CHOICE]

3. DOCUMENT REQUEST: When a student asks about how to request documents (TOR, COG, COR, etc.), or where to apply for academic records, you MUST include this tag:
[DOCUMENT_REQUEST]
This will display a direct link for them to start their document request process.

4. GENERAL SUPPORT: Answer questions about document status, registrar locations, and general student workflows at VSU.

Be proactive, helpful, and professional. Use formatting like bold text for emphasis.
If a user asks about things outside of VSU administrative workflows, politely redirect them.`;

function DocumentRequestCard() {
  return (
    <div className="my-6 bg-white rounded-[32px] border border-accent/20 shadow-xl shadow-accent/5 overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-24 bg-gradient-to-br from-accent to-accent-hover p-6 flex items-end overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <FileText className="w-32 h-32 -mr-8 -mt-8 text-white rotate-12" />
        </div>
        <div className="relative z-10">
          <h3 className="text-white font-bold text-lg leading-tight">Request Documents</h3>
          <p className="text-accent-foreground opacity-80 text-[10px] font-medium uppercase tracking-[0.1em]">VSU Registrar Portal</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-slate-600 text-xs leading-relaxed mb-6">
          Ready to apply for your academic records? You can now submit your requests online through our automated portal.
        </p>
        <Link
          href="/dashboard/request"
          className="flex items-center justify-between w-full bg-accent/10 hover:bg-accent/20 text-accent-foreground font-bold text-xs py-4 px-6 rounded-2xl transition-all group/btn"
        >
          <span>Start Application</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

function PaymentItinerary({ steps }: { steps: string[] }) {
  return (
    <div className="my-4 bg-white rounded-3xl border border-accent/20 shadow-sm overflow-hidden">
      <div className="bg-accent/10 px-6 py-4 border-b border-accent/20 flex items-center gap-3">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-slate-900">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-black text-accent-foreground uppercase tracking-widest">Payment Itinerary</span>
          <p className="text-[10px] text-accent-foreground opacity-80 font-bold">Step-by-step Guide</p>
        </div>
      </div>
      <div className="p-6 space-y-6 relative">
        {/* Connector Line */}
        <div className="absolute left-[35px] top-10 bottom-10 w-0.5 bg-slate-100"></div>

        {steps.map((step, i) => (
          <div key={i} className="flex gap-4 relative z-10">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-accent flex items-center justify-center text-accent-foreground font-black text-sm shadow-sm">
              {i + 1}
            </div>
            <div className="pt-1">
              <p className="text-sm font-bold text-slate-900 leading-tight">{step.replace(/^-\s*/, '')}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">VSU Cashier</span>
        <div className="flex items-center gap-1 text-[9px] text-accent-foreground font-bold uppercase">
          Verified <CheckCircle2 className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

function FinesChoice({ onChoice }: { onChoice: (choice: 'online' | 'actual') => void }) {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={() => onChoice('online')}
        className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-accent hover:bg-accent/10 transition-all group"
      >
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
          <Smartphone className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-slate-900">Online Payment</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">Via GCash</p>
        </div>
        <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-accent" />
      </button>

      <button
        onClick={() => onChoice('actual')}
        className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-accent hover:bg-accent/10 transition-all group"
      >
        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent-foreground group-hover:scale-110 transition-transform">
          <Users className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-slate-900">Actual Payment</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">At Cashier</p>
        </div>
        <ChevronRight className="w-4 h-4 ml-auto text-slate-300 group-hover:text-accent" />
      </button>
    </div>
  );
}

function PriorityNumberCard({ number }: { number: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="my-4 bg-gradient-to-br from-accent to-accent-hover rounded-[32px] p-8 text-slate-900 shadow-xl shadow-accent/20 relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-4">Your Priority Number</p>
        <div className="text-7xl font-black tracking-tighter mb-4">{number}</div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
          <Clock className="w-4 h-4" /> Est. Wait: 25 mins
        </div>
        <p className="mt-6 text-[10px] opacity-60 font-medium italic">Please proceed to the Cash Division window when called.</p>
      </div>
    </motion.div>
  );
}

function GCashForm({ onSubmit }: { onSubmit: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

  return (
    <div className="my-4 bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
      <div className="bg-[#007DFE] p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-[#007DFE]" />
          </div>
          <div>
            <h3 className="font-black text-lg">GCash</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Online Payment</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase opacity-80">Amount Due</p>
          <p className="text-xl font-black">₱150.00</p>
        </div>
      </div>
      <form onSubmit={handlePay} className="p-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">GCash Number</label>
            <input
              type="text"
              placeholder="09XX XXX XXXX"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
            <input
              type="text"
              placeholder="As registered in GCash"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-5 bg-[#007DFE] hover:bg-[#0066CC] text-white font-black rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>Pay Now <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
        <p className="text-[10px] text-center text-slate-400 font-medium">Secure payment processed via GCash API</p>
      </form>
    </div>
  );
}

export function StudentChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your ARAW.ai student assistant. How can I help you with your payments or document requests today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const initChat = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) return;
        const aiInstance = new GoogleGenAI({ apiKey });
        const chat = aiInstance.chats.create({
          model: 'gemini-flash-latest',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        setChatSession(chat);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
      }
    };
    initChat();
  }, []);

  const handleFinesChoice = (choice: 'online' | 'actual') => {
    if (choice === 'online') {
      setMessages(prev => [...prev,
      { id: Date.now().toString(), role: 'user', content: 'I want to pay online.' },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Great! Please fill out this GCash form to settle your fines.', type: 'gcash_form' }
      ]);
    } else {
      setMessages(prev => [...prev,
      { id: Date.now().toString(), role: 'user', content: 'I want to pay in-person.' },
      { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Understood. I have generated a priority number for you. Please head to the Cash Division.', type: 'priority_number', data: { number: 215 } }
      ]);
    }
  };

  const handleGCashSubmit = () => {
    setMessages(prev => [...prev,
    { id: Date.now().toString(), role: 'assistant', content: 'Payment successful! Your administrative fines have been cleared. Now that your account is cleared, you can proceed to request your documents.\n\n[DOCUMENT_REQUEST]' }
    ]);
  };

  const renderContent = (msg: Message): React.ReactNode => {
    const content = msg.content;

    // Check for Payment Itinerary
    const itineraryRegex = /\[PAYMENT_ITINERARY\]([\s\S]*?)\[\/PAYMENT_ITINERARY\]/;
    const itineraryMatch = content.match(itineraryRegex);
    if (itineraryMatch) {
      const index = content.indexOf(itineraryMatch[0]);
      const before = content.substring(0, index);
      const after = content.substring(index + itineraryMatch[0].length);
      const steps = itineraryMatch[1].trim().split('\n').filter(t => t.trim().length > 0);
      return (
        <>
          {before && renderContent({ ...msg, content: before })}
          <PaymentItinerary steps={steps} />
          {after && renderContent({ ...msg, content: after })}
        </>
      );
    }

    // Check for Fines Choice
    const finesRegex = /\[FINES_CHOICE\]([\s\S]*?)\[\/FINES_CHOICE\]/;
    const finesMatch = content.match(finesRegex);
    if (finesMatch) {
      const index = content.indexOf(finesMatch[0]);
      const before = content.substring(0, index);
      const after = content.substring(index + finesMatch[0].length);
      return (
        <>
          {before && renderContent({ ...msg, content: before })}
          <FinesChoice onChoice={handleFinesChoice} />
          {after && renderContent({ ...msg, content: after })}
        </>
      );
    }

    // Check for Document Request Card
    const docReqTag = '[DOCUMENT_REQUEST]';
    if (content.includes(docReqTag)) {
      const index = content.indexOf(docReqTag);
      const before = content.substring(0, index);
      const after = content.substring(index + docReqTag.length);
      return (
        <>
          {before && renderContent({ ...msg, content: before })}
          <DocumentRequestCard />
          {after && renderContent({ ...msg, content: after })}
        </>
      );
    }

    if (msg.type === 'priority_number') {
      return (
        <>
          <ReactMarkdown>{content}</ReactMarkdown>
          <PriorityNumberCard number={msg.data.number} />
        </>
      );
    }

    if (msg.type === 'gcash_form') {
      return (
        <>
          <ReactMarkdown>{content}</ReactMarkdown>
          <GCashForm onSubmit={handleGCashSubmit} />
        </>
      );
    }

    return <ReactMarkdown>{content}</ReactMarkdown>;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('API key is missing');

      const aiInstance = new GoogleGenAI({ apiKey });
      let currentSession = chatSession;
      if (!currentSession) {
        currentSession = aiInstance.chats.create({
          model: 'gemini-flash-latest',
          config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
        });
        setChatSession(currentSession);
      }

      const response = await currentSession.sendMessage({ message: userMessage });
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: response.text },
      ]);
    } catch (error: any) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] w-full max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-slate-50/30 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${msg.role === 'user'
                  ? 'bg-slate-100 text-slate-500'
                  : 'bg-accent text-slate-900 shadow-lg shadow-accent/20'
                  }`}
              >
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-[32px] px-8 py-5 ${msg.role === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-none'
                  : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-100'
                  }`}
              >
                <div className="text-sm leading-relaxed prose prose-sm prose-slate max-w-none">
                  {renderContent(msg)}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-accent text-slate-900 flex items-center justify-center shadow-lg shadow-accent/20">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white text-slate-700 rounded-[32px] rounded-tl-none px-8 py-5 shadow-sm border border-slate-100 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-8 py-6 bg-white/50 border-t border-slate-100/50">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Quick Inquiries</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setInput("How can I pay my enrollment fees?")}
              className="flex items-center gap-2 text-xs font-medium bg-white hover:bg-accent/10 text-slate-600 hover:text-accent-foreground border border-slate-200 hover:border-accent/40 px-4 py-2 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-accent" />
              How to Pay
            </button>
            <button
              onClick={() => setInput("I have pending admin fines, what should I do?")}
              className="flex items-center gap-2 text-xs font-medium bg-white hover:bg-accent/10 text-slate-600 hover:text-accent-foreground border border-slate-200 hover:border-accent/40 px-4 py-2 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <Smartphone className="w-4 h-4 text-accent" />
              Settle Fines
            </button>
            <Link
              href="/dashboard/request"
              className="flex items-center gap-2 text-xs font-medium bg-white hover:bg-accent/10 text-slate-600 hover:text-accent-foreground border border-slate-200 hover:border-accent/40 px-4 py-2 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4 text-accent" />
              Request Documents
            </Link>
          </div>
        </div>
      )}
      <div className="p-8 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-4">
          <div className="relative flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask about payments, fines, or documents..."
              className="w-full max-h-32 min-h-[72px] px-8 py-6 bg-slate-50 border border-slate-100 rounded-[32px] text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all duration-300 resize-none scrollbar-hide"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 flex items-center justify-center w-20 h-20 bg-accent hover:bg-accent-hover disabled:bg-slate-100 disabled:text-slate-300 text-slate-900 rounded-[32px] transition-all shadow-xl shadow-accent/20 active:scale-95"
          >
            <Send className="w-8 h-8 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
