import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo, C_CARD_STYLE } from '../components/SurakshaComponents';

const LostMode = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position:'fixed', inset:0, background:'#1a0e14', color:'#FECACA', padding:'48px 18px 22px', overflow:'hidden', zIndex: 1000 }}>
      <div className="tm-orb tm-float" style={{ position:'absolute', width:260, height:260, top:-80, left:-60, borderRadius:'50%', background:'radial-gradient(circle at 30% 25%, #B11C54, #7F1D1D)', filter:'blur(20px)', opacity:0.7 }} />
      <div className="tm-orb tm-float" style={{ position:'absolute', width:180, height:180, bottom:-50, right:-40, borderRadius:'50%', background:'radial-gradient(circle at 30% 25%, #FF6B6B, #B11C54)', filter:'blur(30px)', opacity:0.5, animationDelay:'1s' }} />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ position:'relative', zIndex:2, maxWidth: 400, margin: '0 auto' }}
      >
        <Logo size={22} color="#FF8E8E" />

        <div style={{ marginTop: 30 }}>
          <div style={{ fontSize: 11, color: '#FF8E8E', letterSpacing: 3, fontWeight: 800, textTransform: 'uppercase' }}>● Lost mode active</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: '8px 0 0', letterSpacing: -1.8, lineHeight: 0.95, color: '#FECACA' }}>
            SOS<br/>broadcast.
          </h1>
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 128, height: 128 }}>
            <div className="tm-ping" style={{ inset: 0, borderColor: '#FF6B6B', borderWidth: 3 }} />
            <div className="tm-ping" style={{ inset: 0, borderColor: '#FF6B6B', borderWidth: 3, animationDelay: '0.7s' }} />
            <div style={{ position: 'absolute', inset: 18, borderRadius: '50%', background: 'radial-gradient(circle at 30% 25%, #FF8E8E, #B11C54 65%, #7F1D1D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 36px rgba(176,28,84,0.6), inset -8px -10px 24px rgba(0,0,0,0.45), inset 4px 6px 14px rgba(255,255,255,0.2)' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="#fff"><path d="M12 1 L2 22 L22 22 Z" /></svg>
            </div>
          </div>
        </div>

        <div style={{ ...C_CARD_STYLE, marginTop: 24, padding: 14, background: 'rgba(127,29,29,0.25)', border: '1px solid rgba(255,107,107,0.3)' }}>
          {[
            ['Mom', '12s ago', 'received'],
            ['Dad', '8s ago', 'acknowledged'],
            ['Maya', '4s ago', 'on the way'],
          ].map(([n, t, s], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,107,107,0.15)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF6B6B', boxShadow: '0 0 12px #FF6B6B' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: '#FECACA' }}>{n}</div>
                <div style={{ fontSize: 10, color: 'rgba(254,202,202,0.6)' }}>{s}</div>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(254,202,202,0.6)' }}>{t}</div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('/dashboard')}
          style={{ width: '100%', marginTop: 20, height: 48, borderRadius: 14, background: 'rgba(245,241,232,0.06)', color: '#FECACA', fontWeight: 800, fontSize: 13, border: '1px solid rgba(255,107,107,0.3)', cursor: 'pointer' }}
        >
          Cancel Lost Mode
        </button>
      </motion.div>
    </div>
  );
};

export default LostMode;
