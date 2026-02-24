import { motion } from 'framer-motion';

const DarkGlassCard = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/20 ${className}`}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default DarkGlassCard;
