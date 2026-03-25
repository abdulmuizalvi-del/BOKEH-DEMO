'use client'

import { Sidebar } from './Sidebar'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] min-h-screen relative">
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="pt-14 md:pt-0 p-4 md:p-8 max-w-7xl mx-auto w-full"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
// deploy trigger
