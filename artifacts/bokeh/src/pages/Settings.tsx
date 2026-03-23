import { AppLayout } from "@/components/layout/AppLayout";
import { User, Bell, Shield, CreditCard, Palette } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  
  const TABS = [
    { name: "Profile", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Shield },
    { name: "Billing", icon: CreditCard },
    { name: "Appearance", icon: Palette },
  ];

  return (
    <AppLayout>
      <h1 className="text-3xl font-display font-bold text-white mb-8">Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-1 shrink-0">
          {TABS.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === tab.name 
                  ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-card border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
          {activeTab === "Profile" && (
            <div className="space-y-8 max-w-2xl">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Public Profile</h2>
                <p className="text-sm text-muted-foreground mb-6">This information will be displayed publicly so be careful what you share.</p>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-primary p-1">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80" 
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover border-2 border-card"
                    />
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors mb-2">Change Avatar</button>
                    <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">First Name</label>
                    <input type="text" defaultValue="John" className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-fuchsia-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Last Name</label>
                    <input type="text" defaultValue="Doe" className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-fuchsia-500" />
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <label className="text-sm font-medium text-white/80">Bio</label>
                  <textarea rows={4} defaultValue="Professional wedding and portrait photographer based in NY." className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-fuchsia-500 resize-none" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button className="px-6 py-2.5 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== "Profile" && (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-bold text-white mb-2">{activeTab} Settings</h2>
              <p className="text-muted-foreground">This section is under construction in the MVP.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
