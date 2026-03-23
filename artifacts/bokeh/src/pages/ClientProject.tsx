import { AppLayout } from "@/components/layout/AppLayout";
import { useParams, useLocation } from "wouter";
import { useState, useRef } from "react";
import {
  CheckCircle2, CreditCard, Calendar, MapPin, Camera,
  MessageSquare, FileText, ImageIcon, Download, Share2,
  Heart, Clock, ChevronRight, Eye, ExternalLink, Pen,
  X, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_PHOTOS = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
];

const TIMELINE_EVENTS = [
  {
    id: "prep",
    time: "09:00 AM",
    title: "Preparation",
    location: "Bridal Suite — King Edward Hotel",
    description: "Getting ready shots, bridal party, details",
    photoIndices: [0, 4, 8],
    color: "fuchsia",
  },
  {
    id: "ceremony",
    time: "12:30 PM",
    title: "Ceremony",
    location: "St. Michael's Cathedral, Toronto",
    description: "Vows, rings, first kiss, family portraits",
    photoIndices: [1, 2, 5],
    color: "violet",
  },
  {
    id: "reception",
    time: "06:00 PM",
    title: "Reception",
    location: "Arcadian Court, Bay Street",
    description: "Cocktail hour, first dance, toasts, party",
    photoIndices: [3, 6, 7],
    color: "teal",
  },
];

const COLOR_MAP: Record<string, { dot: string; border: string; badge: string; btn: string; ring: string }> = {
  fuchsia: {
    dot: "bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.6)]",
    border: "border-fuchsia-500/20 hover:border-fuchsia-500/40",
    badge: "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400",
    btn: "bg-fuchsia-500/15 hover:bg-fuchsia-500/25 text-fuchsia-400 border-fuchsia-500/30",
    ring: "ring-fuchsia-500/40",
  },
  violet: {
    dot: "bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]",
    border: "border-violet-500/20 hover:border-violet-500/40",
    badge: "bg-violet-500/10 border-violet-500/30 text-violet-400",
    btn: "bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 border-violet-500/30",
    ring: "ring-violet-500/40",
  },
  teal: {
    dot: "bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]",
    border: "border-teal-500/20 hover:border-teal-500/40",
    badge: "bg-teal-500/10 border-teal-500/30 text-teal-400",
    btn: "bg-teal-500/15 hover:bg-teal-500/25 text-teal-400 border-teal-500/30",
    ring: "ring-teal-500/40",
  },
};

const TABS = ["Overview", "My Galleries", "Event Schedule", "Legal & Contracts"];

const MOCK_PROJECT = {
  title: "Tina & Rob's Wedding",
  photographer: "Sarah Chen",
  photographerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  date: "June 14, 2027",
  location: "Toronto, Canada",
  cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  status: "delivered",
  photoCount: 248,
};

export default function ClientProject() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("Overview");
  const [heroIdx, setHeroIdx] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set([1, 3]));
  const [highlightedPhotos, setHighlightedPhotos] = useState<Set<number>>(new Set());
  const galleryRef = useRef<HTMLDivElement>(null);

  const toggleLike = (idx: number) => {
    const s = new Set(likedPhotos);
    s.has(idx) ? s.delete(idx) : s.add(idx);
    setLikedPhotos(s);
  };

  const exploreShots = (photoIndices: number[]) => {
    setHighlightedPhotos(new Set(photoIndices));
    setActiveTab("My Galleries");
    setTimeout(() => galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    setTimeout(() => setHighlightedPhotos(new Set()), 3000);
  };

  return (
    <AppLayout>
      {/* Back button */}
      <button
        onClick={() => navigate("/discover")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors mb-6 group"
      >
        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to Discover
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">My Booking • {MOCK_PROJECT.date}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-green-500/15 border border-green-500/30 text-green-400">
            Gallery Delivered
          </span>
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">{MOCK_PROJECT.title}</h1>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/10">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 px-4 text-sm font-semibold tracking-wide transition-colors ${
                activeTab === tab ? "text-white" : "text-muted-foreground hover:text-white/80"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="client-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-violet-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">

        {/* ── OVERVIEW ── */}
        {activeTab === "Overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

            {/* Hero Info Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card">
              <div className="absolute inset-0">
                <img src={MOCK_PROJECT.cover} className="w-full h-full object-cover opacity-15" alt="" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
              </div>
              <div className="relative p-6 flex flex-col md:flex-row md:items-center gap-6">
                <img src={MOCK_PROJECT.cover} className="w-24 h-24 rounded-2xl object-cover shrink-0 ring-2 ring-white/10 shadow-xl" alt={MOCK_PROJECT.title} />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-bold text-white">{MOCK_PROJECT.title}</h2>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <img src={MOCK_PROJECT.photographerAvatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                      <Camera className="w-3.5 h-3.5 text-fuchsia-400" />
                      {MOCK_PROJECT.photographer}
                    </span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-violet-400" />{MOCK_PROJECT.date}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-teal-400" />{MOCK_PROJECT.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-white font-bold text-lg">{MOCK_PROJECT.photoCount}</span>
                  <span className="text-muted-foreground text-sm">photos</span>
                </div>
              </div>
            </div>

            {/* Status Cards */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Project Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Booking", status: "Confirmed", icon: CheckCircle2, color: "green" },
                  { label: "Payment", status: "Completed", icon: CreditCard, color: "teal" },
                  { label: "Gallery", status: "Delivered", icon: ImageIcon, color: "fuchsia" },
                ].map(({ label, status, icon: Icon, color }) => (
                  <div key={label} className={`flex items-center gap-4 p-4 rounded-xl border ${
                    color === "green" ? "border-green-500/20 bg-green-500/5" :
                    color === "teal" ? "border-teal-500/20 bg-teal-500/5" :
                    "border-fuchsia-500/20 bg-fuchsia-500/5"
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      color === "green" ? "bg-green-500/15" :
                      color === "teal" ? "bg-teal-500/15" : "bg-fuchsia-500/15"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        color === "green" ? "text-green-400" :
                        color === "teal" ? "text-teal-400" : "text-fuchsia-400"
                      }`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className={`font-bold text-sm ${
                        color === "green" ? "text-green-400" :
                        color === "teal" ? "text-teal-400" : "text-fuchsia-400"
                      }`}>{status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions + Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: "View Gallery", icon: ImageIcon, action: () => setActiveTab("My Galleries"), accent: "fuchsia" },
                    { label: "Message Photographer", icon: MessageSquare, action: () => {}, accent: "violet" },
                    { label: "View Contract", icon: FileText, action: () => setActiveTab("Legal & Contracts"), accent: "teal" },
                  ].map(({ label, icon: Icon, action, accent }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-card border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          accent === "fuchsia" ? "bg-fuchsia-500/15" :
                          accent === "violet" ? "bg-violet-500/15" : "bg-teal-500/15"
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            accent === "fuchsia" ? "text-fuchsia-400" :
                            accent === "violet" ? "text-violet-400" : "text-teal-400"
                          }`} />
                        </div>
                        <span className="text-sm font-medium text-white">{label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">Recent Updates</h3>
                <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
                  {[
                    { label: "Gallery delivered", time: "2 hours ago", icon: ImageIcon, color: "fuchsia" },
                    { label: "Contract signed", time: "Jan 15, 2027", icon: FileText, color: "green" },
                    { label: "Payment completed", time: "Jan 14, 2027", icon: CreditCard, color: "teal" },
                    { label: "Booking confirmed", time: "Jan 10, 2027", icon: CheckCircle2, color: "violet" },
                  ].map(({ label, time, icon: Icon, color }, i, arr) => (
                    <div key={label} className={`flex items-center gap-3 p-4 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        color === "fuchsia" ? "bg-fuchsia-500/15" :
                        color === "green" ? "bg-green-500/15" :
                        color === "teal" ? "bg-teal-500/15" : "bg-violet-500/15"
                      }`}>
                        <Icon className={`w-3.5 h-3.5 ${
                          color === "fuchsia" ? "text-fuchsia-400" :
                          color === "green" ? "text-green-400" :
                          color === "teal" ? "text-teal-400" : "text-violet-400"
                        }`} />
                      </div>
                      <p className="flex-1 text-sm text-white font-medium">{label}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── MY GALLERIES ── */}
        {activeTab === "My Galleries" && (
          <motion.div key="galleries" ref={galleryRef} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-bold text-green-400">Gallery Delivered</span>
                </div>
                <span className="text-sm text-muted-foreground">{MOCK_PHOTOS.length} photos</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-card border border-white/10 text-white text-sm font-semibold rounded-xl hover:border-white/20 hover:bg-white/5 transition-all">
                  <Share2 className="w-4 h-4" /> Share All
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white text-sm font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all">
                  <Download className="w-4 h-4" /> Download All
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ height: "55vh" }}>
              <img src={MOCK_PHOTOS[heroIdx]} alt="hero" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-3">
                  <button className="px-5 py-2.5 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:bg-gray-100 text-sm">
                    <Download className="w-4 h-4" /> Download
                  </button>
                  <button className="px-5 py-2.5 bg-white/20 backdrop-blur text-white font-bold rounded-xl border border-white/20 flex items-center gap-2 hover:bg-white/30 text-sm">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
                <button
                  onClick={() => toggleLike(heroIdx)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${likedPhotos.has(heroIdx) ? "bg-rose-500/30 border-rose-500/60 text-rose-400" : "bg-black/40 backdrop-blur border-white/20 text-white"}`}
                >
                  <Heart className={`w-5 h-5 ${likedPhotos.has(heroIdx) ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {MOCK_PHOTOS.map((url, i) => {
                const isHero = heroIdx === i;
                const isHighlighted = highlightedPhotos.has(i);
                return (
                  <motion.div
                    key={i}
                    onClick={() => setHeroIdx(i)}
                    animate={isHighlighted ? {
                      boxShadow: ["0 0 0px rgba(217,70,239,0)", "0 0 25px rgba(217,70,239,0.8)", "0 0 0px rgba(217,70,239,0)"],
                    } : {}}
                    transition={{ duration: 0.8, repeat: isHighlighted ? 3 : 0 }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 aspect-square group ${
                      isHero ? "ring-2 ring-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.4)]" :
                      isHighlighted ? "ring-2 ring-fuchsia-400" : "ring-1 ring-white/10 hover:ring-white/30"
                    }`}
                  >
                    <img src={url} alt={`photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button
                      onClick={e => { e.stopPropagation(); toggleLike(i); }}
                      className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${likedPhotos.has(i) ? "bg-rose-500/80 text-white opacity-100" : "bg-black/50 text-white"}`}
                    >
                      <Heart className={`w-3 h-3 ${likedPhotos.has(i) ? "fill-current" : ""}`} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── EVENT SCHEDULE ── */}
        {activeTab === "Event Schedule" && (
          <motion.div key="schedule" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <p className="text-muted-foreground text-sm">Relive every moment. Click "Explore these shots" to jump to related gallery images.</p>

            <div className="relative">
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-fuchsia-500/60 via-violet-500/40 to-teal-500/60" />

              <div className="space-y-6">
                {TIMELINE_EVENTS.map((event, idx) => {
                  const c = COLOR_MAP[event.color];
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="flex flex-col items-center shrink-0 pt-5">
                        <div className={`w-4 h-4 rounded-full border-2 border-background ${c.dot} z-10`} />
                      </div>

                      <div className={`flex-1 bg-card border rounded-2xl p-5 transition-all duration-300 ${c.border}`}>
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.badge}`}>
                                <Clock className="w-3 h-3 inline-block mr-1 -mt-0.5" />{event.time}
                              </span>
                              <h3 className="text-lg font-display font-bold text-white">{event.title}</h3>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />{event.location}
                            </div>
                            <p className="text-sm text-white/60 mb-4">{event.description}</p>
                            <button
                              onClick={() => exploreShots(event.photoIndices)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${c.btn}`}
                            >
                              <ImageIcon className="w-4 h-4" />
                              Explore these shots
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex gap-2 shrink-0">
                            {event.photoIndices.map((pi, i) => (
                              <div
                                key={i}
                                onClick={() => { setHeroIdx(pi); setActiveTab("My Galleries"); }}
                                className={`w-20 h-20 rounded-xl overflow-hidden ring-1 ${c.ring} cursor-pointer hover:opacity-80 transition-opacity`}
                              >
                                <img src={MOCK_PHOTOS[pi]} alt="event" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── LEGAL & CONTRACTS ── */}
        {activeTab === "Legal & Contracts" && (
          <motion.div key="legal" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 max-w-2xl">

            {/* Contract */}
            <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Wedding Photography Agreement</h3>
                    <p className="text-xs text-muted-foreground">Signed • Jan 15, 2027</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-bold text-green-400">Signed</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Signatures</p>
                {[
                  { name: "Tina & Rob (Client)", role: "Client", signed: true, date: "Jan 15, 2027" },
                  { name: "Sarah Chen", role: "Photographer", signed: true, date: "Jan 15, 2027" },
                ].map(({ name, role, signed, date }) => (
                  <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${signed ? "bg-green-500/15" : "bg-amber-500/15"}`}>
                        <Pen className={`w-3.5 h-3.5 ${signed ? "text-green-400" : "text-amber-400"}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{name}</p>
                        <p className="text-xs text-muted-foreground">{role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold ${signed ? "text-green-400" : "text-amber-400"}`}>{signed ? "Signed" : "Pending"}</p>
                      {signed && <p className="text-[10px] text-muted-foreground">{date}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 pb-5">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold rounded-xl transition-all">
                  <Eye className="w-4 h-4" /> View Full Contract <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Payment Summary</h3>
                    <p className="text-xs text-muted-foreground">Wedding Photography Package</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span className="text-xs font-bold text-teal-400">Paid</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {[
                  { label: "Full-Day Coverage (8 hrs)", amount: "$1,200" },
                  { label: "Second Shooter", amount: "$300" },
                  { label: "Online Gallery Delivery", amount: "$100" },
                  { label: "Tax (13% HST)", amount: "$208" },
                ].map(({ label, amount }) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-white font-medium">{amount}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-white">Total Paid</span>
                  <span className="font-bold text-xl text-teal-400">$1,808</span>
                </div>
              </div>

              <div className="px-5 pb-5">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold rounded-xl transition-all">
                  <Download className="w-4 h-4" /> Download Invoice
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
