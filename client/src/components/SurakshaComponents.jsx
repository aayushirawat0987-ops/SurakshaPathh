import React from 'react';

export const C_CARD_STYLE = {
  background: 'var(--paper)',
  border: '1px solid var(--line)',
  borderRadius: 18,
  boxShadow: '0 8px 30px -12px rgba(26,31,46,0.1)',
};

export function C_Orb({ x, y, size = 80, color = '#c8512e', delay = '0s' }) {
  return (
    <div style={{
      position:'absolute', left:x, top:y, width:size, height:size,
      borderRadius:'50%',
      background:`radial-gradient(circle at 30% 25%, ${color}44, ${color}11 70%)`,
      filter:'blur(1px)',
      animationDelay:delay,
      zIndex:1,
      pointerEvents:'none',
    }}/>
  );
}

export function C_Ring({ x, y, size = 100, color = '#c8512e', delay = '0s' }) {
  return (
    <div style={{
      position:'absolute', left:x, top:y, width:size, height:size,
      borderRadius:'50%',
      border:`1px solid ${color}33`,
      animationDelay:delay,
      zIndex:1,
      pointerEvents:'none',
    }}/>
  );
}

export function C_Bg() {
  return (
    <>
      <C_Orb x={-40} y={-30} size={200} color="#c8512e"/>
      <C_Orb x={'75%'} y={'5%'} size={160} color="#d99b3d" delay="1s"/>
      <C_Orb x={'85%'} y={'80%'} size={120} color="#5a8a6b" delay="2s"/>
      <C_Orb x={-30} y={'65%'} size={100} color="#6b86c4" delay="1.5s"/>
    </>
  );
}

export function StatusBar({ dark, time = '9:41' }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',padding:'18px 22px 0',fontSize:12,color:'var(--ink)',fontFamily:'Fraunces',fontWeight:500}}>
      <span>{time}</span>
    </div>
  );
}

export function Logo({ size = 22, color = 'var(--terracotta)', label = true }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <div style={{
        width:size, height:size, borderRadius:'50%',
        background:'var(--dawn)',
        position:'relative',
        boxShadow:`0 4px 12px rgba(200,81,46,0.35)`,
        flexShrink:0,
      }}>
        <div style={{position:'absolute',inset:size*0.18,borderRadius:'50%',background:'var(--paper)'}}></div>
        <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:size*0.35,height:size*0.35,borderRadius:'50%',background:'var(--terracotta)',zIndex:2}}></div>
      </div>
      {label && <span style={{fontFamily:'Fraunces',fontWeight:600,fontSize:size*0.85,letterSpacing:'-0.01em',color:'var(--ink)'}}>SurakshaPath</span>}
    </div>
  );
}

export function EyeIcon({ visible = false, size = 16 }) {
  return visible ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  );
}

export function GoogleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
  );
}

export function Pin3D({ x, y, color = 'terracotta', label, ping, lost, size = 36 }) {
  const palette = {
    terracotta: ['#e8775a', '#c8512e'],
    cyan: ['#22D3EE', '#06B6D4'],
    coral: ['#FF8E8E', '#FF6B6B'],
    green: ['#87b095', '#5a8a6b'],
    amber: ['#f1c27a', '#d99b3d'],
  }[color] || ['#e8775a', '#c8512e'];
  return (
    <div style={{ position:'absolute', left:`${x}%`, top:`${y}%`, transform:'translate(-50%, -100%)', zIndex:1000 }}>
      <div style={{ position:'relative' }}>
        <div style={{
          width:size, height:size,
          borderRadius:'50% 50% 50% 0',
          transform:'rotate(-45deg)',
          background:`linear-gradient(135deg, ${palette[0]}, ${palette[1]})`,
          boxShadow:`0 ${size*0.22}px ${size*0.55}px ${palette[1]}66`,
        }}>
          <div style={{ position:'absolute', inset:size*0.22, background:'var(--paper)', borderRadius:'50%' }}/>
        </div>
        {label && (
          <div style={{ position:'absolute', top:size+4, left:'50%', transform:'translateX(-50%)', background:'var(--paper)', color:'var(--ink)', padding:'2px 8px', borderRadius:99, fontSize:10, fontWeight:600, whiteSpace:'nowrap', boxShadow:'0 4px 10px -2px rgba(26,31,46,0.15)' }}>{label}</div>
        )}
      </div>
    </div>
  );
}

export function MapBg({ style = 'warm', children }) {
  return (
    <div style={{ position:'absolute', inset:0 }}>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, #ede6d5 0%, #d8d0bc 100%)' }}/>
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 320 480" preserveAspectRatio="none">
        <path d="M-10 200 Q 80 180, 160 220 T 340 240" stroke="rgba(90,138,107,0.4)" strokeWidth="3" fill="none"/>
        <path d="M40 -10 Q 100 100, 140 200 T 200 480" stroke="rgba(200,81,46,0.3)" strokeWidth="2.5" fill="none"/>
        <path d="M-10 380 Q 100 340, 220 360 T 340 320" stroke="rgba(217,155,61,0.4)" strokeWidth="2" fill="none"/>
      </svg>
      {children}
    </div>
  );
}
