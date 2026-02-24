import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ThunderOverlay = () => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const triggerLightning = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 80);

      const nextFlash = Math.random() * 8000 + 4000;
      setTimeout(triggerLightning, nextFlash);
    };

    const initialDelay = setTimeout(triggerLightning, Math.random() * 3000 + 2000);

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Dark storm overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Lightning flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{
          opacity: flash ? 0.4 : 0
        }}
        transition={{
          duration: 0.08,
          ease: 'easeOut'
        }}
      />

      {/* Screen shake effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          x: flash ? [0, -2, 2, 0] : 0
        }}
        transition={{
          duration: 0.1
        }}
      />
    </motion.div>
  );
};

export default ThunderOverlay;
