import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Search } from 'lucide-react';
import MapView from '../components/MapView';
import { useSafety } from '../context/SafetyContext';

const MapPage = () => {
  const navigate = useNavigate();
  const { location: userLocation } = useSafety();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [destination, setDestination] = useState(null);
  const [dynamicPath, setDynamicPath] = useState(null);
  const [distance, setDistance] = useState(null);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
        { headers: { 'User-Agent': 'SurakshaPath-Safety-App' } }
      );
      const geoData = await geoRes.json();
      if (!geoData?.length) { alert('Location not found. Try a different name.'); return; }

      const dest = {
        lat: parseFloat(geoData[0].lat),
        lng: parseFloat(geoData[0].lon),
        name: geoData[0].display_name?.split(',')[0] ?? searchQuery,
      };
      setDestination(dest);
      setDynamicPath(null);
      setDistance(null);

      if (userLocation?.lat) {
        const routeRes = await fetch(
          `https://router.project-osrm.org/route/v1/walking/${userLocation.lng},${userLocation.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`
        );
        if (routeRes.ok) {
          const routeData = await routeRes.json();
          if (routeData?.routes?.length) {
            setDynamicPath(routeData.routes[0].geometry.coordinates.map(c => [c[1], c[0]]));
            setDistance((routeData.routes[0].distance / 1000).toFixed(1) + ' km');
          }
        }
      }
    } catch {
      alert('Search failed. Check your connection.');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDestination(null);
    setDynamicPath(null);
    setDistance(null);
  };

  const openNavigation = () => {
    if (!destination) return;
    const origin = userLocation?.lat ? `&origin=${userLocation.lat},${userLocation.lng}` : '';
    window.open(
      `https://www.google.com/maps/dir/?api=1${origin}&destination=${destination.lat},${destination.lng}&travelmode=walking`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900 overflow-hidden">
      {/* Full-screen real map */}
      <div className="absolute inset-0 z-0">
        <MapView routes={[]} dynamicPath={dynamicPath} destination={destination} />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-3 pt-10">
        <div className="bg-[rgba(14,21,33,0.88)] backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/10">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="flex-1">
            <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Group</div>
            <div className="font-black text-base text-white tracking-tight">The Hartleys</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-green-400 uppercase tracking-widest font-bold">● Live</div>
            <div className="text-[11px] text-white font-bold">5/5</div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="absolute top-32 left-3 right-3 z-[1000]">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search a location…"
              className="w-full bg-[rgba(14,21,33,0.9)] backdrop-blur-xl border border-white/10 rounded-2xl py-2.5 pl-4 pr-10 text-sm text-white placeholder-gray-500 outline-none focus:border-white/25 transition-colors"
            />
            {(searchQuery || destination) && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-lg leading-none bg-transparent border-none cursor-pointer"
              >×</button>
            )}
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-[rgba(14,21,33,0.9)] backdrop-blur-xl border border-white/10 rounded-2xl px-4 flex items-center justify-center text-white hover:border-white/25 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </button>
        </form>

        {destination && (
          <div className="mt-2 bg-[rgba(14,21,33,0.92)] backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5 flex items-center justify-between">
            <div>
              <div className="text-[9px] text-green-400 uppercase tracking-widest font-bold">● Found</div>
              <div className="text-sm text-white font-bold">{destination.name}</div>
              {distance && <div className="text-xs text-gray-400 mt-0.5">Walking: {distance}</div>}
            </div>
            <button
              onClick={openNavigation}
              className="px-4 py-1.5 rounded-xl text-xs font-black text-white border-none cursor-pointer"
              style={{ background: 'linear-gradient(180deg,#34D399,#059669)' }}
            >
              Navigate →
            </button>
          </div>
        )}
      </div>

      {/* Bottom drawer */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] grid grid-cols-2 gap-2">
        <div className="col-span-2 bg-[rgba(14,21,33,0.92)] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">5 Members</div>
            <button className="text-cyan-400 text-xs font-black bg-transparent border-none cursor-pointer">List view</button>
          </div>
          <div className="px-2 pb-3 flex gap-2 overflow-x-auto">
            {[
              ['A', 'Ana',  'Now',  '#FF8E8E'],
              ['D', 'Dad',  '2m',   '#f1c27a'],
              ['M', 'Maya', '5m',   '#22D3EE'],
              ['L', 'Leo',  '12m',  '#87b095'],
              ['N', 'Nana', 'LOST', '#c084fc'],
            ].map(([i, n, t, c], k) => (
              <div key={k} style={{
                minWidth: 72, padding: '10px 6px', borderRadius: 10, textAlign: 'center',
                background: t === 'LOST' ? 'rgba(176,28,84,0.18)' : 'rgba(245,241,232,0.04)',
                border: t === 'LOST' ? '1px solid rgba(255,107,107,0.4)' : '1px solid rgba(245,241,232,0.08)',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', margin: '0 auto 4px',
                  background: c + '33', border: `2px solid ${c}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: c,
                }}>{i}</div>
                <div style={{ fontWeight: 800, fontSize: 10, color: '#F5F1E8' }}>{n}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: t === 'LOST' ? '#FF8E8E' : '#8A93A2' }}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/manage-group')}
          className="bg-[rgba(14,21,33,0.88)] backdrop-blur-xl border border-white/10 rounded-2xl py-3 flex items-center justify-center gap-2 text-white text-xs font-bold hover:bg-white/5 transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          Invite
        </button>
        <button
          onClick={() => navigate('/lost-mode')}
          className="py-3 flex items-center justify-center gap-2 text-white text-xs font-black rounded-2xl border-none cursor-pointer"
          style={{ background: 'linear-gradient(180deg,#FF6B6B,#B11C54)', boxShadow: '0 8px 18px -6px rgba(176,28,84,0.5)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 1 L2 22 L22 22 Z"/></svg>
          SOS
        </button>
      </div>
    </div>
  );
};

export default MapPage;
