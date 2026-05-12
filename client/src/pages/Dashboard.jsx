import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Safe Routes', desc: 'Find safe paths', path: '/map', color: 'var(--sage)', bg: 'rgba(90,138,107,0.08)', border: 'rgba(90,138,107,0.25)' },
    { label: 'Fake Call', desc: 'Escape a situation', path: '/map', color: 'var(--gold)', bg: 'rgba(217,155,61,0.08)', border: 'rgba(217,155,61,0.25)' },
    { label: 'My Circle', desc: 'Trusted contacts', path: '/manage-group', color: 'var(--sky)', bg: 'rgba(107,134,196,0.08)', border: 'rgba(107,134,196,0.25)' },
    { label: 'Alerts', desc: 'Community reports', path: '/map', color: 'var(--terracotta)', bg: 'rgba(200,81,46,0.08)', border: 'rgba(200,81,46,0.25)' },
  ];

  return (
    <div style={{minHeight:'100vh',background:'var(--cream)',paddingTop:100}}>
      <Navbar/>
      <div style={{maxWidth:640,margin:'0 auto',padding:'0 24px 60px'}}>
        <div style={{marginBottom:36}}>
          <span className="sp-eyebrow"><span className="dot"></span> Dashboard</span>
          <h1 style={{fontFamily:'Fraunces',fontSize:42,fontWeight:500,letterSpacing:'-0.02em',color:'var(--ink)',margin:'16px 0 6px',lineHeight:1.05}}>
            Good evening,<br/><span style={{fontStyle:'italic',color:'var(--terracotta)'}}>{user?.name?.split(' ')[0] || 'Friend'}.</span>
          </h1>
          <p style={{color:'var(--ink-soft)',fontSize:16}}>You're protected. Your circle is watching.</p>
        </div>

        {/* SOS button */}
        <div
          onClick={() => navigate('/lost-mode')}
          style={{
            background:'var(--terracotta)',
            borderRadius:20,
            padding:'28px 28px 24px',
            marginBottom:20,
            cursor:'pointer',
            boxShadow:'0 16px 40px -12px rgba(200,81,46,0.45)',
            position:'relative',
            overflow:'hidden',
          }}
        >
          <div style={{position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.15)'}}></div>
          <div style={{position:'absolute',top:-50,right:-50,width:160,height:160,borderRadius:'50%',border:'1px solid rgba(255,255,255,0.08)'}}></div>
          <div style={{fontFamily:'Fraunces',fontSize:11,fontWeight:600,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.7)',marginBottom:8}}>Emergency</div>
          <div style={{fontFamily:'Fraunces',fontSize:36,fontWeight:500,color:'var(--paper)',letterSpacing:'-0.02em',lineHeight:1}}>SOS · Lost Mode</div>
          <div style={{marginTop:10,fontSize:13,color:'rgba(255,255,255,0.8)'}}>Hold to broadcast your live location to trusted contacts</div>
        </div>

        {/* Status card */}
        <div className="sp-form-card" style={{marginBottom:20,display:'flex',alignItems:'center',gap:16}}>
          <div style={{width:52,height:52,borderRadius:'50%',background:'rgba(90,138,107,0.12)',border:'2px solid rgba(90,138,107,0.3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5a8a6b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'Fraunces',fontSize:18,fontWeight:500,color:'var(--ink)'}}>All safe</div>
            <div style={{fontSize:13,color:'var(--ink-soft)',marginTop:2}}>All family members are home · Updated just now</div>
          </div>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--sage)'}}>● Live</div>
        </div>

        {/* Quick actions grid */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
          {quickActions.map((a, i) => (
            <div
              key={i}
              onClick={() => navigate(a.path)}
              style={{
                background:'var(--paper)',
                border:`1px solid ${a.border}`,
                borderRadius:16,
                padding:'20px 18px',
                cursor:'pointer',
                transition:'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 30px -10px rgba(26,31,46,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
            >
              <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:a.color,marginBottom:8}}>{a.label}</div>
              <div style={{fontSize:13,color:'var(--ink-soft)'}}>{a.desc}</div>
            </div>
          ))}
        </div>

        {/* Map preview */}
        <div
          onClick={() => navigate('/map')}
          style={{
            background:'var(--paper)',
            border:'1px solid var(--line)',
            borderRadius:16,
            padding:0,
            overflow:'hidden',
            height:140,
            position:'relative',
            cursor:'pointer',
          }}
        >
          <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg,#ede6d5 0%,#d8d0bc 100%)'}}>
            <svg style={{width:'100%',height:'100%'}} viewBox="0 0 600 140" preserveAspectRatio="none">
              <path d="M0,140 Q100,100 200,120 T400,100 T600,110 L600,140Z" fill="rgba(90,138,107,0.2)"/>
              <path d="M0,140 Q150,125 300,130 T600,130 L600,140Z" fill="rgba(90,138,107,0.3)"/>
              <path d="M50,120 C150,100 200,80 300,90 S450,110 560,70" stroke="rgba(90,138,107,0.7)" strokeWidth="2" fill="none" strokeDasharray="4 4" strokeLinecap="round"/>
              <circle cx="50" cy="120" r="4" fill="#5a8a6b"/>
              <circle cx="560" cy="70" r="4" fill="#c8512e"/>
            </svg>
          </div>
          <div style={{position:'absolute',bottom:12,left:16,fontSize:11,fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--ink)',background:'rgba(251,246,236,0.9)',padding:'6px 12px',borderRadius:999,backdropFilter:'blur(8px)'}}>Open Map →</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
