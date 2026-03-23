import { AppLayout } from "@/components/layout/AppLayout";
import { useParams } from "wouter";
import { useProject } from "@/hooks/use-app-data";
import { useState } from "react";
import { Sparkles, Download, Share2, Heart, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_PHOTOS = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
];

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: project, isLoading } = useProject(id || "");
  const [activeTab, setActiveTab] = useState("WORKSPACE");
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set([0, 2, 4]));

  const togglePhoto = (idx: number) => {
    const newSet = new Set(selectedPhotos);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setSelectedPhotos(newSet);
  };

  if (isLoading) return <AppLayout><div className="animate-pulse h-64 bg-white/5 rounded-2xl" /></AppLayout>;
  if (!project) return <AppLayout><div>Project not found</div></AppLayout>;

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-fuchsia-400 font-medium tracking-wider uppercase mb-2">Commission • {project.date}</div>
        <h1 className="text-4xl font-display font-bold text-white mb-6">{project.title}</h1>
        
        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/10">
          {["WORKSPACE", "FINAL GALLERY", "PROJECT DETAILS"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold tracking-wide transition-colors relative ${activeTab === tab ? "text-white" : "text-muted-foreground hover:text-white/80"}`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "WORKSPACE" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
          {/* AI Culling Section */}
          <div className="border-gradient rounded-2xl p-6 bg-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[100px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-fuchsia-400" /> AI Culling
                </h3>
                <p className="text-sm text-muted-foreground">Processing images to identify key subjects and optimal expressions.</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex gap-4 mb-4 overflow-x-auto pb-4 custom-scrollbar">
              {MOCK_PHOTOS.slice(0, 5).map((url, i) => (
                <div key={i} className="relative shrink-0 w-32 h-32 rounded-xl overflow-hidden border-2 border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                  <img src={url} className="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="AI processed" />
                  <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-xs font-bold text-white">Select {i+1}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-white/80">Kept <strong className="text-fuchsia-400">210</strong> of 300 photos</span>
              <span className="text-teal-400">86% complete</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-black/50 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-500 to-teal-400 w-[86%] shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
            </div>
          </div>

          {/* Photo Grid */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Select images and start working</h3>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {MOCK_PHOTOS.map((url, i) => {
                const isSelected = selectedPhotos.has(i);
                return (
                  <div 
                    key={i} 
                    onClick={() => togglePhoto(i)}
                    className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 ${isSelected ? 'ring-2 ring-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : ''}`}
                  >
                    <img src={url} className="w-full h-auto object-cover" alt="grid item" />
                    <div className={`absolute inset-0 transition-colors ${isSelected ? 'bg-fuchsia-900/20' : 'bg-black/0 group-hover:bg-black/20'}`} />
                    
                    <div className={`absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-fuchsia-500 border-fuchsia-500' : 'border-white/50 bg-black/20 opacity-0 group-hover:opacity-100'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "FINAL GALLERY" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="relative h-[60vh] rounded-2xl overflow-hidden group">
            <img src={project.coverUrl} className="w-full h-full object-cover" alt="hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <div className="flex gap-4 w-full justify-end">
                <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl flex items-center gap-2 hover:bg-gray-200">
                  <Download className="w-4 h-4" /> Download All
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-xl border border-white/10 flex items-center gap-2 hover:bg-white/30">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {MOCK_PHOTOS.map((url, i) => (
              <img key={i} src={url} className="w-32 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity border border-white/10" alt="thumb" />
            ))}
          </div>
        </motion.div>
      )}
    </AppLayout>
  );
}
