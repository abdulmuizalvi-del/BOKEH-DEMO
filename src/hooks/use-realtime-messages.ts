'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './use-auth'

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  text: string
  created_at: string
  sender_name?: string
  sender_avatar?: string
}

export interface Conversation {
  userId: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: boolean
  online: boolean
}

const supabase = createClient()

// Initialize the messages table if it doesn't exist
async function ensureMessagesTable() {
  // Try to query the table - if it fails, we'll create it via RPC or handle gracefully
  const { error } = await supabase.from('messages').select('id').limit(1)
  if (error && error.code === '42P01') {
    // Table doesn't exist - user needs to create it in Supabase dashboard
    console.warn('Messages table does not exist. Please create it in your Supabase dashboard.')
    return false
  }
  return !error
}

export function useConversations() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [tableReady, setTableReady] = useState(true)

  useEffect(() => {
    if (!user) { setLoading(false); return }

    const load = async () => {
      const ready = await ensureMessagesTable()
      setTableReady(ready)
      if (!ready) {
        setLoading(false)
        return
      }

      // Get all messages involving the current user
      const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false })

      if (!messages || messages.length === 0) {
        setConversations([])
        setLoading(false)
        return
      }

      // Group by conversation partner
      const convMap = new Map<string, { msgs: Message[], partnerId: string }>()
      for (const msg of messages) {
        const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id
        if (!convMap.has(partnerId)) {
          convMap.set(partnerId, { msgs: [], partnerId })
        }
        convMap.get(partnerId)!.msgs.push(msg as Message)
      }

      // Build conversation list
      const convList: Conversation[] = []
      for (const [partnerId, { msgs }] of convMap) {
        const latest = msgs[0]
        // Get partner profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', partnerId)
          .single()

        convList.push({
          userId: partnerId,
          name: profile?.full_name || latest.sender_name || 'Unknown User',
          avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${partnerId}`,
          lastMessage: latest.text,
          time: new Date(latest.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unread: latest.sender_id !== user.id,
          online: false,
        })
      }

      setConversations(convList)
      setLoading(false)
    }

    load()

    // Subscribe to new messages in real-time
    const channel = supabase
      .channel('messages-list')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, () => {
        // Reload conversations on new message
        load()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user])

  return { conversations, loading, tableReady }
}

export function useRealtimeThread(partnerId: string | null) {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [partnerInfo, setPartnerInfo] = useState<{ name: string; avatar: string } | null>(null)

  useEffect(() => {
    if (!user || !partnerId) { setLoading(false); return }

    const load = async () => {
      // Get messages between current user and partner
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(
          `and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`
        )
        .order('created_at', { ascending: true })

      setMessages((data as Message[]) || [])

      // Get partner info
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', partnerId)
        .single()

      setPartnerInfo({
        name: profile?.full_name || 'Unknown User',
        avatar: profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${partnerId}`,
      })

      setLoading(false)
    }

    load()

    // Real-time subscription for this thread
    const channel = supabase
      .channel(`thread-${partnerId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, (payload) => {
        const newMsg = payload.new as Message
        // Only add if it's part of this thread
        if (
          (newMsg.sender_id === user.id && newMsg.receiver_id === partnerId) ||
          (newMsg.sender_id === partnerId && newMsg.receiver_id === user.id)
        ) {
          setMessages(prev => [...prev, newMsg])
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user, partnerId])

  return { messages, loading, partnerInfo }
}

export function useSendRealtimeMessage() {
  const { user } = useAuth()

  const send = useCallback(async (receiverId: string, text: string) => {
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        receiver_id: receiverId,
        text,
        sender_name: user.user_metadata?.full_name || user.email,
      })

    return { error: error?.message }
  }, [user])

  return { send }
}
