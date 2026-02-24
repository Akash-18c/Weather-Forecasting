import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getApiKey = () => process.env.OPENWEATHER_API_KEY;

const calculateUSAQI = (pm25) => {
  const breakpoints = [
    { cLow: 0, cHigh: 12, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 500, iLow: 301, iHigh: 500 }
  ];

  for (let bp of breakpoints) {
    if (pm25 >= bp.cLow && pm25 <= bp.cHigh) {
      return Math.round(((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.iLow);
    }
  }
  return pm25 > 500 ? 500 : 0;
};

const getAQILabel = (aqi) => {
  if (aqi <= 50) return { label: 'Good', color: 'green' };
  if (aqi <= 100) return { label: 'Moderate', color: 'yellow' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'orange' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'red' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'purple' };
  return { label: 'Hazardous', color: 'maroon' };
};

export const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const { units = 'metric' } = req.query;
    const API_KEY = getApiKey();
    
    if (!API_KEY || API_KEY === 'your_openweather_api_key_here') {
      return res.status(500).json({ error: 'OpenWeather API key not configured. Please add your API key to server/.env file' });
    }

    const weatherResponse = await axios.get(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`
    );

    const { coord, name, sys } = weatherResponse.data;
    const lat = coord.lat;
    const lon = coord.lon;

    const [forecastResponse, oneCallResponse, aqiResponse] = await Promise.all([
      axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`),
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${API_KEY}`)
        .catch(() => null),
      axios.get(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .catch(err => {
          console.log('AQI unavailable:', err.message);
          return null;
        })
    ]);

    const hourlyData = forecastResponse.data.list.slice(0, 8).map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      weather: item.weather,
      wind_speed: item.wind.speed,
      pop: item.pop || 0
    }));

    const dailyMap = {};
    forecastResponse.data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyMap[date]) {
        dailyMap[date] = {
          dt: item.dt,
          temp: { 
            min: item.main.temp_min, 
            max: item.main.temp_max, 
            day: item.main.temp 
          },
          feels_like: { day: item.main.feels_like },
          pressure: item.main.pressure,
          humidity: item.main.humidity,
          weather: item.weather,
          wind_speed: item.wind.speed,
          pop: item.pop || 0,
          clouds: item.clouds.all
        };
      } else {
        dailyMap[date].temp.min = Math.min(dailyMap[date].temp.min, item.main.temp_min);
        dailyMap[date].temp.max = Math.max(dailyMap[date].temp.max, item.main.temp_max);
        dailyMap[date].pop = Math.max(dailyMap[date].pop, item.pop || 0);
      }
    });

    const dailyData = oneCallResponse?.data?.daily 
      ? oneCallResponse.data.daily.slice(1, 8).map(day => ({
          dt: day.dt,
          temp: day.temp,
          feels_like: day.feels_like,
          pressure: day.pressure,
          humidity: day.humidity,
          weather: day.weather,
          wind_speed: day.wind_speed,
          pop: day.pop || 0,
          clouds: day.clouds,
          uvi: day.uvi
        }))
      : Object.values(dailyMap);

    let aqiData = null;
    if (aqiResponse?.data?.list && aqiResponse.data.list.length > 0) {
      const aqiInfo = aqiResponse.data.list[0];
      const usAQI = calculateUSAQI(aqiInfo.components.pm2_5);
      const aqiLabel = getAQILabel(usAQI);
      aqiData = {
        index: usAQI,
        level: aqiLabel.label,
        color: aqiLabel.color,
        components: {
          co: aqiInfo.components.co,
          no: aqiInfo.components.no,
          no2: aqiInfo.components.no2,
          o3: aqiInfo.components.o3,
          so2: aqiInfo.components.so2,
          pm2_5: aqiInfo.components.pm2_5,
          pm10: aqiInfo.components.pm10,
          nh3: aqiInfo.components.nh3
        }
      };
    }

    res.json({
      location: { 
        name, 
        country: sys.country, 
        lat, 
        lon 
      },
      current: weatherResponse.data,
      forecast: {
        hourly: hourlyData,
        daily: dailyData
      },
      aqi: aqiData
    });
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'Location not found' });
    } else if (error.response?.status === 401) {
      res.status(500).json({ error: 'Invalid API key. Please check your OpenWeather API key in server/.env file' });
    } else {
      res.status(500).json({ error: error.response?.data?.message || 'Failed to fetch weather data' });
    }
  }
};

export const getWeatherByCoords = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const { units = 'metric' } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const API_KEY = getApiKey();
    
    if (!API_KEY || API_KEY === 'your_openweather_api_key_here') {
      return res.status(500).json({ error: 'OpenWeather API key not configured. Please add your API key to server/.env file' });
    }

    const [weatherResponse, forecastResponse, oneCallResponse, aqiResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`),
      axios.get(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`),
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${API_KEY}`)
        .catch(() => null),
      axios.get(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .catch(err => {
          console.log('AQI unavailable:', err.message);
          return null;
        })
    ]);

    const hourlyData = forecastResponse.data.list.slice(0, 8).map(item => ({
      dt: item.dt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      weather: item.weather,
      wind_speed: item.wind.speed,
      pop: item.pop || 0
    }));

    const dailyMap = {};
    forecastResponse.data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyMap[date]) {
        dailyMap[date] = {
          dt: item.dt,
          temp: { 
            min: item.main.temp_min, 
            max: item.main.temp_max, 
            day: item.main.temp 
          },
          feels_like: { day: item.main.feels_like },
          pressure: item.main.pressure,
          humidity: item.main.humidity,
          weather: item.weather,
          wind_speed: item.wind.speed,
          pop: item.pop || 0,
          clouds: item.clouds.all
        };
      } else {
        dailyMap[date].temp.min = Math.min(dailyMap[date].temp.min, item.main.temp_min);
        dailyMap[date].temp.max = Math.max(dailyMap[date].temp.max, item.main.temp_max);
        dailyMap[date].pop = Math.max(dailyMap[date].pop, item.pop || 0);
      }
    });

    const dailyData = oneCallResponse?.data?.daily 
      ? oneCallResponse.data.daily.slice(1, 8).map(day => ({
          dt: day.dt,
          temp: day.temp,
          feels_like: day.feels_like,
          pressure: day.pressure,
          humidity: day.humidity,
          weather: day.weather,
          wind_speed: day.wind_speed,
          pop: day.pop || 0,
          clouds: day.clouds,
          uvi: day.uvi
        }))
      : Object.values(dailyMap);

    let aqiData = null;
    if (aqiResponse?.data?.list && aqiResponse.data.list.length > 0) {
      const aqiInfo = aqiResponse.data.list[0];
      const usAQI = calculateUSAQI(aqiInfo.components.pm2_5);
      const aqiLabel = getAQILabel(usAQI);
      aqiData = {
        index: usAQI,
        level: aqiLabel.label,
        color: aqiLabel.color,
        components: {
          co: aqiInfo.components.co,
          no: aqiInfo.components.no,
          no2: aqiInfo.components.no2,
          o3: aqiInfo.components.o3,
          so2: aqiInfo.components.so2,
          pm2_5: aqiInfo.components.pm2_5,
          pm10: aqiInfo.components.pm10,
          nh3: aqiInfo.components.nh3
        }
      };
    }

    res.json({
      location: {
        name: weatherResponse.data.name,
        country: weatherResponse.data.sys.country,
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      },
      current: weatherResponse.data,
      forecast: {
        hourly: hourlyData,
        daily: dailyData
      },
      aqi: aqiData
    });
  } catch (error) {
    console.error('Weather API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      res.status(500).json({ error: 'Invalid API key. Please check your OpenWeather API key in server/.env file' });
    } else {
      res.status(500).json({ error: error.response?.data?.message || 'Failed to fetch weather data' });
    }
  }
};

export const getAirQuality = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const API_KEY = getApiKey();
    
    const response = await axios.get(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('AQI API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
};
