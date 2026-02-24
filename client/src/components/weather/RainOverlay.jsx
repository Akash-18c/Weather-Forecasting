import { motion } from 'framer-motion';
import { useMemo } from 'react';

const RainOverlay = () => {
  const raindrops = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.2,
      length: Math.random() * 20 + 30
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Background blur */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Rain streaks */}
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute top-0 w-[1px] bg-gradient-to-b from-white/40 to-transparent"
          style={{
            left: `${drop.left}%`,
            height: `${drop.length}px`,
            opacity: drop.opacity,
            transform: 'rotate(10deg)'
          }}
          animate={{
            y: ['0vh', '110vh']
          }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: drop.delay
          }}
        />
      ))}

      {/* Water shimmer effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent"
        animate={{
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  );
};

export default RainOverlay;
