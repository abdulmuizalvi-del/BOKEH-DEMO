'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, FileText, CreditCard, Calendar as CalendarIcon } from 'lucide-react'

const STEPS = ['Details', 'Message', 'Contract', 'Payment']

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Book a Session</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative px-4">
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 z-0 transition-all duration-500" style={{ background: 'linear-gradient(90deg, #d4851a, #c74683)', width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} />
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStep
          const isCompleted = idx < currentStep
          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 shadow-lg ${isCompleted || isActive ? 'text-white' : 'border-2 border-white/20 text-white/50'}`}
                style={isActive || isCompleted ? { background: 'linear-gradient(135deg, #d4851a, #c74683)' } : { background: 'rgba(30,18,12,0.8)' }}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-xs font-medium absolute -bottom-6 whitespace-nowrap ${isActive || isCompleted ? 'text-white' : 'text-white/40'}`}>{step}</span>
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div className="border border-white/10 rounded-2xl p-5 md:p-8 min-h-[400px] shadow-2xl relative overflow-hidden" style={{ background: 'rgba(30,18,12,0.6)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
            {currentStep === 0 && (
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(212,133,26,0.1)' }}><CalendarIcon className="w-6 h-6" style={{ color: '#d4851a' }} /></div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Session Details</h2>
                    <p className="text-sm text-white/40">Select package and time</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl cursor-pointer ring-1" style={{ background: 'rgba(212,133,26,0.05)', border: '1px solid #d4851a' }}>
                    <h3 className="font-bold text-white">Portrait Session</h3>
                    <p className="text-sm mt-1" style={{ color: '#d4851a' }}>$250 - 1 Hour</p>
                  </div>
                  <div className="border border-white/10 p-4 rounded-xl cursor-pointer hover:border-white/30" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <h3 className="font-bold text-white">Event Coverage</h3>
                    <p className="text-white/40 text-sm mt-1">$800 - 4 Hours</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Preferred Date</label>
                  <input type="date" className="w-full border border-white/10 rounded-xl py-3 px-4 text-white" style={{ background: 'rgba(0,0,0,0.3)' }} />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6 flex-1">
                <h2 className="text-xl font-bold text-white">Initial Message</h2>
                <p className="text-sm text-white/40">Tell the photographer what you&apos;re looking for.</p>
                <textarea rows={6} placeholder="Hi, I'm looking to book a portrait session for next month..." className="w-full border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-1 resize-none" style={{ background: 'rgba(0,0,0,0.3)' }} />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-teal-500/10 rounded-xl"><FileText className="w-6 h-6 text-teal-400" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Sign Contract</h2>
                    <p className="text-sm text-white/40">Review and sign terms</p>
                  </div>
                </div>
                <div className="h-40 border border-white/10 rounded-xl p-4 overflow-y-auto text-xs text-white/60 font-mono" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  1. SERVICES. Photographer agrees to provide photography services...<br /><br />
                  2. PAYMENT. Client agrees to pay the total fee of $250...<br /><br />
                  3. CANCELLATION. If Client cancels within 48 hours...
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Type your full name to sign</label>
                  <input type="text" placeholder="John Doe" className="w-full border border-white/10 rounded-xl py-3 px-4 text-white" style={{ background: 'rgba(0,0,0,0.3)' }} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)', boxShadow: '0 0 30px rgba(212,133,26,0.4)' }}>
                  <CreditCard className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Payment Required</h2>
                <p className="text-white/40">A 50% deposit ($125.00) is required to secure your booking.</p>
                <button className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors w-full sm:w-auto">Pay with Stripe</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={prevStep} disabled={currentStep === 0} className="px-4 md:px-6 py-2.5 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 disabled:opacity-0 transition-all">Back</button>
        <button
          onClick={nextStep}
          disabled={currentStep === STEPS.length - 1}
          className="px-4 md:px-6 py-2.5 rounded-xl font-semibold text-white flex items-center gap-2 disabled:opacity-50 transition-all"
          style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}
        >
          {currentStep === STEPS.length - 2 ? 'Proceed to Payment' : 'Continue'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
