import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSafety } from '../context/SafetyContext';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map view updates
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 15, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
};

const MapView = ({ routes = [], dynamicPath = null, destination = null }) => {
  const { location } = useSafety();
  
  // Safety check for location
  if (!location || !location.lat) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-900 text-gray-400">
        <div className="text-center">
          <p>Initializing Map...</p>
        </div>
      </div>
    );
  }

  // Use destination as center if provided, otherwise current location
  const center = destination ? [destination.lat, destination.lng] : [location.lat, location.lng];

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10 dark-map relative z-0">
      <MapContainer center={[location.lat, location.lng]} zoom={15} className="h-full w-full">
        <MapUpdater center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location Marker */}
        <Marker position={[location.lat, location.lng]}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Destination Marker */}
        {destination && (
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>Destination</Popup>
          </Marker>
        )}

        {/* Mock Routes */}
        {routes.length > 0 && !dynamicPath && routes.map((route, idx) => (
          route && route.pathCoordinates && (
            <Polyline 
              key={idx} 
              positions={route.pathCoordinates} 
              color={route.safetyScore > 80 ? '#39ff14' : route.safetyScore > 50 ? '#ffff00' : '#ff007f'} 
              weight={5}
              opacity={0.7}
            >
              <Popup>
                <div className="text-black font-bold">Safety Score: {route.safetyScore}%</div>
              </Popup>
            </Polyline>
          )
        ))}

        {/* Real-time Dynamic Path */}
        {dynamicPath && (
          <Polyline 
            positions={dynamicPath} 
            color="#00f0ff" 
            weight={6}
            opacity={0.8}
          >
            <Popup>
              <div className="text-black font-bold text-center">
                <span className="text-cyber-neonBlue">Safe Route Calculated</span>
              </div>
            </Popup>
          </Polyline>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
