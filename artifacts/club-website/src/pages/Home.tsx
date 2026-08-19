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
  
  const yHero = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleHeroLogo = useTransform(scrollY, [0, 300], [1, 0.85]);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative overflow-hidden bg-background text-foreground selection:bg-cyan-500/30">
      
      {/* Texture Layer - Parallax */}
      <motion.div 
        className="absolute -inset-[50%] pointer-events-none opacity-60" 
        style={{ backgroundImage: DOT_GRID, y: yBg }} 
      />
      
      {/* Ambient Parallax Glows */}
      <motion.div 
        className="absolute -top-[300px] -left-[200px] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 60%)", y: yGlow1 }}
      />
      <motion.div 
        className="absolute top-[30vh] -right-[200px] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 60%)", y: yGlow2 }}
      />

      <Tabs 
        defaultValue="overview" 
        className="flex flex-col flex-1 z-10 relative"
        onValueChange={() => window.scrollTo({ top: 0 })}
      >

        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
          {/* Scroll Progress Bar */}
          <motion.div 
            className="absolute bottom-[-1px] left-0 h-[1px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 opacity-80 z-50 origin-left" 
            style={{ width: "100%", scaleX: scrollYProgress }} 
          />
          <div className="max-w-5xl mx-auto px-6 h-[80px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={clubLogo} alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-lg tracking-tight">
                LAHS <span className="text-cyan-400">Game Dev</span>
              </span>
            </div>

            <TabsList className="h-9 p-1 bg-slate-900 border border-white/10 rounded-lg">
              {TABS.map(({ value, label }) => (
                <TabsTrigger key={value} value={value}
                  className="px-4 h-7 rounded-md text-sm font-medium text-slate-400 transition-colors data-[state=active]:bg-slate-800 data-[state=active]:text-cyan-400"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16">

          {/* ── TAB: Overview ── */}
          <TabsContent value="overview" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col gap-16">
              
              {/* Hero */}
              <motion.div variants={FADE_UP} className="w-full">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="flex flex-col items-center text-center mt-8 mb-4">
                  <motion.div className="mb-6 relative" style={{ scale: scaleHeroLogo }}>
                    <div className="absolute inset-0 rounded-full blur-2xl bg-cyan-500/10 scale-110" />
                    <img src={clubLogo} alt="LAHS Game Dev Club Logo" className="w-32 h-auto object-contain relative z-10" />
                  </motion.div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md mb-6 text-sm font-medium border border-cyan-500/20 text-cyan-400 bg-cyan-500/10">
                    <Star className="w-4 h-4 fill-cyan-400" />
                    Los Altos High School
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-100 max-w-3xl leading-tight">
                    Design, build, and ship <br className="hidden md:block" />
                    <span className="text-cyan-400">real games</span> together.
                  </h1>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={FADE_UP} className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 rounded-2xl bg-slate-900/50 backdrop-blur-sm overflow-hidden">
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
                    <div key={label} className="flex flex-col items-center justify-center p-8 text-center">
                      <div className="text-3xl md:text-5xl font-bold text-slate-100 tracking-tight mb-2">
                        {isLoading ? <span className="text-slate-600">--</span> : <AnimatedCounter target={resolved} suffix={sfx} />}
                      </div>
                      <span className="text-sm font-medium text-slate-400">{label}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Bento grid */}
              <motion.div variants={STAGGER} className="grid md:grid-cols-5 gap-4">
                <motion.div variants={FADE_UP} className="md:col-span-3 rounded-2xl p-8 lg:p-10 flex flex-col justify-between gap-8 border border-white/10 bg-slate-900/50">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-4">
                      Built on collaborative projects.
                    </h2>
                    <p className="text-slate-400 leading-relaxed max-w-lg text-lg">
                      A student-run club teaching game development through Unity and other platforms. Whether you're a seasoned coder, artist, or total beginner — there's a place for you.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" asChild className="h-12 px-6 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-colors border-0">
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdZ7ct-635WZNLJ_obGYIBTKvfLGigRHJzwLJUQPCMtf7GCpQ/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                        Join the Club <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="h-12 px-6 rounded-lg font-semibold border-white/10 hover:bg-white/5 transition-colors">
                      <a href="https://www.instagram.com/lahs_game_dev_club/" target="_blank" rel="noopener noreferrer" className="text-slate-300">
                        <SiInstagram className="mr-2 w-4 h-4 text-slate-300" />
                        @lahs_game_dev_club
                      </a>
                    </Button>
                  </div>
                </motion.div>

                <motion.div variants={FADE_UP} className="md:col-span-2 flex flex-col gap-4">
                  {INFO_ROWS.map(({ icon, label, sub }) => (
                    <div key={sub} className="flex-1 rounded-2xl p-6 flex items-center gap-5 border border-white/10 bg-slate-900/50 hover:bg-slate-900/80 transition-colors">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 text-cyan-400 shrink-0">
                        {icon}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">{sub}</p>
                        <p className="text-slate-200 font-medium">{label}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              
            </motion.div>
          </TabsContent>

          {/* ── TAB: About Us ── */}
          <TabsContent value="about" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col gap-12 pt-8">
              <motion.div variants={FADE_UP} className="w-full">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-2xl">
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
                        className="rounded-2xl p-6 flex flex-col items-center text-center gap-5 border border-white/10 bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
                      >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-800 text-cyan-400 font-bold text-xl border border-white/5">
                          {m.initials}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">{m.role}</p>
                          <p className="text-slate-200 font-semibold">{m.name}</p>
                        </div>
                      </motion.div>
                    ))
                }
              </div>

              <motion.div variants={FADE_UP}>
                <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 bg-slate-900/50 mt-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2">General Members</h3>
                    <p className="text-slate-400 max-w-lg">A growing community of developers, designers, writers, and artists building games together.</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 bg-slate-950 p-4 rounded-xl border border-white/5">
                    <div className="flex -space-x-3">
                      {Array.from({ length: 5 }).map((_,i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center">
                          <Users className="w-4 h-4 text-slate-500" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-slate-100 leading-none">
                        {liveMembers !== null ? liveMembers : "28"}
                      </span>
                      <span className="text-xs font-medium text-slate-500">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* ── TAB: New Members ── */}
          <TabsContent value="newmembers" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col gap-12 pt-8">

              <motion.div variants={FADE_UP} className="w-full">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-2xl">
                  <h2 className="text-3xl font-bold text-slate-100 mb-3">Get Started</h2>
                  <p className="text-slate-400 text-lg">Everything you need to join the club, set up Unity, and dive into your first project.</p>
                </motion.div>
              </motion.div>

              <motion.div variants={FADE_UP}>
                <div className="rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 border border-blue-500/20 bg-blue-500/5">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">Join the Club</h3>
                    <p className="text-slate-400 text-lg max-w-xl">Fill out the official sign-up form so we can add you to the roster and keep you in the loop.</p>
                  </div>
                  <Button size="lg" asChild className="h-12 px-8 rounded-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-colors shrink-0 border-0">
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
                    className="group rounded-2xl p-8 flex flex-col gap-6 border border-white/10 bg-slate-900/50 hover:bg-slate-900/80 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform">
                        {r.icon}
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">{r.label}</p>
                      <p className="text-slate-200 font-semibold mb-2">{r.title}</p>
                      <p className="text-slate-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <motion.div variants={FADE_UP}>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50">
                  <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">Tutorial Example</h3>
                      <p className="text-slate-400 text-sm">Play a Unity tutorial game right in your browser.</p>
                    </div>
                    <a href="https://play.unity.com/api/v1/games/game/7bdd8f13-edc8-456b-b49e-d539af8efe38/build/latest/frame"
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Open full screen <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="w-full bg-slate-950" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      src="https://play.unity.com/api/v1/games/game/7bdd8f13-edc8-456b-b49e-d539af8efe38/build/latest/frame"
                      className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity"
                      allow="fullscreen"
                      title="Unity Tutorial Example"
                    />
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </TabsContent>

          {/* ── TAB: Projects ── */}
          <TabsContent value="projects" className="mt-0 outline-none">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col gap-12 pt-8">

              <motion.div variants={FADE_UP} className="w-full">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="max-w-2xl">
                  <h2 className="text-3xl font-bold text-slate-100 mb-3">Projects</h2>
                  <p className="text-slate-400 text-lg">Games, prototypes, and art built by our members.</p>
                </motion.div>
              </motion.div>

              {/* Loading skeletons */}
              {projectsLoading && projects.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-2xl p-6 border border-white/5 bg-slate-900/30 animate-pulse">
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
                          className={`group rounded-2xl p-6 flex flex-col gap-5 border border-white/10 bg-slate-900/50 transition-colors ${hasLink ? 'hover:bg-slate-900/80 block cursor-pointer' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 text-cyan-400 font-bold shrink-0">
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Creator</p>
                                <p className="text-slate-200 font-semibold truncate">{p.creator}</p>
                              </div>
                            </div>
                            {hasLink && <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />}
                          </div>
                          <div>
                            {p.title && (
                              <p className="text-slate-300 font-medium mb-1">{p.title}</p>
                            )}
                            {hasLink && (
                              <p className="text-slate-500 text-sm truncate">{p.link}</p>
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
                  className="flex flex-col items-center justify-center py-24 rounded-2xl text-center gap-6 border border-white/10 bg-slate-900/30"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-800 text-cyan-400">
                    <Gamepad2 className="w-8 h-8" />
                  </div>
                  <div className="max-w-md">
                    <h3 className="text-xl font-bold text-slate-200 mb-2">Projects coming soon</h3>
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