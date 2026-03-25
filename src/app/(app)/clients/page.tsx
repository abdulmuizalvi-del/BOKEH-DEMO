'use client'

import { Search, Mail, Phone, MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

const MOCK_CLIENTS = [
  { id: 1, name: 'Jessica Yunnard', email: 'jessica.y@example.com', phone: '+1 (555) 123-4567', projects: 3, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80' },
  { id: 2, name: 'Sarah Chen', email: 'sarah.c@example.com', phone: '+1 (555) 987-6543', projects: 1, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' },
  { id: 3, name: 'Jake Thomson', email: 'jake.t@example.com', phone: '+1 (555) 456-7890', projects: 5, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80' },
  { id: 4, name: 'Michael Roberts', email: 'm.roberts@example.com', phone: '+1 (555) 222-3333', projects: 2, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
  { id: 5, name: 'Elena Studio', email: 'hello@elenastudio.co', phone: '+1 (555) 888-9999', projects: 12, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80' },
]

export default function Clients() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your contacts and their details.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search clients..." className="w-full bg-card border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-fuchsia-500 transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_CLIENTS.map((client, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={client.id}
            className="bg-card border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <img src={client.avatar} alt={client.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10" />
              <button className="text-white/40 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
            <h3 className="font-bold text-lg text-white mb-1">{client.name}</h3>
            <div className="space-y-2 mt-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" /> <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" /> <span>{client.phone}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Total Projects</span>
              <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-md">{client.projects}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}
