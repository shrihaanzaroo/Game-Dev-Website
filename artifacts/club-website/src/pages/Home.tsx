import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, Gamepad2, Star, ExternalLink, Download, BookOpen, PlayCircle, Users } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useMemberCount } from "@/hooks/useMemberCount";
import { useMeetingCount } from "@/hooks/useMeetingCount";
import { useLeadership } from "@/hooks/useLeadership";
import { useProjects } from "@/hooks/useProjects";
import clubLogo from "@assets/new_logo_final.png";

/* ─── Animation variants ─── */
const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
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
  { label: "Members",  value: 28, suffix: "" },
  { label: "Meetings", value: 4,  suffix: "" },
  { label: "Projects", value: 0,  suffix: "" },
];

const MEMBERS = [
  { role: "President",      name: "Justin Ding",    initials: "JD" },
  { role: "Vice President", name: "Shrihaan Zaroo", initials: "SZ" },
  { role: "Secretary",      name: "William Xing",   initials: "WX" },
  { role: "Treasurer",      name: "Alan Tang",      initials: "AT" },
];

const INFO_ROWS = [
  { icon: <Calendar className="w-5 h-5" />, label: "Every Wednesday at Lunch", sub: "Weekly meetings" },
  { icon: <MapPin    className="w-5 h-5" />, label: "Room 923",                 sub: "Location" },
  { icon: <Gamepad2  className="w-5 h-5" />, label: "Unity · Art · Coding",     sub: "We cover" },
];

const RESOURCES = [
  {
    icon: <Download className="w-5 h-5" />,
    label: "Step 1",
    title: "Unity Installation Guide",
    desc: "Get Unity set up on your computer with our step-by-step guide.",
    href: "https://drive.google.com/open?id=1jgs_E7-Ffqjp3UI_7mGeJSzV0oESmP6NPIty45bmAYo",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Step 2",
    title: "How to Use Unity",
    desc: "A slideshow walkthrough of Unity's interface and core concepts.",
    href: "https://docs.google.com/presentation/d/1g1lTtelitDJ8_Uh08xx5wRwz0tY7MScHx3F1Ds50zfg/edit?slide=id.p#slide=id.p",
  },
  {
    icon: <PlayCircle className="w-5 h-5" />,
    label: "Inspiration",
    title: "Example Custom Project",
    desc: "A platformer game made by a club member — see what's possible.",
    href: "https://play.unity.com/en/games/99362ea1-daf9-48e3-b3e2-cd79951e6f50/platformer",
  },
];

/* ─── Dot-grid SVG background ─── */
const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='1' cy='1' r='1' fill='%2306b6d4' fill-opacity='0.05'/%3E%3C/svg%3E")`;

const TABS = [
  { value: "overview",   label: "Overview"    },
  { value: "about",      label: "About Us"    },
  { value: "newmembers", label: "Get Started" },
  { value: "projects",   label: "Projects"    },
];

export default function Home() {
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const { count: liveMembers, loading: membersLoading } = useMemberCount();
  const { count: liveMeetings, loading: meetingsLoading } = useMeetingCount();
  const { members: liveLeadership, loading: leadershipLoading } = useLeadership();
  const { projects, loading: projectsLoading } = useProjects();

  /* ─── Scroll-driven values ─── */
  const { scrollY, scrollYProgress } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);
  const yGlow1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yGlow2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const yGlow3 = useTransform(scrollY, [0, 1000], [0, 150]);
  
  /* ─── Dramatic Hero Centerpiece Transforms ─── */
  const logoY = useTransform(scrollY, [0, 1000], [0, 400]);
  const logoScale = useTransform(scrollY, [0, 1000], [1, 15]);
  const logoRotate = useTransform(scrollY, [0, 1000], [0, 90]);
  const logoOpacity = useTransform(scrollY, [0, 500, 1000], [1, 0.4, 0]);
  const logoBlur = useTransform(scrollY, [0, 800], ["blur(0px)", "blur(20px)"]);

  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.75]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroRotateX = useTransform(scrollY, [0, 500], [0, 35]);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-clip bg-background text-foreground selection:bg-cyan-500/30">
      
      {/* Texture Layer - Parallax */}
      <motion.div 
        className="absolute -inset-[50%] pointer-events-none opacity-60" 
        style={{ backgroundImage: DOT_GRID, y: yBg }} 
      />
      
      {/* Ambient Parallax Glows */}
      <motion.div 
        className="absolute -top-[300px] -left-[200px] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 60%)", y: yGlow1 }}
      />
      <motion.div 
        className="absolute top-[30vh] -right-[200px] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 60%)", y: yGlow2 }}
      />
      <motion.div 
        className="absolute top-[60vh] left-[20vw] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)", y: yGlow3 }}
      />

      <Tabs 
        defaultValue="overview" 
        className="flex flex-col flex-1 z-10 relative"
        onValueChange={() => window.scrollTo({ top: 0 })}
      >

        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
          {/* Scroll Progress Bar */}
          <motion.div 
            className="absolute bottom-[-1px] left-0 h-[1px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 opacity-80 z-50 origin-left shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
            style={{ width: "100%", scaleX: scrollYProgress }} 
          />
          <div className="max-w-5xl mx-auto px-6 h-[80px] flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <img src={clubLogo} alt="Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform" />
              <span className="font-bold text-lg tracking-tight">
                LAHS <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">Game Dev</span>
              </span>
            </div>

            <TabsList className="h-9 p-1 bg-slate-900 border border-white/10 rounded-lg shadow-inner hidden md:flex">
              {TABS.map(({ value, label }) => (
                <TabsTrigger key={value} value={value}
                  className="px-4 h-7 rounded-md text-sm font-medium text-slate-400 transition-colors data-[state=active]:bg-slate-800 data-[state=active]:text-cyan-400 data-[state=active]:shadow-sm"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="flex-1 w-full pb-16">

          {/* ── TAB: Overview ── */}
          <TabsContent value="overview" className="mt-0 outline-none">
            <div className="flex flex-col">
              
              {/* Sticky Hero Scroll Sequence */}
              <div className="relative h-[180vh] w-full z-10" style={{ perspective: "1200px" }}>
                <div className="sticky top-[15vh] w-full flex flex-col items-center justify-start pt-10 h-[85vh]">
                  
                  {/* The BIG Centerpiece Logo */}
                  <motion.div 
                    className="relative z-10 flex items-center justify-center pointer-events-none"
                    style={{ 
                      y: logoY, 
                      scale: logoScale, 
                      rotate: logoRotate, 
                      opacity: logoOpacity,
                      filter: logoBlur 
                    }}
                  >
                    <div className="absolute inset-0 rounded-full blur-[40px] bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 scale-125" />
                    <img 
                      src={clubLogo} 
                      alt="LAHS Game Dev Club Logo" 
                      className="w-32 sm:w-40 h-auto object-contain relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                    />
                  </motion.div>

                  {/* The Hero Text Block */}
                  <motion.div 
                    className="relative z-0 flex flex-col items-center text-center origin-bottom mt-10 px-6"
                    style={{ 
                      y: heroY, 
                      scale: heroScale, 
                      opacity: heroOpacity, 
                      rotateX: heroRotateX 
                    }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-7 text-sm font-semibold border border-cyan-500/30 text-cyan-300 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-sm">
                      <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                      Los Altos High School
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-100 max-w-4xl leading-[1.1] mb-6 drop-shadow-xl">
                      Design, build, and ship <br className="hidden md:block" />
                      <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.25)]">real games</span> together.
                    </h1>
                  </motion.div>
                </div>
              </div>

              {/* Sweeping Glass Content Layer */}
              <div className="relative z-20 w-full bg-slate-950/70 backdrop-blur-3xl border-t border-cyan-500/20 shadow-[0_-30px_80px_rgba(6,182,212,0.15)] rounded-t-[40px] pt-20 pb-24 -mt-[40vh] min-h-screen">
                <div className="max-w-5xl mx-auto px-6 flex flex-col gap-16">
                  
                  {/* Stats */}
                  <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-3 divide-x divide-slate-800/60 border border-slate-800/80 rounded-2xl bg-slate-900/60 backdrop-blur-md shadow-xl shadow-slate-950/50 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-emerald-500/5 pointer-events-none" />
                    {STATS.map(({ label, value, suffix }) => {
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
                        <div key={label} className="flex flex-col items-center justify-center p-8 text-center relative z-10">
                          <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent tracking-tight mb-2 drop-shadow-sm">
                            {isLoading ? <span className="text-slate-600">--</span> : <AnimatedCounter target={resolved} suffix={sfx} />}
                          </div>
                          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* Bento grid */}
                  <motion.div variants={STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-1 lg:grid-cols-5 gap-4">
                    <motion.div variants={FADE_UP} className="lg:col-span-3 rounded-2xl p-8 lg:p-10 flex flex-col justify-between gap-8 border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-900/40 shadow-xl group hover:border-blue-500/20 transition-colors">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-blue-50 transition-colors">
                          Built on collaborative projects.
                        </h2>
                        <p className="text-slate-400 leading-relaxed max-w-lg text-lg">
                          A student-run club teaching game development through Unity and other platforms. Whether you're a seasoned coder, artist, or total beginner — there's a place for you.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <Button size="lg" asChild className="h-12 px-6 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-cyan-900/30 transition-all border-0 hover:scale-105 active:scale-100">
                          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdZ7ct-635WZNLJ_obGYIBTKvfLGigRHJzwLJUQPCMtf7GCpQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                            Join the Club <ArrowRight className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="h-12 px-6 rounded-lg font-semibold border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white transition-colors">
                          <a href="https://www.instagram.com/lahs_game_dev_club/" target="_blank" rel="noopener noreferrer" className="text-slate-300">
                            <SiInstagram className="mr-2 w-4 h-4 text-pink-400" />
                            @lahs_game_dev_club
                          </a>
                        </Button>
                      </div>
                    </motion.div>

                    <motion.div variants={FADE_UP} className="lg:col-span-2 flex flex-col gap-4">
                      {INFO_ROWS.map(({ icon, label, sub }) => (
                        <div key={sub} className="flex-1 rounded-2xl p-6 flex items-center gap-5 border border-slate-800 bg-slate-900/40 hover:bg-slate-800/80 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all group cursor-default">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 text-cyan-400 shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:text-cyan-300 transition-all">
                            {icon}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-cyan-500/70 mb-1 uppercase tracking-wider group-hover:text-cyan-400/90 transition-colors">{sub}</p>
                            <p className="text-slate-200 font-medium group-hover:text-white transition-colors">{label}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── TAB: About Us ── */}
          <TabsContent value="about" className="mt-0 outline-none max-w-5xl mx-auto px-6 pt-12">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col gap-12 pt-8">
              <motion.div variants={FADE_UP} className="w-full">
                <motion.div className="max-w-2xl">
                  <h2 className="text-3xl font-bold text-slate-100 mb-3">Leadership</h2>
                  <p className="text-slate-400 text-lg">The students running the LAHS Game Dev Club.</p>
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {leadershipLoading && !liveLeadership
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="rounded-2xl p-6 flex flex-col items-center gap-4 border border-white/5 bg-slate-900/30 animate-pulse">
                        <div className="w-16 h-16 rounded-full bg-slate-800" />
                        <div className="space-y-2 w-full flex flex-col items-center">
                          <div className="h-3 w-20 rounded bg-slate-800" />
                          <div className="h-4 w-28 rounded bg-slate-700" />
                        </div>
                      </div>
                    ))
                  : (liveLeadership ?? MEMBERS).map((m, i) => (
                      <motion.div key={i} variants={FADE_UP}
                        className="rounded-2xl p-6 flex flex-col items-center text-center gap-5 border border-slate-800 bg-slate-900/40 hover:bg-slate-800/80 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(37,99,235,0.15)] transition-all group cursor-default"
                      >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 text-blue-400 font-bold text-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:text-blue-300 group-hover:border-blue-500/50 transition-all">
                          {m.initials}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-blue-500/70 mb-1 uppercase tracking-wider group-hover:text-blue-400/90 transition-colors">{m.role}</p>
                          <p className="text-slate-200 font-bold group-hover:text-white transition-colors">{m.name}</p>
                        </div>
                      </motion.div>
                    ))
                }
              </div>

              <motion.div variants={FADE_UP}>
                <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-emerald-900/10 shadow-[0_0_30px_rgba(37,99,235,0.1)] mt-4 relative overflow-hidden group cursor-default">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent pointer-events-none group-hover:from-blue-400/15 transition-colors" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">General Members</h3>
                    <p className="text-slate-400 max-w-lg">A growing community of developers, designers, writers, and artists building games together.</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 bg-slate-950/50 p-4 rounded-xl border border-white/10 backdrop-blur-md relative z-10 group-hover:border-emerald-500/20 transition-colors">
                    <div className="flex -space-x-3">
                      {Array.from({ length: 5 }).map((_,i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                          <Users className="w-4 h-4 text-emerald-400/70" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold bg-gradient-to-br from-white to-emerald-200 bg-clip-text text-transparent leading-none mb-1">
                        {liveMembers !== null ? liveMembers : "28"}
                      </span>
                      <span className="text-xs font-semibold text-emerald-500/80 uppercase tracking-wider">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ── TAB: New Members ── */}
          <TabsContent value="newmembers" className="mt-0 outline-none max-w-5xl mx-auto px-6 pt-12">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col gap-12 pt-8">

              <motion.div variants={FADE_UP} className="w-full">
                <motion.div className="max-w-2xl">
                  <h2 className="text-3xl font-bold text-slate-100 mb-3">Get Started</h2>
                  <p className="text-slate-400 text-lg">Everything you need to join the club, set up Unity, and dive into your first project.</p>
                </motion.div>
              </motion.div>

              <motion.div variants={FADE_UP}>
                <div className="rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 border border-cyan-500/30 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-400/15 via-transparent to-transparent pointer-events-none group-hover:from-cyan-400/20 transition-colors" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Join the Club</h3>
                    <p className="text-cyan-100/70 text-lg max-w-xl">Fill out the official sign-up form so we can add you to the roster and keep you in the loop.</p>
                  </div>
                  <Button size="lg" asChild className="h-12 px-8 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-cyan-900/30 transition-all border-0 hover:scale-105 active:scale-100 shrink-0 relative z-10">
                    <a href="https://forms.gle/wdQWLgah5MKrmG2x8" target="_blank" rel="noopener noreferrer">
                      Sign Up Form <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RESOURCES.map((r) => (
                  <motion.a key={r.title} variants={FADE_UP}
                    href={r.href} target="_blank" rel="noopener noreferrer"
                    className="group rounded-2xl p-8 flex flex-col gap-6 border border-slate-800 bg-slate-900/40 hover:bg-slate-800/80 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 text-cyan-400 shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:text-cyan-300 group-hover:border-cyan-500/50 transition-all">
                        {r.icon}
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-cyan-500/70 mb-2 uppercase tracking-wider group-hover:text-cyan-400/90 transition-colors">{r.label}</p>
                      <p className="text-slate-200 font-bold mb-2 group-hover:text-white transition-colors">{r.title}</p>
                      <p className="text-slate-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div variants={FADE_UP}>
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-xl group">
                  <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-900/80 group-hover:bg-slate-900 transition-colors">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">Tutorial Example</h3>
                      <p className="text-slate-400 text-sm">Play a Unity tutorial game right in your browser.</p>
                    </div>
                    <a href="https://play.unity.com/api/v1/games/game/7bdd8f13-edc8-456b-b49e-d539af8efe38/build/latest/frame"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Open full screen <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="w-full bg-slate-950" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src="https://play.unity.com/api/v1/games/game/7bdd8f13-edc8-456b-b49e-d539af8efe38/build/latest/frame"
                      className="w-full h-full border-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      allow="fullscreen"
                      title="Unity Tutorial Example"
                    />
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </TabsContent>

          {/* ── TAB: Projects ── */}
          <TabsContent value="projects" className="mt-0 outline-none max-w-5xl mx-auto px-6 pt-12">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col gap-12 pt-8">

              <motion.div variants={FADE_UP} className="w-full">
                <motion.div className="max-w-2xl">
                  <h2 className="text-3xl font-bold text-slate-100 mb-3">Projects</h2>
                  <p className="text-slate-400 text-lg">Games, prototypes, and art built by our members.</p>
                </motion.div>
              </motion.div>

              {/* Loading skeletons */}
              {projectsLoading && projects.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-2xl p-6 border border-slate-800 bg-slate-900/40 animate-pulse">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-slate-800" />
                        <div className="h-4 w-24 rounded bg-slate-700" />
                      </div>
                      <div className="h-4 w-3/4 rounded bg-slate-800 mb-3" />
                      <div className="h-4 w-1/2 rounded bg-slate-800" />
                    </div>
                  ))}
                </div>
              )}

              {/* Project cards */}
              {!projectsLoading && projects.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((p, i) => {
                    const initials = p.creator.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
                    const hasLink = p.link.startsWith("http");
                    const CardEl = hasLink ? "a" : "div";
                    return (
                      <motion.div key={i} variants={FADE_UP}>
                        <CardEl
                          {...(hasLink ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                          className={`group rounded-2xl p-6 flex flex-col gap-5 border border-slate-800 bg-slate-900/40 transition-all ${hasLink ? 'hover:bg-slate-800/80 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] block cursor-pointer' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 text-emerald-400 font-bold shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:text-emerald-300 group-hover:border-emerald-500/50 transition-all">
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-emerald-500/70 mb-1 uppercase tracking-wider group-hover:text-emerald-400/90 transition-colors">Creator</p>
                                <p className="text-slate-200 font-bold truncate group-hover:text-white transition-colors">{p.creator}</p>
                              </div>
                            </div>
                            {hasLink && <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />}
                          </div>
                          <div>
                            {p.title && (
                              <p className="text-slate-300 font-semibold mb-1 group-hover:text-slate-200 transition-colors">{p.title}</p>
                            )}
                            {hasLink && (
                              <p className="text-slate-500 text-sm truncate group-hover:text-slate-400 transition-colors">{p.link}</p>
                            )}
                          </div>
                        </CardEl>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Empty state */}
              {!projectsLoading && projects.length === 0 && (
                <motion.div variants={FADE_UP}
                  className="flex flex-col items-center justify-center py-24 rounded-2xl text-center gap-6 border border-slate-800 bg-slate-900/30 relative overflow-hidden group cursor-default"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none group-hover:from-emerald-500/10 transition-colors" />
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(16,185,129,0.2)] relative z-10 group-hover:scale-110 group-hover:border-emerald-500/50 group-hover:text-emerald-300 transition-all">
                    <Gamepad2 className="w-8 h-8" />
                  </div>
                  <div className="max-w-md relative z-10">
                    <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">Projects coming soon</h3>
                    <p className="text-slate-400">Our first batch of games is in the works. Check back soon to see what we're building.</p>
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