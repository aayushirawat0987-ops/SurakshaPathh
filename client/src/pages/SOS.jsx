import React, { useEffect, useState, useRef } from 'react';
import SOSButton from '../components/SOSButton';
import { useSafety } from '../context/SafetyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, AlertTriangle, ShieldX, Volume2, VolumeX } from 'lucide-react';

const SOS = () => {
  const { isSOSActive, activateSOS, deactivateSOS, location } = useSafety();
  const [countdown, setCountdown] = useState(5);
  const [isCounting, setIsCounting] = useState(false);
  const [isSirenMuted, setIsSirenMuted] = useState(false);
  const audioRef = useRef(null);

  // Initialize Siren Audio
  useEffect(() => {
    // Use a different, highly reliable siren sound link
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/emergency/ambulance_siren.ogg');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Control Siren Playback
  useEffect(() => {
    if (isSOSActive && !isSirenMuted) {
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback interrupted or blocked:", error);
        });
      }
    } else {
      audioRef.current?.pause();
    }
  }, [isSOSActive, isSirenMuted]);

  const handleActivate = () => {
    // "Unlock" the audio context on first click
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        audioRef.current.pause(); // Immediately pause, we just needed to unlock it
      }).catch(e => console.log("Unlock failed:", e));
    }

    if (!isSOSActive && !isCounting) {
      setIsCounting(true);
    } else if (isCounting) {
      setIsCounting(false);
      setCountdown(5);
    } else {
      deactivateSOS();
    }
  };

  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isCounting && countdown === 0) {
      activateSOS();
      setIsCounting(false);
      setCountdown(5);
    }
    return () => clearTimeout(timer);
  }, [isCounting, countdown, activateSOS]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-red-500 mb-2 flex items-center justify-center gap-2">
          <AlertTriangle /> Emergency Mode
        </h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Activating SOS will immediately send your live location and sound a loud siren to attract help.
        </p>
      </motion.div>

      <div className="relative mb-12">
        <SOSButton onActivate={handleActivate} isActive={isSOSActive} />
        
        <AnimatePresence>
          {isCounting && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-8xl font-black z-20 pointer-events-none"
              style={{ textShadow: '0 0 20px black' }}
            >
              {countdown}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isSOSActive && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full glass-card border-red-500/50 bg-red-900/20"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                <ShieldX /> Alert Status: ACTIVE
              </h3>
              <button 
                onClick={() => setIsSirenMuted(!isSirenMuted)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isSirenMuted ? <VolumeX className="text-red-400" /> : <Volume2 className="text-red-400 animate-pulse" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <MapPin className="text-red-400 mt-1" />
                <div>
                  <p className="font-bold text-sm">Location Sharing</p>
                  <p className="text-xs text-gray-400">Lat: {location.lat}, Lng: {location.lng} (Live)</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Phone className="text-red-400 mt-1" />
                <div>
                  <p className="font-bold text-sm">Authorities Notified</p>
                  <p className="text-xs text-gray-400">Police dispatched to your location.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={deactivateSOS}
              className="mt-6 w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-bold transition-colors"
            >
              Cancel Emergency
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SOS;
