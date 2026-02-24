import { motion } from 'framer-motion';

const CelestialLayer = ({ theme, parallax }) => {
  if (!theme?.timeOfDay) return null;
  
  const isNight = theme.timeOfDay === 'night';

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0)`,
        willChange: 'transform'
      }}
    >
      {isNight ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-32 w-24 h-24"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-white rounded-full opacity-90" />
            <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 animate-pulse-slow" />
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-20" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 right-32 w-32 h-32"
        >
          <div className="relative w-full h-full">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-yellow-300 rounded-full"
            />
            <div className="absolute inset-0 bg-yellow-200 rounded-full blur-2xl opacity-60" />
            <div className="absolute inset-0 bg-orange-300 rounded-full blur-3xl opacity-30" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CelestialLayer;
