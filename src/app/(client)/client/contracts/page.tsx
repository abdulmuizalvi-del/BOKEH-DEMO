'use client'

import { CheckCircle2, CreditCard, FileText, Eye, ExternalLink, Download, Pen } from 'lucide-react'

export default function ClientContracts() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Legal & Contracts</h1>
        <p className="text-white/40 text-sm">Your signed agreements and payment records.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="border border-white/10 rounded-2xl overflow-hidden" style={{ background: 'rgba(30,18,12,0.6)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(199,70,131,0.15)' }}><FileText className="w-5 h-5" style={{ color: '#c74683' }} /></div>
              <div>
                <h3 className="font-bold text-white">Wedding Photography Agreement</h3>
                <p className="text-xs text-white/40">Signed - Jan 15, 2027</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /><span className="text-xs font-bold text-green-400">Signed</span>
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-3">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Signatures</p>
            {[
              { name: 'Tina & Rob (Client)', role: 'Client', date: 'Jan 15, 2027' },
              { name: 'Sarah Chen', role: 'Photographer', date: 'Jan 15, 2027' },
            ].map(({ name, role, date }) => (
              <div key={name} className="flex items-center justify-between p-3 rounded-xl border border-white/5" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500/15">
                    <Pen className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-white/40">{role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-green-400">Signed</p>
                  <p className="text-[10px] text-white/30">{date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 md:px-5 pb-4 md:pb-5">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold rounded-xl transition-all">
              <Eye className="w-4 h-4" /> View Full Contract <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="border border-white/10 rounded-2xl overflow-hidden" style={{ background: 'rgba(30,18,12,0.6)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-5 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 flex items-center justify-center"><CreditCard className="w-5 h-5 text-teal-400" /></div>
              <div>
                <h3 className="font-bold text-white">Payment Summary</h3>
                <p className="text-xs text-white/40">Wedding Photography Package</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /><span className="text-xs font-bold text-teal-400">Paid</span>
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-3">
            {[
              { label: 'Full-Day Coverage (8 hrs)', amount: '$1,200' },
              { label: 'Second Shooter', amount: '$300' },
              { label: 'Online Gallery Delivery', amount: '$100' },
              { label: 'Tax (13% HST)', amount: '$208' },
            ].map(({ label, amount }) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span className="text-white/40">{label}</span>
                <span className="text-white font-medium">{amount}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-white">Total Paid</span>
              <span className="font-bold text-xl text-teal-400">$1,808</span>
            </div>
          </div>
          <div className="px-4 md:px-5 pb-4 md:pb-5">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold rounded-xl transition-all">
              <Download className="w-4 h-4" /> Download Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
