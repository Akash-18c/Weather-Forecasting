import { motion } from 'framer-motion';
import { Wind, AlertCircle } from 'lucide-react';
import { getAQILevel } from '../utils/weatherHelpers';
import GlassCard from './GlassCard';
import DarkGlassCard from './DarkGlassCard';
import { useWeather } from '../context/WeatherContext';

const AQICard = ({ aqiData }) => {
  const { theme } = useWeather();
  const isMorning = theme === 'morning';
  const CardComponent = isMorning ? GlassCard : DarkGlassCard;
  
  if (!aqiData || !aqiData.index) {
    return (
      <CardComponent className="p-8" hover={false}>
        <div className="flex items-center gap-3 mb-6">
          <Wind className={isMorning ? 'w-6 h-6 text-white/90' : 'w-6 h-6 text-blue-300'} />
          <h3 className={`text-2xl font-bold ${isMorning ? 'text-white' : 'text-white/90'}`}>Air Quality Index</h3>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <AlertCircle className="w-5 h-5" />
          <p>AQI data unavailable for this location</p>
        </div>
      </CardComponent>
    );
  }

  const aqi = aqiData.index;
  const components = aqiData.components || {};
  const aqiInfo = getAQILevel(aqi);

  return (
    <CardComponent className="p-8" hover={false}>
      <div className="flex items-center gap-3 mb-6">
        <Wind className={isMorning ? 'w-6 h-6 text-white/90' : 'w-6 h-6 text-blue-300'} />
        <h3 className={`text-2xl font-bold ${isMorning ? 'text-white' : 'text-white/90'}`}>Air Quality Index</h3>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`text-7xl font-bold ${aqiInfo.color} mb-2`}
          >
            {aqi}
          </motion.div>
          <div className={`inline-block px-4 py-2 rounded-lg ${aqiInfo.bg} ${aqiInfo.color} font-semibold text-lg`}>
            {aqiInfo.level}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {components.pm2_5 !== undefined && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-xl p-4"
          >
            <p className="text-purple-400 text-sm font-semibold mb-1">PM2.5</p>
            <p className="text-2xl font-bold text-white">{components.pm2_5.toFixed(1)}</p>
            <p className="text-xs text-white/60">μg/m³</p>
          </motion.div>
        )}
        {components.pm10 !== undefined && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/30 rounded-xl p-4"
          >
            <p className="text-blue-400 text-sm font-semibold mb-1">PM10</p>
            <p className="text-2xl font-bold text-white">{components.pm10.toFixed(1)}</p>
            <p className="text-xs text-white/60">μg/m³</p>
          </motion.div>
        )}
        {components.o3 !== undefined && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-400/30 rounded-xl p-4"
          >
            <p className="text-cyan-400 text-sm font-semibold mb-1">O₃ (Ozone)</p>
            <p className="text-2xl font-bold text-white">{components.o3.toFixed(1)}</p>
            <p className="text-xs text-white/60">μg/m³</p>
          </motion.div>
        )}
        {components.no2 !== undefined && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-400/30 rounded-xl p-4"
          >
            <p className="text-orange-400 text-sm font-semibold mb-1">NO₂</p>
            <p className="text-2xl font-bold text-white">{components.no2.toFixed(1)}</p>
            <p className="text-xs text-white/60">μg/m³</p>
          </motion.div>
        )}
        {components.so2 !== undefined && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-xl p-4"
          >
            <p className="text-yellow-400 text-sm font-semibold mb-1">SO₂</p>
            <p className="text-2xl font-bold text-white">{components.so2.toFixed(1)}</p>
            <p className="text-xs text-white/60">μg/m³</p>
          </motion.div>
        )}
        {components.co !== undefined && (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-400/30 rounded-xl p-4"
          >
            <p className="text-red-400 text-sm font-semibold mb-1">CO</p>
            <p className="text-2xl font-bold text-white">{(components.co / 1000).toFixed(2)}</p>
            <p className="text-xs text-white/60">mg/m³</p>
          </motion.div>
        )}
      </div>
    </CardComponent>
  );
};

export default AQICard;
