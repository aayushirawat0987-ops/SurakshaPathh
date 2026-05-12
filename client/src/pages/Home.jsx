import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* ---- Inline icon set ---- */
const SP_Icon = ({ name, size = 18, color = 'currentColor' }) => {
  const s = { fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    shield: <svg width={size} height={size} viewBox="0 0 24 24"><path {...s} d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path {...s} d="M9 12l2 2 4-4"/></svg>,
    bell:   <svg width={size} height={size} viewBox="0 0 24 24"><path {...s} d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z"/><path {...s} d="M10 21h4"/></svg>,
    route:  <svg width={size} height={size} viewBox="0 0 24 24"><circle {...s} cx="6" cy="6" r="2.5"/><circle {...s} cx="18" cy="18" r="2.5"/><path {...s} d="M6 8.5v3a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4"/></svg>,
    users:  <svg width={size} height={size} viewBox="0 0 24 24"><circle {...s} cx="9" cy="9" r="3.5"/><path {...s} d="M2 20a7 7 0 0 1 14 0"/><circle {...s} cx="17" cy="7" r="2.5"/><path {...s} d="M16 14a6 6 0 0 1 6 6"/></svg>,
    flame:  <svg width={size} height={size} viewBox="0 0 24 24"><path {...s} d="M12 3c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4-1 3 1 4 2 4 0-3-1-5 1-10z"/></svg>,
    pin:    <svg width={size} height={size} viewBox="0 0 24 24"><path {...s} d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle {...s} cx="12" cy="9" r="2.5"/></svg>,
    play:   <svg width={size} height={size} viewBox="0 0 24 24"><path fill={color} stroke="none" d="M6 4l14 8-14 8V4z"/></svg>,
    arrow:  <svg width={size} height={size} viewBox="0 0 24 24"><path {...s} d="M5 12h14M13 6l6 6-6 6"/></svg>,
    moon:   <svg width={size} height={size} viewBox="0 0 24 24"><path {...s} d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z"/></svg>,
    check:  <svg width={size} height={size} viewBox="0 0 24 24"><path {...s} d="M4 12l5 5L20 6"/></svg>,
  };
  return icons[name] || null;
};

/* ---- Nav ---- */
const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="sp-nav">
      <div className="brand">
        <div className="brand-mark"></div>
        <span>SurakshaPath</span>
      </div>
      <div className="sp-nav-links">
        <a href="#features">Features</a>
        <a href="#story">Story</a>
        <a href="#how">How it works</a>
        <a href="#community">Community</a>
      </div>
      <a className="cta" href="#cta" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Launch app</a>
    </nav>
  );
};

/* ---- Hero ---- */
const Hero = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handler = (e) => {
      if (!mountRef.current) return;
      const w = window.innerWidth, h = window.innerHeight;
      const x = (e.clientX / w - 0.5);
      const y = (e.clientY / h - 0.5);
      const els = mountRef.current.querySelectorAll('[data-depth]');
      els.forEach(el => {
        const d = parseFloat(el.dataset.depth);
        el.style.transform = `translate3d(${x * d * -30}px, ${y * d * -20}px, 0)`;
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section className="sp-hero sp-grain" ref={mountRef}>
      <div className="sp-chip" style={{top:'32%',left:'8%',animationDelay:'0s'}} data-depth="1.4">
        <div className="swatch" style={{background:'rgba(90,138,107,0.15)',border:'1px solid rgba(90,138,107,0.35)'}}><SP_Icon name="check" size={14} color="#5a8a6b"/></div>
        <div>
          <div style={{fontFamily:'Fraunces',fontWeight:500,color:'var(--ink)'}}>Safe corridor active</div>
          <div style={{color:'var(--ink-mute)',marginTop:2,fontSize:10}}>Mall Rd → Hostel · 1.2 km</div>
        </div>
      </div>
      <div className="sp-chip" style={{top:'46%',right:'6%',animationDelay:'2s'}} data-depth="1.5">
        <div className="swatch" style={{background:'rgba(200,81,46,0.12)',border:'1px solid rgba(200,81,46,0.35)'}}><SP_Icon name="bell" size={14} color="#c8512e"/></div>
        <div>
          <div style={{fontFamily:'Fraunces',fontWeight:500,color:'var(--ink)'}}>3 trusted contacts notified</div>
          <div style={{color:'var(--ink-mute)',marginTop:2,fontSize:10}}>Live sharing · 0:14</div>
        </div>
      </div>
      <div className="sp-chip" style={{top:'58%',left:'14%',animationDelay:'4s'}} data-depth="1.7">
        <div className="swatch" style={{background:'rgba(217,155,61,0.15)',border:'1px solid rgba(217,155,61,0.35)'}}><SP_Icon name="users" size={14} color="#d99b3d"/></div>
        <div>
          <div style={{fontFamily:'Fraunces',fontWeight:500,color:'var(--ink)'}}>Priya is 2 min away</div>
          <div style={{color:'var(--ink-mute)',marginTop:2,fontSize:10}}>Walking together · ETA 4:42 AM</div>
        </div>
      </div>

      <div className="sp-hero-content">
        <div className="sp-hero-badge">
          <span className="dot"></span>
          Built for the hills · Almora, Uttarakhand
        </div>
        <h1 className="sp-hero-title" style={{marginTop:28}}>
          <span className="line">Walk free,</span>
          <span className="line"><span className="accent">walk safe.</span></span>
        </h1>
        <p className="sp-hero-sub">
          A localized safety companion for students and women in hill regions —
          smart SOS, live route intelligence, and a trusted circle that always knows where you are.
        </p>
        <div className="sp-hero-actions">
          <button className="sp-btn sp-btn-primary" onClick={() => navigate('/signup')}>
            <SP_Icon name="shield" size={16}/> Activate Protection
          </button>
          <button className="sp-btn sp-btn-ghost" onClick={() => navigate('/login')}>
            <SP_Icon name="play" size={14}/> Sign In
          </button>
        </div>
      </div>

      <div className="sp-scroll-cue">
        <span>SCROLL</span>
        <div className="bar"></div>
      </div>
    </section>
  );
};

/* ---- Story ---- */
const Story = () => (
  <section className="sp-section" id="story">
    <div className="sp-story">
      <div className="sp-story-text sp-reveal">
        <span className="sp-eyebrow"><span className="dot"></span> Why we built this</span>
        <h2 style={{marginTop:22}}>
          One bus at <span className="sp-gradient-text">4&nbsp;AM.</span><br/>
          Then none at all.
        </h2>
        <p>In Almora and across Garhwal, students in hostels routinely chose unlit shortcuts over the main road because longer paths lacked monitoring. Public transit meant a single predawn bus from the Garhwal route — the only safe way home.</p>
        <p>When that route was diverted and eventually cancelled, the safest option simply disappeared. SurakshaPath was born to fill that gap: not just an SOS button, but a community-built intelligence layer that knows which roads are safe, which aren't, and who has your back.</p>
        <div className="sp-story-pull">
          "We're not asking people to walk less. We're asking them to walk knowing."
        </div>
      </div>
      <div className="sp-scene sp-reveal">
        <div className="sp-scene-card">
          <div className="sp-scene-time">
            <span className="dot"></span>
            <span>04:00 · GARHWAL ROUTE · LAST BUS</span>
          </div>
          <div className="sp-scene-caption">
            <div className="swatch" style={{minWidth:36,height:36,borderRadius:8,background:'rgba(255,77,141,0.15)',border:'1px solid rgba(255,77,141,0.4)',display:'grid',placeItems:'center'}}>
              <SP_Icon name="moon" size={16} color="#ff4d8d"/>
            </div>
            <div>
              <b>The 4 AM bus, before it was cancelled</b>
              <span>For most students, it was the only safe ride home for hundreds of kilometres.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---- Features ---- */
const Features = () => {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    e.currentTarget.style.setProperty('--mx', x + '%');
    e.currentTarget.style.setProperty('--my', y + '%');
    const rx = ((y - 50) / 50) * -4;
    const ry = ((x - 50) / 50) * 4;
    e.currentTarget.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const reset = (e) => { e.currentTarget.style.transform = ''; };

  return (
    <section className="sp-section" id="features">
      <div className="sp-section-head sp-reveal">
        <span className="sp-eyebrow"><span className="dot"></span> The platform</span>
        <h2>Six layers of safety,<br/>woven into one app.</h2>
        <p>Built around the real workflows of someone walking a route after dark, traveling between districts, or checking in on a friend.</p>
      </div>
      <div className="sp-features-grid">
        <div className="sp-feature span-3 sp-reveal" onMouseMove={handleMove} onMouseLeave={reset}>
          <div className="fv-sos">
            <div className="ring"></div><div className="ring"></div><div className="ring"></div>
            <div className="core">SOS</div>
          </div>
          <div>
            <span className="label">01 · Smart SOS</span>
            <h3 className="title">One press<br/>broadcasts everything.</h3>
            <p className="desc">Press and hold to send live location to your trusted circle, emergency services, and the community alert grid — all simultaneously.</p>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:16}}>
            <span className="sp-chip" style={{position:'static',animation:'none'}}>
              <div className="swatch" style={{background:'rgba(255,77,141,0.18)'}}><SP_Icon name="pin" size={12} color="#ff4d8d"/></div>
              Live GPS
            </span>
            <span className="sp-chip" style={{position:'static',animation:'none'}}>
              <div className="swatch" style={{background:'rgba(168,85,247,0.18)'}}><SP_Icon name="users" size={12} color="#a855f7"/></div>
              Auto-call contacts
            </span>
          </div>
        </div>

        <div className="sp-feature span-3 sp-reveal" onMouseMove={handleMove} onMouseLeave={reset}>
          <div className="fv-map">
            <svg viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="safegrad" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#5eead4"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient>
                <linearGradient id="riskgrad" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stopColor="#ff4d8d"/><stop offset="100%" stopColor="#ffb259"/></linearGradient>
              </defs>
              <path d="M0,200 L0,140 Q60,120 120,135 T240,130 T360,140 T400,135 L400,200 Z" fill="rgba(168,85,247,0.06)"/>
              <path d="M30,170 C90,160 130,90 200,80 S320,140 380,40" stroke="url(#safegrad)" strokeWidth="3" fill="none" strokeLinecap="round" style={{filter:'drop-shadow(0 0 6px #22d3ee)'}}/>
              <path d="M30,170 C100,170 160,170 200,150 S320,170 380,80" stroke="url(#riskgrad)" strokeWidth="2" fill="none" strokeDasharray="4 4" strokeLinecap="round"/>
              <circle cx="30" cy="170" r="5" fill="#5eead4" style={{filter:'drop-shadow(0 0 8px #5eead4)'}}/>
              <circle cx="380" cy="40" r="5" fill="#ff4d8d" style={{filter:'drop-shadow(0 0 8px #ff4d8d)'}}/>
            </svg>
          </div>
          <div style={{position:'relative',zIndex:2,marginTop:'auto'}}>
            <span className="label">02 · Safe Route Mapping</span>
            <h3 className="title">Knows which roads<br/>are watching back.</h3>
            <p className="desc">Routes are scored from community reports, lighting data, and footfall — so the map highlights paths that other women actually use safely.</p>
          </div>
        </div>

        <div className="sp-feature span-2 sp-reveal" onMouseMove={handleMove} onMouseLeave={reset}>
          <div className="fv-call">
            <div className="avatar"></div>
            <div className="name">Papa calling…</div>
            <div className="num">+91 98••• ••432</div>
            <div className="actions">
              <span className="reject">Decline</span>
              <span className="accept">Accept</span>
            </div>
          </div>
          <div style={{marginTop:'auto'}}>
            <span className="label">03 · Fake Call</span>
            <h3 className="title">A way out, hidden in a ringtone.</h3>
          </div>
        </div>

        <div className="sp-feature span-2 sp-reveal" onMouseMove={handleMove} onMouseLeave={reset}>
          <div className="fv-circle">
            <div className="orbit"></div>
            <div className="avatars">
              <div className="av">M</div><div className="av">R</div><div className="av">A</div><div className="av">P</div>
            </div>
            <div className="center">YOUR<br/>CIRCLE</div>
          </div>
          <div style={{marginTop:'auto',maxWidth:'60%'}}>
            <span className="label">04 · Trusted Circle</span>
            <h3 className="title">Always one tap from someone who knows you.</h3>
          </div>
        </div>

        <div className="sp-feature span-2 sp-reveal" onMouseMove={handleMove} onMouseLeave={reset}>
          <div className="fv-heatmap">
            <svg viewBox="0 0 200 200">
              <rect width="200" height="200" fill="#f3ebd9"/>
              <path d="M10,30 L190,30 M10,80 L190,80 M10,140 L190,140 M30,10 L30,190 M100,10 L100,190 M170,10 L170,190" stroke="rgba(26,31,46,0.06)" strokeWidth="1"/>
              <circle cx="60" cy="50" r="30" fill="rgba(200,81,46,0.35)" style={{filter:'blur(12px)'}}/>
              <circle cx="140" cy="120" r="38" fill="rgba(217,155,61,0.35)" style={{filter:'blur(14px)'}}/>
              <circle cx="100" cy="160" r="22" fill="rgba(90,138,107,0.35)" style={{filter:'blur(10px)'}}/>
              <circle cx="60" cy="50" r="3" fill="#c8512e"/>
              <circle cx="140" cy="120" r="3" fill="#d99b3d"/>
              <circle cx="100" cy="160" r="3" fill="#5a8a6b"/>
            </svg>
          </div>
          <div style={{marginTop:'auto'}}>
            <span className="label">05 · Community Alerts</span>
            <h3 className="title">Every anonymous report<br/>lights the next street.</h3>
          </div>
        </div>

        <div className="sp-feature span-2 sp-reveal" onMouseMove={handleMove} onMouseLeave={reset}>
          <div style={{position:'relative'}}>
            <span className="label">06 · Emergency Resources</span>
            <h3 className="title">Help lines, mapped.</h3>
            <p className="desc">Nearest hospitals, women's helpdesks, police chowkis, and verified local guardians — pre-loaded for hill regions.</p>
          </div>
          <div className="fv-resources">
            <div className="pill hospital"><b>14</b><span>Hospitals</span></div>
            <div className="pill police"><b>22</b><span>Police</span></div>
            <div className="pill help"><b>9</b><span>Helplines</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---- Showcase ---- */
const Showcase = () => {
  const stageRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (!stageRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const x = (e.clientX - cx) / r.width;
      const y = (e.clientY - cy) / r.height;
      const phone = stageRef.current.querySelector('.sp-phone');
      if (phone) phone.style.transform = `rotateY(${-18 + x * 10}deg) rotateX(${6 - y * 8}deg) rotateZ(-2deg)`;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section className="sp-section" id="how">
      <div className="sp-showcase">
        <div className="sp-showcase-text sp-reveal">
          <span className="sp-eyebrow"><span className="dot"></span> How it works</span>
          <h2 style={{marginTop:22}}>From <span className="sp-gradient-text">unfamiliar</span> street to <span className="sp-gradient-text">familiar</span> hands — in seconds.</h2>
          <p>Every interaction is designed to be usable in dim light, with one hand, while moving.</p>
          <div className="sp-showcase-steps">
            <div className="sp-step">
              <div className="num">01</div>
              <div className="body"><b>Hold the SOS</b><span>Single press while walking — the button is large, central, and reachable with your thumb.</span></div>
            </div>
            <div className="sp-step">
              <div className="num">02</div>
              <div className="body"><b>Your circle sees you live</b><span>Your trusted contacts get a real-time pin, your route, and your battery level.</span></div>
            </div>
            <div className="sp-step">
              <div className="num">03</div>
              <div className="body"><b>The community responds</b><span>Reports near you trigger anonymized alerts to anyone walking the same route within the hour.</span></div>
            </div>
          </div>
        </div>
        <div className="sp-phone-stage" ref={stageRef}>
          <div className="float-chip" style={{top:'8%',left:'4%',animationDelay:'0s'}}>
            <div className="swatch" style={{background:'rgba(90,138,107,0.18)'}}><SP_Icon name="check" size={14} color="#5a8a6b"/></div>
            <div><div style={{fontFamily:'Fraunces',fontWeight:600}}>Location shared</div><div style={{color:'var(--ink-mute)',fontSize:10,marginTop:2}}>3 contacts · 0:14 ago</div></div>
          </div>
          <div className="float-chip" style={{top:'18%',right:'0%',animationDelay:'2s'}}>
            <div className="swatch" style={{background:'rgba(200,81,46,0.18)'}}><SP_Icon name="route" size={14} color="#c8512e"/></div>
            <div><div style={{fontFamily:'Fraunces',fontWeight:600}}>Safer route ready</div><div style={{color:'var(--ink-mute)',fontSize:10,marginTop:2}}>+4 min · well-lit</div></div>
          </div>
          <div className="float-chip" style={{bottom:'18%',left:'-2%',animationDelay:'4s'}}>
            <div className="swatch" style={{background:'rgba(217,155,61,0.18)'}}><SP_Icon name="bell" size={14} color="#d99b3d"/></div>
            <div><div style={{fontFamily:'Fraunces',fontWeight:600}}>Alert nearby</div><div style={{color:'var(--ink-mute)',fontSize:10,marginTop:2}}>200m · poor lighting</div></div>
          </div>
          <div className="sp-phone">
            <div className="sp-phone-notch"></div>
            <div className="sp-phone-screen">
              <div className="sp-pui-status"><span>9:41</span><span className="indicators"><span style={{display:'inline-block',width:14,height:8,borderRadius:2,background:'rgba(26,31,46,0.4)'}}></span></span></div>
              <div className="sp-pui-header">
                <div className="h">Tonight</div>
                <div className="greet">Hi Aanya, hold to call help</div>
              </div>
              <div className="sp-pui-sos">
                <div className="label">SOS</div>
                <div className="hold">Hold to activate</div>
              </div>
              <div className="sp-pui-quick">
                <div className="qa pink"><div className="ic"></div><div className="t">Fake call</div><div className="s">Papa · 5s</div></div>
                <div className="qa violet"><div className="ic"></div><div className="t">Share live</div><div className="s">3 contacts</div></div>
                <div className="qa mint"><div className="ic"></div><div className="t">Safe route</div><div className="s">Home · 22 min</div></div>
                <div className="qa"><div className="ic"></div><div className="t">Report</div><div className="s">Anonymous</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---- Community ---- */
const Community = () => (
  <section className="sp-section" id="community">
    <div className="sp-section-head sp-reveal">
      <span className="sp-eyebrow"><span className="dot"></span> Community intelligence</span>
      <h2>Every walker, a sensor.<br/>Every report, a streetlight.</h2>
      <p>A living heatmap of which paths feel safe — built anonymously, in real time, by the people walking them.</p>
    </div>
    <div className="sp-heatmap-wrap sp-reveal">
      <div className="live"><span className="pulse"></span> Live · Almora</div>
      <svg viewBox="0 0 1200 540" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="hot"><stop offset="0%" stopColor="#c8512e" stopOpacity="0.5"/><stop offset="100%" stopColor="#c8512e" stopOpacity="0"/></radialGradient>
          <radialGradient id="warm"><stop offset="0%" stopColor="#d99b3d" stopOpacity="0.45"/><stop offset="100%" stopColor="#d99b3d" stopOpacity="0"/></radialGradient>
          <radialGradient id="cool"><stop offset="0%" stopColor="#5a8a6b" stopOpacity="0.4"/><stop offset="100%" stopColor="#5a8a6b" stopOpacity="0"/></radialGradient>
          <linearGradient id="route-glow" x1="0" x2="1"><stop offset="0%" stopColor="#5a8a6b"/><stop offset="100%" stopColor="#c8512e"/></linearGradient>
        </defs>
        <g stroke="rgba(26,31,46,0.06)" strokeWidth="1" fill="none">
          <path d="M0,200 Q200,160 400,200 T800,200 T1200,210"/>
          <path d="M0,260 Q200,220 400,260 T800,260 T1200,270"/>
          <path d="M0,320 Q200,280 400,320 T800,320 T1200,330"/>
        </g>
        <g stroke="rgba(26,31,46,0.08)" strokeWidth="1.4" fill="none">
          <path d="M0,300 C200,290 400,310 600,280 S1000,260 1200,300"/>
          <path d="M100,80 C200,200 300,300 280,420 S400,500 600,490"/>
          <path d="M800,40 C780,180 850,300 900,420 S950,520 1100,510"/>
        </g>
        <circle cx="240" cy="220" r="120" fill="url(#hot)"/>
        <circle cx="900" cy="360" r="140" fill="url(#warm)"/>
        <circle cx="640" cy="180" r="100" fill="url(#cool)"/>
        <circle cx="380" cy="430" r="90" fill="url(#warm)"/>
        <circle cx="540" cy="380" r="110" fill="url(#cool)"/>
        <path d="M120,400 C300,380 400,260 600,250 S800,290 950,180" stroke="url(#route-glow)" strokeWidth="3" fill="none" strokeLinecap="round" style={{filter:'drop-shadow(0 0 8px rgba(200,81,46,0.5))'}}/>
        <g>
          <circle cx="240" cy="220" r="5" fill="#c8512e"/>
          <circle cx="240" cy="220" r="14" fill="none" stroke="#c8512e" strokeOpacity="0.4">
            <animate attributeName="r" from="6" to="24" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>
        <g>
          <circle cx="900" cy="360" r="5" fill="#d99b3d"/>
          <circle cx="900" cy="360" r="14" fill="none" stroke="#d99b3d" strokeOpacity="0.4">
            <animate attributeName="r" from="6" to="24" dur="2.4s" begin="0.6s" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" from="0.6" to="0" dur="2.4s" begin="0.6s" repeatCount="indefinite"/>
          </circle>
        </g>
        <g>
          <circle cx="640" cy="180" r="5" fill="#5a8a6b"/>
          <circle cx="640" cy="180" r="14" fill="none" stroke="#5a8a6b" strokeOpacity="0.5">
            <animate attributeName="r" from="6" to="24" dur="2.6s" begin="1.2s" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" from="0.6" to="0" dur="2.6s" begin="1.2s" repeatCount="indefinite"/>
          </circle>
        </g>
        <text x="280" y="208" fontFamily="Inter" fontSize="11" fill="#1a1f2e" opacity="0.6">Mall Road · 12 reports</text>
        <text x="940" y="350" fontFamily="Inter" fontSize="11" fill="#1a1f2e" opacity="0.6">NTD market · 4 reports</text>
        <text x="680" y="172" fontFamily="Inter" fontSize="11" fill="#1a1f2e" opacity="0.6">Hospital lane</text>
      </svg>
      <div className="legend">
        <div className="item"><span className="dot" style={{background:'#c8512e',boxShadow:'0 0 8px rgba(200,81,46,0.6)'}}></span> High activity</div>
        <div className="item"><span className="dot" style={{background:'#d99b3d',boxShadow:'0 0 8px rgba(217,155,61,0.6)'}}></span> Reported caution</div>
        <div className="item"><span className="dot" style={{background:'#5a8a6b',boxShadow:'0 0 8px rgba(90,138,107,0.6)'}}></span> Verified safe</div>
        <div className="item"><span className="dot" style={{background:'#c8512e',boxShadow:'0 0 8px rgba(200,81,46,0.4)'}}></span> Safe route</div>
      </div>
    </div>
    <div className="sp-stats">
      <div className="sp-stat sp-reveal"><div className="num">2,400+</div><div className="lbl">Anonymous reports contributed</div></div>
      <div className="sp-stat sp-reveal"><div className="num">38</div><div className="lbl">Hill districts mapped</div></div>
      <div className="sp-stat sp-reveal"><div className="num">14s</div><div className="lbl">Median time-to-help from SOS</div></div>
      <div className="sp-stat sp-reveal"><div className="num">100%</div><div className="lbl">Anonymous, end-to-end</div></div>
    </div>
  </section>
);

/* ---- CTA ---- */
const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="sp-cta sp-reveal" id="cta">
      <div className="sp-cta-inner">
        <div className="sp-hero-badge"><span className="dot"></span> Free · Open · For the community</div>
        <h2 style={{marginTop:22}}>The route home<br/><span className="sp-serif" style={{color:'var(--terracotta)'}}>shouldn't be the hard part.</span></h2>
        <p>Join thousands of students and women walking the hills with one less thing to fear. SurakshaPath is free, anonymous, and built with you.</p>
        <div style={{display:'inline-flex',gap:14,flexWrap:'wrap',justifyContent:'center'}}>
          <button className="sp-btn sp-btn-primary" onClick={() => navigate('/signup')}>
            <SP_Icon name="shield" size={16}/> Get SurakshaPath <SP_Icon name="arrow" size={14}/>
          </button>
          <button className="sp-btn sp-btn-ghost" style={{background:'rgba(26,31,46,0.08)',border:'1px solid rgba(26,31,46,0.2)',color:'var(--ink)'}} onClick={() => navigate('/login')}>
            <SP_Icon name="users" size={14}/> Sign in
          </button>
        </div>
      </div>
    </section>
  );
};

/* ---- Footer ---- */
const Footer = () => (
  <footer className="sp-footer">
    <div className="col" style={{maxWidth:280}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
        <div className="brand-mark" style={{width:24,height:24,borderRadius:'50%',background:'var(--dawn)'}}></div>
        <span style={{fontFamily:'Fraunces',fontSize:16,color:'var(--ink)',fontWeight:500}}>SurakshaPath</span>
      </div>
      <div>A localized safety platform for hill regions. Built in Almora, Uttarakhand.</div>
    </div>
    <div className="col">
      <h5>Platform</h5>
      <a href="#features">Smart SOS</a><a href="#features">Safe Routes</a><a href="#features">Trusted Circle</a><a href="#community">Community Alerts</a>
    </div>
    <div className="col">
      <h5>About</h5>
      <a href="#story">Our story</a><a href="#story">Manifesto</a><a href="#">Press</a><a href="#">Contact</a>
    </div>
    <div className="col">
      <h5>Get started</h5>
      <a href="/signup">Create account</a><a href="/login">Sign in</a><a href="#">Open source</a><a href="#">Donate</a>
    </div>
  </footer>
);

/* ---- Main App ---- */
const Home = () => {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.sp-reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav/>
      <Hero/>
      <Story/>
      <Features/>
      <Showcase/>
      <Community/>
      <CTA/>
      <Footer/>
    </>
  );
};

export default Home;
