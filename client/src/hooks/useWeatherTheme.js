import { useMemo } from 'react';

export const useWeatherTheme = (weatherData) => {
  return useMemo(() => {
    if (!weatherData) {
      return {
        timeOfDay: 'day',
        condition: 'Clear',
        gradient: 'from-blue-400 via-cyan-300 to-blue-400'
      };
    }

    const currentTime = Date.now() / 1000;
    const sunrise = weatherData.sys?.sunrise || 0;
    const sunset = weatherData.sys?.sunset || 0;
    const condition = weatherData.weather?.[0]?.main || 'Clear';

    let timeOfDay = 'day';
    const hour = new Date().getHours();

    if (currentTime < sunrise || currentTime > sunset + 3600) {
      timeOfDay = 'night';
    } else if (currentTime >= sunrise && currentTime < sunrise + 10800) {
      timeOfDay = 'morning';
    } else if (currentTime >= sunset - 3600 && currentTime <= sunset + 3600) {
      timeOfDay = 'evening';
    } else {
      timeOfDay = 'day';
    }

    const getGradient = () => {
      if (condition === 'Thunderstorm') {
        return 'from-gray-900 via-gray-800 to-gray-900';
      }

      if (condition === 'Rain' || condition === 'Drizzle') {
        return timeOfDay === 'night'
          ? 'from-slate-900 via-blue-950 to-slate-900'
          : 'from-slate-600 via-blue-700 to-slate-600';
      }

      if (condition === 'Snow') {
        return 'from-slate-300 via-blue-200 to-slate-300';
      }

      switch (timeOfDay) {
        case 'morning':
          return 'from-orange-400 via-pink-400 to-purple-500';
        case 'evening':
          return 'from-orange-500 via-purple-500 to-blue-800';
        case 'night':
          return 'from-slate-950 via-blue-950 to-black';
        default:
          return 'from-blue-400 via-cyan-300 to-blue-500';
      }
    };

    return {
      timeOfDay,
      condition,
      gradient: getGradient(),
      sunrise,
      sunset,
      currentTime
    };
  }, [weatherData]);
};
