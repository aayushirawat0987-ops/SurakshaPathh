import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo, C_Bg, C_CARD_STYLE } from '../components/SurakshaComponents';

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position:'fixed', inset:0, background:'#0E1521', color:'#F5F1E8', padding:'52px 20px 22px', overflow:'hidden', zIndex: 1000 }}>
      <C_Bg />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position:'relative', zIndex:2, maxWidth: 400, margin: '0 auto' }}
      >
        <Logo size={22} color="#22D3EE" />
        <div style={{ marginTop: 30 }}>
          <div style={{ fontSize: 11, color: '#8A93A2', letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase' }}>New password</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, margin: '8px 0 0', letterSpacing: -1.2, lineHeight: 0.95 }}>
            Make it<br/>strong.
          </h1>
        </div>

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle at 30% 25%, #6EE7B7, #10B981 75%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px -8px rgba(52,211,153,0.4), inset -6px -8px 16px rgba(0,0,0,0.3), inset 3px 5px 12px rgba(255,255,255,0.3)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6"><path d="M20 6 L9 17 L4 12"/></svg>
          </div>
        </div>

        <div style={{ ...C_CARD_STYLE, padding: 18, marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="tm-label">New password</label>
            <input className="tm-input" type="password" placeholder="••••••••••" />
            <div style={{ marginTop: 6, display: 'flex', gap: 3 }}>
              {[1, 1, 1, 1].map((on, i) => (
                <div key={i} style={{ flex: 1, height: 3, background: '#34D399', borderRadius: 99 }} />
              ))}
            </div>
            <div style={{ fontSize: 10, color: '#34D399', marginTop: 6, fontWeight: 700 }}>● Excellent strength</div>
          </div>
          <div>
            <label className="tm-label">Confirm password</label>
            <input className="tm-input" type="password" placeholder="••••••••••" />
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="tm-btn" 
            style={{ height: 48, background: 'linear-gradient(180deg, #22D3EE, #1083CE)', color: '#091D29', borderRadius: 12, fontWeight: 900, fontSize: 14, boxShadow: '0 8px 20px -6px rgba(34,211,238,0.5)' }}
          >
            Update password →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
