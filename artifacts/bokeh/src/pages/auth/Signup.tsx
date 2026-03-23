import { Link } from "wouter";
import { Aperture, ArrowRight, User, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/auth-bg.png`} 
          alt="Cinematic background" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-card/60 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <Aperture className="text-fuchsia-500 w-10 h-10 mb-2" />
          <h1 className="text-2xl font-display font-bold text-white">Create your account</h1>
          <p className="text-muted-foreground mt-2">Join the next generation of creators.</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Jane"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white text-sm focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/70">Last Name</label>
              <input 
                type="text" 
                placeholder="Doe"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="email" 
                placeholder="jane@example.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white text-sm focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-white/70">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="password" 
                placeholder="Create a password"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-white text-sm focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all"
              />
            </div>
          </div>

          <Link href="/onboarding" className="block mt-6">
            <button type="button" className="w-full py-3 rounded-xl bg-gradient-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all">
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-fuchsia-400 font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
