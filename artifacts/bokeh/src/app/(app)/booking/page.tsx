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
      <h1 className="text-3xl font-display font-bold text-white mb-8">Book a Session</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 z-0" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-primary z-0 transition-all duration-500" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} />
        {STEPS.map((step, idx) => {
          const isActive = idx === currentStep
          const isCompleted = idx < currentStep
          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-500 shadow-lg ${isActive ? 'bg-fuchsia-500 text-white shadow-fuchsia-500/50' : isCompleted ? 'bg-fuchsia-500 text-white' : 'bg-card border-2 border-white/20 text-white/50'}`}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-xs font-medium absolute -bottom-6 whitespace-nowrap ${isActive || isCompleted ? 'text-white' : 'text-white/40'}`}>{step}</span>
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div className="bg-card border border-white/10 rounded-2xl p-8 min-h-[400px] shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
            {currentStep === 0 && (
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-fuchsia-500/10 rounded-xl"><CalendarIcon className="w-6 h-6 text-fuchsia-400" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Session Details</h2>
                    <p className="text-sm text-muted-foreground">Select package and time</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-fuchsia-500 bg-fuchsia-500/5 p-4 rounded-xl cursor-pointer ring-1 ring-fuchsia-500">
                    <h3 className="font-bold text-white">Portrait Session</h3>
                    <p className="text-fuchsia-400 text-sm mt-1">$250 • 1 Hour</p>
                  </div>
                  <div className="border border-white/10 bg-black/20 p-4 rounded-xl cursor-pointer hover:border-white/30">
                    <h3 className="font-bold text-white">Event Coverage</h3>
                    <p className="text-muted-foreground text-sm mt-1">$800 • 4 Hours</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Preferred Date</label>
                  <input type="date" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6 flex-1">
                <h2 className="text-xl font-bold text-white">Initial Message</h2>
                <p className="text-sm text-muted-foreground">Tell the photographer what you&apos;re looking for.</p>
                <textarea rows={6} placeholder="Hi, I'm looking to book a portrait session for next month..." className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-fuchsia-500 resize-none" />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-teal-500/10 rounded-xl"><FileText className="w-6 h-6 text-teal-400" /></div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Sign Contract</h2>
                    <p className="text-sm text-muted-foreground">Review and sign terms</p>
                  </div>
                </div>
                <div className="h-40 bg-black/40 border border-white/10 rounded-xl p-4 overflow-y-auto text-xs text-white/60 font-mono">
                  1. SERVICES. Photographer agrees to provide photography services...<br /><br />
                  2. PAYMENT. Client agrees to pay the total fee of $250...<br /><br />
                  3. CANCELLATION. If Client cancels within 48 hours...
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Type your full name to sign</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white" />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-fuchsia-500 to-orange-500 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(217,70,239,0.5)]">
                  <CreditCard className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Payment Required</h2>
                <p className="text-muted-foreground">A 50% deposit ($125.00) is required to secure your booking.</p>
                <button className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors w-full sm:w-auto">Pay with Stripe</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={prevStep} disabled={currentStep === 0} className="px-6 py-2.5 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 disabled:opacity-0 transition-all">Back</button>
        <button onClick={nextStep} disabled={currentStep === STEPS.length - 1} className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-primary text-white flex items-center gap-2 disabled:opacity-50 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all">
          {currentStep === STEPS.length - 2 ? 'Proceed to Payment' : 'Continue'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
