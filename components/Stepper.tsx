'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface StepperProps {
    currentStep: number;
    steps: {
        id: number;
        title: string;
        icon?: React.ReactNode;
    }[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4">
                {/* Connection Line Background */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

                {/* Animated Connection Line */}
                <motion.div
                    className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                            <motion.div
                                initial={false}
                                animate={{
                                    backgroundColor: isCompleted || isActive ? '#10b981' : '#f8fafc',
                                    scale: isActive ? 1.2 : 1,
                                    boxShadow: isActive ? '0 10px 15px -3px rgba(16, 185, 129, 0.2)' : 'none'
                                }}
                                className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-colors duration-300 ${isCompleted || isActive ? 'border-emerald-500' : 'border-slate-200'
                                    }`}
                            >
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Check className="w-5 h-5 text-white" />
                                    </motion.div>
                                ) : (
                                    <span className={`text-sm font-black ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                        {step.id}
                                    </span>
                                )}
                            </motion.div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-emerald-600' : isCompleted ? 'text-slate-400' : 'text-slate-300'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
