'use client'

import { useParams, useRouter } from 'next/navigation'
import { useProject } from '@/hooks/use-app-data'
import { ChevronRight, Calendar, Image as ImageIcon, Download, Share2 } from 'lucide-react'

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const { data: project, isLoading } = useProject((params?.id as string) ?? '')

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
        <div className="h-64 bg-white/5 animate-pulse rounded-2xl" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Project not found</h2>
        <button onClick={() => router.push('/projects')} className="mt-4 px-4 py-2 text-white rounded-lg" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>Back to Projects</button>
      </div>
    )
  }

  return (
    <>
      <button onClick={() => router.push('/projects')} className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6 group">
        <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </button>

      <div className="relative rounded-2xl overflow-hidden mb-8 h-48 md:h-72">
        <img src={project.coverUrl} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">{tag}</span>
            ))}
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${project.status === 'IN_PROGRESS' ? 'bg-amber-500/40 border border-amber-500/50 text-amber-100' : 'bg-green-500/40 border border-green-500/50 text-green-100'}`}>
              {project.status.replace('_', ' ')}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">{project.title}</h1>
          <div className="flex flex-wrap gap-3 md:gap-6 mt-2 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{project.date}</span>
            <span className="flex items-center gap-1.5"><ImageIcon className="w-4 h-4" />{project.imageCount} photos</span>
            <span>{project.client}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl transition-all" style={{ background: 'linear-gradient(135deg, #d4851a, #c74683)' }}>
          <Download className="w-4 h-4" /> Download Gallery
        </button>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-white/10 text-white font-semibold rounded-xl hover:border-white/20 hover:bg-white/5 transition-all" style={{ background: 'rgba(30,18,12,0.6)' }}>
          <Share2 className="w-4 h-4" /> Share Gallery
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Gallery Preview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white/5 relative group cursor-pointer">
              <img src={project.coverUrl} alt={`Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
