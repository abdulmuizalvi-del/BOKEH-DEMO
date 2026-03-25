'use client'

import { Clock, MapPin, ImageIcon, ChevronRight } from 'lucide-react'
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
]

const EVENTS = [
  { id: 'prep', time: '09:00 AM', title: 'Preparation', location: 'Bridal Suite — King Edward Hotel', description: 'Getting ready shots, bridal party, details', photos: [0, 4, 8], color: 'fuchsia' },
  { id: 'ceremony', time: '12:30 PM', title: 'Ceremony', location: "St. Michael's Cathedral, Toronto", description: 'Vows, rings, first kiss, family portraits', photos: [1, 2, 5], color: 'violet' },
  { id: 'reception', time: '06:00 PM', title: 'Reception', location: 'Arcadian Court, Bay Street', description: 'Cocktail hour, first dance, toasts, party', photos: [3, 6, 7], color: 'teal' },
]

const COLORS: Record<string, { dot: string; border: string; badge: string; btn: string; ring: string }> = {
  fuchsia: { dot: 'bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.6)]', border: 'border-fuchsia-500/20 hover:border-fuchsia-500/40', badge: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400', btn: 'bg-fuchsia-500/15 hover:bg-fuchsia-500/25 text-fuchsia-400 border-fuchsia-500/30', ring: 'ring-fuchsia-500/40' },
  violet: { dot: 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]', border: 'border-violet-500/20 hover:border-violet-500/40', badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400', btn: 'bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 border-violet-500/30', ring: 'ring-violet-500/40' },
  teal: { dot: 'bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.6)]', border: 'border-teal-500/20 hover:border-teal-500/40', badge: 'bg-teal-500/10 border-teal-500/30 text-teal-400', btn: 'bg-teal-500/15 hover:bg-teal-500/25 text-teal-400 border-teal-500/30', ring: 'ring-teal-500/40' },
}

export default function ClientSchedule() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-white mb-1">Event Schedule</h1>
        <p className="text-muted-foreground text-sm">Relive every moment of your special day.</p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-fuchsia-500/60 via-violet-500/40 to-teal-500/60" />
        <div className="space-y-6">
          {EVENTS.map((event, idx) => {
            const c = COLORS[event.color]
            return (
              <motion.div key={event.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-6">
                <div className="flex flex-col items-center shrink-0 pt-5">
                  <div className={`w-4 h-4 rounded-full border-2 border-background ${c.dot} z-10`} />
                </div>
                <div className={`flex-1 bg-card border rounded-2xl p-5 transition-all duration-300 ${c.border}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.badge}`}><Clock className="w-3 h-3 inline-block mr-1 -mt-0.5" />{event.time}</span>
                        <h3 className="text-lg font-display font-bold text-white">{event.title}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2"><MapPin className="w-3.5 h-3.5 shrink-0" />{event.location}</div>
                      <p className="text-sm text-white/60 mb-4">{event.description}</p>
                      <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${c.btn}`}>
                        <ImageIcon className="w-4 h-4" />Explore these shots<ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {event.photos.map((pi, i) => (
                        <div key={i} className={`w-20 h-20 rounded-xl overflow-hidden ring-1 ${c.ring} cursor-pointer hover:opacity-80 transition-opacity`}>
                          <img src={PHOTOS[pi]} alt="event" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}
