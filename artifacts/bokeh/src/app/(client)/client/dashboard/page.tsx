'use client'

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
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
]



export default function ClientDashboard() {
  return (
    <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">My Booking  June 14, 2027</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-green-500/15 border border-green-500/30 text-green-400">Gallery Delivered</span>
              </div>
              <h1 className="text-3xl font-display font-bold text-white">Tina & Rob&apos;s Wedding</h1>
            </div>

            {/* Hero Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card">
              <div className="absolute inset-0">
                <img src={PHOTOS[0]} className="w-full h-full object-cover opacity-15" alt="" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
              </div>
              <div className="relative p-6 flex flex-col md:flex-row md:items-center gap-6">
                <img src={PHOTOS[0]} className="w-24 h-24 rounded-2xl object-cover shrink-0 ring-2 ring-white/10 shadow-xl" alt="Wedding" />
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold text-white">Tina & Rob&apos;s Wedding</h2>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-fuchsia-400" /> Sarah Chen Photography</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-violet-400" /> June 14, 2027</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-teal-400" /> Toronto, Canada</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-amber-400" /> 180 guests</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 shrink-0 bg-white/5 rounded-xl px-5 py-3 border border-white/10">
                  <ImageIcon className="w-5 h-5 text-fuchsia-400" />
                  <span className="text-white font-bold text-2xl">248</span>
                  <span className="text-muted-foreground text-xs">photos</span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Booking', status: 'Confirmed', icon: CheckCircle2, color: 'green', bg: 'bg-green-500/5', border: 'border-green-500/20', iconBg: 'bg-green-500/15', iconColor: 'text-green-400' },
                { label: 'Payment', status: '$1,808 Paid', icon: CreditCard, color: 'teal', bg: 'bg-teal-500/5', border: 'border-teal-500/20', iconBg: 'bg-teal-500/15', iconColor: 'text-teal-400' },
                { label: 'Gallery', status: 'Delivered', icon: ImageIcon, color: 'fuchsia', bg: 'bg-fuchsia-500/5', border: 'border-fuchsia-500/20', iconBg: 'bg-fuchsia-500/15', iconColor: 'text-fuchsia-400' },
                { label: 'Contract', status: 'Signed', icon: FileText, color: 'violet', bg: 'bg-violet-500/5', border: 'border-violet-500/20', iconBg: 'bg-violet-500/15', iconColor: 'text-violet-400' },
              ].map(({ label, status, icon: Icon, bg, border, iconBg, iconColor }) => (
                <div key={label} className={`flex items-center gap-4 p-4 rounded-xl border ${bg} ${border}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className={`font-bold text-sm ${iconColor}`}>{status}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Photographer Card */}
            <div className="bg-card border border-white/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Your Photographer</h3>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex items-center gap-4 flex-1">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" alt="Sarah Chen" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-fuchsia-500/30" />
                  <div>
                    <h4 className="font-bold text-white text-lg">Sarah Chen</h4>
                    <p className="text-sm text-muted-foreground">Award-winning Wedding Photographer</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                      <span className="text-xs text-muted-foreground ml-1">5.0 (127 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border border-fuchsia-500/30 text-fuchsia-400 text-sm font-semibold rounded-xl transition-all">
                    <MessageSquare className="w-4 h-4" /> Message
                  </button>
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
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Browse Full Gallery', desc: '248 photos ready to view', icon: ImageIcon, accent: 'fuchsia', href: '/client/galleries' },
                    { label: 'Download Favorites', desc: '32 photos selected', icon: Download, accent: 'violet', href: '#' },
                    { label: 'Share Gallery Link', desc: 'Send to family & friends', icon: Share2, accent: 'teal', href: '#' },
                    { label: 'View Event Timeline', desc: '7 events documented', icon: Calendar, accent: 'amber', href: '/client/schedule' },
                    { label: 'Download Invoice', desc: 'PDF receipt for $1,808', icon: FileText, accent: 'indigo', href: '/client/contracts' },
                  ].map(({ label, desc, icon: Icon, accent, href }) => (
                    <a key={label} href={href} className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent === 'fuchsia' ? 'bg-fuchsia-500/15' : accent === 'violet' ? 'bg-violet-500/15' : accent === 'teal' ? 'bg-teal-500/15' : accent === 'amber' ? 'bg-amber-500/15' : 'bg-indigo-500/15'}`}>
                          <Icon className={`w-4 h-4 ${accent === 'fuchsia' ? 'text-fuchsia-400' : accent === 'violet' ? 'text-violet-400' : accent === 'teal' ? 'text-teal-400' : accent === 'amber' ? 'text-amber-400' : 'text-indigo-400'}`} />
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-medium text-white block">{label}</span>
                          <span className="text-xs text-muted-foreground">{desc}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Activity Timeline</h3>
                <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
                  {[
                    { label: 'Gallery delivered — 248 photos', time: '2 hours ago', icon: ImageIcon, color: 'fuchsia' },
                    { label: 'Final edits completed by Sarah', time: 'Jun 28, 2027', icon: Sparkles, color: 'violet' },
                    { label: 'Sneak peek: 12 photos shared', time: 'Jun 16, 2027', icon: Eye, color: 'pink' },
                    { label: 'Wedding day — 1,847 shots taken', time: 'Jun 14, 2027', icon: Camera, color: 'amber' },
                    { label: 'Contract signed by both parties', time: 'Jan 15, 2027', icon: FileText, color: 'green' },
                    { label: 'Full payment of $1,808 received', time: 'Jan 14, 2027', icon: CreditCard, color: 'teal' },
                    { label: 'Booking confirmed', time: 'Jan 10, 2027', icon: CheckCircle2, color: 'indigo' },
                  ].map(({ label, time, icon: Icon, color }, i, arr) => (
                    <div key={label} className={`flex items-center gap-3 p-4 ${i < arr.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${color === 'fuchsia' ? 'bg-fuchsia-500/15' : color === 'green' ? 'bg-green-500/15' : color === 'teal' ? 'bg-teal-500/15' : color === 'violet' ? 'bg-violet-500/15' : color === 'pink' ? 'bg-pink-500/15' : color === 'amber' ? 'bg-amber-500/15' : 'bg-indigo-500/15'}`}>
                        <Icon className={`w-3.5 h-3.5 ${color === 'fuchsia' ? 'text-fuchsia-400' : color === 'green' ? 'text-green-400' : color === 'teal' ? 'text-teal-400' : color === 'violet' ? 'text-violet-400' : color === 'pink' ? 'text-pink-400' : color === 'amber' ? 'text-amber-400' : 'text-indigo-400'}`} />
                      </div>
                      <p className="flex-1 text-sm text-white/80">{label}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
    </div>
  )
}
