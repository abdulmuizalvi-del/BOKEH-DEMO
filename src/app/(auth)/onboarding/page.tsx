'use client'

import Link from 'next/link'
import { Camera, UserCircle, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Onboarding() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative p-4" style={{ background: '#1a0f0a' }}>
      <div className="absolute top-0 w-full h-96 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(212,133,26,0.08), transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">How will you use BOKEH?</h1>
        <p className="text-lg md:text-xl text-white/40">Select your primary role to customize your experience.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl relative z-10">
        <Link href="/dashboard">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="cursor-pointer group relative border border-white/5 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-300"
            style={{ background: 'rgba(30,18,12,0.6)' }}
          >
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to bottom right, rgba(212,133,26,0.05), transparent)' }} />
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: 'rgba(212,133,26,0.1)' }}>
              <Camera className="w-8 h-8" style={{ color: '#d4851a' }} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">As a Creator</h2>
            <p className="text-white/40 mb-6">For photographers, videographers, and studios.</p>
            <ul className="space-y-2">
              {['Manage bookings & clients', 'Share project galleries', 'Digital contracts & invoices'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#d4851a' }} />{f}
                </li>
              ))}
            </ul>
          </motion.div>
        </Link>

        <Link href="/client/dashboard">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="cursor-pointer group relative border border-white/5 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-all duration-300"
            style={{ background: 'rgba(30,18,12,0.6)' }}
          >
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to bottom right, rgba(199,70,131,0.05), transparent)' }} />
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: 'rgba(199,70,131,0.1)' }}>
              <UserCircle className="w-8 h-8" style={{ color: '#c74683' }} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">As a Client</h2>
            <p className="text-white/40 mb-6">For individuals booking photography services.</p>
            <ul className="space-y-2">
              {['Browse & book photographers', 'View your project galleries', 'Sign contracts & pay online'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#c74683' }} />{f}
                </li>
              ))}
            </ul>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
