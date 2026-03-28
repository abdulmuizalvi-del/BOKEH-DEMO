'use client'

import { User, Bell, Shield, CreditCard, Palette } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile')
  const { user } = useAuth()

  const TABS = [
    { name: 'Profile', icon: User },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'Billing', icon: CreditCard },
    { name: 'Appearance', icon: Palette },
  ]

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="w-full md:w-64 flex md:flex-col gap-1 shrink-0 overflow-x-auto pb-2 md:pb-0">
          {TABS.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap ${activeTab === tab.name ? 'text-white border' : 'text-white/40 hover:bg-white/5 hover:text-white border border-transparent'}`}
              style={activeTab === tab.name ? { background: 'rgba(212,133,26,0.1)', borderColor: 'rgba(212,133,26,0.2)', color: '#d4851a' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex-1 border border-white/10 rounded-2xl p-5 md:p-8 shadow-xl" style={{ background: 'rgba(30,18,12,0.6)' }}>
          {activeTab === 'Profile' && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Public Profile</h2>
                <p className="text-sm text-white/40 mb-6">This information will be displayed publicly.</p>
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full p-1" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" alt="Avatar" className="w-full h-full rounded-full object-cover border-2" style={{ borderColor: '#1a0f0a' }} />
                  </div>
                  <div className="text-center sm:text-left">
                    <button className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors mb-2">Change Avatar</button>
                    <p className="text-xs text-white/40">JPG, GIF or PNG. 1MB max.</p>
                    {user?.email && <p className="text-xs text-white/30 mt-1">Signed in as {user.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">First Name</label>
                    <input type="text" defaultValue={user?.user_metadata?.first_name || 'John'} className="w-full border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-1" style={{ background: 'rgba(0,0,0,0.3)' }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Last Name</label>
                    <input type="text" defaultValue={user?.user_metadata?.last_name || 'Doe'} className="w-full border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-1" style={{ background: 'rgba(0,0,0,0.3)' }} />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-white/80">Bio</label>
                  <textarea rows={4} defaultValue="Professional wedding and portrait photographer." className="w-full border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:ring-1 resize-none" style={{ background: 'rgba(0,0,0,0.3)' }} />
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button className="px-6 py-2.5 text-white font-semibold rounded-xl transition-all" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>Save Changes</button>
              </div>
            </div>
          )}
          {activeTab !== 'Profile' && (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-bold text-white mb-2">{activeTab} Settings</h2>
              <p className="text-white/40">This section is under construction in the MVP.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
