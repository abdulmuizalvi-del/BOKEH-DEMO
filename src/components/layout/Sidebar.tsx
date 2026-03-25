'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Aperture, LayoutDashboard, FolderOpen, Calendar,
  MessageSquare, Bell, Users, Settings, LifeBuoy, Sparkles, LogOut, Menu, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [open, setOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
            <Aperture className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">BOKEH</span>
        </div>

        <nav className="px-4 py-2 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname?.startsWith(item.href) ?? false
            return (
              <Link key={item.name} href={item.href} className="block relative" onClick={() => setOpen(false)}>
                {isActive && (
                  <motion.div
                    layoutId="creator-active-nav"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-primary rounded-r-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-white/5 text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-fuchsia-400' : ''}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4">
        <div className="p-4 rounded-xl border border-fuchsia-500/20 bg-gradient-to-b from-fuchsia-500/10 to-transparent relative overflow-hidden group mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/10 to-fuchsia-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            <h4 className="font-bold text-white font-display">Upgrade to Pro</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Unlock AI Features & unlimited storage.</p>
          <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors">
            View Plans
          </button>
        </div>
        <Link href="/login" className="flex items-center gap-3 px-3 py-3 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Sign out</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-[260px] h-screen glass-sidebar flex-col shrink-0 fixed left-0 top-0 z-50">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 glass-nav">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Aperture className="text-white w-4 h-4" />
          </div>
          <span className="font-display font-bold text-base tracking-wider text-white">BOKEH</span>
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
              className="md:hidden fixed left-0 top-0 bottom-0 w-[260px] z-50 glass-sidebar"
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-white rounded-lg hover:bg-white/10 transition-colors">
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
