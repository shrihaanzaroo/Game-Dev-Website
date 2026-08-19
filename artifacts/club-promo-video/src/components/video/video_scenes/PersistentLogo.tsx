import React from 'react';
import { motion } from 'framer-motion';

export const PersistentLogo = ({ currentScene }: { currentScene: number }) => {
  // Scene 0: Center, large
  // Scene 1: Top Right, small
  // Scene 2: Top Right, small
  // Scene 3: Center, large (outro)
  
  const isCenter = currentScene === 0 || currentScene === 3;
  
  return (
    <motion.div
      className="absolute z-50 flex items-center justify-center"
      initial={false}
      animate={{
        top: isCenter ? '35vh' : '4vh',
        left: isCenter ? '50vw' : '88vw',
        x: '-50%',
        y: '-50%',
        scale: isCenter ? 1 : 0.3,
        opacity: currentScene === 4 ? 0 : 1, // Fades out at very end to loop
      }}
      transition={{ 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] // Custom snappy ease
      }}
    >
      <motion.img 
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        alt="LAHS Game Dev Club Logo"
        className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
        animate={{
          rotate: isCenter ? [0, 2, -2, 0] : 0,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};
