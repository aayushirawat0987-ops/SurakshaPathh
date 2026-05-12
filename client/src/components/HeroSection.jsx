import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, Map } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-neonPink/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyber-neonPurple/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyber-neonBlue/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Your Smart <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-neonPink via-cyber-neonPurple to-cyber-neonBlue neon-text-pink">
              Safety Companion
            </span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light">
            Walk Free. Walk Safe. Empowering women in hill regions with real-time tracking, safe route awareness, and instant emergency response.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/sos">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyber-neonPink text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 neon-border-pink shadow-[0_0_20px_rgba(255,0,127,0.4)] hover:shadow-[0_0_30px_rgba(255,0,127,0.6)] transition-all"
              >
                <ShieldAlert className="w-6 h-6" />
                Activate Protection
              </motion.button>
            </Link>
            
            <Link to="/routes">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass border border-cyber-neonBlue/50 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-cyber-neonBlue/10 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <Map className="w-6 h-6 text-cyber-neonBlue" />
                Explore Safe Routes
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
