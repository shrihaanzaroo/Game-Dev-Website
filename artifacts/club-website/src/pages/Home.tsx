import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, Gamepad2, Star } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useMemberCount } from "@/hooks/useMemberCount";
import clubLogo from "@assets/gamedev_1775281169605.png";

/* ─── Animation variants ─── */
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ─── Animated counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 55, damping: 16, mass: 0.9 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Static data ─── */
const STATS = [
  { label: "Members",  value: 25, suffix: "+", gradient: "from-blue-500 via-blue-500 to-indigo-600",    glow: "rgba(99,102,241,0.35)",   floatDelay: 0   },
  { label: "Meetings", value: 4,  suffix: "",  gradient: "from-emerald-400 via-teal-500 to-cyan-500",   glow: "rgba(20,184,166,0.35)",   floatDelay: 0.7 },
  { label: "Projects", value: 0,  suffix: "",  gradient: "from-violet-500 via-purple-500 to-fuchsia-500", glow: "rgba(168,85,247,0.35)", floatDelay: 1.4 },
];

const MEMBERS = [
  { role: "President",      name: "Justin Ding",    initials: "JD", from: "#3b82f6", to: "#1d4ed8" },
  { role: "Vice President", name: "Shrihaan Zaroo",  initials: "SZ", from: "#10b981", to: "#047857" },
  { role: "Secretary",      name: "William Xing",    initials: "WX", from: "#8b5cf6", to: "#6d28d9" },
  { role: "Secretary",      name: "Alan Tang",       initials: "AT", from: "#8b5cf6", to: "#6d28d9" },
];

const INFO_ROWS = [
  { icon: <Calendar className="w-4 h-4" />, label: "Every Wednesday at lunch", sub: "Weekly meetings", color: "#10b981" },
  { icon: <MapPin    className="w-4 h-4" />, label: "Room 923",                 sub: "Location",       color: "#8b5cf6" },
  { icon: <Gamepad2  className="w-4 h-4" />, label: "Unity · Art · Design",     sub: "We cover",       color: "#3b82f6" },
];

/* ─── Dot-grid SVG background ─── */
const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%233b82f6' fill-opacity='0.07'/%3E%3C/svg%3E")`;

export default function Home() {
  useEffect(() => { document.documentElement.classList.remove("dark"); }, []);
  const { count: liveMembers, loading: membersLoading } = useMemberCount();

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(150deg,#e0effe 0%,#f0f7ff 35%,#f4fdf6 70%,#e8faf0 100%)" }}
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: DOT_GRID }} />
      {/* Ambient orbs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
      <Tabs defaultValue="overview" className="flex flex-col flex-1 z-10 relative">

        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 w-full"
          style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: "1px solid rgba(148,163,184,0.15)", boxShadow: "0 1px 40px rgba(15,23,42,0.06)" }}
        >
          <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(148,163,184,0.2)" }}>
                <img src={clubLogo} alt="Logo" className="w-8 h-8 object-contain" style={{ mixBlendMode: "multiply" }} />
              </div>
              <span className="font-black text-base tracking-tight">
                <span style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Game Dev</span>
                <span className="text-slate-700"> Club</span>
              </span>
            </div>

            <TabsList className="h-9 p-0.5 gap-0 rounded-xl"
              style={{ background: "rgba(241,245,249,0.8)", border: "1px solid rgba(148,163,184,0.2)" }}
            >
              {[{ value: "overview", label: "Overview" }, { value: "about", label: "About Us" }, { value: "projects", label: "Projects" }].map(({ value, label }) => (
                <TabsTrigger key={value} value={value}
                  className="px-4 h-8 rounded-[10px] text-sm font-semibold text-slate-500 transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:shadow-blue-100/80"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-5 pt-14 pb-20">

          {/* Hero */}
          <motion.div initial="hidden" animate="visible" variants={FADE_UP}
            className="flex flex-col items-center text-center mb-16"
          >
            {/* Hero logo — big */}
            <motion.div
              className="mb-1"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={clubLogo}
                alt="LAHS Game Dev Club Logo"
                className="w-40 h-auto object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </motion.div>

            {/* Pill label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
              style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)", color: "#2563eb" }}
            >
              <Star className="w-3 h-3 fill-current" />
              Los Altos High School
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
              <span style={{ background: "linear-gradient(100deg,#2563eb 0%,#06b6d4 50%,#10b981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Game Dev
              </span>{" "}
              <span className="text-slate-800">Club</span>
            </h1>

            <p className="text-slate-500 text-lg md:text-xl max-w-md leading-relaxed">
              Building real games, real skills, and real friendships — together.
            </p>
          </motion.div>

          {/* ── TAB: Overview ── */}
          <TabsContent value="overview" className="mt-0 outline-none">

            {/* Floating stat circles */}
            <motion.div initial="hidden" animate="visible" variants={STAGGER}
              className="flex justify-center gap-8 md:gap-14 mb-16"
            >
              {STATS.map(({ label, value, suffix, gradient, glow, floatDelay }) => {
                const resolved = label === "Members" && liveMembers !== null ? liveMembers : value;
                const sfx = label === "Members" && liveMembers !== null ? "" : suffix;
                return (
                  <motion.div key={label} variants={FADE_UP} className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-xl scale-110 opacity-70" style={{ background: `radial-gradient(circle, ${glow}, transparent)` }} />
                      <motion.div
                        className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-gradient-to-br ${gradient}`}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
                        style={{ boxShadow: `0 16px 48px ${glow}` }}
                      >
                        {label === "Members" && membersLoading
                          ? <span className="text-white/70 text-2xl font-bold">…</span>
                          : <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                              <AnimatedCounter target={resolved} suffix={sfx} />
                            </span>
                        }
                      </motion.div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">{label}</span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bento grid */}
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="grid md:grid-cols-5 gap-4">

              {/* Mission — wide left card */}
              <motion.div variants={FADE_UP} className="md:col-span-3 rounded-3xl p-8 flex flex-col justify-between gap-6"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 32px rgba(15,23,42,0.07)" }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Mission</p>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-4">
                    Build Real Games.<br />Build Real Skills.
                  </h2>
                  <p className="text-slate-500 leading-relaxed">
                    A student-run club teaching game development through Unity, collaborative projects, and peer learning. Seasoned coder or total beginner — there's a place for you.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild
                    className="h-11 px-7 rounded-2xl font-bold text-white border-0 shadow-lg shadow-blue-200 hover:scale-105 active:scale-100 transition-all"
                    style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)" }}
                  >
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdZ7ct-635WZNLJ_obGYIBTKvfLGigRHJzwLJUQPCMtf7GCpQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                      Join the Club <ArrowRight className="ml-1.5 w-4 h-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild
                    className="h-11 px-6 rounded-2xl font-semibold border-slate-200 bg-white/60 hover:bg-white text-slate-600 hover:scale-105 active:scale-100 transition-all"
                  >
                    <a href="https://www.instagram.com/lahs_game_dev_club/" target="_blank" rel="noopener noreferrer">
                      <SiInstagram className="mr-2 w-4 h-4 text-pink-500" />
                      Instagram
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Info rows — right column */}
              <motion.div variants={FADE_UP} className="md:col-span-2 flex flex-col gap-4">
                {INFO_ROWS.map(({ icon, label, sub, color }) => (
                  <div key={sub} className="flex-1 rounded-3xl p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-white"
                      style={{ background: `linear-gradient(135deg,${color}cc,${color})` }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: `${color}` }}>{sub}</p>
                      <p className="text-slate-700 font-semibold text-sm">{label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ── TAB: About Us ── */}
          <TabsContent value="about" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="space-y-10">
              <motion.div variants={FADE_UP} className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Our Team</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Leadership</h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {MEMBERS.map((m, i) => (
                  <motion.div key={i} variants={FADE_UP}
                    className="group rounded-3xl p-6 flex flex-col items-center text-center gap-4 cursor-default transition-all duration-300 hover:-translate-y-1.5"
                    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}
                    whileHover={{ boxShadow: `0 16px 48px rgba(15,23,42,0.1)` }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-lg scale-125 opacity-50 group-hover:opacity-80 transition-opacity"
                        style={{ background: `linear-gradient(135deg,${m.from}80,${m.to}80)` }} />
                      <div className="relative w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg"
                        style={{ background: `linear-gradient(135deg,${m.from},${m.to})` }}
                      >
                        {m.initials}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: m.from }}>{m.role}</p>
                      <p className="text-slate-800 font-bold">{m.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* General members banner */}
              <motion.div variants={FADE_UP}>
                <div className="rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                  style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.07),rgba(16,185,129,0.07))", border: "1px solid rgba(59,130,246,0.12)" }}
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-1">General Members</p>
                    <p className="text-slate-600 font-medium">A growing community of developers, designers, and artists.</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex -space-x-2">
                      {["#3b82f6","#10b981","#8b5cf6","#f59e0b","#ef4444"].map((c,i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ background: c }} />
                      ))}
                    </div>
                    <span className="text-2xl font-black text-slate-800">
                      {liveMembers !== null ? liveMembers : "25+"} <span className="text-slate-400 text-sm font-semibold">active</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ── TAB: Projects ── */}
          <TabsContent value="projects" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={FADE_UP}
              className="flex flex-col items-center justify-center py-28 rounded-3xl text-center gap-5"
              style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.9)" }}
            >
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)" }}
              >
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-700 mb-1">Projects coming soon</h3>
                <p className="text-slate-400 text-sm max-w-xs">Our first batch of games is in the works. Check back soon!</p>
              </div>
            </motion.div>
          </TabsContent>

        </main>
      </Tabs>
    </div>
  );
}
