import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ShieldCheck, AlertTriangle } from 'lucide-react';

const RouteCard = ({ route, onClick }) => {
  const isSafe = route.safetyScore > 80;
  const isMedium = route.safetyScore > 50 && route.safetyScore <= 80;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`glass-card cursor-pointer relative overflow-hidden ${
        isSafe ? 'hover:border-green-500/50' : isMedium ? 'hover:border-yellow-500/50' : 'hover:border-red-500/50'
      }`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${
        isSafe ? 'bg-green-500' : isMedium ? 'bg-yellow-500' : 'bg-red-500'
      }`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="text-gray-400 w-5 h-5" />
          <h3 className="font-bold text-lg">{route.startPoint} to {route.endPoint}</h3>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
          isSafe ? 'bg-green-500/20 text-green-400' : isMedium ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {isSafe ? <ShieldCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
          {route.safetyScore}% Safe
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Night Travel: {route.isNightSafe ? 'Recommended' : 'Not Recommended'}</span>
        <button className="flex items-center gap-1 text-cyber-neonBlue hover:text-white transition-colors">
          <Navigation className="w-4 h-4" /> View Map
        </button>
      </div>
    </motion.div>
  );
};

export default RouteCard;
