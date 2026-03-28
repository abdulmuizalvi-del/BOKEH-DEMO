'use client'

import { useNotifications } from '@/hooks/use-app-data'
import { Check, MessageSquare, Folder, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Notifications() {
  const { data: notifications, isLoading } = useNotifications()

  const grouped = notifications?.reduce((acc, notif) => {
    if (!acc[notif.group]) acc[notif.group] = []
    acc[notif.group].push(notif)
    return acc
  }, {} as Record<string, typeof notifications>) || {}

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-4 h-4 text-blue-400" />
      case 'project': return <Folder className="w-4 h-4" style={{ color: '#d4851a' }} />
      case 'contract': return <FileText className="w-4 h-4 text-teal-400" />
      default: return <Check className="w-4 h-4 text-white" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Notifications</h1>
          <p className="text-white/40 mt-1">Stay updated on your projects and messages.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all">
          <Check className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="flex gap-3 md:gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
        {['All', 'Unread', 'Messages', 'Projects', 'Contracts'].map((f, i) => (
          <button key={f} className={`text-sm font-semibold transition-colors whitespace-nowrap ${i === 0 ? '' : 'text-white/40 hover:text-white'}`} style={i === 0 ? { color: '#d4851a' } : {}}>{f}</button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 animate-pulse rounded-xl" />)}
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-xs font-bold text-white/50 tracking-wider mb-4">{group}</h3>
              <div className="space-y-3">
                {items.map((notif, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={notif.id}
                    className={`flex gap-4 p-4 rounded-xl border transition-colors ${notif.unread ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                    style={notif.unread ? { boxShadow: 'inset 4px 0 0 #d4851a' } : {}}
                  >
                    <div className="mt-1 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10 shrink-0">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className={`font-medium ${notif.unread ? 'text-white' : 'text-white/80'}`}>{notif.title}</h4>
                        <span className="text-xs text-white/30 shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-sm text-white/40 mt-1">{notif.description}</p>
                    </div>
                    {notif.unread && <div className="w-2 h-2 rounded-full self-center" style={{ background: '#d4851a', boxShadow: '0 0 8px rgba(212,133,26,0.8)' }} />}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
