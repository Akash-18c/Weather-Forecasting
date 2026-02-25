import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const authAPI = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
};

export const weatherAPI = {
  getByCity: (city, units = 'metric') => 
    axios.get(`${API_URL}/weather/city/${city}?units=${units}`),
  getByCoords: (lat, lon, units = 'metric') => 
    axios.get(`${API_URL}/weather/coords?lat=${lat}&lon=${lon}&units=${units}`),
  getAQI: (lat, lon) => 
    axios.get(`${API_URL}/weather/aqi?lat=${lat}&lon=${lon}`),
};

export const userAPI = {
  addFavorite: (data) => axios.post(`${API_URL}/user/favorites`, data),
  getFavorites: () => axios.get(`${API_URL}/user/favorites`),
  removeFavorite: (city) => axios.delete(`${API_URL}/user/favorites/${city}`),
  updatePreferences: (data) => axios.put(`${API_URL}/user/preferences`, data),
};
