import React from 'react';
import { motion } from 'framer-motion';

export const Scene4Outro = () => {
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pt-[35vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
          LAHS Game Dev Club
        </h2>
        <div className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
          <p className="text-2xl md:text-3xl font-body font-bold text-white">
            Join us this week.
          </p>
        </div>
      </motion.div>

      {/* Particle explosion effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 30;
          const distance = 300 + Math.random() * 400;
          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                width: 4 + Math.random() * 8,
                height: 4 + Math.random() * 8,
                backgroundColor: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
                boxShadow: '0 0 10px currentColor'
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{ 
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5]
              }}
              transition={{ 
                duration: 2 + Math.random(),
                delay: 0.5 + Math.random() * 0.5,
                ease: "easeOut" 
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
