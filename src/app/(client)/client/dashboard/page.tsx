'use client'

import Link from 'next/link'
import {
  CheckCircle2, CreditCard, Calendar, ImageIcon, MessageSquare, FileText,
  ChevronRight, MapPin, Download, Share2, Eye,
  Star, Camera, Users, Phone, Globe, Sparkles,
} from 'lucide-react'

const PHOTOS = [
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
]

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#d4851a' }}>My Booking  June 14, 2027</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-green-500/15 border border-green-500/30 text-green-400">Gallery Delivered</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Tina & Rob&apos;s Wedding</h1>
      </div>

      {/* Hero Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ background: 'rgba(30,18,12,0.6)' }}>
        <div className="absolute inset-0">
          <img src={PHOTOS[0]} className="w-full h-full object-cover opacity-15" alt="" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #1a0f0a, rgba(26,15,10,0.9), rgba(26,15,10,0.6))' }} />
        </div>
        <div className="relative p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <img src={PHOTOS[0]} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shrink-0 ring-2 ring-white/10 shadow-xl" alt="Wedding" />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-bold text-white">Tina & Rob&apos;s Wedding</h2>
            <div className="flex flex-wrap gap-3 md:gap-4 mt-2 text-sm text-white/50">
              <span className="flex items-center gap-1.5"><Camera className="w-4 h-4" style={{ color: '#d4851a' }} /> Sarah Chen</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" style={{ color: '#c74683' }} /> June 14, 2027</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-teal-400" /> Toronto</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-amber-400" /> 180 guests</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0 bg-white/5 rounded-xl px-5 py-3 border border-white/10 self-start md:self-center">
            <ImageIcon className="w-5 h-5" style={{ color: '#d4851a' }} />
            <span className="text-white font-bold text-2xl">248</span>
            <span className="text-white/40 text-xs">photos</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Booking', status: 'Confirmed', icon: CheckCircle2, color: '#22c55e', bg: 'rgba(34,197,94,0.05)', border: 'rgba(34,197,94,0.2)' },
          { label: 'Payment', status: '$1,808 Paid', icon: CreditCard, color: '#14b8a6', bg: 'rgba(20,184,166,0.05)', border: 'rgba(20,184,166,0.2)' },
          { label: 'Gallery', status: 'Delivered', icon: ImageIcon, color: '#d4851a', bg: 'rgba(212,133,26,0.05)', border: 'rgba(212,133,26,0.2)' },
          { label: 'Contract', status: 'Signed', icon: FileText, color: '#c74683', bg: 'rgba(199,70,131,0.05)', border: 'rgba(199,70,131,0.2)' },
        ].map(({ label, status, icon: Icon, color, bg, border }) => (
          <div key={label} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl" style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
              <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color }} />
            </div>
            <div>
              <p className="text-xs text-white/40">{label}</p>
              <p className="font-bold text-xs md:text-sm" style={{ color }}>{status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Photographer Card */}
      <div className="border border-white/10 rounded-2xl p-4 md:p-5" style={{ background: 'rgba(30,18,12,0.6)' }}>
        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Your Photographer</h3>
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          <div className="flex items-center gap-4 flex-1">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" alt="Sarah Chen" className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover ring-2 ring-amber-700/30" />
            <div>
              <h4 className="font-bold text-white text-base md:text-lg">Sarah Chen</h4>
              <p className="text-sm text-white/40">Award-winning Wedding Photographer</p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                <span className="text-xs text-white/40 ml-1">5.0 (127)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/client/messages" className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all border" style={{ background: 'rgba(212,133,26,0.15)', borderColor: 'rgba(212,133,26,0.3)', color: '#d4851a' }}>
              <MessageSquare className="w-4 h-4" /> Message
            </Link>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-xl transition-all">
              <Phone className="w-4 h-4" /> Call
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-xl transition-all">
              <Globe className="w-4 h-4" /> Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions + Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Browse Full Gallery', desc: '248 photos ready to view', icon: ImageIcon, color: '#d4851a', href: '/client/galleries' },
              { label: 'Download Favorites', desc: '32 photos selected', icon: Download, color: '#c74683', href: '#' },
              { label: 'Share Gallery Link', desc: 'Send to family & friends', icon: Share2, color: '#14b8a6', href: '#' },
              { label: 'View Event Timeline', desc: '7 events documented', icon: Calendar, color: '#e8a030', href: '/client/schedule' },
              { label: 'Download Invoice', desc: 'PDF receipt for $1,808', icon: FileText, color: '#a040a0', href: '/client/contracts' },
            ].map(({ label, desc, icon: Icon, color, href }) => (
              <Link key={label} href={href} className="w-full flex items-center justify-between p-3 md:p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group" style={{ background: 'rgba(30,18,12,0.4)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-medium text-white block">{label}</span>
                    <span className="text-xs text-white/40">{desc}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Activity Timeline</h3>
          <div className="border border-white/10 rounded-xl overflow-hidden" style={{ background: 'rgba(30,18,12,0.4)' }}>
            {[
              { label: 'Gallery delivered — 248 photos', time: '2 hours ago', icon: ImageIcon, color: '#d4851a' },
              { label: 'Final edits completed by Sarah', time: 'Jun 28, 2027', icon: Sparkles, color: '#c74683' },
              { label: 'Sneak peek: 12 photos shared', time: 'Jun 16, 2027', icon: Eye, color: '#e8a030' },
              { label: 'Wedding day — 1,847 shots taken', time: 'Jun 14, 2027', icon: Camera, color: '#f59e0b' },
              { label: 'Contract signed by both parties', time: 'Jan 15, 2027', icon: FileText, color: '#22c55e' },
              { label: 'Full payment of $1,808 received', time: 'Jan 14, 2027', icon: CreditCard, color: '#14b8a6' },
              { label: 'Booking confirmed', time: 'Jan 10, 2027', icon: CheckCircle2, color: '#a040a0' },
            ].map(({ label, time, icon: Icon, color }, i, arr) => (
              <div key={label} className={`flex items-center gap-3 p-3 md:p-4 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
                <p className="flex-1 text-xs md:text-sm text-white/80">{label}</p>
                <span className="text-[10px] md:text-xs text-white/30 shrink-0">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
