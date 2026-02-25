import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Gauge, Star } from 'lucide-react';
import { formatTemp } from '../utils/weatherHelpers';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import { useState, useMemo } from 'react';

const WeatherCard = ({ data, location }) => {
  const { unit } = useWeather();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

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

  const getWeatherIcon = () => {
    const iconCode = data?.weather[0]?.icon || '01d';
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-4xl font-bold mb-2 text-white">
            {location.name}
          </h2>
          <p className="text-lg capitalize text-white/80">
            {data.weather[0].description}
          </p>
        </div>
        {isAuthenticated && !isFavorite && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddFavorite}
            className="p-2 rounded-full bg-white/10 border border-white/30 hover:bg-white/20"
          >
            <Star className="w-6 h-6 text-yellow-300" />
          </motion.button>
        )}
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="text-8xl font-bold text-white">
          {formatTemp(data.main.temp, unit)}
        </div>
        
        <img
          src={getWeatherIcon()}
          alt="weather"
          className="w-40 h-40 drop-shadow-2xl"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-white/80">
            <Wind className="w-4 h-4" />
            <span className="text-sm">Wind</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {data.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-white/80">
            <Droplets className="w-4 h-4" />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.main.humidity}%</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-white/80">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Visibility</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {(data.visibility / 1000).toFixed(1)} km
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2 text-white/80">
            <Gauge className="w-4 h-4" />
            <span className="text-sm">Pressure</span>
          </div>
          <p className="text-2xl font-bold text-white">{data.main.pressure} hPa</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
