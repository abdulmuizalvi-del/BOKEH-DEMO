'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Aperture, Camera, Star, ArrowRight, CheckCircle2, ImageIcon,
  Calendar, MessageSquare, FileText, Users, Sparkles, Play,
  Shield, ChevronRight, Globe, FolderOpen, Wand2, Send
} from 'lucide-react'

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80',
]

const FEATURES = [
  { icon: Globe, title: 'Discovery', desc: 'Clients find you through your branded profile. No more cold outreach.' },
  { icon: Calendar, title: 'Booking', desc: 'Clients discover you, pick a package, and confirm — all from your branded booking page.' },
  { icon: FolderOpen, title: 'Project', desc: 'Every booking becomes a project with timelines, shot lists, contracts, and client communication.' },
  { icon: Wand2, title: 'AI', desc: 'AI auto-tags, culls, and organizes your images. Color-grade, select finals, and prep galleries.' },
  { icon: Send, title: 'Delivery', desc: 'Deliver stunning galleries your clients can browse, favorite, and download instantly.' },
  { icon: MessageSquare, title: 'Messages', desc: 'Built-in chat connects you with clients instantly. No more lost emails or missed DMs.' },
]

const STEPS = [
  { icon: Calendar, title: 'Get booked', desc: 'Clients discover you, pick a package, and confirm — all from your branded booking page. No back-and-forth emails.' },
  { icon: FolderOpen, title: 'Manage the project', desc: 'Every booking becomes a project with timelines, shot lists, contracts, and client communication in one place.' },
  { icon: Wand2, title: 'Upload and refine', desc: 'AI auto-tags, culls, and organizes your images. Color-grade, select finals, and prep galleries without switching tools.' },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Wedding Photographer · Toronto', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: 'BOKEH completely changed how I run my business. My clients love having their own portal.', stars: 5 },
  { name: 'Marcus Webb', role: 'Portrait Photographer · NYC', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: 'The contract and invoicing alone saved me 4 hours a week. I wish I had found BOKEH sooner.', stars: 5 },
  { name: 'Priya Sharma', role: 'Event Photographer · London', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: 'My clients keep saying how professional their portal looks. It elevated my whole brand.', stars: 5 },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#1a0f0a' }}>

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(180,100,40,0.5) 0%, transparent 70%)' }} />
        <div className="absolute top-[10%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(160,60,120,0.5) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(120,50,160,0.4) 0%, transparent 70%)' }} />
        <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(200,130,30,0.4) 0%, transparent 70%)' }} />
      </div>

      {/* NAV — frosted glass pill */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-white/10" style={{ background: 'rgba(40,25,18,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
            <Aperture className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white tracking-wide">BOKEH</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#why-bokeh" className="hover:text-white transition-colors">Why BOKEH</a>
        </div>
        <Link href="/signup" className="text-sm font-semibold text-white px-5 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
          Join Waitlist
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-36 pb-20 px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 text-xs font-medium mb-8" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Now accepting early creators
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            <span className="text-white">Focus on your art.</span><br />
            <span style={{ background: 'linear-gradient(90deg, #e8a030, #d47830, #c74683, #a040a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              We&apos;ll handle the rest.
            </span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            The platform where photographers run their entire business, from discovery to delivery.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full text-base transition-all hover:shadow-[0_0_30px_rgba(212,133,26,0.4)]" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
              Join Waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full text-base border border-white/15 transition-all hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
              Signup for Beta
            </Link>
          </div>

          <p className="text-xs mt-16 uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.25)' }}>Scroll</p>
        </motion.div>

        {/* App preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-16 w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl" style={{ background: 'rgba(30,18,12,0.8)', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4 rounded-lg px-3 py-1 text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)' }}>
                app.getbokeh.com/dashboard
              </div>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {SAMPLE_PHOTOS.map((src, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #1a0f0a, transparent)' }} />
          </div>
        </motion.div>
      </section>

      {/* THE SYSTEM */}
      <section id="product" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: '#d4851a' }}>The System</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Your entire workflow.</span><br />
            <span style={{ background: 'linear-gradient(90deg, #e8a030, #c74683, #a040a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              One intelligent system.
            </span>
          </h2>
          <p className="text-lg mb-16" style={{ color: 'rgba(255,255,255,0.5)' }}>Everything connects. Nothing gets lost.</p>

          {/* Feature icons row */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {FEATURES.map(({ icon: Icon, title }) => (
              <div key={title} className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center transition-all group-hover:border-white/25" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Icon className="w-6 h-6" style={{ color: 'rgba(255,255,255,0.6)' }} />
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTELLIGENCE / AI */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: '#d4851a' }}>Intelligence</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">AI that works </span>
            <span style={{ background: 'linear-gradient(90deg, #e8a030, #c74683)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              behind every image
            </span>
          </h2>
          <p className="text-lg mb-16" style={{ color: 'rgba(255,255,255,0.5)' }}>Organize. Select. Deliver. Automatically.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Portrait', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { label: 'Landscape', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80' },
              { label: 'Detail', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80' },
              { label: 'Group', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&q=80' },
            ].map(({ label, img }) => (
              <div key={label} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-sm font-medium text-white">{label}</div>
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-500/80 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YOUR JOURNEY */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: '#d4851a' }}>Your Journey</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">From booking to delivery, </span>
              <span style={{ background: 'linear-gradient(90deg, #e8a030, #c74683)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                simplified
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STEPS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl border border-white/10 transition-all hover:border-white/20" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(212,133,26,0.15)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#d4851a' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SWITCH */}
      <section id="why-bokeh" className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: '#d4851a' }}>Why Switch</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Replace chaos with </span>
              <span style={{ background: 'linear-gradient(90deg, #e8a030, #c74683, #a040a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                clarity
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="p-6 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="font-bold text-white/60 text-sm uppercase tracking-widest mb-5">Before BOKEH</h3>
              <div className="space-y-3">
                {[
                  'Instagram DMs for client communication',
                  'Calendly for bookings, Google Drive for files',
                  'Spreadsheets for project tracking',
                  'PayPal invoices with no project context',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-1.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {/* After */}
            <div className="p-6 rounded-2xl border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: '#d4851a' }}>With BOKEH</h3>
              <div className="space-y-3">
                {[
                  'Everything connected in one workspace',
                  'Projects tracked from shoot to delivery',
                  'Payments tied to projects automatically',
                  'AI handles the busywork for you',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#4ade80' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN THE MOVEMENT */}
      <section className="relative z-10 py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: '#d4851a' }}>Join the Movement</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">The future of photography workflows </span>
            <span style={{ background: 'linear-gradient(90deg, #e8a030, #c74683)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              starts here
            </span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Join the next generation of creators building smarter businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(212,133,26,0.4)]" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
              Join Waitlist <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="px-8 py-4 text-white font-semibold rounded-full border border-white/15 transition-all hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.05)' }}>
              Signup for Beta
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-10 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
              <Aperture className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold text-sm">BOKEH</span>
          </div>
          <div className="flex items-center gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2026 BOKEH. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}
