import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "wouter";
import { FolderOpen, Calendar, MessageSquare, Image as ImageIcon, ArrowUpRight, Plus } from "lucide-react";
import { useProjects } from "@/hooks/use-app-data";

export default function Dashboard() {
  const { data: projects, isLoading } = useProjects();

  const stats = [
    { label: "Active Projects", value: "4", icon: FolderOpen, color: "text-fuchsia-400", bg: "bg-fuchsia-400/10" },
    { label: "Pending Bookings", value: "2", icon: Calendar, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Unread Messages", value: "8", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Gallery Deliveries", value: "12", icon: ImageIcon, color: "text-teal-400", bg: "bg-teal-400/10" },
  ];

  return (
    <AppLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white font-medium rounded-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white font-display">{stat.value}</h3>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display font-bold text-white">Recent Projects</h2>
            <Link href="/projects" className="text-sm text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {isLoading ? (
              [1, 2].map(i => <div key={i} className="h-64 bg-white/5 animate-pulse rounded-2xl" />)
            ) : (
              projects?.slice(0, 2).map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-fuchsia-500/30 transition-all cursor-pointer">
                    <div className="h-40 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      <img 
                        src={project.coverUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-black/50 backdrop-blur text-white">
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-white mb-1">{project.title}</h3>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{project.client}</span>
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-display font-bold text-white mb-4">Upcoming Bookings</h2>
          <div className="bg-card border border-white/5 rounded-2xl p-5">
            <div className="space-y-4">
              {[
                { name: "Sarah & Mike", type: "Wedding Consultation", time: "Today, 2:00 PM", initial: "SM" },
                { name: "Jessica Yunnard", type: "Pre-shoot Call", time: "Tomorrow, 10:00 AM", initial: "JY" },
                { name: "Elena Studio", type: "Commercial Review", time: "Thu 24th, 4:00 PM", initial: "ES" }
              ].map((booking, i) => (
                <div key={i} className="flex gap-4 items-start p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm shrink-0 text-white">
                    {booking.initial}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{booking.name}</h4>
                    <p className="text-xs text-muted-foreground">{booking.type}</p>
                    <div className="text-xs font-medium text-fuchsia-400 mt-1">{booking.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
