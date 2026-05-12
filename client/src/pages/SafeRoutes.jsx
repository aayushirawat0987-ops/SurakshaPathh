import React, { useState, useEffect } from 'react';
import MapView from '../components/MapView';
import RouteCard from '../components/RouteCard';
import { motion } from 'framer-motion';
import { Search, Loader2, MapPin } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

const SafeRoutes = () => {
  const { location: userLocation } = useSafety();
  const [searchQuery, setSearchQuery] = useState('');
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [dynamicPath, setDynamicPath] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await fetch('/api/routes');
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        const data = await res.json();
        if (data && data.length > 0) {
          setRoutes(data);
          setSelectedRoute(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch routes:", error);
        // Set empty array so mapping doesn't crash (though useState( [] ) handles this)
        setRoutes([]);
      }
    };
    fetchRoutes();
  }, []);
  const [destination, setDestination] = useState(null);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    if (!userLocation || !userLocation.lat) {
      alert("Still waiting for your location. Please wait a moment.");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Geocode Destination
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`, {
        headers: { 'User-Agent': 'SurakshaPath-Safety-App' }
      });
      
      if (!geoRes.ok) throw new Error("Search service unavailable");
      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        alert("Location not found. Please try a different name.");
        setIsLoading(false);
        return;
      }

      const dest = {
        lat: parseFloat(geoData[0].lat),
        lng: parseFloat(geoData[0].lon),
        name: geoData[0].display_name ? geoData[0].display_name.split(',')[0] : searchQuery
      };
      setDestination(dest);

      // 2. Fetch Route from OSRM
      const start = `${userLocation.lng},${userLocation.lat}`;
      const end = `${dest.lng},${dest.lat}`;
      const routeRes = await fetch(`https://router.project-osrm.org/route/v1/walking/${start};${end}?overview=full&geometries=geojson`);
      
      if (!routeRes.ok) throw new Error("Routing service unavailable");
      const routeData = await routeRes.ok ? await routeRes.json() : null;

      if (routeData && routeData.routes && routeData.routes.length > 0) {
        const coords = routeData.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
        setDynamicPath(coords);
        
        setSelectedRoute({
          id: 'dynamic',
          startPoint: 'Current Location',
          endPoint: dest.name,
          safetyScore: 85,
          isNightSafe: true,
          distance: (routeData.routes[0].distance / 1000).toFixed(2) + ' km'
        });
      } else {
        alert("Could not find a walking path to that location.");
      }
    } catch (error) {
      console.error("Routing error:", error);
      alert("Search failed. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDynamicPath(null);
    setDestination(null);
    if (routes && routes.length > 0) {
      setSelectedRoute(routes[0]);
    } else {
      setSelectedRoute(null);
    }
  };

  const startNavigation = () => {
    if (selectedRoute) {
      const dest = destination || { lat: selectedRoute.pathCoordinates[0][0], lng: selectedRoute.pathCoordinates[0][1] };
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${dest.lat},${dest.lng}&travelmode=walking`;
      window.open(url, '_blank');
    } else {
      alert("Please select a route first!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Safe <span className="text-cyber-neonBlue">Routes</span></h1>
        <p className="text-gray-400">Find the safest path to your destination based on real-time data and community reports.</p>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where to? (e.g. Almora Market)" 
              className="w-full bg-cyber-navyLight/50 border border-white/10 rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:border-cyber-neonBlue transition-all text-white"
            />
            <button type="submit" className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-cyber-neonBlue transition-colors">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
            {searchQuery && (
              <button 
                type="button" 
                onClick={clearSearch}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                &times;
              </button>
            )}
          </form>
          
          <div className="space-y-4">
            <h3 className="font-bold text-gray-300 mt-2">Recommended Routes</h3>
            {routes.map(route => (
              <RouteCard 
                key={route.id || route._id} 
                route={route} 
                active={selectedRoute && selectedRoute.id === (route.id || route._id) && !dynamicPath}
                onClick={() => {
                  setSelectedRoute(route);
                  setDynamicPath(null);
                  setDestination(null);
                }}
              />
            ))}
            
            {dynamicPath && (
              <div className="p-4 rounded-xl bg-cyber-neonBlue/10 border border-cyber-neonBlue/30">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-cyber-neonBlue" />
                  <span className="font-bold text-cyber-neonBlue">Custom Route Found</span>
                </div>
                <p className="text-sm text-gray-400">Distance: {selectedRoute.distance}</p>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 h-[400px] lg:h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.1)] relative"
        >
          <div className="absolute inset-0">
             <MapView 
               routes={dynamicPath ? [] : [selectedRoute]} 
               dynamicPath={dynamicPath}
               destination={destination}
             />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 z-[400] glass-card p-4 flex justify-between items-center pointer-events-auto shadow-lg bg-cyber-navyLight/90">
            {selectedRoute ? (
              <>
                <div>
                  <p className="text-sm text-gray-400">{dynamicPath ? 'Custom Route' : 'Selected Route'}</p>
                  <h3 className="font-bold">{selectedRoute.startPoint || 'Search Result'} to {selectedRoute.endPoint || 'Destination'}</h3>
                </div>
                <button 
                  onClick={startNavigation}
                  className="bg-cyber-neonBlue text-cyber-navy px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:bg-white transition-colors"
                >
                  Start Navigation
                </button>
              </>
            ) : (
              <p className="text-gray-400">Select a route to begin</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SafeRoutes;
