'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, FileText, HelpCircle, UserPlus, CheckCircle2, ShieldCheck, ListChecks, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini API
// const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type TodoItem = {
  id: string;
  task: string;
  completed: boolean;
};

const SYSTEM_INSTRUCTION = `You are the ARAW.ai (Automate Registrar and Administrative Workflows) virtual assistant for Visayas State University (VSU). 
Your primary role is to assist future enrollees, especially freshmen, with the VSU application process.
You can:
- Guide users through VSU document application requirements (e.g., Form 138, PSA Birth Certificate, etc.).
- Help with general VSU application processes and deadlines.
- Answer "what", "where", "how", and "who" questions regarding VSU applications and freshman enrollment.

SPECIAL FEATURE: To-Do Lists
When a user asks for a checklist or to-do list for enrollment, you MUST generate it using this EXACT format:
[TODO_LIST]
- Task 1
- Task 2
- Task 3
[/TODO_LIST]

SPECIAL FEATURE: Document Request
When a user asks about how to request documents, apply for documents, or where to get certifications, you MUST include this tag:
[DOCUMENT_REQUEST]
This will display a direct link for them to start their document request process.

Be helpful, concise, welcoming, and professional. Use formatting like bullet points when listing requirements.
Always mention that you are the VSU Admissions Assistant if asked who you are.
If asked about things outside of enrollment, registration, or administrative workflows at VSU, politely redirect the conversation back to your primary purpose.`;

function DocumentRequestCard() {
  return (
    <div className="my-6 bg-white rounded-[32px] border border-emerald-100 shadow-xl shadow-emerald-500/5 overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="relative h-24 bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex items-end overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <FileText className="w-32 h-32 -mr-8 -mt-8 text-white rotate-12" />
        </div>
        <div className="relative z-10">
          <h3 className="text-white font-bold text-lg leading-tight">Request Documents</h3>
          <p className="text-emerald-50/80 text-[10px] font-medium uppercase tracking-[0.1em]">VSU Registrar Portal</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-slate-600 text-xs leading-relaxed mb-6">
          Ready to apply for your documents? You can now submit your requests online through our automated portal.
        </p>
        <a
          href="/dashboard/request"
          className="flex items-center justify-between w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs py-4 px-6 rounded-2xl transition-all group/btn"
        >
          <span>Start Application</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

function TodoCard({ tasks }: { tasks: string[] }) {
  const [items, setItems] = useState<{ id: string; text: string; completed: boolean }[]>(
    tasks.map((t, i) => ({ id: i.toString(), text: t.replace(/^-\s*/, ''), completed: false }))
  );

  const toggle = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  return (
    <div className="my-4 bg-white rounded-2xl border border-accent/20 shadow-sm overflow-hidden">
      <div className="bg-accent/10 px-5 py-3 border-b border-accent/20 flex items-center gap-2">
        <ListChecks className="w-4 h-4 text-accent-foreground" />
        <span className="text-xs font-bold text-accent-foreground uppercase tracking-wider">Enrollment Checklist</span>
      </div>
      <div className="p-4 space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
          >
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.completed ? 'bg-accent border-accent text-slate-900' : 'border-slate-200 group-hover:border-accent'
              }`}>
              {item.completed && <CheckCircle2 className="w-3 h-3" />}
            </div>
            <span className={`text-xs font-medium ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 px-5 py-2 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[9px] text-slate-400 font-medium italic">Interactive Checklist</span>
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">VSU Admissions</span>
      </div>
    </div>
  );
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to Visayas State University! I am your ARAW.ai assistant. How can I help you with your VSU application or enrollment today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);

  const renderContent = (content: string): ReactNode => {
    // Check for Todo List first
    const todoRegex = /\[TODO_LIST\]([\s\S]*?)\[\/TODO_LIST\]/;
    const todoMatch = content.match(todoRegex);

    if (todoMatch) {
      const index = content.indexOf(todoMatch[0]);
      const before = content.substring(0, index);
      const after = content.substring(index + todoMatch[0].length);
      const tasks = todoMatch[1].trim().split('\n').filter(t => t.trim().length > 0);

      return (
        <>
          {before && renderContent(before)}
          <TodoCard tasks={tasks} />
          {after && renderContent(after)}
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
          {before && renderContent(before)}
          <DocumentRequestCard />
          {after && renderContent(after)}
        </>
      );
    }

    return <ReactMarkdown>{content}</ReactMarkdown>;
  };

  useEffect(() => {
    // Initialize chat session
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Create a fresh instance for each request as per guidelines
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing. Please ensure NEXT_PUBLIC_GEMINI_API_KEY is set.');
      }

      const aiInstance = new GoogleGenAI({ apiKey });

      // If we don't have a session yet, or we want to ensure it's fresh
      let currentSession = chatSession;
      if (!currentSession) {
        currentSession = aiInstance.chats.create({
          model: 'gemini-flash-latest',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        setChatSession(currentSession);
      }

      const response = await currentSession.sendMessage({ message: userMessage });
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: response.text },
      ]);
    } catch (error: any) {
      console.error('Error sending message:', error);

      let errorMessage = 'I apologize, but I encountered an error processing your request. Please try again later.';

      if (error.message?.includes('403') || error.status === 403) {
        errorMessage = 'I am having trouble accessing the AI service (Permission Denied). This usually means the API key is restricted or invalid for this model. Please check your configuration.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/20 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100/50 bg-white/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent to-accent-hover text-slate-900 shadow-lg shadow-accent/30">
              <Bot className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-4 border-white"></div>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 tracking-tight">VSU Admissions Assistant</h2>
            <p className="text-[11px] text-accent-foreground font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              Visayas State University
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/20 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user'
                  ? 'bg-slate-200 text-slate-600'
                  : 'bg-accent text-accent-foreground'
                  }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[85%] rounded-[24px] px-6 py-4 ${msg.role === 'user'
                  ? 'bg-accent text-slate-900 rounded-tr-none shadow-lg shadow-accent/20'
                  : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-100/50'
                  }`}
              >
                {msg.role === 'user' ? (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                ) : (
                  <div className="text-sm leading-relaxed prose prose-sm prose-slate max-w-none">
                    {renderContent(msg.content)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-white text-slate-700 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-slate-100 flex items-center gap-1.5">
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
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Suggested Questions</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleSuggestionClick("What are the requirements for freshman enrollment at VSU?")}
              className="flex items-center gap-2 text-xs font-medium bg-white hover:bg-accent/10 text-slate-600 hover:text-accent-foreground border border-slate-200 hover:border-accent/40 px-4 py-2 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <UserPlus className="w-4 h-4 text-accent" />
              VSU Requirements
            </button>
            <button
              onClick={() => handleSuggestionClick("How do I submit my application documents to VSU registrar?")}
              className="flex items-center gap-2 text-xs font-medium bg-white hover:bg-accent/10 text-slate-600 hover:text-accent-foreground border border-slate-200 hover:border-accent/40 px-4 py-2 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <FileText className="w-4 h-4 text-accent" />
              Document Submission
            </button>
            <button
              onClick={() => handleSuggestionClick("Where is the VSU registrar office located?")}
              className="flex items-center gap-2 text-xs font-medium bg-white hover:bg-accent/10 text-slate-600 hover:text-accent-foreground border border-slate-200 hover:border-accent/40 px-4 py-2 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-accent" />
              Registrar Location
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100/50">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
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
              placeholder="Ask VSU Assistant..."
              className="w-full max-h-32 min-h-[64px] px-6 py-5 bg-slate-50/50 border border-slate-200 rounded-[24px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all duration-300 resize-none scrollbar-hide"
              rows={1}
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-accent hover:bg-accent-hover disabled:bg-slate-200 disabled:text-slate-400 text-slate-900 rounded-[24px] transition-all shadow-lg shadow-accent/30 active:scale-95"
            suppressHydrationWarning
          >
            <Send className="w-6 h-6 ml-1" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-4 font-medium tracking-wide">
          ARAW.ai can make mistakes. Please verify important information with the VSU registrar&apos;s office.
        </p>
      </div>
    </div>
  );
}
