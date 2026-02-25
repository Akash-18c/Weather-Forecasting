import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, memo } from 'react';
import { getTimeOfDay, getWeatherGradient } from '../utils/weatherHelpers';
import { useParallax } from '../hooks/useParallax';

const AnimatedBackground = ({ weatherCondition, sunrise, sunset, children }) => {
  const parallax = useParallax();
  
  const timeOfDay = useMemo(() => 
    getTimeOfDay(sunrise, sunset), 
    [sunrise, sunset]
  );

  const gradient = useMemo(() => 
    getWeatherGradient(weatherCondition, timeOfDay, false),
    [weatherCondition, timeOfDay]
  );

  const showRain = useMemo(() => 
    weatherCondition?.toLowerCase().includes('rain') || weatherCondition?.toLowerCase().includes('drizzle'),
    [weatherCondition]
  );

  const showSnow = useMemo(() => 
    weatherCondition?.toLowerCase().includes('snow'),
    [weatherCondition]
  );

  const showThunder = useMemo(() => 
    weatherCondition?.toLowerCase().includes('thunder'),
    [weatherCondition]
  );

  const showClouds = useMemo(() => 
    !showRain && !showSnow && (timeOfDay === 'morning' || timeOfDay === 'day'),
    [showRain, showSnow, timeOfDay]
  );

  const clouds = useMemo(() => 
    showClouds ? Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: Math.random() * 60 + 10,
      delay: Math.random() * 10,
      duration: Math.random() * 50 + 60,
      size: Math.random() * 100 + 80,
      opacity: Math.random() * 0.15 + 0.1
    })) : [],
    [showClouds]
  );

  const raindrops = useMemo(() => 
    showRain ? Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 0.4 + 0.5
    })) : [],
    [showRain]
  );

  const snowflakes = useMemo(() => 
    showSnow ? Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 8,
      size: Math.random() * 3 + 2
    })) : [],
    [showSnow]
  );

  const showStars = timeOfDay === 'night' && !showRain && !showSnow;
  const stars = useMemo(() => 
    showStars ? Array.from({ length: 100 }, (_, i) => ({
      id: i,
      top: Math.random() * 70,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 3
    })) : [],
    [showStars]
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <motion.div
        key={gradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
      />

      {/* Sun/Moon */}
      <motion.div
        className="absolute top-20 right-32"
        style={{
          transform: `translate3d(${parallax.x * 0.2}px, ${parallax.y * 0.2}px, 0)`
        }}
      >
        {timeOfDay === 'night' ? (
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-95" />
            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 animate-pulse" />
          </div>
        ) : (
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 rounded-full" />
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-50" />
          </div>
        )}
      </motion.div>

      {/* Stars for night */}
      {showStars && (
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute bg-white rounded-full"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity
              }}
              animate={{ opacity: [star.opacity, star.opacity * 0.3, star.opacity] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: star.delay
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      {showClouds && clouds.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {clouds.map((cloud) => (
            <motion.div
              key={cloud.id}
              className="absolute"
              style={{ top: `${cloud.top}%` }}
              animate={{ x: ['-20%', '120%'] }}
              transition={{
                duration: cloud.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: cloud.delay
              }}
            >
              <div className="relative" style={{ width: `${cloud.size}px`, height: `${cloud.size * 0.5}px` }}>
                <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl" style={{ opacity: cloud.opacity }} />
                <div className="absolute left-1/4 -top-1/4 w-2/3 h-2/3 bg-white/30 rounded-full blur-xl" style={{ opacity: cloud.opacity * 0.8 }} />
                <div className="absolute right-1/4 top-1/4 w-1/2 h-1/2 bg-white/25 rounded-full blur-lg" style={{ opacity: cloud.opacity * 0.7 }} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Rain */}
      <AnimatePresence>
        {showRain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {raindrops.map((drop) => (
              <motion.div
                key={drop.id}
                className="absolute top-0 w-[1.5px] h-10 bg-gradient-to-b from-white/50 to-transparent"
                style={{
                  left: `${drop.left}%`,
                  transform: 'rotate(8deg)'
                }}
                animate={{ y: ['0vh', '110vh'] }}
                transition={{
                  duration: drop.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: drop.delay
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snow */}
      <AnimatePresence>
        {showSnow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {snowflakes.map((flake) => (
              <motion.div
                key={flake.id}
                className="absolute top-0 bg-white rounded-full"
                style={{
                  left: `${flake.left}%`,
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  opacity: 0.7
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, 15, 0, -15, 0]
                }}
                transition={{
                  y: { duration: flake.duration, repeat: Infinity, ease: 'linear', delay: flake.delay },
                  x: { duration: flake.duration / 2, repeat: Infinity, ease: 'easeInOut', delay: flake.delay }
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thunder */}
      {showThunder && (
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            repeatDelay: Math.random() * 6 + 3
          }}
        />
      )}

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default memo(AnimatedBackground);
