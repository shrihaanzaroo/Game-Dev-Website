import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Scene2WhatWeDo = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800), // Reveal cards
      setTimeout(() => setPhase(2), 2500), // Highlight Design
      setTimeout(() => setPhase(3), 3500), // Highlight Build
      setTimeout(() => setPhase(4), 4500), // Highlight Ship
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const roles = [
    { title: "Art & Animation", color: "var(--color-secondary)", delay: 0 },
    { title: "Code & Logic", color: "var(--color-primary)", delay: 0.1 },
    { title: "Audio & Music", color: "var(--color-accent)", delay: 0.2 },
    { title: "Game Design", color: "var(--color-warning)", delay: 0.3 }
  ];

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col justify-center px-[8vw]"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[50vw]">
        <motion.h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-12">
          <motion.span 
            className="block text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Design, build, and
          </motion.span>
          <motion.span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            ship real games
          </motion.span>
          <motion.span 
            className="block text-[var(--color-text-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            together.
          </motion.span>
        </motion.h2>
      </div>

      <div className="absolute right-[8vw] top-[50%] -translate-y-1/2 w-[35vw] h-[60vh] flex flex-col gap-4">
        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            className="relative p-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={phase >= 1 ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.6, delay: role.delay, ease: "easeOut" }}
          >
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundColor: phase >= i + 2 ? role.color : 'transparent'
              }}
              transition={{ duration: 0.4 }}
            />
            <motion.h3 
              className="text-2xl font-display font-semibold relative z-10"
              animate={{
                color: phase >= i + 2 ? '#fff' : 'var(--color-text-secondary)',
                x: phase >= i + 2 ? 10 : 0
              }}
              transition={{ duration: 0.4 }}
            >
              {role.title}
            </motion.h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
