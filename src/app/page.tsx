'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Aperture, Camera, Star, ArrowRight, CheckCircle2, ImageIcon,
  Calendar, MessageSquare, FileText, Users, Sparkles, Play,
  Shield, ChevronRight
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
  { icon: ImageIcon, title: 'Smart Gallery Delivery', desc: 'Deliver stunning photo galleries your clients can browse, favorite, and download — all in one beautiful portal.', color: 'fuchsia' },
  { icon: Calendar, title: 'Booking & Scheduling', desc: 'Clients book sessions, you confirm. Automated reminders keep everyone on the same page.', color: 'violet' },
  { icon: MessageSquare, title: 'Real-Time Messaging', desc: 'Built-in chat connects you with clients instantly. No more lost emails or missed DMs.', color: 'teal' },
  { icon: FileText, title: 'Contracts & Invoices', desc: 'Send, sign, and store contracts digitally. Get paid faster with integrated invoicing.', color: 'amber' },
  { icon: Users, title: 'Client Portal', desc: 'Every client gets their own private portal with their galleries, schedule, and contract — all in one place.', color: 'pink' },
  { icon: Sparkles, title: 'AI-Powered Tools', desc: 'Auto-tag photos, generate captions, and let AI handle the tedious post-production work.', color: 'indigo' },
]

const STEPS = [
  { n: '01', title: 'Create Your Studio', desc: 'Sign up and set up your BOKEH studio in minutes. Add your branding, pricing, and portfolio.' },
  { n: '02', title: 'Book a Client', desc: 'Client books a session through your link. Contract is sent and signed automatically.' },
  { n: '03', title: 'Shoot & Deliver', desc: 'Upload edited photos directly to BOKEH. Client gets notified and can browse their gallery.' },
  { n: '04', title: 'Get Paid', desc: 'Invoices are generated, payments collected. Focus on shooting, not spreadsheets.' },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Wedding Photographer · Toronto', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: 'BOKEH completely changed how I run my business. My clients love having their own portal — and I get paid 3x faster.', stars: 5 },
  { name: 'Marcus Webb', role: 'Portrait Photographer · NYC', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: 'The contract + invoicing alone saved me 4 hours a week. I wish I had found BOKEH sooner.', stars: 5 },
  { name: 'Priya Sharma', role: 'Event Photographer · London', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: 'My clients keep saying how professional their portal looks. It elevated my whole brand overnight.', stars: 5 },
]

const colorMap: Record<string, string> = {
  fuchsia: 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400',
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  teal: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
  amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <Aperture className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-wide">BOKEH</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
          <Link href="/discover" className="hover:text-white transition-colors">Discover</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">Sign In</Link>
          <Link href="/signup" className="text-sm font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white px-5 py-2 rounded-xl hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Now in Beta · Free to Join
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
            The Studio OS for<br />
            <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
              Modern Photographers
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            BOKEH gives photographers a complete business platform — client portals, gallery delivery, contracts, messaging, and invoicing. All in one beautiful place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-semibold rounded-2xl hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all text-base">
              Start for Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/discover" className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all text-base">
              <Play className="w-4 h-4 text-fuchsia-400" /> Explore Galleries
            </Link>
          </div>
          <p className="text-xs text-white/30 mt-5">No credit card required · Free forever plan available</p>
        </motion.div>

        {/* App preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-20 w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4 bg-white/5 rounded-lg px-3 py-1 text-xs text-white/30 text-center">
                app.getbokeh.com/client/galleries
              </div>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {SAMPLE_PHOTOS.map((src, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
                  <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[{ n: '2,400+', label: 'Photographers' }, { n: '18,000+', label: 'Galleries Delivered' }, { n: '4.9★', label: 'Average Rating' }, { n: '$2.1M+', label: 'Paid to Creators' }].map(({ n, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-white">{n}</div>
              <div className="text-xs text-white/40 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Everything You Need
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your entire business.<br />One platform.</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Stop juggling 6 different tools. BOKEH brings everything together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-white/[0.08] hover:border-white/15 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${colorMap[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Simple Workflow
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Up and running in minutes</h2>
            <p className="text-white/50 text-lg">No technical skills needed. If you can shoot, you can use BOKEH.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map(({ n, title, desc }, i) => (
              <motion.div key={n} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-5 p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-white/[0.08]">
                <div className="text-4xl font-bold text-white/10 font-mono shrink-0">{n}</div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1.5">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY CTA */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 p-10 md:p-16 text-center" style={{ background: 'linear-gradient(135deg, rgba(217,70,239,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(20,184,166,0.08) 100%)' }}>
            <Camera className="w-12 h-12 text-fuchsia-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Discover Stunning Photography</h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Browse galleries from photographers worldwide. Find your perfect artist for weddings, portraits, events and more.</p>
            <Link href="/discover" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-semibold rounded-2xl hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all">
              Explore Galleries <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by photographers</h2>
            <p className="text-white/50">Join thousands of photographers growing their business with BOKEH</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, avatar, text, stars }) => (
              <motion.div key={name} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-white/[0.08]">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: stars }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
                  <div>
                    <div className="font-semibold text-white text-sm">{name}</div>
                    <div className="text-white/40 text-xs">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start free. Grow with us.</h2>
          <p className="text-white/50 text-lg mb-12">No setup fees. No contracts. Cancel anytime.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { plan: 'Free', price: '$0', period: 'forever', features: ['Up to 3 clients', '5 GB storage', 'Basic gallery delivery', 'Booking page'], cta: 'Get Started', href: '/signup', highlight: false },
              { plan: 'Pro', price: '$29', period: 'per month', features: ['Unlimited clients', '100 GB storage', 'Contracts & invoicing', 'Real-time messaging', 'Custom branding', 'Priority support'], cta: 'Start Free Trial', href: '/signup', highlight: true },
              { plan: 'Studio', price: '$79', period: 'per month', features: ['Everything in Pro', 'Team members', 'Unlimited storage', 'White-label portal', 'API access', 'Dedicated support'], cta: 'Contact Sales', href: '/signup', highlight: false },
            ].map(({ plan, price, period, features, cta, href, highlight }) => (
              <div key={plan} className={`p-6 rounded-2xl border transition-all ${highlight ? 'border-fuchsia-500/40 shadow-[0_0_40px_rgba(217,70,239,0.15)]' : 'bg-card/60 border-white/[0.08]'}`} style={highlight ? { background: 'linear-gradient(to bottom, rgba(217,70,239,0.15), rgba(139,92,246,0.08))' } : {}}>
                {highlight && <div className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest mb-3">Most Popular</div>}
                <div className="text-white font-bold text-lg mb-1">{plan}</div>
                <div className="text-4xl font-bold text-white mb-1">{price}</div>
                <div className="text-white/40 text-xs mb-6">{period}</div>
                <div className="space-y-2.5 mb-8">
                  {features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />{f}
                    </div>
                  ))}
                </div>
                <Link href={href} className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${highlight ? 'bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white hover:shadow-[0_0_20px_rgba(217,70,239,0.4)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-fuchsia-500/30">
            <Aperture className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to elevate your photography business?</h2>
          <p className="text-white/50 text-lg mb-10">Join 2,400+ photographers who run their business on BOKEH.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-semibold rounded-2xl hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all">
              Create Your Free Studio <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center">
              <Aperture className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">BOKEH</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link href="/discover" className="hover:text-white transition-colors">Discover</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="mailto:hello@getbokeh.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/30">
            <Shield className="w-3.5 h-3.5" />
            <span>© 2027 BOKEH Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
