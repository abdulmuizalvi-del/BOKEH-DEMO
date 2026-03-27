'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Aperture, Search, Heart, MapPin, Star, Camera, ArrowRight, Filter } from 'lucide-react'

const CATEGORIES = ['All', 'Weddings', 'Portraits', 'Events', 'Nature', 'Fashion', 'Architecture']

const PHOTOGRAPHERS = [
  {
    id: 1,
    name: 'Sarah Chen',
    location: 'Toronto, Canada',
    specialty: 'Wedding',
    rating: 5.0,
    reviews: 127,
    price: 'From $2,400',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    tags: ['Weddings', 'Portraits'],
    badge: 'Top Rated',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  {
    id: 2,
    name: 'Marcus Webb',
    location: 'New York, USA',
    specialty: 'Portrait',
    rating: 4.9,
    reviews: 98,
    price: 'From $800',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    tags: ['Portraits', 'Fashion'],
    badge: 'New',
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    location: 'London, UK',
    specialty: 'Events',
    rating: 4.8,
    reviews: 74,
    price: 'From $1,200',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    tags: ['Events', 'Weddings'],
    badge: 'Popular',
    badgeColor: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30',
  },
  {
    id: 4,
    name: 'James Okafor',
    location: 'Lagos, Nigeria',
    specialty: 'Fashion',
    rating: 4.9,
    reviews: 56,
    price: 'From $600',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80',
    tags: ['Fashion', 'Portraits'],
    badge: 'Rising Star',
    badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
  },
  {
    id: 5,
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    specialty: 'Architecture',
    rating: 5.0,
    reviews: 43,
    price: 'From $1,800',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    tags: ['Architecture', 'Nature'],
    badge: 'Top Rated',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  {
    id: 6,
    name: 'Amara Diallo',
    location: 'Paris, France',
    specialty: 'Nature',
    rating: 4.7,
    reviews: 89,
    price: 'From $950',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
    cover: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    tags: ['Nature', 'Events'],
    badge: 'Popular',
    badgeColor: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30',
  },
]

const GALLERY_PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', photographer: 'Sarah Chen', col: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80', photographer: 'Marcus Webb', col: '' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', photographer: 'Priya Sharma', col: '' },
  { src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80', photographer: 'James Okafor', col: '' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', photographer: 'Yuki Tanaka', col: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', photographer: 'Amara Diallo', col: '' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80', photographer: 'Sarah Chen', col: '' },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80', photographer: 'Marcus Webb', col: '' },
]

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const toggleLike = (id: number) => {
    const s = new Set(liked)
    s.has(id) ? s.delete(id) : s.add(id)
    setLiked(s)
  }

  const filtered = PHOTOGRAPHERS.filter(p => {
    const matchCat = activeCategory === 'All' || p.tags.includes(activeCategory)
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <Aperture className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-wide">BOKEH</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2">Sign In</Link>
          <Link href="/signup" className="text-sm font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white px-5 py-2 rounded-xl hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-28 pb-16 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 text-xs font-semibold uppercase tracking-widest mb-5">
            <Camera className="w-3.5 h-3.5" /> Discover Photographers
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find your perfect<br />
            <span className="bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">photographer</span>
          </h1>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">Browse galleries from world-class photographers. Wedding, portrait, events and more.</p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search photographers, locations..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 md:px-12 pb-8">
        <div className="max-w-6xl mx-auto flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-fuchsia-500/20'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PHOTOGRAPHER CARDS */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-white/40 mb-6">{filtered.length} photographers found</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl overflow-hidden bg-card/60 backdrop-blur-sm border border-white/[0.08] hover:border-white/20 transition-all group"
              >
                {/* Cover photo */}
                <div className="relative h-48 overflow-hidden">
                  <img src={p.cover} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => toggleLike(p.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-all hover:scale-110"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${liked.has(p.id) ? 'text-red-400 fill-red-400' : 'text-white/60'}`} />
                  </button>
                  <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                    {p.badge}
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <img src={p.avatar} alt={p.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white/10 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white">{p.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-white/50">
                        <MapPin className="w-3 h-3" /> {p.location}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-xs text-amber-400 justify-end">
                        <Star className="w-3 h-3 fill-amber-400" /> {p.rating}
                      </div>
                      <div className="text-xs text-white/30">{p.reviews} reviews</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-sm font-semibold text-white">{p.price}</span>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-xl hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all"
                    >
                      Book Now <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY MOSAIC */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Recent Work</h2>
            <span className="text-sm text-white/40">Updated daily</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {GALLERY_PHOTOS.map((photo, i) => (
              <div key={i} className={`${photo.col} aspect-square rounded-2xl overflow-hidden group relative`}>
                <img src={photo.src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end p-3 opacity-0 group-hover:opacity-100">
                  <span className="text-xs text-white font-medium">{photo.photographer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center border-t border-white/5">
        <h2 className="text-3xl font-bold text-white mb-4">Are you a photographer?</h2>
        <p className="text-white/50 mb-8">Join BOKEH and get discovered by thousands of clients.</p>
        <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-semibold rounded-2xl hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] transition-all">
          Create Your Studio <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
