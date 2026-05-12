import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo, C_CARD_STYLE } from '../components/SurakshaComponents';

const ManageGroup = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position:'fixed', inset:0, background:'#0E1521', color:'#F5F1E8', padding:'48px 14px 14px', overflow:'hidden', zIndex: 1000 }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ position:'relative', zIndex:2, maxWidth: 450, margin: '0 auto' }}
      >
        <button 
          onClick={() => navigate(-1)}
          style={{ background:'none', border:'none', color:'#8A93A2', fontSize:13, display:'inline-flex', alignItems:'center', gap:6, cursor:'pointer', padding:0, marginBottom:12, fontWeight:700 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>

        <div style={{ fontSize:10, color:'#8A93A2', letterSpacing:2, fontWeight:700, textTransform:'uppercase' }}>Group · Admin</div>
        <h1 style={{ fontSize:30, fontWeight:900, margin:'4px 0 0', letterSpacing:-1, lineHeight:0.95 }}>
          The<br/>Hartleys.
        </h1>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginTop:18 }}>
          {[
            ['5', 'members'],
            ['3', 'live'],
            ['1', 'pending'],
          ].map(([n, l], i) => (
            <div key={i} style={{ ...C_CARD_STYLE, padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, color: '#F5F1E8' }}>{n}</div>
              <div style={{ fontSize: 9, color: '#8A93A2', letterSpacing: 1.5, fontWeight: 700, textTransform: 'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ ...C_CARD_STYLE, padding: 14, marginTop: 10 }}>
          <div style={{ fontSize: 10, color: '#8A93A2', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>Invite</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input className="tm-input" placeholder="email@family.com" style={{ flex: 1, height: 36, fontSize: 12 }} />
            <button className="tm-btn" style={{ height: 36, padding: '0 12px', fontSize: 12, fontWeight: 900, background: 'linear-gradient(180deg, #22D3EE, #1083CE)', color: '#091D29', borderRadius: 9 }}>Send</button>
          </div>
          <div style={{ marginTop: 8, padding: '8px 10px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.25)', borderRadius: 8, fontSize: 10, color: '#34D399', wordBreak: 'break-all' }}>✓ link: suraksha.path/c/v8x2N9k...</div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 10, color: '#8A93A2', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6, paddingLeft: 4 }}>Members</div>
          {[
            ['A', 'Ana Hartley', 'ana@hartley.co', 'coral', 'admin'],
            ['D', 'David', '+1 415 555 0123', 'amber', 'consented'],
            ['M', 'Maya', 'maya@hartley.co', 'cyan', 'consented'],
            ['L', 'Leo', 'Pending invite', 'green', 'pending'],
          ].map(([i, n, s, c, st], k) => (
            <div key={k} style={{ ...C_CARD_STYLE, padding: 10, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className={`tm-avatar ${c}`} style={{ width: 32, height: 32, fontSize: 13 }}>{i}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 12, color: '#F5F1E8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n}</div>
                <div style={{ fontSize: 10, color: '#8A93A2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s}</div>
              </div>
              {st === 'admin' && <span className="tm-badge admin">Admin</span>}
              {st === 'consented' && <span className="tm-badge live">Live</span>}
              {st === 'pending' && <span className="tm-badge pending">Pending</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageGroup;
