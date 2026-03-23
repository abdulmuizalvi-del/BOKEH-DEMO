import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, MapPin, Star, Zap, X, ChevronRight, Heart, Share2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STYLE_CATEGORIES = [
  { id: "cinematic", label: "Cinematic", color: "from-violet-600 to-indigo-600", glow: "shadow-violet-500/30", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&q=80" },
  { id: "bright-airy", label: "Bright & Airy", color: "from-amber-400 to-orange-400", glow: "shadow-amber-500/30", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80" },
  { id: "moody", label: "Moody", color: "from-slate-600 to-zinc-700", glow: "shadow-slate-500/30", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80" },
  { id: "editorial", label: "Editorial", color: "from-rose-600 to-pink-600", glow: "shadow-rose-500/30", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80" },
  { id: "warm-lifestyle", label: "Warm Lifestyle", color: "from-orange-500 to-yellow-500", glow: "shadow-orange-500/30", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80" },
  { id: "film-look", label: "Film Look", color: "from-teal-600 to-cyan-600", glow: "shadow-teal-500/30", img: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&q=80" },
  { id: "minimal", label: "Minimal", color: "from-zinc-500 to-stone-600", glow: "shadow-zinc-500/30", img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&q=80" },
  { id: "golden-hour", label: "Golden Hour", color: "from-yellow-500 to-amber-600", glow: "shadow-yellow-500/30", img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=80" },
];

const PHOTOGRAPHERS = [
  {
    id: "p1",
    name: "Sarah Chen",
    location: "Toronto, Canada",
    price: "$800–$1,500",
    styles: ["Cinematic", "Editorial"],
    match: 96,
    rating: 4.9,
    reviews: 134,
    cover: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&q=80",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=300&q=80",
    ],
    bio: "Award-winning photographer specializing in cinematic wedding and editorial shoots. 8+ years capturing timeless moments.",
    available: true,
    accentColor: "fuchsia",
  },
  {
    id: "p2",
    name: "Alex Rivera",
    location: "New York, USA",
    price: "$600–$1,200",
    styles: ["Moody", "Film Look"],
    match: 92,
    rating: 4.8,
    reviews: 98,
    cover: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=300&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&q=80",
    ],
    bio: "Moody and atmospheric storyteller. NYC-based, available worldwide for weddings, portraits, and commercial work.",
    available: true,
    accentColor: "violet",
  },
  {
    id: "p3",
    name: "Maya Patel",
    location: "Los Angeles, USA",
    price: "$1,000–$2,000",
    styles: ["Bright & Airy", "Warm Lifestyle"],
    match: 89,
    rating: 5.0,
    reviews: 212,
    cover: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80",
    ],
    bio: "Capturing joy and connection. Bright, timeless images that feel like a warm hug. Based in LA, shooting globally.",
    available: false,
    accentColor: "amber",
  },
  {
    id: "p4",
    name: "James Whitfield",
    location: "London, UK",
    price: "$700–$1,400",
    styles: ["Editorial", "Minimal"],
    match: 87,
    rating: 4.7,
    reviews: 67,
    cover: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=300&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=300&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&q=80",
    ],
    bio: "London editorial photographer with a clean, minimal aesthetic. Featured in Vogue, Harper's Bazaar, and Time Out.",
    available: true,
    accentColor: "teal",
  },
  {
    id: "p5",
    name: "Rina Tanaka",
    location: "Tokyo, Japan",
    price: "$500–$1,000",
    styles: ["Film Look", "Minimal"],
    match: 84,
    rating: 4.9,
    reviews: 155,
    cover: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&q=80",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=300&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=300&q=80",
    ],
    bio: "Tokyo-based photographer blending film aesthetics with modern storytelling. Specializes in intimate portrait sessions.",
    available: true,
    accentColor: "rose",
  },
  {
    id: "p6",
    name: "Diego Morales",
    location: "Barcelona, Spain",
    price: "$600–$1,300",
    styles: ["Golden Hour", "Cinematic"],
    match: 81,
    rating: 4.8,
    reviews: 89,
    cover: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    portfolio: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&q=80",
    ],
    bio: "Mediterranean light, warm emotions. Barcelona-based destination photographer for weddings and couples.",
    available: true,
    accentColor: "orange",
  },
];

const MATCH_COLORS: Record<string, string> = {
  fuchsia: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30 shadow-fuchsia-500/20",
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/30 shadow-violet-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-amber-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/30 shadow-teal-500/20",
  rose: "text-rose-400 bg-rose-500/10 border-rose-500/30 shadow-rose-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/30 shadow-orange-500/20",
};

const GLOW_COLORS: Record<string, string> = {
  fuchsia: "shadow-[0_0_30px_rgba(217,70,239,0.15)] border-fuchsia-500/30",
  violet: "shadow-[0_0_30px_rgba(124,58,237,0.15)] border-violet-500/30",
  amber: "shadow-[0_0_30px_rgba(245,158,11,0.15)] border-amber-500/30",
  teal: "shadow-[0_0_30px_rgba(20,184,166,0.15)] border-teal-500/30",
  rose: "shadow-[0_0_30px_rgba(244,63,94,0.15)] border-rose-500/30",
  orange: "shadow-[0_0_30px_rgba(249,115,22,0.15)] border-orange-500/30",
};

type Photographer = typeof PHOTOGRAPHERS[0];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStyle, setActiveStyle] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [aiPulse, setAiPulse] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedPhotog = PHOTOGRAPHERS.find(p => p.id === selectedId) ?? null;

  const filteredPhotographers = PHOTOGRAPHERS.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.styles.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = !activeStyle || p.styles.some(s => 
      s.toLowerCase().replace(/ /g, '-') === activeStyle
    );
    return matchesSearch && matchesStyle;
  });

  const handleSelect = (id: string) => {
    if (selectedId === id) { setSelectedId(null); return; }
    setSelectedId(id);
    setAiPulse(true);
    setTimeout(() => setAiPulse(false), 1200);
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <AppLayout>
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">AI-Powered</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-white">Discover Photographers</h1>
          <p className="text-muted-foreground mt-1">Find your perfect match by style, mood, and vibe</p>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search photographers, styles, moods..."
              className="w-full bg-card border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-fuchsia-500/60 focus:shadow-[0_0_0_1px_rgba(217,70,239,0.2)] transition-all"
            />
          </div>
          <button
            onClick={() => setShowFilters(v => !v)}
            className={`p-3 rounded-xl border transition-all ${showFilters ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400' : 'bg-card border-white/10 text-muted-foreground hover:text-white hover:border-white/20'}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters Slide-in Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-card border border-white/10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Price Range</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-fuchsia-500">
                  <option>Any budget</option>
                  <option>Under $500</option>
                  <option>$500 – $1,000</option>
                  <option>$1,000 – $2,000</option>
                  <option>$2,000+</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Location</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-fuchsia-500">
                  <option>Anywhere</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia Pacific</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Availability</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-fuchsia-500">
                  <option>All</option>
                  <option>Available now</option>
                  <option>Next 30 days</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Min. Match Score</label>
                <select className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-fuchsia-500">
                  <option>Any</option>
                  <option>80%+</option>
                  <option>90%+</option>
                  <option>95%+</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Style Categories — Horizontal Scroll */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Browse by Style</h2>
          {activeStyle && (
            <button onClick={() => setActiveStyle(null)} className="text-xs text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-3 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {STYLE_CATEGORIES.map((cat, i) => {
            const isActive = activeStyle === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setActiveStyle(isActive ? null : cat.id)}
                className={`
                  relative shrink-0 w-32 h-44 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group
                  ${isActive
                    ? `ring-2 ring-white/60 shadow-xl ${cat.glow}`
                    : `ring-1 ring-white/10 hover:ring-white/30 hover:shadow-lg hover:${cat.glow}`
                  }
                `}
              >
                <img src={cat.img} alt={cat.label} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isActive ? 'scale-105' : ''}`} />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60`} />
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <span className="text-white font-bold text-sm leading-tight drop-shadow-lg">{cat.label}</span>
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main content — grid + detail panel */}
      <div className="flex gap-6">
        {/* Photographer Grid */}
        <div className={`flex-1 transition-all duration-500 ${selectedPhotog ? 'lg:max-w-[55%]' : 'w-full'}`}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-white font-semibold">{filteredPhotographers.length}</span> photographers found
              {activeStyle && <span> · <span className="text-fuchsia-400">{STYLE_CATEGORIES.find(c => c.id === activeStyle)?.label}</span></span>}
            </p>
            <div className="flex items-center gap-1 text-xs text-teal-400 font-semibold">
              <Zap className="w-3 h-3" /> AI Ranked by match
            </div>
          </div>

          <div className={`grid gap-5 ${selectedPhotog ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredPhotographers.map((p, idx) => {
              const isSelected = selectedId === p.id;
              const isLiked = likedIds.has(p.id);
              const colors = MATCH_COLORS[p.accentColor];
              const glowClass = GLOW_COLORS[p.accentColor];

              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  onClick={() => handleSelect(p.id)}
                  className={`
                    relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 group bg-card
                    ${isSelected ? `border ${glowClass}` : 'border-white/10 hover:border-white/20 hover:shadow-lg'}
                  `}
                >
                  {/* Cover image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* AI Match badge */}
                    <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold shadow-lg backdrop-blur-sm ${colors}`}>
                      <Zap className="w-3 h-3" />
                      {p.match}% Match
                    </div>

                    {/* Like button */}
                    <button
                      onClick={e => toggleLike(e, p.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center border transition-all ${isLiked ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-black/30 border-white/20 text-white/60 hover:text-white'}`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                    {/* AI Matching glow lines when selected */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <svg className="w-full h-full absolute inset-0">
                          <motion.line
                            x1="10%" y1="30%" x2="90%" y2="70%"
                            stroke="rgba(217,70,239,0.4)" strokeWidth="1" strokeDasharray="4 4"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8 }}
                          />
                          <motion.line
                            x1="80%" y1="20%" x2="20%" y2="80%"
                            stroke="rgba(45,212,191,0.3)" strokeWidth="1" strokeDasharray="4 4"
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                          <motion.circle cx="50%" cy="50%" r="30"
                            fill="none" stroke="rgba(217,70,239,0.2)" strokeWidth="1"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          />
                        </svg>
                      </motion.div>
                    )}

                    {/* Availability badge */}
                    {!p.available && (
                      <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur text-white/60 text-xs rounded-full border border-white/10">
                        Fully Booked
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{p.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {p.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-white font-semibold">{p.rating}</span>
                        <span className="text-muted-foreground">({p.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.styles.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{p.price}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform text-muted-foreground ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>

                  {/* Selected glow ring */}
                  {isSelected && (
                    <motion.div
                      layoutId="selected-ring"
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 2px rgba(217,70,239,0.5)` }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {filteredPhotographers.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Search className="w-7 h-7 text-white/30" />
              </div>
              <p className="text-muted-foreground">No photographers match your search.</p>
              <button onClick={() => { setSearchQuery(""); setActiveStyle(null); }} className="mt-3 text-fuchsia-400 text-sm hover:underline">Clear filters</button>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedPhotog && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="hidden lg:flex flex-col w-[400px] shrink-0"
            >
              <DetailPanel
                photographer={selectedPhotog}
                onClose={() => setSelectedId(null)}
                isLiked={likedIds.has(selectedPhotog.id)}
                onLike={() => toggleLike({ stopPropagation: () => {} } as React.MouseEvent, selectedPhotog.id)}
                aiPulse={aiPulse}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

function DetailPanel({
  photographer: p,
  onClose,
  isLiked,
  onLike,
  aiPulse,
}: {
  photographer: Photographer;
  onClose: () => void;
  isLiked: boolean;
  onLike: () => void;
  aiPulse: boolean;
}) {
  const colors = MATCH_COLORS[p.accentColor];
  const glowBorder = GLOW_COLORS[p.accentColor];

  return (
    <div className={`bg-card border rounded-2xl overflow-hidden sticky top-6 ${glowBorder}`}>
      {/* Hero */}
      <div className="relative h-56 overflow-hidden">
        <img src={p.cover} alt={p.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors">
          <X className="w-4 h-4" />
        </button>

        {/* AI Match Pulse animation */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold backdrop-blur-sm ${colors} ${aiPulse ? 'animate-pulse' : ''}`}>
          <Zap className="w-3.5 h-3.5" />
          {p.match}% AI Match
        </div>
      </div>

      <div className="p-5">
        {/* Profile header */}
        <div className="flex items-center gap-3 mb-4 -mt-10 relative">
          <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-card shadow-xl" />
          <div className="flex-1 pt-8">
            <h2 className="font-display font-bold text-white text-lg">{p.name}</h2>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {p.location}
            </div>
          </div>
        </div>

        {/* Rating + availability */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-400">{p.rating}</span>
            <span className="text-xs text-muted-foreground">({p.reviews} reviews)</span>
          </div>
          <div className={`text-xs px-2.5 py-1 rounded-full font-semibold ${p.available ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-white/5 border border-white/10 text-white/40'}`}>
            {p.available ? '● Available' : '○ Booked'}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.bio}</p>

        {/* Style tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {p.styles.map(s => (
            <span key={s} className={`text-xs px-3 py-1 rounded-full border font-medium ${colors}`}>{s}</span>
          ))}
        </div>

        {/* Portfolio thumbnails */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Portfolio</p>
          <div className="flex gap-2">
            {p.portfolio.map((img, i) => (
              <img key={i} src={img} alt="portfolio" className="w-24 h-20 rounded-lg object-cover flex-1 hover:opacity-80 transition-opacity cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-5 py-3 border-t border-white/5">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-lg font-bold text-white">{p.price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">AI Match Score</p>
            <p className={`text-lg font-bold ${colors.split(' ')[0]}`}>{p.match}%</p>
          </div>
        </div>

        {/* AI Match Visualization */}
        <div className="mb-5 p-3 rounded-xl bg-black/30 border border-white/5 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs font-semibold text-teal-400">AI Style Alignment</span>
          </div>
          <div className="space-y-2">
            {[
              { label: "Style Match", val: p.match },
              { label: "Availability", val: p.available ? 95 : 20 },
              { label: "Budget Fit", val: 88 },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                  <span>{label}</span><span className="text-white">{val}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-fuchsia-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="flex-1 py-3 bg-gradient-to-r from-fuchsia-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all text-sm">
            Book Now
          </button>
          <button
            onClick={onLike}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${isLiked ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:text-white hover:border-white/20'}`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
