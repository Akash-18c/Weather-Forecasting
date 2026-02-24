import { motion } from 'framer-motion';
import { useMemo } from 'react';

const SnowOverlay = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 8,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.4 + 0.3,
      drift: Math.random() * 30 - 15
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute top-0 bg-white rounded-full"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: 'blur(0.5px)'
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, flake.drift, 0, -flake.drift, 0]
          }}
          transition={{
            y: {
              duration: flake.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: flake.delay
            },
            x: {
              duration: flake.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: flake.delay
            }
          }}
        />
      ))}

      {/* Soft accumulation glow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
    </motion.div>
  );
};

export default SnowOverlay;
