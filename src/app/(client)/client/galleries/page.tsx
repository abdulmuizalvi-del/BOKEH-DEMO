'use client'

import { useState } from 'react'
import { CheckCircle2, Download, Share2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

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

export default function ClientGalleries() {
  const [heroIdx, setHeroIdx] = useState(0)
  const [liked, setLiked] = useState<Set<number>>(new Set([1, 3]))

  const toggle = (i: number) => {
    const s = new Set(liked)
    s.has(i) ? s.delete(i) : s.add(i)
    setLiked(s)
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">My Galleries</h1>
        <p className="text-white/40 text-sm">Tina & Rob's Wedding — June 14, 2027</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-bold text-green-400">Gallery Delivered</span>
          </div>
          <span className="text-sm text-white/40">{PHOTOS.length} photos</span>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-white/10 text-white text-sm font-semibold rounded-xl hover:border-white/20 hover:bg-white/5 transition-all" style={{ background: 'rgba(30,18,12,0.6)' }}>
            <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Share All</span>
          </button>
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 text-white text-sm font-semibold rounded-xl transition-all" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Download All</span>
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden group cursor-pointer mb-6 h-[40vh] md:h-[55vh]">
        <img src={PHOTOS[heroIdx]} alt="hero" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2 md:gap-3">
            <button className="px-4 md:px-5 py-2 md:py-2.5 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-100 text-sm"><Download className="w-4 h-4" /> Download</button>
            <button className="px-4 md:px-5 py-2 md:py-2.5 bg-white/20 backdrop-blur text-white font-bold rounded-xl border border-white/20 flex items-center gap-2 hover:bg-white/30 text-sm"><Share2 className="w-4 h-4" /> Share</button>
          </div>
          <button onClick={() => toggle(heroIdx)} className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center border transition-all ${liked.has(heroIdx) ? 'bg-rose-500/30 border-rose-500/60 text-rose-400' : 'bg-black/40 backdrop-blur border-white/20 text-white'}`}>
            <Heart className={`w-5 h-5 ${liked.has(heroIdx) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
        {PHOTOS.map((url, i) => (
          <motion.div key={i} onClick={() => setHeroIdx(i)}
            className={`relative rounded-xl overflow-hidden cursor-pointer aspect-square group transition-all ${heroIdx === i ? 'ring-2 ring-amber-600 shadow-lg shadow-amber-600/30' : 'ring-1 ring-white/10 hover:ring-white/30'}`}
          >
            <img src={url} alt={`photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <button onClick={e => { e.stopPropagation(); toggle(i) }} className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${liked.has(i) ? 'bg-rose-500/80 text-white opacity-100' : 'bg-black/50 text-white'}`}>
              <Heart className={`w-3 h-3 ${liked.has(i) ? 'fill-current' : ''}`} />
            </button>
          </motion.div>
        ))}
      </div>
    </>
  )
}
