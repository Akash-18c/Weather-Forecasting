import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import GradientSky from './weather/GradientSky';
import CelestialLayer from './weather/CelestialLayer';
import CloudLayer from './weather/CloudLayer';
import RainOverlay from './weather/RainOverlay';
import SnowOverlay from './weather/SnowOverlay';
import ThunderOverlay from './weather/ThunderOverlay';
import WetGlassOverlay from './weather/WetGlassOverlay';
import GrainOverlay from './weather/GrainOverlay';
import GlassReflectionLayer from './weather/GlassReflectionLayer';
import { useWeatherTheme } from '../hooks/useWeatherTheme';
import { useParallax } from '../hooks/useParallax';

const CinematicWeatherEngine = ({ weatherData, children }) => {
  const theme = useWeatherTheme(weatherData);
  const { x, y } = useParallax();

  const showRain = useMemo(() => 
    theme?.condition === 'Rain' || theme?.condition === 'Drizzle',
    [theme?.condition]
  );

  const showThunder = useMemo(() => 
    theme?.condition === 'Thunderstorm',
    [theme?.condition]
  );

  const showSnow = useMemo(() => 
    theme?.condition === 'Snow',
    [theme?.condition]
  );

  const showWetGlass = useMemo(() => 
    showRain || showThunder,
    [showRain, showThunder]
  );

  if (!theme) {
    return <div className="relative w-full min-h-screen bg-black">{children}</div>;
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Cinematic Intro Fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="absolute inset-0"
      >
        {/* Sky Gradient */}
        <GradientSky theme={theme} />

        {/* Celestial Bodies (Sun/Moon) */}
        <CelestialLayer theme={theme} parallax={{ x, y }} />

        {/* Cloud Layers */}
        <CloudLayer theme={theme} parallax={{ x, y }} />

        {/* Weather Effects */}
        <AnimatePresence mode="wait">
          {showRain && <RainOverlay key="rain" />}
          {showThunder && <ThunderOverlay key="thunder" />}
          {showSnow && <SnowOverlay key="snow" />}
        </AnimatePresence>

        {/* Wet Glass Effect */}
        <AnimatePresence>
          {showWetGlass && <WetGlassOverlay key="wetglass" />}
        </AnimatePresence>

        {/* Glass Reflection */}
        {(theme?.timeOfDay === 'morning' || theme?.timeOfDay === 'day') && (
          <GlassReflectionLayer />
        )}

        {/* Grain Overlay */}
        <GrainOverlay />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CinematicWeatherEngine;
