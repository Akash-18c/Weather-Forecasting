import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within WeatherProvider');
  return context;
};

export const WeatherProvider = ({ children }) => {
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'morning');

  useEffect(() => {
    localStorage.setItem('unit', unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'morning' ? 'night' : 'morning');
  };

  return (
    <WeatherContext.Provider value={{ unit, darkMode, theme, toggleUnit, toggleDarkMode, toggleTheme }}>
      {children}
    </WeatherContext.Provider>
  );
};
