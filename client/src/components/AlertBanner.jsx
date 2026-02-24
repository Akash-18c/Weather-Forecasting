import { motion } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';

const AlertBanner = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl"
      >
        <div className="flex items-center gap-3 text-green-400">
          <Info className="w-5 h-5" />
          <p className="font-medium">No active weather alerts</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      {alerts.map((alert, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl border-l-4 border-red-500"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white mb-2">{alert.event}</h4>
              <p className="text-white/80 mb-3">{alert.description}</p>
              <div className="flex gap-4 text-sm text-white/60">
                <span>From: {new Date(alert.start * 1000).toLocaleString()}</span>
                <span>To: {new Date(alert.end * 1000).toLocaleString()}</span>
              </div>
              {alert.sender_name && (
                <p className="text-sm text-white/60 mt-2">Source: {alert.sender_name}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default AlertBanner;
