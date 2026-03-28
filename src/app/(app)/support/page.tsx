'use client'

import { LifeBuoy, MessageSquare, BookOpen, ChevronRight } from 'lucide-react'

export default function Support() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Support</h1>
        <p className="text-white/40 mt-1">Get help with your BOKEH studio account.</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
        {[
          { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our support team in real time.', action: 'Start Chat', color: '#d4851a' },
          { icon: BookOpen, title: 'Documentation', desc: 'Browse our guides and documentation.', action: 'View Docs', color: '#14b8a6' },
          { icon: LifeBuoy, title: 'Help Center', desc: 'Find answers to frequently asked questions.', action: 'Browse FAQs', color: '#c74683' },
        ].map(({ icon: Icon, title, desc, action, color }) => (
          <div key={title} className="border rounded-2xl p-5 md:p-6 hover:border-white/20 transition-colors cursor-pointer" style={{ background: 'rgba(30,18,12,0.6)', borderColor: `${color}33` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}15` }}>
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-white/40 mb-4">{desc}</p>
            <button className="flex items-center gap-1 text-sm font-semibold text-white transition-colors" style={{ color }}>
              {action} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border border-white/10 rounded-2xl p-5 md:p-6" style={{ background: 'rgba(30,18,12,0.6)' }}>
        <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How do I create a new project?', a: 'Click "New Project" on the Dashboard or Projects page, fill in the details, and assign a client.' },
            { q: 'Can I share galleries with clients?', a: 'Yes! From any project, you can generate a shareable gallery link for your clients.' },
            { q: 'How does digital contract signing work?', a: 'BOKEH integrates digital signatures so both you and your client can sign contracts online.' },
            { q: 'What payment methods are supported?', a: 'We support Stripe for credit/debit cards, and bank transfers in supported regions.' },
          ].map(({ q, a }) => (
            <div key={q} className="border border-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-1">{q}</h4>
              <p className="text-sm text-white/40">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
