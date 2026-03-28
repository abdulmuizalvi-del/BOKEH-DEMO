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
  { id: 'prep', time: '09:00 AM', title: 'Preparation', location: 'Bridal Suite — King Edward Hotel', description: 'Getting ready shots, bridal party, details', photos: [0, 4, 8], color: '#d4851a' },
  { id: 'ceremony', time: '12:30 PM', title: 'Ceremony', location: "St. Michael's Cathedral, Toronto", description: 'Vows, rings, first kiss, family portraits', photos: [1, 2, 5], color: '#c74683' },
  { id: 'reception', time: '06:00 PM', title: 'Reception', location: 'Arcadian Court, Bay Street', description: 'Cocktail hour, first dance, toasts, party', photos: [3, 6, 7], color: '#14b8a6' },
]

export default function ClientSchedule() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Event Schedule</h1>
        <p className="text-white/40 text-sm">Relive every moment of your special day.</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-6 top-8 bottom-8 w-0.5" style={{ background: 'linear-gradient(to bottom, #d4851a, #c74683, #14b8a6)' }} />
        <div className="space-y-4 md:space-y-6">
          {EVENTS.map((event, idx) => (
            <motion.div key={event.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="flex gap-4 md:gap-6">
              <div className="flex flex-col items-center shrink-0 pt-5">
                <div className="w-4 h-4 rounded-full border-2 z-10" style={{ background: event.color, borderColor: '#1a0f0a', boxShadow: `0 0 12px ${event.color}99` }} />
              </div>
              <div className="flex-1 border rounded-2xl p-4 md:p-5 transition-all duration-300 hover:border-white/20" style={{ background: 'rgba(30,18,12,0.6)', borderColor: `${event.color}33` }}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full border" style={{ background: `${event.color}15`, borderColor: `${event.color}40`, color: event.color }}>
                        <Clock className="w-3 h-3 inline-block mr-1 -mt-0.5" />{event.time}
                      </span>
                      <h3 className="text-base md:text-lg font-bold text-white">{event.title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-white/40 mb-2"><MapPin className="w-3.5 h-3.5 shrink-0" />{event.location}</div>
                    <p className="text-sm text-white/50 mb-4">{event.description}</p>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all" style={{ background: `${event.color}15`, borderColor: `${event.color}40`, color: event.color }}>
                      <ImageIcon className="w-4 h-4" />Explore these shots<ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {event.photos.map((pi, i) => (
                      <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden ring-1 ring-white/20 cursor-pointer hover:opacity-80 transition-opacity">
                        <img src={PHOTOS[pi]} alt="event" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
