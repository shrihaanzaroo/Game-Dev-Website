import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Scene3Collab = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Generate some random positions for nodes
  const nodes = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.cos((i / 12) * Math.PI * 2) * (150 + Math.random() * 100),
    y: Math.sin((i / 12) * Math.PI * 2) * (150 + Math.random() * 100),
    size: 20 + Math.random() * 40,
    color: i % 3 === 0 ? 'var(--color-primary)' : i % 3 === 1 ? 'var(--color-secondary)' : 'var(--color-accent)'
  }));

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background radial wipe */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ clipPath: 'circle(150% at 50% 50%)' }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Network Nodes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <motion.div
              className="absolute rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              style={{
                backgroundColor: node.color,
                width: node.size,
                height: node.size,
                marginLeft: -node.size/2,
                marginTop: -node.size/2,
              }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={phase >= 1 ? { x: node.x, y: node.y, scale: 1, opacity: 0.8 } : {}}
              transition={{ 
                duration: 1, 
                delay: 0.5 + i * 0.05, 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              }}
            />
            {/* Connection lines */}
            {i > 0 && (
              <motion.svg className="absolute top-0 left-0 overflow-visible pointer-events-none" style={{ width: 1, height: 1 }}>
                <motion.line
                  x1={nodes[i-1].x}
                  y1={nodes[i-1].y}
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 + i * 0.05 }}
                />
              </motion.svg>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative z-20 text-center pointer-events-none mt-[20vh]">
        <motion.h2 
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Team up with creators.
        </motion.h2>
        
        <motion.p 
          className="text-2xl md:text-3xl font-body text-[var(--color-secondary)] font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          No experience? No problem. We learn by making.
        </motion.p>
      </div>
    </motion.div>
  );
};
