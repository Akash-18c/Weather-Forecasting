import { motion } from 'framer-motion';
import { formatTemp } from '../utils/weatherHelpers';
import { useWeather } from '../context/WeatherContext';
import { Droplets, Sun, Cloud, CloudRain, CloudSnow, Wind, Gauge } from 'lucide-react';
import GlassCard from './GlassCard';
import DarkGlassCard from './DarkGlassCard';

const ForecastCard = ({ forecast }) => {
  const { unit, theme } = useWeather();
  const isMorning = theme === 'morning';

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getWeatherIcon = (iconCode) => {
    if (iconCode.includes('01')) return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <Sun className="w-12 h-12 text-amber-400" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl"
        />
      </motion.div>
    );
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return <Cloud className="w-12 h-12 text-slate-300" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-12 h-12 text-blue-400" />;
    if (iconCode.includes('13')) return <CloudSnow className="w-12 h-12 text-cyan-300 animate-bounce" />;
    if (iconCode.includes('50')) return <Wind className="w-12 h-12 text-gray-400" />;
    return <Cloud className="w-12 h-12 text-slate-300" />;
  };

  const getCardGradient = (iconCode, isMorning) => {
    if (iconCode.includes('01')) return isMorning 
      ? 'from-amber-400/30 via-orange-400/25 to-yellow-300/30 border-amber-300/50 shadow-amber-400/20' 
      : 'from-amber-500/20 via-orange-500/20 to-yellow-500/20 border-amber-400/40';
    if (iconCode.includes('09') || iconCode.includes('10')) return isMorning
      ? 'from-blue-400/25 via-sky-400/20 to-cyan-400/25 border-blue-300/50 shadow-blue-400/20'
      : 'from-blue-500/20 via-indigo-500/20 to-cyan-500/20 border-blue-400/40';
    if (iconCode.includes('13')) return isMorning
      ? 'from-cyan-300/25 via-blue-300/20 to-indigo-300/25 border-cyan-300/50 shadow-cyan-400/20'
      : 'from-cyan-400/20 via-blue-400/20 to-indigo-400/20 border-cyan-400/40';
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return isMorning
      ? 'from-slate-300/25 via-gray-300/20 to-zinc-300/25 border-slate-300/50 shadow-slate-400/20'
      : 'from-slate-500/20 via-gray-500/20 to-zinc-500/20 border-slate-400/40';
    return isMorning
      ? 'from-purple-300/25 via-pink-300/20 to-rose-300/25 border-purple-300/50 shadow-purple-400/20'
      : 'from-purple-500/20 via-pink-500/20 to-rose-500/20 border-purple-400/40';
  };

  const CardComponent = isMorning ? GlassCard : DarkGlassCard;

  return (
    <CardComponent className="p-8" hover={false}>
      <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isMorning ? 'text-white' : 'text-white/90'}`}>
        <Sun className={isMorning ? 'w-6 h-6 text-yellow-200' : 'w-6 h-6 text-blue-300'} />
        7-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.daily.slice(0, 7).map((day, index) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -8, rotateY: 5 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className={`bg-gradient-to-br ${getCardGradient(day.weather[0].icon, isMorning)} border backdrop-blur-md rounded-2xl p-4 text-center hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
            
            <p className={`font-bold mb-3 text-sm ${isMorning ? 'text-white drop-shadow-lg' : 'text-white'}`}>
              {index === 0 ? 'Today' : getDayName(day.dt)}
            </p>
            
            <div className="flex justify-center mb-3">
              {getWeatherIcon(day.weather[0].icon)}
            </div>
            
            <div className="space-y-1 mb-2">
              <p className={`text-2xl font-bold ${isMorning ? 'text-white drop-shadow-md' : 'text-white'}`}>
                {formatTemp(day.temp.max, unit)}
              </p>
              <p className={`text-sm ${isMorning ? 'text-white/80' : 'text-white/70'}`}>
                {formatTemp(day.temp.min, unit)}
              </p>
            </div>

            <p className={`text-xs mt-2 capitalize ${isMorning ? 'text-white/90 font-medium' : 'text-white/80'}`}>
              {day.weather[0].description}
            </p>

            <div className="mt-3 space-y-1.5">
              {day.pop > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center justify-center gap-1 ${isMorning ? 'text-blue-600' : 'text-blue-300'}`}
                >
                  <Droplets className="w-3 h-3" />
                  <span className="text-xs font-semibold">{Math.round(day.pop * 100)}%</span>
                </motion.div>
              )}
              
              <div className={`flex items-center justify-center gap-1 ${isMorning ? 'text-white/80' : 'text-white/70'}`}>
                <Wind className="w-3 h-3" />
                <span className="text-xs">{Math.round(day.wind_speed)} {unit === 'metric' ? 'm/s' : 'mph'}</span>
              </div>
              
              {day.uvi && (
                <div className={`flex items-center justify-center gap-1 ${isMorning ? 'text-orange-600' : 'text-orange-400'}`}>
                  <Gauge className="w-3 h-3" />
                  <span className="text-xs">UV {Math.round(day.uvi)}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </CardComponent>
  );
};

export default ForecastCard;
