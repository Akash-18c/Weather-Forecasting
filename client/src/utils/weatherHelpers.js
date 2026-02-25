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
  
  // Rain/Storm - Dark blue
  if (conditions.includes('thunder')) {
    return darkMode ? 'from-[#0f172a] via-[#1e293b] to-[#0f172a]' : 'from-[#1e3a5f] via-[#2d4a6f] to-[#1e3a5f]';
  }
  
  if (conditions.includes('rain') || conditions.includes('drizzle')) {
    return darkMode ? 'from-[#1e3a5f] via-[#2c5282] to-[#1e3a5f]' : 'from-[#2563eb] via-[#3b82f6] to-[#2563eb]';
  }
  
  if (conditions.includes('snow')) {
    return darkMode ? 'from-[#334155] via-[#475569] to-[#334155]' : 'from-[#60a5fa] via-[#93c5fd] to-[#60a5fa]';
  }
  
  if (conditions.includes('cloud')) {
    return timeOfDay === 'night' || darkMode
      ? 'from-[#1e293b] via-[#334155] to-[#1e293b]'
      : 'from-[#3b82f6] via-[#60a5fa] to-[#3b82f6]';
  }
  
  // Time-based - Professional blue
  switch (timeOfDay) {
    case 'morning':
      return darkMode ? 'from-[#1e3a8a] via-[#2563eb] to-[#1e40af]' : 'from-[#3b82f6] via-[#60a5fa] to-[#93c5fd]';
    case 'day':
      return darkMode ? 'from-[#1e40af] via-[#2563eb] to-[#1e3a8a]' : 'from-[#2563eb] via-[#3b82f6] to-[#60a5fa]';
    case 'evening':
      return darkMode ? 'from-[#0f172a] via-[#1e3a8a] to-[#0f172a]' : 'from-[#1e40af] via-[#3b82f6] to-[#1e3a8a]';
    case 'night':
      return 'from-[#0f172a] via-[#1e293b] to-[#0f172a]';
    default:
      return darkMode ? 'from-[#1e40af] via-[#2563eb] to-[#1e3a8a]' : 'from-[#2563eb] via-[#3b82f6] to-[#60a5fa]';
  }
};
