import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, MapPin, RefreshCw } from 'lucide-react';
import { userAPI, weatherAPI } from '../services/api';
import { useWeather } from '../context/WeatherContext';
import { formatTemp } from '../utils/weatherHelpers';
import AnimatedBackground from '../components/AnimatedBackground';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { unit } = useWeather();
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = async () => {
    try {
      const response = await userAPI.getFavorites();
      setFavorites(response.data.favorites);
      await fetchWeatherForFavorites(response.data.favorites);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherForFavorites = async (favs) => {
    const weatherPromises = favs.map(async (fav) => {
      try {
        const response = await weatherAPI.getByCoords(fav.lat, fav.lon, unit);
        return { city: fav.city, data: response.data.current };
      } catch (error) {
        return { city: fav.city, data: null };
      }
    });

    const results = await Promise.all(weatherPromises);
    const weatherMap = {};
    results.forEach(({ city, data }) => {
      weatherMap[city] = data;
    });
    setWeatherData(weatherMap);
  };

  const handleRemove = async (city) => {
    try {
      await userAPI.removeFavorite(city);
      setFavorites(favorites.filter(fav => fav.city !== city));
      const newWeatherData = { ...weatherData };
      delete newWeatherData[city];
      setWeatherData(newWeatherData);
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchWeatherForFavorites(favorites);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      fetchWeatherForFavorites(favorites);
    }
  }, [unit]);

  if (loading) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen py-8 px-4">
          <Loader message="Loading your favorites..." />
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">My Favorite Cities</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-3 rounded-xl glass dark:glass-dark text-white hover:bg-white/20 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>

          {favorites.length === 0 ? (
            <div className="glass dark:glass-dark rounded-3xl p-12 text-center">
              <MapPin className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h2>
              <p className="text-white/70">
                Search for cities and add them to your favorites to see them here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((fav, index) => {
                const weather = weatherData[fav.city];
                return (
                  <motion.div
                    key={fav.city}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass dark:glass-dark rounded-2xl p-6 shadow-xl hover:bg-white/20 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{fav.city}</h3>
                        <p className="text-white/60 text-sm">{fav.country}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(fav.city)}
                        className="p-2 rounded-lg glass dark:glass-dark hover:bg-red-500/20 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </div>

                    {weather ? (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-5xl font-bold text-white">
                            {formatTemp(weather.main.temp, unit)}
                          </div>
                          <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            className="w-20 h-20"
                          />
                        </div>
                        <p className="text-white/80 capitalize mb-4">
                          {weather.weather[0].description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="glass dark:glass-dark rounded-lg p-2">
                            <p className="text-white/60">Humidity</p>
                            <p className="text-white font-semibold">{weather.main.humidity}%</p>
                          </div>
                          <div className="glass dark:glass-dark rounded-lg p-2">
                            <p className="text-white/60">Wind</p>
                            <p className="text-white font-semibold">
                              {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-white/60 text-center py-8">
                        Loading weather...
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Dashboard;
