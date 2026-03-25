'use client'

import { useState } from 'react'
import {
  CheckCircle2, CreditCard, Calendar, ImageIcon, MessageSquare, FileText,
  ChevronRight, MapPin, Clock, Download, Share2, Heart, Eye, ExternalLink,
  Pen, Star, Camera, Users, Phone, Globe, Shield, Sparkles,
  Sun, Moon, Cloud, CloudSun, AlertCircle, Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = ['Overview', 'My Galleries', 'Event Schedule', 'Legal & Contracts'] as const
type Tab = typeof TABS[number]

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

const GALLERY_CATEGORIES = [
  { name: 'All Photos', count: 248, active: true },
  { name: 'Favorites', count: 32, active: false },
  { name: 'Preparation', count: 45, active: false },
  { name: 'Ceremony', count: 78, active: false },
  { name: 'Reception', count: 95, active: false },
  { name: 'Portraits', count: 30, active: false },
]

const EVENTS = [
  {
    id: 'hair-makeup',
    time: '07:30 AM',
    endTime: '09:00 AM',
    title: 'Hair & Makeup',
    location: 'Bridal Suite — King Edward Hotel, Room 1204',
    description: 'Professional styling by Mia Rodriguez. Bride + 4 bridesmaids. Touch-up kit provided for the day.',
    team: ['Mia Rodriguez (Lead Stylist)', 'Jen Park (Assistant)'],
    notes: 'Natural light from east windows — perfect for getting-ready portraits.',
    photos: [9, 10, 8],
    color: 'rose',
  },
  {
    id: 'prep',
    time: '09:00 AM',
    endTime: '11:00 AM',
    title: 'Preparation & Details',
    location: 'Bridal Suite — King Edward Hotel',
    description: 'Getting ready shots, bridal party, dress details, rings, invitations, bouquet, cufflinks, and love letters.',
    team: ['Sarah Chen (Lead Photographer)', 'Marcus Webb (Second Shooter)'],
    notes: 'Groom getting ready in Room 1108. Marcus will cover groom prep simultaneously.',
    photos: [0, 4, 8],
    color: 'fuchsia',
  },
  {
    id: 'first-look',
    time: '11:15 AM',
    endTime: '11:45 AM',
    title: 'First Look',
    location: 'Crystal Ballroom Terrace, King Edward Hotel',
    description: 'Private first look between Tina & Rob on the terrace overlooking the garden courtyard.',
    team: ['Sarah Chen', 'Marcus Webb (behind-the-scenes video)'],
    notes: 'Emotional moment — keep 15ft distance initially, then close-up reactions.',
    photos: [1, 5, 11],
    color: 'pink',
  },
  {
    id: 'ceremony',
    time: '12:30 PM',
    endTime: '01:30 PM',
    title: 'Ceremony',
    location: "St. Michael's Cathedral Basilica, 65 Bond St, Toronto",
    description: 'Full Catholic ceremony — processional, vows, ring exchange, unity candle, first kiss, and recessional. 180 guests seated.',
    team: ['Sarah Chen (altar side)', 'Marcus Webb (balcony/guest reactions)'],
    notes: 'No flash photography during ceremony per church rules. Available light + f/1.4 lenses.',
    photos: [1, 2, 5],
    color: 'violet',
  },
  {
    id: 'portraits',
    time: '02:00 PM',
    endTime: '03:30 PM',
    title: 'Family & Bridal Party Portraits',
    location: 'Toronto Music Garden & Harbourfront',
    description: 'Formal family groupings (12 combinations), full bridal party, and couple portraits along the waterfront.',
    team: ['Sarah Chen', 'Marcus Webb'],
    notes: 'Shot list confirmed with Tina — 12 family groupings, 8 bridal party combos, 20 min couple time.',
    photos: [3, 6, 11],
    color: 'indigo',
  },
  {
    id: 'cocktail',
    time: '04:00 PM',
    endTime: '05:30 PM',
    title: 'Cocktail Hour',
    location: 'Arcadian Court Lounge, 401 Bay Street',
    description: 'Guests enjoy canapés and signature cocktails. Live jazz trio. Candid guest interactions and venue detail shots.',
    team: ['Marcus Webb (candids)', 'Sarah Chen (venue details)'],
    notes: 'Signature cocktails: "Tina\'s Blush" (rosé spritz) and "Rob\'s Old Fashioned" — photograph both.',
    photos: [4, 7, 10],
    color: 'amber',
  },
  {
    id: 'reception',
    time: '06:00 PM',
    endTime: '11:30 PM',
    title: 'Reception & Party',
    location: 'Arcadian Court Grand Hall, Bay Street',
    description: 'Grand entrance, first dance ("Perfect" by Ed Sheeran), father-daughter dance, toasts from best man & maid of honor, cake cutting, bouquet toss, and open dance floor until midnight.',
    team: ['Sarah Chen', 'Marcus Webb', 'DJ Khalid (Music)'],
    notes: 'Sparkler exit at 11:15 PM — 200 sparklers arranged. Final shot of the night.',
    photos: [3, 6, 7],
    color: 'teal',
  },
]

const EVENT_COLORS: Record<string, { dot: string; border: string; badge: string; btn: string; ring: string; bg: string }> = {
  rose: { dot: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]', border: 'border-rose-500/20 hover:border-rose-500/40', badge: 'bg-rose-500/10 border-rose-500/30 text-rose-400', btn: 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border-rose-500/30', ring: 'ring-rose-500/40', bg: 'bg-rose-500/5' },
  fuchsia: { dot: 'bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.6)]', border: 'border-fuchsia-500/20 hover:border-fuchsia-500/40', badge: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400', btn: 'bg-fuchsia-500/15 hover:bg-fuchsia-500/25 text-fuchsia-400 border-fuchsia-500/30', ring: 'ring-fuchsia-500/40', bg: 'bg-fuchsia-500/5' },
  pink: { dot: 'bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.6)]', border: 'border-pink-500/20 hover:border-pink-500/40', badge: 'bg-pink-500/10 border-pink-500/30 text-pink-400', btn: 'bg-pink-500/15 hover:bg-pink-500/25 text-pink-400 border-pink-500/30', ring: 'ring-pink-500/40', bg: 'bg-pink-500/5' },
  violet: { dot: 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]', border: 'border-violet-500/20 hover:border-violet-500/40', badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400', btn: 'bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 border-violet-500/30', ring: 'ring-violet-500/40', bg: 'bg-violet-500/5' },
  indigo: { dot: 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]', border: 'border-indigo-500/20 hover:border-indigo-500/40', badge: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400', btn: 'bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-400 border-indigo-500/30', ring: 'ring-indigo-500/40', bg: 'bg-indigo-500/5' },
  amber: { dot: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]', border: 'border-amber-500/20 hover:border-amber-500/40', badge: 'bg-amber-500/10 border-amber-500/30 text-amber-400', btn: 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border-amber-500/30', ring: 'ring-amber-500/40', bg: 'bg-amber-500/5' },
  teal: { dot: 'bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]', border: 'border-teal-500/20 hover:border-teal-500/40', badge: 'bg-teal-500/10 border-teal-500/30 text-teal-400', btn: 'bg-teal-500/15 hover:bg-teal-500/25 text-teal-400 border-teal-500/30', ring: 'ring-teal-500/40', bg: 'bg-teal-500/5' },
}

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
                    { label: 'Browse Full Gallery', desc: '248 photos ready to view', icon: ImageIcon, accent: 'fuchsia', action: () => setActiveTab('My Galleries') },
                    { label: 'Download Favorites', desc: '32 photos selected', icon: Download, accent: 'violet', action: () => {} },
                    { label: 'Share Gallery Link', desc: 'Send to family & friends', icon: Share2, accent: 'teal', action: () => {} },
                    { label: 'View Event Timeline', desc: '7 events documented', icon: Calendar, accent: 'amber', action: () => setActiveTab('Event Schedule') },
                    { label: 'Download Invoice', desc: 'PDF receipt for $1,808', icon: FileText, accent: 'indigo', action: () => setActiveTab('Legal & Contracts') },
                  ].map(({ label, desc, icon: Icon, accent, action }) => (
                    <button key={label} onClick={action} className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group">
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
                    </button>
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
