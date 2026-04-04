import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";
import { SiInstagram } from "react-icons/si";

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const MEMBERS = [
  { role: "President", name: "Justin Ding", initials: "JD", gradient: "from-blue-500 to-blue-700" },
  { role: "Vice President", name: "Shrihaan Zaroo", initials: "SZ", gradient: "from-emerald-500 to-emerald-700" },
  { role: "Secretary", name: "William Xing", initials: "WX", gradient: "from-violet-500 to-violet-700" },
  { role: "Secretary", name: "Alan Tang", initials: "AT", gradient: "from-violet-500 to-violet-700" },
];

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 25%, #f0fdf4 60%, #dcfce7 100%)",
      }}
    >
      {/* Gradient mesh orbs */}
      <div className="absolute top-[-15%] left-[-8%] w-[55%] h-[55%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-15%] right-[-8%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)" }} />
      <div className="absolute top-[35%] right-[5%] w-[35%] h-[35%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:py-20 z-10 relative">

        {/* Hero */}
        <motion.div initial="hidden" animate="visible" variants={FADE_UP}
          className="flex flex-col items-center text-center space-y-5 mb-14"
        >
          <div className="p-2 rounded-3xl shadow-lg shadow-blue-200/60"
            style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" }}
          >
            <img
              src={`${import.meta.env.BASE_URL}lahs-logo.png`}
              alt="LAHS Game Dev Club Logo"
              className="w-32 h-32 object-contain"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none">
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Game Dev</span>{" "}
            <span className="text-slate-800">Club</span>
          </h1>

          <p className="text-lg md:text-xl font-semibold text-slate-500 tracking-wide uppercase">
            Los Altos High School
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="intro" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="h-12 p-1 rounded-2xl gap-1"
              style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 4px 24px rgba(59,130,246,0.08)" }}
            >
              {["intro", "members", "projects"].map((tab) => (
                <TabsTrigger key={tab} value={tab}
                  className="px-6 rounded-xl capitalize text-sm font-semibold text-slate-500 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md data-[state=active]:shadow-blue-100"
                >
                  {tab === "members" ? "Roster" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* TAB 1: Intro */}
          <TabsContent value="intro" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={STAGGER}
              className="grid gap-8 md:grid-cols-2 items-center"
            >
              <motion.div variants={FADE_UP} className="flex flex-col space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-snug">
                  Build Real Games.<br />Build Real Skills.
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  We are a student-run club dedicated to teaching game development through Unity, collaborative projects, and peer learning. Whether you're a seasoned coder or a complete beginner, there's a place for you here.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button size="lg"
                    className="font-bold px-8 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-105 transition-all duration-200 border-0"
                  >
                    Sign Up
                  </Button>
                  <Button size="lg" variant="outline"
                    className="font-bold px-6 h-12 rounded-xl border-slate-200 bg-white/70 hover:bg-white text-slate-700 hover:scale-105 transition-all duration-200"
                    asChild
                  >
                    <a href="https://www.instagram.com/lahs_game_dev_club/" target="_blank" rel="noopener noreferrer">
                      <SiInstagram className="mr-2 h-5 w-5 text-pink-500" />
                      @lahs_game_dev_club
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={FADE_UP} className="flex flex-col gap-4">
                {[
                  { icon: <Users className="w-5 h-5 text-blue-500" />, label: "Community", value: "25+ active members passionate about coding, art, and game design.", accent: "blue" },
                  { icon: <Calendar className="w-5 h-5 text-emerald-500" />, label: "Meetings", value: "Every Wednesday at lunch.", accent: "emerald" },
                  { icon: <MapPin className="w-5 h-5 text-violet-500" />, label: "Location", value: "Room 923", accent: "violet" },
                ].map(({ icon, label, value, accent }) => (
                  <div key={label}
                    className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
                  >
                    <div className={`p-2 rounded-xl bg-${accent}-50 ring-1 ring-${accent}-100 shrink-0`}>{icon}</div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
                      <p className="text-slate-700 font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* TAB 2: Roster */}
          <TabsContent value="members" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="space-y-10">
              <motion.div variants={FADE_UP} className="text-center">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Leadership Team</h2>
                <p className="text-slate-500">The students making it happen.</p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {MEMBERS.map((member, i) => (
                  <motion.div key={i} variants={FADE_UP}>
                    <div
                      className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                      style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md`}>
                        {member.initials}
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{member.role}</p>
                      <p className="text-slate-800 font-semibold text-base">{member.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={FADE_UP} className="flex justify-center pt-2">
                <div
                  className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
                >
                  <Users className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-700 font-semibold">General Members</span>
                  <Badge className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white border-0 font-bold px-3 py-1 text-sm">
                    25+ Active
                  </Badge>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* TAB 3: Projects */}
          <TabsContent value="projects" className="mt-0 outline-none">
            <div
              className="flex flex-col items-center justify-center py-24 text-center rounded-2xl"
              style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)" }}
            >
              <p className="text-slate-400 text-lg font-medium">Projects coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
