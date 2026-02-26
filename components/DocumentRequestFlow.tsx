'use client';

import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { Stepper } from './Stepper';
import { DocumentSelection, DOCUMENT_TYPES } from './DocumentSelection';
import { IdentityVerification } from './IdentityVerification';
import { PaymentMethod } from './PaymentMethod';
import { RequestComplete } from './RequestComplete';
import { GCashPayment } from './GCashPayment';

const STEPS = [
    { id: 1, title: 'Documents' },
    { id: 2, title: 'Verification' },
    { id: 3, title: 'Payment' },
    { id: 4, title: 'Complete' },
];

export function DocumentRequestFlow() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [idFile, setIdFile] = useState<File | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'manual' | null>(null);
    const [priorityNumber, setPriorityNumber] = useState<string | null>(null);
    const [showGCash, setShowGCash] = useState(false);

    const totalAmount = useMemo(() => {
        return selectedDocs.reduce((sum, docId) => {
            const doc = DOCUMENT_TYPES.find(d => d.id === docId);
            return sum + (doc?.price || 0);
        }, 0);
    }, [selectedDocs]);

    const toggleDocument = (id: string) => {
        setSelectedDocs(prev =>
            prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIdFile(e.target.files[0]);
        }
    };

    const nextStep = () => {
        if (currentStep === 2 && totalAmount === 0) {
            // Generate priority number and skip payment step
            const randomNum = Math.floor(Math.random() * 900) + 100;
            setPriorityNumber(randomNum.toString());
            setCurrentStep(4);
            return;
        }

        if (currentStep === 3) {
            if (paymentMethod === 'online' && !showGCash) {
                setShowGCash(true);
                return;
            }
            // Generate random priority number on completion
            const randomNum = Math.floor(Math.random() * 900) + 100;
            setPriorityNumber(randomNum.toString());
            setShowGCash(false);
        }
        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => setCurrentStep(prev => prev - 1);

    const resetFlow = () => {
        setCurrentStep(1);
        setSelectedDocs([]);
        setIdFile(null);
        setPaymentMethod(null);
        setPriorityNumber(null);
        setShowGCash(false);
    };

    return (
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col min-h-[600px]">
            {currentStep < 4 && (
                <div className="bg-slate-50/50 border-b border-slate-100 px-8 pt-4 pb-12">
                    <Stepper currentStep={currentStep} steps={STEPS} />
                </div>
            )}

            <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <DocumentSelection
                            selectedDocs={selectedDocs}
                            toggleDocument={toggleDocument}
                            totalAmount={totalAmount}
                            onNext={nextStep}
                        />
                    )}
                    {currentStep === 2 && (
                        <IdentityVerification
                            idFile={idFile}
                            onFileChange={handleFileChange}
                            onNext={nextStep}
                            onPrev={prevStep}
                        />
                    )}
                    {currentStep === 3 && (
                        !showGCash ? (
                            <PaymentMethod
                                selectedDocs={selectedDocs}
                                totalAmount={totalAmount}
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                                onNext={nextStep}
                                onPrev={prevStep}
                            />
                        ) : (
                            <GCashPayment
                                totalAmount={totalAmount}
                                onSubmit={nextStep}
                                onBack={() => setShowGCash(false)}
                            />
                        )
                    )}
                    {currentStep === 4 && (
                        <RequestComplete
                            priorityNumber={priorityNumber}
                            paymentMethod={paymentMethod}
                            totalAmount={totalAmount}
                            selectedDocs={selectedDocs}
                            onReset={resetFlow}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
