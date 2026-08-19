import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlobalBackground = ({ currentScene }: { currentScene: number }) => {
  return (
    <>
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: currentScene === 1 
            ? 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.15) 0%, rgba(6, 11, 25, 1) 70%)'
            : currentScene === 2
            ? 'radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.15) 0%, rgba(6, 11, 25, 1) 70%)'
            : currentScene === 3
            ? 'radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.2) 0%, rgba(6, 11, 25, 1) 60%)'
            : 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, rgba(6, 11, 25, 1) 80%)'
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      
      <AnimatePresence>
        {currentScene === 1 && (
          <motion.img 
            key="tech_bg"
            src={`${import.meta.env.BASE_URL}images/tech_bg.jpg`} 
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-30 z-0 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          />
        )}
        {currentScene === 2 && (
          <motion.img 
            key="node_network"
            src={`${import.meta.env.BASE_URL}images/node_network.jpg`} 
            className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-20 z-0 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
    </>
  );
};
