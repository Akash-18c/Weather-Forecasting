import { motion } from 'framer-motion';
import { useMemo } from 'react';

const CloudLayer = ({ theme, parallax }) => {
  const clouds = useMemo(() => {
    if (!theme?.condition) return [];
    const cloudCount = theme.condition === 'Clouds' ? 8 : 4;
    return Array.from({ length: cloudCount }, (_, i) => ({
      id: i,
      top: Math.random() * 60 + 10,
      left: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.7,
      opacity: Math.random() * 0.3 + 0.3,
      duration: Math.random() * 40 + 60,
      delay: Math.random() * -30
    }));
  }, [theme?.condition]);

  if (!theme?.condition || theme.condition === 'Clear') return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((cloud, index) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
            transform: `translate3d(${parallax.x * (0.2 + index * 0.1)}px, ${parallax.y * (0.2 + index * 0.1)}px, 0)`,
            willChange: 'transform'
          }}
          animate={{
            x: ['0%', '100vw']
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: cloud.delay
          }}
        >
          <svg
            width={200 * cloud.scale}
            height={80 * cloud.scale}
            viewBox="0 0 200 80"
            fill="none"
            style={{ opacity: cloud.opacity }}
          >
            <ellipse cx="50" cy="50" rx="40" ry="25" fill="white" />
            <ellipse cx="90" cy="45" rx="50" ry="30" fill="white" />
            <ellipse cx="140" cy="50" rx="45" ry="28" fill="white" />
            <ellipse cx="110" cy="35" rx="35" ry="20" fill="white" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default CloudLayer;
