import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Gauge, Star } from 'lucide-react';
import { formatTemp } from '../utils/weatherHelpers';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import { useState, useMemo } from 'react';
import { sunImage, moonImage } from '../assets/images';
import GlassCard from './GlassCard';
import DarkGlassCard from './DarkGlassCard';

const WeatherCard = ({ data, location }) => {
  const { unit, theme } = useWeather();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const isMorning = theme === 'morning';

  const isNightTime = useMemo(() => {
    const iconCode = data?.weather[0]?.icon || '';
    return iconCode.endsWith('n');
  }, [data]);

  const handleAddFavorite = async () => {
    if (!isAuthenticated) return;
    try {
      await userAPI.addFavorite({
        city: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
      });
      setIsFavorite(true);
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  };

  const CardComponent = isMorning ? GlassCard : DarkGlassCard;

  return (
    <CardComponent className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-4xl font-bold mb-2 ${isMorning ? 'text-white drop-shadow-lg' : 'text-white/90'}`}
          >
            {location.name}, {location.country}
          </motion.h2>
          <p className={`text-lg capitalize font-medium ${isMorning ? 'text-white/80' : 'text-white/70'}`}>
            {data.weather[0].description}
          </p>
        </div>
        {isAuthenticated && !isFavorite && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddFavorite}
            className="p-2 rounded-full bg-white/10 border border-white/30 hover:bg-white/20 transition-all"
          >
            <Star className="w-6 h-6 text-yellow-300" />
          </motion.button>
        )}
      </div>

      <div className="flex items-center justify-between mb-8">
        <motion.div
          className={`text-8xl font-bold ${isMorning ? 'text-white' : 'text-white/90'}`}
          style={isMorning ? { textShadow: '0 0 40px rgba(255,255,255,0.3)' } : {}}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {formatTemp(data.main.temp, unit)}
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -10, 0], rotate: isNightTime ? [0, 5, 0, -5, 0] : 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          <img
            src={isNightTime ? moonImage : sunImage}
            alt={isNightTime ? 'Moon' : 'Sun'}
            className="w-32 h-32 drop-shadow-2xl"
          />
          {!isNightTime && (
            <motion.div
              className="absolute inset-0 rounded-full bg-yellow-400/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`rounded-xl p-4 ${isMorning ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'}`}
        >
          <div className={`flex items-center gap-2 mb-2 ${isMorning ? 'text-white/90' : 'text-blue-300'}`}>
            <Wind className="w-4 h-4" />
            <span className="text-sm font-semibold">Wind</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`rounded-xl p-4 ${isMorning ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'}`}
        >
          <div className={`flex items-center gap-2 mb-2 ${isMorning ? 'text-white/90' : 'text-blue-300'}`}>
            <Droplets className="w-4 h-4" />
            <span className="text-sm font-semibold">Humidity</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.main.humidity}%</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`rounded-xl p-4 ${isMorning ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'}`}
        >
          <div className={`flex items-center gap-2 mb-2 ${isMorning ? 'text-white/90' : 'text-blue-300'}`}>
            <Eye className="w-4 h-4" />
            <span className="text-sm font-semibold">Visibility</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {(data.visibility / 1000).toFixed(1)} km
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`rounded-xl p-4 ${isMorning ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/10'}`}
        >
          <div className={`flex items-center gap-2 mb-2 ${isMorning ? 'text-white/90' : 'text-blue-300'}`}>
            <Gauge className="w-4 h-4" />
            <span className="text-sm font-semibold">Pressure</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.main.pressure} hPa</p>
        </motion.div>
      </div>
    </CardComponent>
  );
};

export default WeatherCard;
