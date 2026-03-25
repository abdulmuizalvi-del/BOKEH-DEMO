'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Aperture, LayoutDashboard, FolderOpen, Calendar,
  MessageSquare, Bell, Users, Settings, LifeBuoy, Sparkles, LogOut
} from 'lucide-react'
import { motion } from 'framer-motion'

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

  return (
    <div className="w-[260px] h-screen bg-sidebar border-r border-sidebar-border flex flex-col justify-between shrink-0 fixed left-0 top-0 z-50">
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
              <Link key={item.name} href={item.href} className="block relative">
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
}
