import React from 'react';
import { motion } from 'framer-motion';

const SOSButton = ({ onActivate, isActive }) => {
  return (
    <div className="flex flex-col items-center justify-center my-10">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={onActivate}
        className={`relative flex items-center justify-center w-64 h-64 rounded-full font-bold text-4xl tracking-widest transition-all duration-300 ${
          isActive 
            ? 'bg-red-600 text-white shadow-[0_0_100px_rgba(220,38,38,0.8)] border-4 border-red-400' 
            : 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-[0_0_50px_rgba(239,68,68,0.5)] border-4 border-red-400/50 hover:shadow-[0_0_80px_rgba(239,68,68,0.7)]'
        }`}
      >
        <span className="z-10">{isActive ? 'ACTIVE' : 'SOS'}</span>
        
        {/* Ripple effects */}
        {isActive && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-4 border-red-500"
            />
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.5 }}
              className="absolute inset-0 rounded-full border-4 border-red-500"
            />
          </>
        )}
      </motion.button>
      <p className="mt-8 text-gray-400 text-center max-w-md">
        Tap to instantly share your live location, audio snippet, and alert local authorities and trusted contacts.
      </p>
    </div>
  );
};

export default SOSButton;
