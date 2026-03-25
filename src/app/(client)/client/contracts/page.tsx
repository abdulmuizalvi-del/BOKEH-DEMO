'use client'

import { CheckCircle2, CreditCard, FileText, Eye, ExternalLink, Download, Pen } from 'lucide-react'

export default function ClientContracts() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-white mb-1">Legal & Contracts</h1>
        <p className="text-muted-foreground text-sm">Your signed agreements and payment records.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center"><FileText className="w-5 h-5 text-violet-400" /></div>
              <div>
                <h3 className="font-bold text-white">Wedding Photography Agreement</h3>
                <p className="text-xs text-muted-foreground">Signed • Jan 15, 2027</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /><span className="text-xs font-bold text-green-400">Signed</span>
            </div>
          </div>
          <div className="p-5 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Signatures</p>
            {[
              { name: 'Tina & Rob (Client)', role: 'Client', date: 'Jan 15, 2027' },
              { name: 'Sarah Chen', role: 'Photographer', date: 'Jan 15, 2027' },
            ].map(({ name, role, date }) => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500/15">
                    <Pen className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-green-400">Signed</p>
                  <p className="text-[10px] text-muted-foreground">{date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold rounded-xl transition-all">
              <Eye className="w-4 h-4" /> View Full Contract <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center"><CreditCard className="w-5 h-5 text-teal-400" /></div>
              <div>
                <h3 className="font-bold text-white">Payment Summary</h3>
                <p className="text-xs text-muted-foreground">Wedding Photography Package</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /><span className="text-xs font-bold text-teal-400">Paid</span>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: 'Full-Day Coverage (8 hrs)', amount: '$1,200' },
              { label: 'Second Shooter', amount: '$300' },
              { label: 'Online Gallery Delivery', amount: '$100' },
              { label: 'Tax (13% HST)', amount: '$208' },
            ].map(({ label, amount }) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-white font-medium">{amount}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-white">Total Paid</span>
              <span className="font-bold text-xl text-teal-400">$1,808</span>
            </div>
          </div>
          <div className="px-5 pb-5">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold rounded-xl transition-all">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
