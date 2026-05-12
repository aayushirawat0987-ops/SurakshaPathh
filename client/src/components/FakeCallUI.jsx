import React from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, UserCircle } from 'lucide-react';

const FakeCallUI = ({ callerName, onEndCall }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between py-20"
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl text-gray-400">Incoming call...</h2>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <UserCircle className="w-32 h-32 text-gray-500" />
        </motion.div>
        <h1 className="text-4xl font-bold">{callerName}</h1>
        <p className="text-gray-400">Mobile</p>
      </div>

      <div className="flex w-full justify-around px-10 mb-10">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onEndCall}
          className="bg-red-500 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
        >
          <PhoneOff className="w-8 h-8" />
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.9 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]"
        >
          <Phone className="w-8 h-8 animate-pulse" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FakeCallUI;
