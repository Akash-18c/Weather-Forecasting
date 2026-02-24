import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, memo } from 'react';
import { getTimeOfDay, getWeatherGradient } from '../utils/weatherHelpers';
import { useWeather } from '../context/WeatherContext';
import { useParallax } from '../hooks/useParallax';

const AnimatedBackground = ({ weatherCondition, sunrise, sunset, children }) => {
  const { darkMode, theme } = useWeather();
  const parallax = useParallax();
  
  const timeOfDay = useMemo(() => 
    getTimeOfDay(sunrise, sunset), 
    [sunrise, sunset]
  );

  const gradient = useMemo(() => 
    getWeatherGradient(weatherCondition, timeOfDay, darkMode),
    [weatherCondition, timeOfDay, darkMode]
  );

  const isMorningMode = theme === 'morning';

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

  const clouds = useMemo(() => 
    isMorningMode ? Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: Math.random() * 50 + 10,
      delay: Math.random() * 15,
      duration: Math.random() * 40 + 50,
      size: Math.random() * 80 + 50,
      opacity: Math.random() * 0.3 + 0.2
    })) : [],
    [isMorningMode]
  );

  const raindrops = useMemo(() => 
    showRain ? Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 0.5 + 0.5
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

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      <motion.div
        key={gradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className={`absolute inset-0 bg-gradient-to-b ${gradient}`}
      />

      {isMorningMode && (
        <>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-transparent to-orange-200/30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20" />
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.2) 0%, transparent 50%)',
              backgroundSize: '200% 200%'
            }}
          />
        </>
      )}

      <motion.div
        className="absolute top-20 right-32"
        style={{
          transform: `translate3d(${parallax.x * 0.3}px, ${parallax.y * 0.3}px, 0)`
        }}
      >
        {timeOfDay === 'night' ? (
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-90" />
            <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 animate-pulse-slow" />
          </div>
        ) : (
          <div className="w-32 h-32 relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-yellow-300 rounded-full"
            />
            <div className="absolute inset-0 bg-yellow-200 rounded-full blur-2xl opacity-60" />
          </div>
        )}
      </motion.div>

      {isMorningMode && clouds.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
          {clouds.map((cloud) => (
            <motion.div
              key={cloud.id}
              className="absolute"
              style={{ top: `${cloud.top}%` }}
              animate={{ x: ['-25%', '125%'] }}
              transition={{
                duration: cloud.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: cloud.delay
              }}
            >
              <div className="relative" style={{ width: `${cloud.size}px`, height: `${cloud.size * 0.5}px` }}>
                <div className="absolute inset-0 bg-white/50 rounded-full blur-2xl" />
                <div className="absolute left-1/4 -top-1/4 w-2/3 h-2/3 bg-white/40 rounded-full blur-xl" />
                <div className="absolute right-1/4 top-1/4 w-1/2 h-1/2 bg-white/35 rounded-full blur-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
                className="absolute top-0 w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
                style={{
                  left: `${drop.left}%`,
                  transform: 'rotate(10deg)'
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
                  opacity: 0.6
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

      {showThunder && (
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 8 + 4
          }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default memo(AnimatedBackground);
