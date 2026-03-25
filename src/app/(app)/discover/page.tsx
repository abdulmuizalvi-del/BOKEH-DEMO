'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Star, Heart, SlidersHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

const STYLE_CATEGORIES = [
  { id: 'cinematic', label: 'Cinematic', color: 'from-violet-600 to-indigo-600', img: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80' },
  { id: 'bright-airy', label: 'Bright & Airy', color: 'from-amber-400 to-orange-400', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80' },
  { id: 'moody', label: 'Moody', color: 'from-slate-600 to-zinc-700', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80' },
  { id: 'editorial', label: 'Editorial', color: 'from-rose-600 to-pink-600', img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80' },
  { id: 'warm-lifestyle', label: 'Warm Lifestyle', color: 'from-orange-500 to-yellow-500', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80' },
  { id: 'film-look', label: 'Film Look', color: 'from-teal-600 to-cyan-600', img: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&q=80' },
]

const PHOTOGRAPHERS = [
  { id: 'p1', name: 'Sarah Chen', location: 'Toronto, Canada', rating: 4.9, reviews: 124, price: '$250', specialties: ['Wedding', 'Portrait'], avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80', cover: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80' },
  { id: 'p2', name: 'Marco Rivera', location: 'New York, USA', rating: 4.8, reviews: 89, price: '$350', specialties: ['Event', 'Commercial'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', cover: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80' },
  { id: 'p3', name: 'Yuki Tanaka', location: 'Vancouver, Canada', rating: 5.0, reviews: 56, price: '$300', specialties: ['Lifestyle', 'Film'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80', cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
  { id: 'p4', name: 'Alex Dupont', location: 'Montreal, Canada', rating: 4.7, reviews: 210, price: '$200', specialties: ['Wedding', 'Event'], avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80', cover: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
]

export default function Discover() {
  const router = useRouter()
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [likedPhotographers, setLikedPhotographers] = useState<Set<string>>(new Set())

  const toggleLike = (id: string) => {
    const s = new Set(likedPhotographers)
    s.has(id) ? s.delete(id) : s.add(id)
    setLikedPhotographers(s)
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-1">Discover Photographers</h1>
        <p className="text-muted-foreground">Find the perfect creative for your vision.</p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="text" placeholder="Search by name, location, or style..." className="w-full bg-card border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-fuchsia-500 transition-colors" />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-card border border-white/10 text-white rounded-xl hover:border-white/20 hover:bg-white/5 transition-all">
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Style Categories */}
      <div className="mb-10">
        <h2 className="text-lg font-display font-bold text-white mb-4">Browse by Style</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {STYLE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedStyle(selectedStyle === cat.id ? null : cat.id)}
              className={`relative rounded-xl overflow-hidden h-20 group transition-all ${selectedStyle === cat.id ? 'ring-2 ring-fuchsia-500 scale-[1.02]' : 'hover:scale-[1.02]'}`}
            >
              <img src={cat.img} alt={cat.label} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-70`} />
              <span className="relative text-xs font-bold text-white">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Photographers Grid */}
      <div>
        <h2 className="text-lg font-display font-bold text-white mb-4">Featured Photographers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {PHOTOGRAPHERS.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-fuchsia-500/30 transition-all cursor-pointer"
              onClick={() => router.push('/my-booking/1')}
            >
              <div className="h-48 relative overflow-hidden">
                <img src={p.cover} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={e => { e.stopPropagation(); toggleLike(p.id) }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${likedPhotographers.has(p.id) ? 'bg-rose-500/30 border-rose-500/60 text-rose-400' : 'bg-black/40 backdrop-blur border-white/20 text-white opacity-0 group-hover:opacity-100'}`}
                >
                  <Heart className={`w-4 h-4 ${likedPhotographers.has(p.id) ? 'fill-current opacity-100' : ''}`} />
                </button>
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {p.specialties.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 backdrop-blur text-white/80 border border-white/10">{s}</span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{p.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />{p.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span className="text-sm font-semibold text-white">{p.rating}</span>
                    <span className="text-xs text-muted-foreground">({p.reviews})</span>
                  </div>
                  <span className="text-sm font-bold text-fuchsia-400">from {p.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
