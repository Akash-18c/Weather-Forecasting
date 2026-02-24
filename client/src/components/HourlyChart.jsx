import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { formatTemp } from '../utils/weatherHelpers';
import { useWeather } from '../context/WeatherContext';
import { Clock, Droplets, Wind } from 'lucide-react';
import GlassCard from './GlassCard';
import DarkGlassCard from './DarkGlassCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const HourlyChart = ({ hourlyData }) => {
  const { unit, darkMode, theme } = useWeather();
  const isMorning = theme === 'morning';

  const hours = hourlyData.slice(0, 24).map(hour => {
    const date = new Date(hour.dt * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  });

  const temps = hourlyData.slice(0, 24).map(hour => Math.round(hour.temp));
  const humidity = hourlyData.slice(0, 24).map(hour => hour.humidity);
  const windSpeed = hourlyData.slice(0, 24).map(hour => Math.round(hour.wind_speed));

  const data = {
    labels: hours,
    datasets: [
      {
        label: 'Temperature',
        data: temps,
        borderColor: isMorning ? 'rgba(251, 146, 60, 1)' : 'rgba(34, 211, 238, 1)',
        backgroundColor: isMorning ? 'rgba(251, 146, 60, 0.3)' : 'rgba(34, 211, 238, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: isMorning ? 'rgba(251, 146, 60, 1)' : 'rgba(34, 211, 238, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointHoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2500,
      easing: 'easeInOutCubic',
      delay: (context) => context.dataIndex * 50,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isMorning ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
        titleColor: isMorning ? '#f97316' : '#22d3ee',
        bodyColor: isMorning ? '#1f2937' : '#fff',
        borderColor: isMorning ? 'rgba(251, 146, 60, 0.8)' : 'rgba(34, 211, 238, 0.5)',
        borderWidth: 2,
        padding: 16,
        displayColors: false,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) => {
            const idx = context.dataIndex;
            return [
              `Temp: ${context.parsed.y}°${unit === 'metric' ? 'C' : 'F'}`,
              `Humidity: ${humidity[idx]}%`,
              `Wind: ${windSpeed[idx]} ${unit === 'metric' ? 'm/s' : 'mph'}`
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isMorning ? 'rgba(251, 146, 60, 0.15)' : 'rgba(34, 211, 238, 0.1)',
          lineWidth: 1,
        },
        ticks: {
          color: isMorning ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          font: { size: 11, weight: '700' },
        },
      },
      y: {
        grid: {
          color: isMorning ? 'rgba(251, 146, 60, 0.15)' : 'rgba(34, 211, 238, 0.1)',
          lineWidth: 1,
        },
        ticks: {
          color: isMorning ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          font: { size: 12, weight: '700' },
          callback: (value) => `${value}°`,
        },
      },
    },
  };

  const avgHumidity = Math.round(humidity.reduce((a, b) => a + b, 0) / humidity.length);
  const avgWind = Math.round(windSpeed.reduce((a, b) => a + b, 0) / windSpeed.length);

  const CardComponent = isMorning ? GlassCard : DarkGlassCard;

  return (
    <CardComponent className="p-8" hover={false}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-2xl font-bold flex items-center gap-2 ${isMorning ? 'text-white' : 'text-white/90'}`}>
          <Clock className={isMorning ? 'w-6 h-6 text-white/90' : 'w-6 h-6 text-blue-300'} />
          Hourly Forecast (24h)
        </h3>
        <div className="flex gap-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isMorning ? 'bg-orange-500/30 border-orange-400/50' : 'bg-blue-500/20 border-blue-400/30'} border`}
          >
            <Droplets className={`w-4 h-4 ${isMorning ? 'text-orange-300' : 'text-blue-400'}`} />
            <span className="text-sm text-white font-semibold drop-shadow-md">{avgHumidity}%</span>
          </motion.div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isMorning ? 'bg-amber-500/30 border-amber-400/50' : 'bg-cyan-500/20 border-cyan-400/30'} border`}
          >
            <Wind className={`w-4 h-4 ${isMorning ? 'text-amber-300' : 'text-cyan-400'}`} />
            <span className="text-sm text-white font-semibold drop-shadow-md">{avgWind} {unit === 'metric' ? 'm/s' : 'mph'}</span>
          </motion.div>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="h-64"
      >
        <Line data={data} options={options} />
      </motion.div>
    </CardComponent>
  );
};

export default HourlyChart;
