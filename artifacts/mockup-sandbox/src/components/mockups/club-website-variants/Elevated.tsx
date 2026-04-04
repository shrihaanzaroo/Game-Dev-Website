import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gamepad2, 
  Users, 
  Calendar, 
  FolderGit2, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Mail, 
  ChevronRight,
  Code,
  Brush,
  Music,
  Terminal,
  Instagram
} from "lucide-react";

// Mock data
const STATS = [
  { label: "Members", value: "24", icon: Users, color: "from-blue-400 to-cyan-400", delay: 0 },
  { label: "Meetings", value: "4", icon: Calendar, color: "from-cyan-400 to-emerald-400", delay: 0.2 },
  { label: "Projects", value: "0", icon: FolderGit2, color: "from-emerald-400 to-teal-400", delay: 0.4 },
];

const LEADERSHIP = [
  { name: "Alex Chen", role: "President", initials: "AC", color: "from-blue-500 to-cyan-500", icon: Terminal },
  { name: "Sarah Jenkins", role: "Vice President", initials: "SJ", color: "from-cyan-500 to-teal-500", icon: Code },
  { name: "Marcus Johnson", role: "Lead Artist", initials: "MJ", color: "from-emerald-500 to-green-500", icon: Brush },
  { name: "Elena Rodriguez", role: "Audio Director", initials: "ER", color: "from-teal-500 to-emerald-500", icon: Music },
];

export function Elevated() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7dffe] via-[#eaf4ff] to-[#f0fdf8] text-slate-800 font-sans relative overflow-hidden selection:bg-blue-200 selection:text-blue-900">
      {/* Texture & Orbs */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] rounded-full bg-cyan-400/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-400/15 blur-[120px] pointer-events-none"></div>

      {/* Floating Pill Nav */}
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg shadow-blue-900/5 rounded-full px-2 py-2 flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-3 pl-2 cursor-pointer" onClick={() => setActiveTab("Overview")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-sm">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-slate-900 hidden sm:block">LAHS Game Dev</span>
          </div>
          <div className="flex items-center gap-1 pr-1 bg-slate-100/50 p-1 rounded-full border border-white/40">
            {["Overview", "About Us", "Projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  activeTab === tab
                    ? "text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full border border-blue-100/50"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 min-h-[calc(100vh-4rem)] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {activeTab === "Overview" && <OverviewTab />}
            {activeTab === "About Us" && <AboutTab />}
            {activeTab === "Projects" && <ProjectsTab />}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm relative z-10 border-t border-white/20 mt-auto">
        <p>© {new Date().getFullYear()} LAHS Game Development Club. All rights reserved.</p>
      </footer>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-16 flex-1 flex flex-col justify-center">
      {/* Hero Section */}
      <div className="text-center space-y-8 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex flex-col items-center justify-center"
        >
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-24 h-24 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white flex items-center justify-center p-1">
               <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 flex items-center justify-center">
                 <Gamepad2 className="w-10 h-10 text-blue-600 drop-shadow-sm" strokeWidth={1.5} />
               </div>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-md border border-white/60 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider text-blue-800 uppercase">Los Altos High School</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] via-[#06b6d4] to-[#059669] drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]" style={{ textShadow: "0 4px 12px rgba(6, 182, 212, 0.15)" }}>
              Game Dev Club
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Design, code, and create games. From initial concept to playable release, we build worlds together.
          </p>
        </motion.div>

        {/* Floating Stat Circles */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 relative z-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + stat.delay, duration: 0.5 }}
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: stat.delay 
                }}
                className="relative group cursor-default"
              >
                {/* Glow behind */}
                <div className={`absolute -inset-2 bg-gradient-to-br ${stat.color} rounded-full blur-md opacity-40 group-hover:opacity-60 transition duration-500`}></div>
                
                {/* The Sphere */}
                <div className="relative w-32 h-32 rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 flex flex-col items-center justify-center overflow-hidden">
                  {/* Inner Highlight for 3D effect */}
                  <div className="absolute top-1 left-2 w-16 h-8 bg-gradient-to-b from-white to-transparent opacity-80 rounded-full rotate-[-15deg] blur-[2px]"></div>
                  
                  <stat.icon className="w-6 h-6 text-slate-400 mb-1 z-10" />
                  <span className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${stat.color} z-10 drop-shadow-sm`}>
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1 z-10">{stat.label}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bento Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full"
      >
        {/* Mission / CTA Card */}
        <div className="md:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl shadow-blue-900/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-100/80 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Our Mission
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                Empowering students to turn ideas into interactive experiences.
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether you're a programmer, artist, musician, or writer, there's a place for you. We collaborate using industry-standard tools like Unity, Godot, and Blender to build complete games from scratch.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="px-6 py-3 bg-gradient-to-r from-[#1d4ed8] to-[#06b6d4] hover:from-[#1e40af] hover:to-[#0891b2] text-white rounded-xl font-medium shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.23)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
                Join the Club <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" /> Follow Updates
              </button>
            </div>
          </div>
        </div>

        {/* Info Stack */}
        <div className="space-y-4 flex flex-col justify-between">
          {[
            { icon: MapPin, label: "Room", value: "Room 402", color: "from-blue-400 to-blue-600" },
            { icon: Clock, label: "Time", value: "Fridays, Lunch", color: "from-cyan-400 to-cyan-600" },
            { icon: Mail, label: "Contact", value: "gamedev@lahs.club", color: "from-emerald-400 to-emerald-600" }
          ].map((info, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-white shadow-md shadow-blue-900/5 flex items-center gap-4 hover:bg-white transition-colors duration-300">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.color} p-[1px] shadow-sm`}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <info.icon className={`w-5 h-5 text-transparent bg-clip-text bg-gradient-to-br ${info.color}`} style={{ color: "var(--tw-gradient-from)" }} />
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{info.label}</p>
                <p className="font-medium text-slate-800">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function AboutTab() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto w-full py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Meet the students organizing meetings, leading tutorials, and guiding projects.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {LEADERSHIP.map((leader, i) => (
          <motion.div
            key={leader.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-lg shadow-blue-900/5 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Top Color Bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${leader.color}`}></div>
            
            <div className="p-6 text-center">
              <div className={`w-20 h-20 mx-auto rounded-full mb-4 bg-gradient-to-br ${leader.color} p-1 shadow-md`}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white/50">
                  <span className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${leader.color}`}>
                    {leader.initials}
                  </span>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{leader.name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-4">{leader.role}</p>
              <div className="w-8 h-8 mx-auto rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <leader.icon className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-xl shadow-blue-900/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-white/20 to-emerald-50/50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-200/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shrink-0 border border-white shadow-inner">
            <Users className="w-10 h-10 text-blue-500" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Members</h3>
            <p className="text-slate-600 mb-4 max-w-xl">
              Our 24 members come from all grades and experience levels. We organize into small teams to work on term-long projects, learning from each other along the way.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 mx-auto md:mx-0 group">
              View Member Directory 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div className="flex-1 flex items-center justify-center py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white shadow-xl shadow-blue-900/5"
      >
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
          <Gamepad2 className="w-10 h-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Games in Progress</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Our teams are currently designing and building their first projects of the semester. Check back soon to play our games!
        </p>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-4">Development Phase</p>
      </motion.div>
    </div>
  );
}
