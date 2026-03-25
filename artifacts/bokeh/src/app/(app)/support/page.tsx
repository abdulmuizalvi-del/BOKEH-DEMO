'use client'

import { LifeBuoy, MessageSquare, BookOpen, ChevronRight } from 'lucide-react'

export default function Support() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Support</h1>
        <p className="text-muted-foreground mt-1">Get help with your BOKEH studio account.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our support team in real time.', action: 'Start Chat', color: 'fuchsia' },
          { icon: BookOpen, title: 'Documentation', desc: 'Browse our guides and documentation.', action: 'View Docs', color: 'teal' },
          { icon: LifeBuoy, title: 'Help Center', desc: 'Find answers to frequently asked questions.', action: 'Browse FAQs', color: 'violet' },
        ].map(({ icon: Icon, title, desc, action, color }) => (
          <div key={title} className={`bg-card border rounded-2xl p-6 hover:border-white/20 transition-colors cursor-pointer ${color === 'fuchsia' ? 'border-fuchsia-500/20' : color === 'teal' ? 'border-teal-500/20' : 'border-violet-500/20'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color === 'fuchsia' ? 'bg-fuchsia-500/10' : color === 'teal' ? 'bg-teal-500/10' : 'bg-violet-500/10'}`}>
              <Icon className={`w-6 h-6 ${color === 'fuchsia' ? 'text-fuchsia-400' : color === 'teal' ? 'text-teal-400' : 'text-violet-400'}`} />
            </div>
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{desc}</p>
            <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-fuchsia-400 transition-colors">
              {action} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How do I create a new project?', a: 'Click "New Project" on the Dashboard or Projects page, fill in the details, and assign a client.' },
            { q: 'Can I share galleries with clients?', a: 'Yes! From any project, you can generate a shareable gallery link for your clients.' },
            { q: 'How does digital contract signing work?', a: 'BOKEH integrates digital signatures so both you and your client can sign contracts online.' },
            { q: 'What payment methods are supported?', a: 'We support Stripe for credit/debit cards, and bank transfers in supported regions.' },
          ].map(({ q, a }) => (
            <div key={q} className="border border-white/5 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-1">{q}</h4>
              <p className="text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
