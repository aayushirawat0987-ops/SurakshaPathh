import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Pin3D, C_CARD_STYLE } from '../components/SurakshaComponents';
import { useSafety } from '../context/SafetyContext';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) map.setView(center, 14, { animate: true });
  }, [center, map]);
  return null;
};

const MEMBERS = [
  { id: 'ana',  name: 'Ana',  initial: 'A', color: 'coral',  time: 'Now',  lat: 29.592, lng: 79.640, x: 28, y: 32 },
  { id: 'dad',  name: 'Dad',  initial: 'D', color: 'amber',  time: '2m',   lat: 29.585, lng: 79.655, x: 58, y: 48 },
  { id: 'maya', name: 'Maya', initial: 'M', color: 'cyan',   time: '5m',   lat: 29.595, lng: 79.660, x: 72, y: 22 },
  { id: 'leo',  name: 'Leo',  initial: 'L', color: 'green',  time: '12m',  lat: 29.580, lng: 79.648, x: 42, y: 70 },
  { id: 'nana', name: 'Nana', initial: 'N', color: 'purple', time: 'LOST', lat: 29.575, lng: 79.635, x: 20, y: 78 },
];

const MapPage = () => {
  const navigate = useNavigate();
  const { location: userLocation } = useSafety();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [destination, setDestination] = useState(null);
  const [dynamicPath, setDynamicPath] = useState(null);
  const [routeTarget, setRouteTarget] = useState(null);

  const fetchRoute = async (destLat, destLng) => {
    if (!userLocation?.lat) return;
    try {
      const start = `${userLocation.lng},${userLocation.lat}`;
      const end = `${destLng},${destLat}`;
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/walking/${start};${end}?overview=full&geometries=geojson`
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.routes?.length > 0) {
          setDynamicPath(data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]));
        }
      }
    } catch (e) {
      console.error('Routing error:', e);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
        { headers: { 'User-Agent': 'SurakshaPath-Safety-App' } }
      );
      if (!geoRes.ok) throw new Error('unavailable');
      const geoData = await geoRes.json();
      if (!geoData?.length) { alert('Location not found. Try a different name.'); return; }
      const dest = {
        lat: parseFloat(geoData[0].lat),
        lng: parseFloat(geoData[0].lon),
        name: geoData[0].display_name?.split(',')[0] ?? searchQuery,
      };
      setDestination(dest);
      setRouteTarget(dest.name);
      await fetchRoute(dest.lat, dest.lng);
    } catch (err) {
      console.error('Search error:', err);
      alert('Search failed. Check your connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const routeToMember = async (member) => {
    setSearchQuery('');
    setDestination({ lat: member.lat, lng: member.lng, name: member.name });
    setRouteTarget(member.name);
    await fetchRoute(member.lat, member.lng);
  };

  const clearRoute = () => {
    setSearchQuery('');
    setDestination(null);
    setDynamicPath(null);
    setRouteTarget(null);
  };

  const openNavigation = () => {
    if (!destination || !userLocation?.lat) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${destination.lat},${destination.lng}&travelmode=walking`,
      '_blank'
    );
  };

  const mapCenter = destination
    ? [destination.lat, destination.lng]
    : userLocation?.lat
    ? [userLocation.lat, userLocation.lng]
    : [29.589, 79.646];

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0E1521', overflow: 'hidden', zIndex: 1000 }}>
      <MapContainer center={mapCenter} zoom={14} zoomControl={false}
        style={{ position: 'absolute', inset: 0, height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destination && <MapUpdater center={[destination.lat, destination.lng]} />}
        {userLocation?.lat && (
          <Marker position={[userLocation.lat, userLocation.lng]}><Popup>You are here</Popup></Marker>
        )}
        {destination && (
          <Marker position={[destination.lat, destination.lng]}><Popup>{destination.name}</Popup></Marker>
        )}
        {dynamicPath && <Polyline positions={dynamicPath} color="#22D3EE" weight={5} opacity={0.9} />}
      </MapContainer>

      {MEMBERS.map(m => (
        <Pin3D key={m.id} x={m.x} y={m.y} color={m.color} label={m.name}
          ping={m.time === 'Now'} lost={m.time === 'LOST'} size={32} />
      ))}

      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        style={{ position: 'absolute', top: 46, left: 12, right: 12, zIndex: 10, ...C_CARD_STYLE,
          padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(20,27,40,0.85)', backdropFilter: 'blur(20px)' }}>
        <button onClick={() => navigate('/dashboard')}
          style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(245,241,232,0.06)',
            border: '1px solid rgba(245,241,232,0.08)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5F1E8' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: '#8A93A2', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase' }}>Group</div>
          <div style={{ fontWeight: 900, fontSize: 15, color: '#F5F1E8', letterSpacing: -0.3 }}>The Hartleys</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: '#34D399', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase' }}>● Live</div>
          <div style={{ fontSize: 11, color: '#F5F1E8', fontWeight: 700 }}>5/5</div>
        </div>
      </motion.div>

      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
        style={{ position: 'absolute', top: 116, left: 12, right: 12, zIndex: 10 }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search a location…"
              style={{ width: '100%', boxSizing: 'border-box', ...C_CARD_STYLE,
                background: 'rgba(20,27,40,0.88)', backdropFilter: 'blur(20px)',
                padding: '10px 36px 10px 14px', fontSize: 12, color: '#F5F1E8',
                border: '1px solid rgba(245,241,232,0.12)', outline: 'none' }} />
            {(searchQuery || routeTarget) && (
              <button type="button" onClick={clearRoute}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#8A93A2', cursor: 'pointer',
                  fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
            )}
          </div>
          <button type="submit" disabled={isSearching}
            style={{ ...C_CARD_STYLE, background: 'rgba(20,27,40,0.88)', backdropFilter: 'blur(20px)',
              padding: '10px 14px', border: '1px solid rgba(245,241,232,0.12)',
              cursor: isSearching ? 'default' : 'pointer', color: '#F5F1E8',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isSearching ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            )}
          </button>
        </form>
        {routeTarget && destination && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: 6, ...C_CARD_STYLE, background: 'rgba(20,27,40,0.92)',
              backdropFilter: 'blur(20px)', padding: '8px 12px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 9, color: '#34D399', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase' }}>● Route to</div>
              <div style={{ fontSize: 12, color: '#F5F1E8', fontWeight: 700 }}>{routeTarget}</div>
            </div>
            <button onClick={openNavigation}
              style={{ padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 800,
                background: 'linear-gradient(180deg, #34D399, #059669)',
                color: '#fff', border: 'none', cursor: 'pointer' }}>Navigate →</button>
          </motion.div>
        )}
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10, zIndex: 10,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          style={{ ...C_CARD_STYLE, gridColumn: '1 / 3', padding: 0, overflow: 'hidden',
            background: 'rgba(20,27,40,0.92)', backdropFilter: 'blur(20px)' }}>
          <div style={{ padding: '12px 14px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 10, color: '#8A93A2', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase' }}>5 Members</div>
            <button style={{ background: 'none', border: 'none', color: '#22D3EE', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>List view</button>
          </div>
          <div style={{ padding: '4px 8px 10px', display: 'flex', gap: 6, overflowX: 'auto' }}>
            {MEMBERS.map((m, k) => (
              <div key={k} onClick={() => routeToMember(m)}
                style={{ minWidth: 74, padding: '10px 6px', cursor: 'pointer',
                  background: m.time === 'LOST' ? 'rgba(176,28,84,0.18)' : routeTarget === m.name ? 'rgba(34,211,238,0.12)' : 'rgba(245,241,232,0.04)',
                  border: m.time === 'LOST' ? '1px solid rgba(255,107,107,0.4)' : routeTarget === m.name ? '1px solid rgba(34,211,238,0.4)' : '1px solid rgba(245,241,232,0.08)',
                  borderRadius: 10, textAlign: 'center' }}>
                <div className={`tm-avatar ${m.color}`} style={{ width: 28, height: 28, fontSize: 11, margin: '0 auto 4px' }}>{m.initial}</div>
                <div style={{ fontWeight: 800, fontSize: 10, color: '#F5F1E8' }}>{m.name}</div>
                <div style={{ fontSize: 9, color: m.time === 'LOST' ? '#FF8E8E' : '#8A93A2', fontWeight: 700 }}>{m.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <button onClick={() => navigate('/manage-group')}
          style={{ ...C_CARD_STYLE, padding: '12px', color: '#F5F1E8', fontSize: 11, fontWeight: 700,
            background: 'rgba(20,27,40,0.85)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          Invite
        </button>
        <button onClick={() => navigate('/lost-mode')}
          style={{ padding: '12px', color: '#fff', fontSize: 11, fontWeight: 800,
            background: 'linear-gradient(180deg, #FF6B6B, #B11C54)', borderRadius: 18, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer',
            boxShadow: '0 8px 18px -6px rgba(176,28,84,0.5)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 1 L2 22 L22 22 Z"/></svg>
          SOS
        </button>
      </div>
    </div>
  );
};

export default MapPage;
