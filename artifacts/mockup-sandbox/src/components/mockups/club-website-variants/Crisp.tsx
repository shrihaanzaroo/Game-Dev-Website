import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Users, Calendar, FolderGit2, MapPin, Code2, Instagram, ArrowRight, BookOpen, MonitorPlay, Sparkles } from "lucide-react";

export function Crisp() {
  const [activeTab, setActiveTab] = useState("overview");

  const statCircles = [
    { label: "Members", value: "24", icon: Users, delay: 0 },
    { label: "Meetings", value: "4", icon: Calendar, delay: 0.2 },
    { label: "Projects", value: "0", icon: FolderGit2, delay: 0.4 },
  ];

  const leaders = [
    { name: "John Doe", role: "President", initials: "JD" },
    { name: "Jane Smith", role: "Vice President", initials: "JS" },
    { name: "Alice Johnson", role: "Treasurer", initials: "AJ" },
    { name: "Bob Brown", role: "Secretary", initials: "BB" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden font-sans relative selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] pointer-events-none" />
      
      {/* Soft orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-100/50 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-sky-100/40 blur-[80px] pointer-events-none" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">LAHS Game Dev</span>
          </div>

          <div className="flex gap-1 h-full">
            {["overview", "about", "projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 h-full text-sm font-medium transition-colors hover:text-blue-600 ${
                  activeTab === tab ? "text-blue-600" : "text-slate-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-sky-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-24">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-24">
          <p className="text-xs font-bold tracking-[0.2em] text-slate-500 mb-6 uppercase">
            Los Altos High School
          </p>
          
          <div className="mb-6 w-24 h-24 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 mb-6 pb-2 leading-tight">
            Game Dev Club
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Design, program, and publish games. No prior experience required.
          </p>
        </div>

        {/* Floating Stat Circles */}
        <div className="flex justify-center gap-8 md:gap-16 mb-24">
          {statCircles.map((stat, i) => (
            <motion.div
              key={stat.label}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: stat.delay,
              }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center justify-center relative group hover:scale-105 transition-transform">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <stat.icon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-700">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_2px_40px_rgba(0,0,0,0.02)] border border-slate-100"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                We are a community of student developers, artists, and designers dedicated to learning the art of game creation. We build everything from simple 2D platformers to complex 3D experiences, participating in game jams and learning industry-standard tools together.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Fridays at Lunch
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Room 711
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700">
                  <Code2 className="w-4 h-4 text-blue-600" />
                  Unity, Godot, C#
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-blue-600 transition-colors">
                  Join Discord <ArrowRight className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-slate-200 text-slate-700 font-medium hover:border-slate-300 transition-colors">
                  <Instagram className="w-4 h-4" /> Follow Us
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 px-2">Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {leaders.map((leader) => (
                    <div key={leader.name} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                        {leader.initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{leader.name}</div>
                        <div className="text-sm text-slate-500 font-medium">{leader.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 px-2">Members</h2>
                <div className="border border-slate-200 rounded-2xl p-8 text-center bg-white/50 border-dashed">
                  <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">General Members</h3>
                  <p className="text-slate-500">
                    20+ amazing student developers making games!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="border-2 border-slate-200 border-dashed rounded-3xl p-16 text-center bg-white/30">
                <div className="w-20 h-20 mx-auto bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <Gamepad2 className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">No projects yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  We are currently working on our first batch of games. Check back soon to play what we've built!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Crisp;
