import React, { useState, useEffect } from 'react';
import FakeCallUI from '../components/FakeCallUI';
import { PhoneCall, Clock, UserCircle, PhoneIncoming } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FakeCall = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [callerName, setCallerName] = useState('Mom');
  const [timer, setTimer] = useState(0); // 0 means immediate
  const [isWaiting, setIsWaiting] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const presets = ['Mom', 'Dad', 'Brother', 'Roommate', 'Private Number'];
  const times = [
    { label: 'Now', value: 0 },
    { label: '10 sec', value: 10 },
    { label: '30 sec', value: 30 },
    { label: '1 min', value: 60 }
  ];

  useEffect(() => {
    let interval;
    if (isWaiting && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isWaiting && countdown === 0) {
      setIsWaiting(false);
      setIsCalling(true);
    }
    return () => clearInterval(interval);
  }, [isWaiting, countdown]);

  const handleStart = () => {
    if (timer === 0) {
      setIsCalling(true);
    } else {
      setCountdown(timer);
      setIsWaiting(true);
    }
  };

  const handleCancel = () => {
    setIsWaiting(false);
    setCountdown(0);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <PhoneCall className="text-cyber-neonGreen w-8 h-8" />
            Fake <span className="text-cyber-neonGreen">Call</span>
          </h1>
          <p className="text-gray-400">Simulate an incoming call to help you escape uncomfortable or unsafe situations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><UserCircle /> Caller Identity</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {presets.map(preset => (
                <button
                  key={preset}
                  onClick={() => setCallerName(preset)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    callerName === preset 
                      ? 'bg-cyber-neonGreen text-cyber-navy shadow-[0_0_10px_rgba(57,255,20,0.5)]' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Custom Name</label>
              <input 
                type="text" 
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                className="w-full bg-cyber-navyLight/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-cyber-neonGreen transition-colors text-white"
                placeholder="Enter name..."
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Clock /> Delay Timer</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {times.map(t => (
                <button
                  key={t.label}
                  onClick={() => setTimer(t.value)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${
                    timer === t.value 
                      ? 'border-2 border-cyber-neonGreen text-cyber-neonGreen bg-cyber-neonGreen/10' 
                      : 'border border-white/10 text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {isWaiting ? (
              <div className="text-center">
                <p className="text-xl mb-4">Call coming in <span className="font-bold text-cyber-neonGreen">{countdown}s</span>...</p>
                <button 
                  onClick={handleCancel}
                  className="w-full py-4 rounded-xl bg-red-500/20 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={handleStart}
                className="w-full py-4 rounded-xl bg-cyber-neonGreen text-cyber-navy font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all"
              >
                <PhoneIncoming className="w-5 h-5" /> Schedule Fake Call
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isCalling && (
          <FakeCallUI callerName={callerName} onEndCall={() => setIsCalling(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default FakeCall;
