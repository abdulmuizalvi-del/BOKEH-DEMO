import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import '@/index.css'

export const metadata: Metadata = {
  title: 'BOKEH Studio',
  description: 'Professional photography studio management'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased font-sans">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
