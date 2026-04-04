import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import lahsLogo from "@assets/Screenshot_2026-03-11_at_1.40.56_PM_1775275670198.png";

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  useEffect(() => {
    // Force dark mode for the club theme
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-secondary/30 blur-[100px] rounded-full pointer-events-none" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12 md:py-24 z-10 relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={FADE_UP}
          className="flex flex-col items-center text-center space-y-6 mb-16"
        >
          <div className="mb-4 p-3 rounded-3xl bg-white shadow-[0_0_40px_-5px_rgba(59,130,246,0.5)] ring-1 ring-white/20">
            <img src={lahsLogo} alt="LAHS Game Dev Club Logo" className="w-36 h-36 object-contain" />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Game Dev</span> Club
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl">
            Los Altos High School
          </p>
        </motion.div>

        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 h-14 bg-secondary/50 border border-border/50 p-1">
            <TabsTrigger value="intro" className="rounded-md text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Intro
            </TabsTrigger>
            <TabsTrigger value="members" className="rounded-md text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Roster
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-md text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300">
              Projects
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Introduction */}
          <TabsContent value="intro" className="mt-0 outline-none">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER_CONTAINER}
              className="grid gap-8 md:grid-cols-2"
            >
              <motion.div variants={FADE_UP} className="flex flex-col justify-center space-y-6">
                <h2 className="text-3xl font-bold">Build Real Games. <br/>Build Real Skills.</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We are a student-run club dedicated to teaching game development through Unity, collaborative projects, and peer learning. Whether you're a seasoned coder or a complete beginner, there's a place for you here.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="w-full sm:w-auto font-bold text-md h-14 px-8 bg-primary hover:bg-primary/90 hover:scale-105 transition-all">
                    Join the Discord
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold text-md h-14 px-8 border-border/50 hover:bg-secondary transition-all" asChild>
                    <a href="https://instagram.com/lahsunity" target="_blank" rel="noopener noreferrer">
                      <SiInstagram className="mr-2 h-5 w-5" />
                      @lahsunity
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={FADE_UP} className="grid grid-cols-1 gap-4">
                <Card className="bg-card/40 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Users className="w-6 h-6 mr-3 text-primary" />
                      Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">~25 active members passionate about coding, art, and game design.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/40 backdrop-blur-sm border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Calendar className="w-6 h-6 mr-3 text-accent" />
                      Meetings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">Every Wednesday at lunch in Room 923.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* TAB 2: Members & Leadership */}
          <TabsContent value="members" className="mt-0 outline-none">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={STAGGER_CONTAINER}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
                <p className="text-muted-foreground text-lg">The students making it happen.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { role: "President", name: "Justin Ding", color: "border-primary/50", glow: "group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]" },
                  { role: "Vice President", name: "Shrihaan Zaroo", color: "border-accent/50", glow: "group-hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]" },
                  { role: "Secretary", name: "William Xing", color: "border-purple-500/50", glow: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]" },
                  { role: "Secretary", name: "Alan Tang", color: "border-purple-500/50", glow: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]" }
                ].map((member, i) => (
                  <motion.div key={i} variants={FADE_UP} className="h-full">
                    <Card className={`h-full group bg-card/60 backdrop-blur-sm border ${member.color} transition-all duration-300 ${member.glow} hover:-translate-y-1`}>
                      <CardHeader>
                        <CardDescription className="font-semibold tracking-wider uppercase text-xs mb-1">{member.role}</CardDescription>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={FADE_UP} className="mt-12 flex justify-center">
                <div className="inline-flex items-center px-6 py-4 rounded-2xl bg-secondary/80 border border-border/50 shadow-inner">
                  <Users className="w-6 h-6 text-muted-foreground mr-4" />
                  <span className="text-xl font-medium mr-4">General Members</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1 bg-background text-foreground font-bold border-primary/20">
                    25+ Active
                  </Badge>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* TAB 3: Project Portfolio */}
          <TabsContent value="projects" className="mt-0 outline-none">
            <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
              <p className="text-xl font-medium">Projects coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}