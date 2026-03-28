'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useConversations, useRealtimeThread, useSendRealtimeMessage } from '@/hooks/use-realtime-messages'
import { Search, Send, Plus, Info, MessageSquare, ArrowLeft, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

export default function ClientMessages() {
  const { user } = useAuth()
  const { conversations, loading: listLoading, tableReady } = useConversations()
  const [activeUserId, setActiveUserId] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewChat, setShowNewChat] = useState(false)
  const [newChatEmail, setNewChatEmail] = useState('')
  const [newChatError, setNewChatError] = useState('')
  const { messages: threadMessages, loading: threadLoading, partnerInfo } = useRealtimeThread(activeUserId)
  const { send } = useSendRealtimeMessage()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [threadMessages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || !activeUserId) return
    const msg = text
    setText('')
    await send(activeUserId, msg)
  }

  const handleStartNewChat = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewChatError('')
    if (!newChatEmail.trim()) return

    const supabase = createClient()
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', newChatEmail.trim())
      .single()

    if (!profile) {
      setNewChatError('User not found.')
      return
    }

    setActiveUserId(profile.id)
    setShowNewChat(false)
    setNewChatEmail('')
  }

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!tableReady) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Messaging Setup Required</h2>
          <p className="text-white/50 text-sm">Please ask your admin to set up the messages table in Supabase.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] border border-white/10 rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'rgba(30,18,12,0.6)' }}>
      {/* Left Panel */}
      <div className={`w-full md:w-[320px] border-r border-white/10 flex flex-col ${activeUserId ? 'hidden md:flex' : 'flex'}`} style={{ background: 'rgba(20,12,8,0.5)' }}>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Messages</h2>
            <button
              onClick={() => setShowNewChat(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:ring-1 transition-all"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            />
          </div>
        </div>

        {showNewChat && (
          <div className="p-4 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
            <form onSubmit={handleStartNewChat} className="space-y-2">
              <p className="text-sm text-white/60">Message a photographer</p>
              <input
                type="email"
                value={newChatEmail}
                onChange={e => setNewChatEmail(e.target.value)}
                placeholder="Enter their email..."
                className="w-full border border-white/10 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 transition-all"
                style={{ background: 'rgba(0,0,0,0.3)' }}
                autoFocus
              />
              {newChatError && <p className="text-xs text-red-400">{newChatError}</p>}
              <div className="flex gap-2">
                <button type="submit" className="flex-1 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
                  Start Chat
                </button>
                <button type="button" onClick={() => { setShowNewChat(false); setNewChatError('') }} className="px-3 py-1.5 rounded-lg text-xs text-white/50 border border-white/10 hover:bg-white/5">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {listLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 animate-pulse rounded-xl" />)}
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No conversations yet</p>
            </div>
          ) : (
            filteredConversations.map(conv => (
              <div
                key={conv.userId}
                onClick={() => setActiveUserId(conv.userId)}
                className={`flex gap-3 p-4 cursor-pointer transition-colors border-b border-white/5 ${activeUserId === conv.userId ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-white truncate text-sm">{conv.name}</h4>
                    <span className="text-[10px] text-white/40 shrink-0">{conv.time}</span>
                  </div>
                  <p className={`text-xs truncate ${conv.unread ? 'text-white font-medium' : 'text-white/40'}`}>{conv.lastMessage}</p>
                </div>
                {conv.unread && <div className="w-2.5 h-2.5 rounded-full self-center shrink-0" style={{ background: '#d4851a', boxShadow: '0 0 8px rgba(212,133,26,0.8)' }} />}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className={`flex-1 flex flex-col relative ${!activeUserId ? 'hidden md:flex' : 'flex'}`} style={{ background: 'rgba(26,15,10,0.4)' }}>
        {activeUserId && partnerInfo ? (
          <>
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6" style={{ background: 'rgba(20,12,8,0.5)', backdropFilter: 'blur(10px)' }}>
              <div className="flex items-center gap-3">
                <button className="md:hidden mr-1 text-white/60 hover:text-white" onClick={() => setActiveUserId(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img src={partnerInfo.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-white text-sm">{partnerInfo.name}</h3>
                  <span className="text-xs text-green-400 font-medium">Online</span>
                </div>
              </div>
              <button className="text-white/40 hover:text-white"><Info className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 flex flex-col">
              {threadLoading ? (
                <div className="m-auto">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
              ) : threadMessages.length === 0 ? (
                <div className="m-auto text-center">
                  <p className="text-white/40">No messages yet. Say hello!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {threadMessages.map((msg) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={msg.id}
                      className={`max-w-[80%] md:max-w-[70%] ${msg.sender_id === user?.id ? 'self-end' : 'self-start'}`}
                    >
                      <div
                        className={`p-3 md:p-4 rounded-2xl text-sm ${
                          msg.sender_id === user?.id
                            ? 'text-white rounded-tr-sm'
                            : 'text-white/90 rounded-tl-sm border border-white/5'
                        }`}
                        style={
                          msg.sender_id === user?.id
                            ? { background: 'linear-gradient(135deg, #d4851a, #c74683)' }
                            : { background: 'rgba(255,255,255,0.05)' }
                        }
                      >
                        {msg.text}
                      </div>
                      <div className={`text-[10px] text-white/30 mt-1 ${msg.sender_id === user?.id ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 md:p-4 border-t border-white/10" style={{ background: 'rgba(20,12,8,0.5)' }}>
              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  type="text"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-1 transition-all"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                />
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="w-12 h-12 rounded-xl text-white flex items-center justify-center shrink-0 disabled:opacity-50 transition-all"
                  style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="m-auto flex flex-col items-center justify-center text-center p-8 max-w-md">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <MessageSquare className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No conversation selected</h3>
            <p className="text-white/40 mb-8">Choose a message or start a new conversation with a photographer.</p>
            <button
              onClick={() => setShowNewChat(true)}
              className="px-6 py-3 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}
            >
              <Plus className="w-4 h-4" /> Message a photographer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
