import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapBg, Pin3D, C_CARD_STYLE } from '../components/SurakshaComponents';

const MapPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position:'fixed', inset:0, background:'#0E1521', overflow:'hidden', zIndex: 1000 }}>
      <MapBg style="neon">
        <Pin3D x={28} y={32} color="cyan" label="Ana" ping size={32}/>
        <Pin3D x={58} y={48} color="amber" label="Dad" size={32}/>
        <Pin3D x={72} y={22} color="coral" label="Maya" size={32}/>
        <Pin3D x={42} y={70} color="green" label="Leo" size={32}/>
        <Pin3D x={20} y={78} color="purple" label="Nana" size={32}/>
      </MapBg>

      {/* top floating header — bento style */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ position:'absolute', top:46, left:12, right:12, zIndex:10, ...C_CARD_STYLE, padding:'12px 14px', display:'flex', alignItems:'center', gap:10, background:'rgba(20,27,40,0.85)', backdropFilter:'blur(20px)' }}
      >
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ width:32, height:32, borderRadius:10, background:'rgba(245,241,232,0.06)', border:'1px solid rgba(245,241,232,0.08)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#F5F1E8' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:9, color:'#8A93A2', letterSpacing:2, fontWeight:700, textTransform:'uppercase' }}>Group</div>
          <div style={{ fontWeight:900, fontSize:15, color:'#F5F1E8', letterSpacing:-0.3 }}>The Hartleys</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:9, color:'#34D399', letterSpacing:2, fontWeight:700, textTransform:'uppercase' }}>● Live</div>
          <div style={{ fontSize:11, color:'#F5F1E8', fontWeight:700 }}>5/5</div>
        </div>
      </motion.div>

      {/* Bento drawer */}
      <div style={{ position:'absolute', left:10, right:10, bottom:10, zIndex:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ ...C_CARD_STYLE, gridColumn:'1 / 3', padding:0, overflow:'hidden', background:'rgba(20,27,40,0.92)', backdropFilter:'blur(20px)' }}
        >
          <div style={{ padding:'12px 14px 4px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ fontSize:10, color:'#8A93A2', letterSpacing:2, fontWeight:700, textTransform:'uppercase' }}>5 Members</div>
            <button style={{ background:'none', border:'none', color:'#22D3EE', fontSize:11, fontWeight:800, cursor:'pointer' }}>List view</button>
          </div>
          <div style={{ padding:'4px 8px 10px', display:'flex', gap:6, overflowX:'auto' }}>
            {[['A','Ana','Now','coral'],['D','Dad','2m','amber'],['M','Maya','5m','cyan'],['L','Leo','12m','green'],['N','Nana','LOST','purple']].map(([i,n,t,c],k)=>(
              <div key={k} style={{ minWidth:74, padding:'10px 6px', background: t==='LOST' ? 'rgba(176,28,84,0.18)' : 'rgba(245,241,232,0.04)', border: t==='LOST' ? '1px solid rgba(255,107,107,0.4)' : '1px solid rgba(245,241,232,0.08)', borderRadius:10, textAlign:'center' }}>
                <div className={`tm-avatar ${c}`} style={{ width:28, height:28, fontSize:11, margin:'0 auto 4px' }}>{i}</div>
                <div style={{ fontWeight:800, fontSize:10, color:'#F5F1E8' }}>{n}</div>
                <div style={{ fontSize:9, color: t==='LOST' ? '#FF8E8E' : '#8A93A2', fontWeight:700 }}>{t}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <button 
          onClick={() => navigate('/manage-group')}
          style={{ ...C_CARD_STYLE, padding:'12px', color:'#F5F1E8', fontSize:11, fontWeight:700, background:'rgba(20,27,40,0.85)', backdropFilter:'blur(20px)', display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Invite
        </button>
        <button 
          onClick={() => navigate('/lost-mode')}
          style={{ padding:'12px', color:'#fff', fontSize:11, fontWeight:800, background:'linear-gradient(180deg, #FF6B6B, #B11C54)', borderRadius:18, border:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer', boxShadow:'0 8px 18px -6px rgba(176,28,84,0.5)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M12 1 L2 22 L22 22 Z"/></svg>
          SOS
        </button>
      </div>
    </div>
  );
};

export default MapPage;
