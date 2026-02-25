import { Link, useNavigate } from 'react-router-dom';
import { CloudRain, LogOut, User, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWeather } from '../context/WeatherContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { unit, toggleUnit } = useWeather();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <nav className="backdrop-blur-2xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-b border-cyan-500/30 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group" onClick={() => window.location.reload()}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-cyan-400 to-blue-500 p-1.5 rounded-lg"
            >
              <CloudRain className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight">AtmoSync</span>
          </Link>

          <div className="flex items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-xs text-cyan-400 font-semibold">{formatTime(currentTime)}</span>
                <span className="text-[10px] text-cyan-300/70">{formatDate(currentTime)}</span>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleUnit}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 text-cyan-200 text-sm font-bold hover:from-cyan-600/40 hover:to-blue-600/40 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10"
            >
              °{unit === 'metric' ? 'C' : 'F'}
            </motion.button>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 hover:from-cyan-600/40 hover:to-blue-600/40 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-500/10"
                  >
                    <User className="w-5 h-5 text-cyan-300" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-gradient-to-r from-red-600/30 to-pink-600/30 border border-red-400/40 hover:from-red-600/40 hover:to-pink-600/40 hover:border-red-400/60 transition-all shadow-lg shadow-red-500/10"
                >
                  <LogOut className="w-5 h-5 text-red-300" />
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-slate-600/40 to-slate-700/40 border border-slate-400/40 text-slate-200 hover:from-slate-600/50 hover:to-slate-700/50 hover:border-slate-400/60 transition-all font-medium shadow-lg shadow-slate-500/10"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 transition-all font-medium shadow-xl shadow-cyan-500/30"
                  >
                    Register
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
