import { motion } from 'framer-motion';
import { useMemo } from 'react';

const WetGlassOverlay = () => {
  const droplets = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 30,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 3,
      size: Math.random() * 8 + 4
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 pointer-events-none"
      style={{ backdropFilter: 'blur(1px)' }}
    >
      {/* Wet glass effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

      {/* Animated water droplets */}
      {droplets.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${drop.left}%`,
            top: `${drop.top}%`,
            width: `${drop.size}px`,
            height: `${drop.size * 1.5}px`,
            filter: 'blur(1px)',
            boxShadow: 'inset 0 -2px 4px rgba(255,255,255,0.3)'
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 0.6, 0.6, 0]
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            ease: 'easeIn',
            delay: drop.delay
          }}
        />
      ))}

      {/* Refraction distortion effect */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <filter id="wetGlass">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#wetGlass)" fill="transparent" />
      </svg>
    </motion.div>
  );
};

export default WetGlassOverlay;
