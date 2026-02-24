import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 1.5 });
  }, [center, map]);
  return null;
};

const WeatherMap = ({ location, weatherData }) => {
  const center = [location.lat, location.lon];
  const [mapLayer, setMapLayer] = useState('standard');

  const layers = {
    standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    satelliteLabels: 'https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Weather Map</h3>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMapLayer('standard')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg ${
              mapLayer === 'standard'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/50'
                : 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-cyan-400/50'
            }`}
          >
            Standard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMapLayer('dark')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg ${
              mapLayer === 'dark'
                ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-slate-700/50'
                : 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-slate-400/50'
            }`}
          >
            Dark
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMapLayer('satellite')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg ${
              mapLayer === 'satellite'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/50'
                : 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-green-400/50'
            }`}
          >
            Satellite
          </motion.button>
        </div>
      </div>
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
        className="h-96 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl shadow-cyan-500/30 ring-4 ring-cyan-500/10"
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
          zoomControl={true}
        >
          <MapUpdater center={center} />
          
          <TileLayer
            url={layers[mapLayer]}
            attribution='&copy; OpenStreetMap'
          />
          
          {mapLayer === 'satellite' && (
            <TileLayer
              url={layers.satelliteLabels}
              attribution='&copy; Google'
            />
          )}
          
          <Circle
            center={center}
            radius={5000}
            pathOptions={{
              color: '#06b6d4',
              fillColor: '#22d3ee',
              fillOpacity: 0.2,
              weight: 3,
              dashArray: '10, 10',
              className: 'animate-pulse'
            }}
          />
          
          <Circle
            center={center}
            radius={2000}
            pathOptions={{
              color: '#0ea5e9',
              fillColor: '#38bdf8',
              fillOpacity: 0.3,
              weight: 2
            }}
          />
          
          <Marker position={center}>
            <Popup>
              <div className="text-center p-2">
                <p className="font-bold text-lg text-cyan-600">{location.name}</p>
                <p className="text-gray-600 capitalize">{weatherData.weather[0].description}</p>
                <p className="text-2xl font-bold text-cyan-600 mt-1">{Math.round(weatherData.main.temp)}°</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </motion.div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-2 border-cyan-400/50 rounded-xl px-4 py-3 shadow-lg"
        >
          <p className="text-cyan-300 text-xs font-bold mb-1">Latitude</p>
          <p className="text-white font-bold text-lg">{location.lat.toFixed(4)}°</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="bg-gradient-to-br from-blue-500/30 to-indigo-500/30 border-2 border-blue-400/50 rounded-xl px-4 py-3 shadow-lg"
        >
          <p className="text-blue-300 text-xs font-bold mb-1">Longitude</p>
          <p className="text-white font-bold text-lg">{location.lon.toFixed(4)}°</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400/50 rounded-xl px-4 py-3 shadow-lg"
        >
          <p className="text-purple-300 text-xs font-bold mb-1">Country</p>
          <p className="text-white font-bold text-lg">{location.country}</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="bg-gradient-to-br from-pink-500/30 to-red-500/30 border-2 border-pink-400/50 rounded-xl px-4 py-3 shadow-lg flex items-center gap-2"
        >
          <Navigation className="w-5 h-5 text-pink-300" />
          <div>
            <p className="text-pink-300 text-xs font-bold">Zoom Level</p>
            <p className="text-white font-bold text-lg">11x</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherMap;
