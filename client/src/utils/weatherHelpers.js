export const getTimeOfDay = (sunrise, sunset, currentTime = Date.now() / 1000) => {
  const hour = new Date(currentTime * 1000).getHours();
  
  if (currentTime < sunrise) return 'night';
  if (currentTime >= sunrise && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'day';
  if (hour >= 17 && currentTime < sunset) return 'evening';
  return 'night';
};

export const getAQILevel = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: 'text-green-400', bg: 'bg-green-500/20' };
  if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'text-orange-400', bg: 'bg-orange-500/20' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-400', bg: 'bg-red-500/20' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-400', bg: 'bg-purple-500/20' };
  return { level: 'Hazardous', color: 'text-rose-600', bg: 'bg-rose-600/20' };
};

export const convertTemp = (temp, toUnit) => {
  if (toUnit === 'imperial') return (temp * 9/5) + 32;
  return (temp - 32) * 5/9;
};

export const formatTemp = (temp, unit) => {
  return `${Math.round(temp)}°${unit === 'metric' ? 'C' : 'F'}`;
};

export const getWeatherGradient = (condition, timeOfDay, darkMode) => {
  const conditions = condition?.toLowerCase() || '';
  
  if (conditions.includes('thunder')) {
    return darkMode 
      ? 'from-gray-900 via-gray-800 to-gray-900'
      : 'from-gray-700 via-gray-600 to-gray-700';
  }
  
  if (conditions.includes('rain') || conditions.includes('drizzle')) {
    return darkMode
      ? 'from-blue-950 via-slate-900 to-gray-900'
      : 'from-blue-900 via-slate-700 to-gray-700';
  }
  
  if (conditions.includes('snow')) {
    return darkMode
      ? 'from-slate-800 via-blue-900 to-slate-900'
      : 'from-slate-400 via-blue-300 to-slate-400';
  }
  
  if (conditions.includes('cloud')) {
    return darkMode
      ? 'from-slate-900 via-gray-800 to-slate-900'
      : 'from-slate-400 via-gray-300 to-slate-400';
  }
  
  switch (timeOfDay) {
    case 'morning':
      return darkMode
        ? 'from-blue-900 via-blue-800 to-blue-900'
        : 'from-[#0078D4] via-[#1E90FF] to-[#87CEEB]';
    case 'day':
      return darkMode
        ? 'from-blue-900 via-cyan-900 to-blue-900'
        : 'from-blue-400 via-cyan-300 to-blue-400';
    case 'evening':
      return darkMode
        ? 'from-orange-900 via-purple-900 to-blue-900'
        : 'from-orange-400 via-purple-400 to-blue-600';
    case 'night':
      return darkMode
        ? 'from-slate-950 via-blue-950 to-black'
        : 'from-slate-800 via-blue-900 to-black';
    default:
      return darkMode
        ? 'from-blue-900 via-cyan-900 to-blue-900'
        : 'from-blue-400 via-cyan-300 to-blue-400';
  }
};
