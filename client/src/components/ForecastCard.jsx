import { motion } from 'framer-motion';
import { formatTemp } from '../utils/weatherHelpers';
import { useWeather } from '../context/WeatherContext';

const ForecastCard = ({ forecast }) => {
  const { unit } = useWeather();

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode.replace('n', 'd')}@2x.png`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.daily.slice(0, 7).map((day, index) => (
          <motion.div
            key={day.dt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 text-center"
          >
            <p className="font-bold mb-2 text-sm text-white">
              {getDayName(day.dt)}
            </p>
            
            <img
              src={getWeatherIcon(day.weather[0].icon)}
              alt={day.weather[0].description}
              className="w-16 h-16 mx-auto mb-2 drop-shadow-lg"
              style={{ filter: 'brightness(1.2) contrast(1.1)' }}
            />
            
            <p className="text-2xl font-bold text-white mb-1">
              {formatTemp(day.temp.max, unit)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastCard;
