'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Aperture, ArrowRight, Mail, Camera, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [role, setRole] = useState<'creator' | 'client'>('creator')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?role=${role}`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      // If user doesn't exist, try to sign up
      if (error.message.includes('Invalid login')) {
        setError('Invalid email or password. Try signing up first.')
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    router.push(role === 'client' ? '/client/dashboard' : '/dashboard')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: '#1a0f0a' }}>
      {/* Ambient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(180,100,40,0.5) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(160,60,120,0.4) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-2xl"
        style={{ background: 'rgba(30,18,12,0.8)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mb-4" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
            <Aperture className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">BOKEH</h1>
          <p className="text-white/50 mt-2">Welcome back to your studio.</p>
        </div>

        {/* Role Selector */}
        <div className="flex gap-2 p-1 rounded-xl border border-white/10 mb-6" style={{ background: 'rgba(0,0,0,0.3)' }}>
          <button
            type="button"
            onClick={() => setRole('creator')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === 'creator'
                ? 'text-white shadow-lg'
                : 'text-white/40 hover:text-white'
            }`}
            style={role === 'creator' ? { background: 'linear-gradient(135deg, #d4851a, #c74683)' } : {}}
          >
            <Camera className="w-4 h-4" />
            Creator
          </button>
          <button
            type="button"
            onClick={() => setRole('client')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              role === 'client'
                ? 'text-white shadow-lg'
                : 'text-white/40 hover:text-white'
            }`}
            style={role === 'client' ? { background: 'linear-gradient(135deg, #d4851a, #c74683)' } : {}}
          >
            <User className="w-4 h-4" />
            Client
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm text-red-300 border border-red-500/30" style={{ background: 'rgba(239,68,68,0.1)' }}>
            {error}
          </div>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-black font-semibold hover:bg-gray-100 transition-all hover:shadow-lg mb-6 disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {loading ? 'Connecting...' : 'Continue with Google'}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-xs text-white/40 uppercase tracking-widest">Or continue with</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {/* Email Login */}
        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/80">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all"
                style={{ background: 'rgba(0,0,0,0.3)' }}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-white/80">Password</label>
              <a href="#" className="text-xs hover:opacity-80 transition-opacity" style={{ color: '#d4851a' }}>Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 transition-all"
              style={{ background: 'rgba(0,0,0,0.3)' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}
          >
            {loading ? 'Signing in...' : `Sign In as ${role === 'creator' ? 'Creator' : 'Client'}`}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center text-sm text-white/40 mt-8">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-white hover:opacity-80 font-medium transition-opacity">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
