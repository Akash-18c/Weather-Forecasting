import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg ${className}`}
    >
      {/* Light Reflection Sweep */}
      <motion.div
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        animate={{
          x: ['-100%', '300%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
        style={{
          transform: 'skewX(-15deg)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
