'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Aperture, LayoutDashboard, FolderOpen, Calendar,
  MessageSquare, Bell, Users, Settings, LifeBuoy, Sparkles, LogOut, Menu, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Booking', href: '/booking', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Support', href: '/support', icon: LifeBuoy },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
            <Aperture className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-wider text-white">BOKEH</span>
        </div>

        <nav className="px-4 py-2 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href) ?? false
            return (
              <Link key={item.name} href={item.href} className="block relative" onClick={() => setOpen(false)}>
                {isActive && (
                  <motion.div
                    layoutId="creator-active-nav"
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    style={{ background: 'linear-gradient(to bottom, #d4851a, #c74683)', boxShadow: '0 0 10px rgba(212,133,26,0.5)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/5 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
                  <item.icon className="w-5 h-5" style={isActive ? { color: '#d4851a' } : {}} />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4">
        <div className="p-4 rounded-xl border border-white/10 relative overflow-hidden group mb-4" style={{ background: 'linear-gradient(to bottom, rgba(212,133,26,0.1), transparent)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" style={{ color: '#d4851a' }} />
            <h4 className="font-bold text-white">Upgrade to Pro</h4>
          </div>
          <p className="text-xs text-white/40 mb-3">Unlock AI Features & unlimited storage.</p>
          <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors">
            View Plans
          </button>
        </div>
        <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-3 text-white/40 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign out</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-[260px] h-screen flex-col shrink-0 fixed left-0 top-0 z-50 border-r border-white/10" style={{ background: 'rgba(20,12,8,0.95)', backdropFilter: 'blur(20px)' }}>
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 border-b border-white/10" style={{ background: 'rgba(20,12,8,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
            <Aperture className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-wider text-white">BOKEH</span>
        </div>
        <button onClick={() => setOpen(true)} className="p-2 text-white rounded-lg hover:bg-white/10 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-[260px] z-50 border-r border-white/10"
              style={{ background: 'rgba(20,12,8,0.98)', backdropFilter: 'blur(20px)' }}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
