import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, Gamepad2, Star, ExternalLink, Download, BookOpen, PlayCircle } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useMemberCount } from "@/hooks/useMemberCount";
import { useMeetingCount } from "@/hooks/useMeetingCount";
import { useLeadership } from "@/hooks/useLeadership";
import { useProjects } from "@/hooks/useProjects";
import clubLogo from "@assets/new_logo_final.png";

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
  { label: "Members",  value: 28, suffix: "", textGradient: "linear-gradient(135deg,#3b82f6,#6366f1)", ring: "rgba(99,102,241,0.5)",   glow: "rgba(99,102,241,0.22)",   floatDelay: 0   },
  { label: "Meetings", value: 4,  suffix: "",  textGradient: "linear-gradient(135deg,#10b981,#06b6d4)", ring: "rgba(20,184,166,0.5)",   glow: "rgba(20,184,166,0.22)",   floatDelay: 0.7 },
  { label: "Projects", value: 0,  suffix: "",  textGradient: "linear-gradient(135deg,#8b5cf6,#ec4899)", ring: "rgba(168,85,247,0.5)",   glow: "rgba(168,85,247,0.22)",   floatDelay: 1.4 },
];

const MEMBERS = [
  { role: "President",      name: "Justin Ding",    initials: "JD", from: "#3b82f6", to: "#1d4ed8" },
  { role: "Vice President", name: "Shrihaan Zaroo",  initials: "SZ", from: "#10b981", to: "#047857" },
  { role: "Secretary",      name: "William Xing",    initials: "WX", from: "#8b5cf6", to: "#6d28d9" },
  { role: "Treasurer",      name: "Alan Tang",       initials: "AT", from: "#8b5cf6", to: "#6d28d9" },
];

const INFO_ROWS = [
  { icon: <Calendar className="w-4 h-4" />, label: "Every Wednesday at Lunch", sub: "Weekly meetings", color: "#10b981" },
  { icon: <MapPin    className="w-4 h-4" />, label: "Room 923",                 sub: "Location",       color: "#8b5cf6" },
  { icon: <Gamepad2  className="w-4 h-4" />, label: "Unity · Art · Coding",     sub: "We cover",       color: "#3b82f6" },
];

const RESOURCES = [
  {
    icon: <Download className="w-5 h-5" />,
    label: "Step 1",
    title: "Unity Installation Guide",
    desc: "Get Unity set up on your computer with our step-by-step guide.",
    href: "https://drive.google.com/open?id=1jgs_E7-Ffqjp3UI_7mGeJSzV0oESmP6NPIty45bmAYo",
    color: "#2563eb",
    colorTo: "#06b6d4",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Step 2",
    title: "How to Use Unity",
    desc: "A slideshow walkthrough of Unity's interface and core concepts.",
    href: "https://docs.google.com/presentation/d/1g1lTtelitDJ8_Uh08xx5wRwz0tY7MScHx3F1Ds50zfg/edit?slide=id.p#slide=id.p",
    color: "#8b5cf6",
    colorTo: "#ec4899",
  },
  {
    icon: <PlayCircle className="w-5 h-5" />,
    label: "Inspiration",
    title: "Example Custom Project",
    desc: "A platformer game made by a club member — see what's possible.",
    href: "https://play.unity.com/en/games/99362ea1-daf9-48e3-b3e2-cd79951e6f50/platformer",
    color: "#10b981",
    colorTo: "#06b6d4",
  },
];

/* ─── Dot-grid SVG background ─── */
const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%233b82f6' fill-opacity='0.07'/%3E%3C/svg%3E")`;

const TABS = [
  { value: "overview",   label: "Overview"    },
  { value: "about",      label: "About Us"    },
  { value: "newmembers", label: "Get Started" },
  { value: "projects",   label: "Projects"    },
];

export default function Home() {
  useEffect(() => { document.documentElement.classList.remove("dark"); }, []);
  const { count: liveMembers, loading: membersLoading } = useMemberCount();
  const { count: liveMeetings, loading: meetingsLoading } = useMeetingCount();
  const { members: liveLeadership, loading: leadershipLoading } = useLeadership();
  const { projects, loading: projectsLoading } = useProjects();

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
          <div className="max-w-5xl mx-auto px-5 h-[100px] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={clubLogo} alt="Logo" className="w-[192px] h-[192px] object-contain" />
              <span className="font-black text-base tracking-tight">
                <span style={{ background: "linear-gradient(90deg,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Game Dev</span>
                <span className="text-slate-700"> Club</span>
              </span>
            </div>

            <TabsList className="h-9 p-0.5 gap-0 rounded-xl"
              style={{ background: "rgba(241,245,249,0.8)", border: "1px solid rgba(148,163,184,0.2)" }}
            >
              {TABS.map(({ value, label }) => (
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
        <main className="flex-1 w-full max-w-5xl mx-auto px-5 pb-20">

          {/* ── TAB: Overview ── */}
          <TabsContent value="overview" className="mt-0 outline-none pt-2">

            {/* Hero */}
            <motion.div initial="hidden" animate="visible" variants={FADE_UP}
              className="flex flex-col items-center text-center mb-10"
            >
              <motion.div
                className="-mb-36 -mt-20 relative flex items-center justify-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute rounded-full blur-3xl"
                  style={{
                    width: "75%", height: "55%", top: "20%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 70%, transparent 100%)",
                  }}
                  animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <img src={clubLogo} alt="LAHS Game Dev Club Logo" className="w-96 h-auto object-contain relative" />
              </motion.div>

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


            </motion.div>

            {/* Floating stat circles */}
            <motion.div initial="hidden" animate="visible" variants={STAGGER}
              className="flex justify-center gap-8 md:gap-14 mb-16"
            >
              {STATS.map(({ label, value, suffix, textGradient, ring, glow, floatDelay }) => {
                const resolved =
                  label === "Members" && liveMembers !== null ? liveMembers :
                  label === "Meetings" && liveMeetings !== null ? liveMeetings :
                  label === "Projects" && !projectsLoading ? projects.length :
                  value;
                const sfx =
                  (label === "Members" && liveMembers !== null) ||
                  (label === "Meetings" && liveMeetings !== null) ||
                  (label === "Projects" && !projectsLoading)
                    ? "" : suffix;
                const isLoading =
                  (label === "Members" && membersLoading) ||
                  (label === "Meetings" && meetingsLoading) ||
                  (label === "Projects" && projectsLoading);
                return (
                  <motion.div key={label} variants={FADE_UP} className="flex flex-col items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full blur-2xl scale-125 opacity-60"
                        style={{ background: `radial-gradient(circle, ${glow}, transparent)` }} />
                      <motion.div
                        className="relative w-28 h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center gap-0.5"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
                        style={{
                          background: "rgba(255,255,255,0.55)",
                          backdropFilter: "blur(20px)",
                          border: `1.5px solid ${ring}`,
                          boxShadow: `0 8px 32px ${glow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
                        }}
                      >
                        {isLoading
                          ? <span className="text-2xl font-bold text-slate-400">…</span>
                          : <span className="text-3xl md:text-4xl font-black tracking-tighter"
                              style={{ background: textGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
              <motion.div variants={FADE_UP} className="md:col-span-3 rounded-3xl p-8 flex flex-col justify-between gap-6"
                style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 32px rgba(15,23,42,0.07)" }}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Mission</p>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-4">
                    Build Real Games.<br />Build Real Skills.
                  </h2>
                  <p className="text-slate-500 leading-relaxed">
                    A student-run club teaching game development through Unity and other platforms — built on collaborative projects and peer learning. Seasoned coder or total beginner — there's a place for you.
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
                      @lahs_game_dev_club
                    </a>
                  </Button>
                </div>
              </motion.div>

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
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color }}>{sub}</p>
                      <p className="text-slate-700 font-semibold text-sm">{label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ── TAB: About Us ── */}
          <TabsContent value="about" className="mt-0 outline-none pt-10">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="space-y-10">
              <motion.div variants={FADE_UP} className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Our Team</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Leadership</h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {leadershipLoading && !liveLeadership
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="rounded-3xl p-6 flex flex-col items-center gap-4 animate-pulse"
                        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.95)" }}
                      >
                        <div className="w-16 h-16 rounded-full bg-slate-200" />
                        <div className="space-y-2 w-full flex flex-col items-center">
                          <div className="h-2.5 w-16 rounded-full bg-slate-200" />
                          <div className="h-3.5 w-24 rounded-full bg-slate-200" />
                        </div>
                      </div>
                    ))
                  : (liveLeadership ?? MEMBERS).map((m, i) => (
                      <motion.div key={i} variants={FADE_UP}
                        className="group rounded-3xl p-6 flex flex-col items-center text-center gap-4 cursor-default transition-all duration-300 hover:-translate-y-1.5"
                        style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}
                        whileHover={{ boxShadow: "0 16px 48px rgba(15,23,42,0.1)" }}
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
                    ))
                }
              </div>

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
                      {liveMembers !== null ? liveMembers : "28"} <span className="text-slate-400 text-sm font-semibold">active</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ── TAB: New Members ── */}
          <TabsContent value="newmembers" className="mt-0 outline-none pt-10">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="space-y-10">

              {/* Header */}
              <motion.div variants={FADE_UP} className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Welcome</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-3">New Members</h2>
                <p className="text-slate-500 max-w-md mx-auto">Everything you need to get started with the Game Dev Club — join up, install Unity, and dive in.</p>
              </motion.div>

              {/* Join the Club */}
              <motion.div variants={FADE_UP}>
                <div className="rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
                  style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.08),rgba(6,182,212,0.08))", border: "1px solid rgba(37,99,235,0.15)", backdropFilter: "blur(20px)" }}
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">First Step</p>
                    <h3 className="text-xl font-black text-slate-800 mb-1">Join the Club</h3>
                    <p className="text-slate-500 text-sm">Fill out the sign-up form to become an official member.</p>
                  </div>
                  <Button size="lg" asChild
                    className="h-11 px-7 rounded-2xl font-bold text-white border-0 shadow-lg shadow-blue-200 hover:scale-105 active:scale-100 transition-all shrink-0"
                    style={{ background: "linear-gradient(135deg,#2563eb,#06b6d4)" }}
                  >
                    <a href="https://forms.gle/wdQWLgah5MKrmG2x8" target="_blank" rel="noopener noreferrer">
                      Sign Up Now <ArrowRight className="ml-1.5 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Resource cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {RESOURCES.map((r) => (
                  <motion.a key={r.title} variants={FADE_UP}
                    href={r.href} target="_blank" rel="noopener noreferrer"
                    className="group rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0"
                        style={{ background: `linear-gradient(135deg,${r.color},${r.colorTo})` }}
                      >
                        {r.icon}
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors mt-1" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: r.color }}>{r.label}</p>
                      <p className="text-slate-800 font-bold mb-1">{r.title}</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Tutorial embed */}
              <motion.div variants={FADE_UP}>
                <div className="rounded-3xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 32px rgba(15,23,42,0.07)" }}
                >
                  <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">Try It Out</p>
                      <h3 className="text-lg font-black text-slate-800">Tutorial Example</h3>
                      <p className="text-slate-500 text-sm">Play a Unity tutorial game right in your browser.</p>
                    </div>
                    <a href="https://play.unity.com/api/v1/games/game/7bdd8f13-edc8-456b-b49e-d539af8efe38/build/latest/frame"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Open full screen <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="w-full" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src="https://play.unity.com/api/v1/games/game/7bdd8f13-edc8-456b-b49e-d539af8efe38/build/latest/frame"
                      className="w-full h-full border-0"
                      allow="fullscreen"
                      title="Unity Tutorial Example"
                    />
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </TabsContent>

          {/* ── TAB: Projects ── */}
          <TabsContent value="projects" className="mt-0 outline-none pt-10">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="space-y-10">

              {/* Header */}
              <motion.div variants={FADE_UP} className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Member Work</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-3">Projects</h2>
                <p className="text-slate-500 max-w-md mx-auto">Games and projects built by our members.</p>
              </motion.div>

              {/* Loading skeletons */}
              {projectsLoading && projects.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-3xl p-6 animate-pulse"
                      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.95)" }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-200" />
                        <div className="h-4 w-28 rounded-full bg-slate-200" />
                      </div>
                      <div className="h-3 w-full rounded-full bg-slate-100 mb-2" />
                      <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                    </div>
                  ))}
                </div>
              )}

              {/* Project cards */}
              {!projectsLoading && projects.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((p, i) => {
                    const colors = [
                      { from: "#2563eb", to: "#06b6d4" },
                      { from: "#8b5cf6", to: "#ec4899" },
                      { from: "#10b981", to: "#06b6d4" },
                      { from: "#f59e0b", to: "#ef4444" },
                      { from: "#3b82f6", to: "#6366f1" },
                    ];
                    const c = colors[i % colors.length];
                    const initials = p.creator.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
                    const hasLink = p.link.startsWith("http");
                    const CardEl = hasLink ? "a" : "div";
                    return (
                      <motion.div key={i} variants={FADE_UP}>
                        <CardEl
                          {...(hasLink ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                          className={`group rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl block`}
                          style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 4px 24px rgba(15,23,42,0.06)" }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0"
                                style={{ background: `linear-gradient(135deg,${c.from},${c.to})` }}
                              >
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: c.from }}>Creator</p>
                                <p className="text-slate-800 font-bold text-sm">{p.creator}</p>
                              </div>
                            </div>
                            {hasLink && <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors shrink-0" />}
                          </div>
                          {p.title && (
                            <p className="text-slate-700 font-semibold text-sm">{p.title}</p>
                          )}
                          {hasLink && (
                            <p className="text-slate-400 text-xs truncate">{p.link}</p>
                          )}
                        </CardEl>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Empty state */}
              {!projectsLoading && projects.length === 0 && (
                <motion.div variants={FADE_UP}
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
              )}

            </motion.div>
          </TabsContent>

        </main>
      </Tabs>
    </div>
  );
}
