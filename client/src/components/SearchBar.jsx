import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, onCurrentLocation, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 pl-12 rounded-xl backdrop-blur-xl bg-white/20 border border-white/30 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 shadow-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 text-white font-bold hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
        >
          Search
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCurrentLocation}
          disabled={loading}
          className="p-3 rounded-xl backdrop-blur-xl bg-white/20 border border-white/30 text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          <MapPin className="w-5 h-5" />
        </motion.button>
      </form>
    </div>
  );
};

export default SearchBar;
