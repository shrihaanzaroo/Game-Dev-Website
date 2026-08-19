import React from 'react';
import { motion } from 'framer-motion';

export const Scene1Intro = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[15vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="flex flex-col items-center mt-24">
        <motion.h1 
          className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-4"
          initial={{ y: 30, opacity: 0, rotateX: -20 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          LAHS <span className="text-[var(--color-secondary)]">Game Dev</span>
        </motion.h1>
        
        <div className="flex gap-4 text-xl md:text-3xl font-body font-medium text-[var(--color-text-secondary)]">
          {['Design.', 'Build.', 'Ship.'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 + i * 0.2, ease: "easeOut" }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Grid background effect specific to this scene */}
      <motion.div 
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)`,
          backgroundSize: '4vw 4vw',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)'
        }}
      />
    </motion.div>
  );
};
