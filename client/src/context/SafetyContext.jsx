import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SafetyContext = createContext();

export const SafetyProvider = ({ children }) => {
  const { user } = useAuth();
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [activeAlertId, setActiveAlertId] = useState(null);
  const [location, setLocation] = useState({ lat: 29.589, lng: 79.646 });
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isLowBattery, setIsLowBattery] = useState(false);

  // Real-time Battery Monitoring
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const updateBatteryStatus = () => {
          const level = Math.floor(battery.level * 100);
          setBatteryLevel(level);
          setIsLowBattery(level <= 15);
        };
        
        updateBatteryStatus();
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);
        
        return () => {
          battery.removeEventListener('levelchange', updateBatteryStatus);
          battery.removeEventListener('chargingchange', updateBatteryStatus);
        };
      });
    }
  }, []);

  // Watch location in a real app
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);
  
  const activateSOS = async () => {
    setIsSOSActive(true);
    
    // In real app, call API to trigger SOS alerts
    if (user && user.token) {
      try {
        const res = await fetch('/api/alerts', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ 
            location, 
            message: `Emergency! SOS triggered by ${user.name}` 
          })
        });
        const data = await res.json();
        if (res.ok) {
          setActiveAlertId(data._id);
          console.log("SOS alert logged in database");
        }
      } catch (error) {
        console.error("Failed to trigger SOS:", error);
      }
    }
  };

  const deactivateSOS = async () => {
    setIsSOSActive(false);
    if (activeAlertId && user && user.token) {
      try {
        await fetch(`/api/alerts/${activeAlertId}/resolve`, {
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${user.token}`
          }
        });
        setActiveAlertId(null);
      } catch (error) {
        console.error("Failed to resolve SOS:", error);
      }
    }
  };

  return (
    <SafetyContext.Provider value={{ 
      isSOSActive, 
      activateSOS, 
      deactivateSOS,
      location,
      setLocation,
      batteryLevel
    }}>
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => useContext(SafetyContext);
