import { motion } from 'framer-motion';

const GradientSky = ({ theme }) => {
  if (!theme?.gradient) return null;
  
  return (
    <motion.div
      key={theme.gradient}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      className={`absolute inset-0 bg-gradient-to-b ${theme.gradient}`}
      style={{
        willChange: 'opacity',
        transform: 'translate3d(0, 0, 0)'
      }}
    />
  );
};

export default GradientSky;
