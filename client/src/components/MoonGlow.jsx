import { motion } from 'framer-motion';
import { memo } from 'react';

const MoonGlow = () => {
  return (
    <div className="absolute top-20 right-32">
      {/* Moon Glow */}
      <motion.div
        className="absolute -inset-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(200,220,255,0.15) 30%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: [0.3, 0.4, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Crescent Moon */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className="relative z-10"
      >
        <defs>
          <radialGradient id="moonGradient">
            <stop offset="0%" stopColor="#F8F9FA" />
            <stop offset="100%" stopColor="#E8EAF0" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="35" fill="url(#moonGradient)" opacity="0.95" />
        <circle cx="50" cy="40" r="32" fill="#0F2A4A" opacity="0.6" />
      </svg>
    </div>
  );
};

export default memo(MoonGlow);
