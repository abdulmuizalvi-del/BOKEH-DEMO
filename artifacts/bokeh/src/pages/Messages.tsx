import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { useMessages, useMessageThread, useSendMessage } from "@/hooks/use-app-data";
import { Search, Send, Plus, Info, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Messages() {
  const { data: messagesList, isLoading: listLoading } = useMessages();
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const { data: activeThread } = useMessageThread(activeUserId || "");
  const sendMessage = useSendMessage();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !activeUserId) return;
    sendMessage.mutate({ userId: activeUserId, text });
    setText("");
    // Optimistic UI update could be added here, but for mock, it's fine.
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-8rem)] bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Left Panel - List */}
        <div className={`w-full md:w-[320px] border-r border-white/10 flex flex-col bg-background/50 ${activeUserId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-display font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-fuchsia-500 transition-colors"
              />
            </div>
            <div className="flex gap-4 mt-4 px-1">
              {['All', 'Unread', 'Booked'].map(f => (
                <button key={f} className={`text-xs font-semibold ${f === 'All' ? 'text-white border-b-2 border-fuchsia-500 pb-1' : 'text-muted-foreground'}`}>{f}</button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {listLoading ? (
              <div className="p-4 space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-16 bg-white/5 animate-pulse rounded-xl" />)}
              </div>
            ) : (
              messagesList?.map(msg => (
                <div 
                  key={msg.id}
                  onClick={() => setActiveUserId(msg.userId)}
                  className={`flex gap-3 p-4 cursor-pointer transition-colors border-b border-white/5 ${activeUserId === msg.userId ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <div className="relative shrink-0">
                    <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-full object-cover" />
                    {msg.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-white truncate text-sm">{msg.name}</h4>
                      <span className="text-[10px] text-muted-foreground shrink-0">{msg.time}</span>
                    </div>
                    <p className={`text-xs truncate ${msg.unread ? 'text-white font-medium' : 'text-muted-foreground'}`}>{msg.lastMessage}</p>
                  </div>
                  {msg.unread && (
                    <div className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full self-center shrink-0 shadow-[0_0_8px_rgba(217,70,239,0.8)]" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className={`flex-1 flex flex-col bg-card/30 relative ${!activeUserId ? 'hidden md:flex' : 'flex'}`}>
          {activeThread ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background/50 backdrop-blur z-10">
                <div className="flex items-center gap-3">
                  <button className="md:hidden mr-2 text-white" onClick={() => setActiveUserId(null)}>←</button>
                  <img src={activeThread.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-white text-sm">{activeThread.name}</h3>
                    <span className="text-xs text-green-400 font-medium">Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-lg hover:bg-white/20 transition-colors">
                    <Plus className="w-3 h-3" /> New commission
                  </button>
                  <button className="text-muted-foreground hover:text-white"><Info className="w-5 h-5"/></button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar flex flex-col">
                <AnimatePresence>
                  {activeThread.history.length === 0 ? (
                    <div className="m-auto text-center">
                      <p className="text-muted-foreground">No messages yet. Say hello!</p>
                    </div>
                  ) : (
                    activeThread.history.map((msg, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i} 
                        className={`max-w-[70%] ${msg.sender === 'me' ? 'self-end' : 'self-start'}`}
                      >
                        <div className={`p-4 rounded-2xl text-sm ${
                          msg.sender === 'me' 
                            ? 'bg-gradient-primary text-white rounded-tr-sm shadow-[0_5px_15px_rgba(217,70,239,0.15)]' 
                            : 'bg-white/5 text-white/90 rounded-tl-sm border border-white/5'
                        }`}>
                          {msg.text}
                        </div>
                        <div className={`text-[10px] text-muted-foreground mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                          {msg.time}
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-background/50 border-t border-white/10">
                <form onSubmit={handleSend} className="flex gap-3">
                  <input 
                    type="text" 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Type a message..." 
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!text.trim() || sendMessage.isPending}
                    className="w-12 h-12 rounded-xl bg-gradient-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all"
                  >
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="m-auto flex flex-col items-center justify-center text-center p-8 max-w-md">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
                <MessageSquare className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">No conversation selected</h3>
              <p className="text-muted-foreground mb-8">Choose a message from the list or start a new conversation to connect with clients.</p>
              <button className="px-6 py-3 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> Start a new message
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
