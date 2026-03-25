'use client'

import Link from 'next/link'
import { Camera, UserCircle, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Onboarding() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative p-4">
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-fuchsia-900/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">How will you use BOKEH?</h1>
        <p className="text-xl text-muted-foreground">Select your primary role to customize your experience.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl relative z-10">
        <Link href="/dashboard">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="cursor-pointer group relative bg-card border border-white/5 rounded-3xl p-8 hover:border-fuchsia-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-fuchsia-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-orange-400 transition-all">As a Creator</h2>
            <p className="text-muted-foreground mb-6">For photographers, videographers, and studios.</p>
            <ul className="space-y-2">
              {['Manage bookings & clients', 'Share project galleries', 'Digital contracts & invoices'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
          </motion.div>
        </Link>

        <Link href="/dashboard">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="cursor-pointer group relative bg-card border border-white/5 rounded-3xl p-8 hover:border-teal-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserCircle className="w-8 h-8 text-teal-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 transition-all">As a Client</h2>
            <p className="text-muted-foreground mb-6">For individuals booking photography services.</p>
            <ul className="space-y-2">
              {['Browse & book photographers', 'View your project galleries', 'Sign contracts & pay online'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
