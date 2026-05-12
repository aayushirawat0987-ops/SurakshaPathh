import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo, C_Bg, C_CARD_STYLE } from '../components/SurakshaComponents';

const ForgotPassword = () => {
  return (
    <div style={{ position:'fixed', inset:0, background:'#0E1521', color:'#F5F1E8', padding:'52px 20px 22px', overflow:'hidden', zIndex: 1000 }}>
      <C_Bg />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ position:'relative', zIndex:2, maxWidth: 400, margin: '0 auto' }}
      >
        <Logo size={22} color="#22D3EE" />
        <div style={{ marginTop: 36 }}>
          <div style={{ fontSize: 11, color: '#8A93A2', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase' }}>Forgot password?</div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: '8px 0 0', letterSpacing: -1.5, lineHeight: 0.95 }}>
            Let's<br/>reset.
          </h1>
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 30% 25%, #67E8F9, #1083CE 75%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px -8px rgba(34,211,238,0.4), inset -8px -10px 22px rgba(0,0,0,0.3), inset 4px 6px 16px rgba(255,255,255,0.25)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
        </div>

        <p style={{ fontSize: 13, color: '#8A93A2', marginTop: 18, textAlign: 'center', lineHeight: 1.5 }}>
          Enter your email and we'll send a reset link. Expires in 15 min.
        </p>

        <div style={{ ...C_CARD_STYLE, padding: 18, marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="tm-label">Email address</label>
            <input className="tm-input" placeholder="ana@hartley.co" />
          </div>
          <button className="tm-btn" style={{ height: 48, background: 'linear-gradient(180deg, #22D3EE, #1083CE)', color: '#091D29', borderRadius: 12, fontWeight: 900, fontSize: 14, boxShadow: '0 8px 20px -6px rgba(34,211,238,0.5)' }}>
            Send reset link →
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <Link to="/login" style={{ fontSize: 13, color: '#8A93A2', textDecoration: 'none', fontWeight: 700 }}>← Back to sign in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
