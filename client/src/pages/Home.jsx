import { useState, useEffect } from 'react';
import { weatherAPI } from '../services/api';
import { useWeather } from '../context/WeatherContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { getTimeOfDay } from '../utils/weatherHelpers';
import AnimatedBackground from '../components/AnimatedBackground';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import HourlyChart from '../components/HourlyChart';
import AQICard from '../components/AQICard';
import AlertBanner from '../components/AlertBanner';
import WeatherMap from '../components/WeatherMap';
import Loader from '../components/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

const Home = () => {
  const { unit, setTheme } = useWeather();
  const { location: geoLocation, getLocation, error: geoError } = useGeolocation();
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [aqiData, setAQIData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await weatherAPI.getByCity(city, unit);
      setWeatherData(response.data.current);
      setForecastData(response.data.forecast);
      setLocation(response.data.location);
      setAQIData(response.data.aqi);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const response = await weatherAPI.getByCoords(lat, lon, unit);
      setWeatherData(response.data.current);
      setForecastData(response.data.forecast);
      setLocation(response.data.location);
      setAQIData(response.data.aqi);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    getLocation();
    setShowLocationPrompt(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!geoLocation && !weatherData) {
        setShowLocationPrompt(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (geoLocation) {
      fetchWeatherByCoords(geoLocation.lat, geoLocation.lon);
      setShowLocationPrompt(false);
    }
  }, [geoLocation, unit]);

  useEffect(() => {
    if (geoError) {
      setShowLocationPrompt(true);
    }
  }, [geoError]);

  useEffect(() => {
    if (weatherData && location && !geoLocation) {
      fetchWeatherByCoords(location.lat, location.lon);
    }
  }, [unit]);

  useEffect(() => {
    getLocation();
  }, []);

  // Auto-detect theme based on weather and time
  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.weather?.[0]?.main?.toLowerCase() || '';
      const timeOfDay = getTimeOfDay(weatherData.sys?.sunrise, weatherData.sys?.sunset);
      
      // Set theme based on weather condition priority, then time
      if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) {
        setTheme('rain');
      } else if (timeOfDay === 'night') {
        setTheme('night');
      } else if (timeOfDay === 'morning') {
        setTheme('morning');
      } else {
        setTheme('day');
      }
    }
  }, [weatherData, setTheme]);

  return (
    <AnimatedBackground 
      weatherCondition={weatherData?.weather?.[0]?.main}
      sunrise={weatherData?.sys?.sunrise}
      sunset={weatherData?.sys?.sunset}
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <AnimatePresence>
            {showLocationPrompt && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
              >
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-6 shadow-2xl border border-cyan-400/50 mx-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">Enable Location</h3>
                        <p className="text-white/80 text-sm">Get weather for your area</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowLocationPrompt(false)}
                      className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCurrentLocation}
                      className="flex-1 px-4 py-2 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                    >
                      Allow Location
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowLocationPrompt(false)}
                      className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
                    >
                      Later
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <SearchBar
            onSearch={fetchWeatherByCity}
            onCurrentLocation={handleCurrentLocation}
            loading={loading}
          />

          {error && (
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 text-red-400 text-center shadow-lg">
              {error}
            </div>
          )}

          {loading && <Loader message="Fetching weather data..." />}

          {!loading && weatherData && location && (
            <>
              <WeatherCard data={weatherData} location={location} />
              
              {forecastData?.daily && (
                <ForecastCard forecast={forecastData} />
              )}

              {forecastData?.hourly && (
                <HourlyChart hourlyData={forecastData.hourly} />
              )}

              {aqiData && <AQICard aqiData={aqiData} />}

              {forecastData?.alerts && (
                <AlertBanner alerts={forecastData.alerts} />
              )}

              <WeatherMap location={location} weatherData={weatherData} />
            </>
          )}

          {!loading && !weatherData && (
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to AtmoSync
              </h2>
              <p className="text-white/80 text-lg">
                Search for a city or use your current location to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default Home;
