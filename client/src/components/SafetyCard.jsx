import React from 'react';
import { motion } from 'framer-motion';

const SafetyCard = ({ title, value, icon: Icon, colorClass, subtitle }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card flex flex-col items-center justify-center p-6 text-center h-full"
    >
      <div className={`p-4 rounded-full bg-white/5 mb-4 ${colorClass}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-gray-300 font-medium">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
    </motion.div>
  );
};

export default SafetyCard;
