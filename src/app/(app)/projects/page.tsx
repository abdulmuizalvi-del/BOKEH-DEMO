'use client'

import Link from 'next/link'
import { useProjects } from '@/hooks/use-app-data'
import { Search, Plus, Bookmark, Image as ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Projects() {
  const { data: projects, isLoading } = useProjects()

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Projects</h1>
          <p className="text-muted-foreground mt-1">You currently have {projects?.length || 0} active sessions.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full bg-card border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-fuchsia-500 transition-colors text-white"
            />
          </div>
          <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white font-medium rounded-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Commission</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-[300px] bg-white/5 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, idx) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[320px] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-card"
              >
                <img
                  src={project.coverUrl}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur text-white ${project.status === 'IN_PROGRESS' ? 'bg-amber-500/40 border border-amber-500/50 text-amber-100' : 'bg-green-500/40 border border-green-500/50 text-green-100'}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>

                <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors text-white">
                  <Bookmark className="w-4 h-4" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex gap-2 mb-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 font-display">{project.title}</h3>
                  <div className="flex justify-between items-center text-sm text-white/60">
                    <span>{project.date}</span>
                    <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> {project.imageCount}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
