import React from 'react';
import { Phone, Hospital, Shield, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const EmergencyResources = () => {
  const resources = [
    { title: 'Women Helpline (Domestic Abuse)', number: '1091', icon: HelpCircle, color: 'text-cyber-neonPink' },
    { title: 'Women Helpline (All India)', number: '181', icon: Phone, color: 'text-cyber-neonPink' },
    { title: 'Police Control Room', number: '112', icon: Shield, color: 'text-cyber-neonBlue' },
    { title: 'Ambulance / Medical', number: '108', icon: Hospital, color: 'text-green-500' },
  ];

  const localPlaces = [
    { name: 'Almora District Hospital', distance: '1.2 km', type: 'Hospital' },
    { name: 'Base Hospital, Almora', distance: '2.5 km', type: 'Hospital' },
    { name: 'Almora Kotwali (Police)', distance: '1.0 km', type: 'Police Station' },
    { name: 'Women Police Station, Almora', distance: '1.5 km', type: 'Police Station' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Emergency <span className="text-cyber-neonPink">Resources</span></h1>
        <p className="text-gray-400">National helplines and nearby emergency services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {resources.map((res, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card text-center flex flex-col items-center justify-center p-6"
          >
            <res.icon className={`w-10 h-10 mb-3 ${res.color}`} />
            <h3 className="text-gray-400 text-sm mb-2">{res.title}</h3>
            <a href={`tel:${res.number}`} className={`text-2xl font-bold ${res.color} hover:underline`}>
              {res.number}
            </a>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MapPin className="text-cyber-neonBlue" /> Nearby Safe Zones & Authorities
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localPlaces.map((place, idx) => (
          <div key={idx} className="glass-card flex justify-between items-center p-5">
            <div>
              <h3 className="font-bold text-lg">{place.name}</h3>
              <p className="text-gray-400 text-sm">{place.type} • {place.distance}</p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors text-cyber-neonBlue">
              <Navigation className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

import { MapPin, Navigation } from 'lucide-react';

export default EmergencyResources;
