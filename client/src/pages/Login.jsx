import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh',background:'var(--cream)',display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 20px'}}>
      <div style={{width:'100%',maxWidth:420}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:20}}>
            <div className="brand-mark" style={{width:32,height:32,borderRadius:'50%',background:'var(--dawn)',position:'relative',boxShadow:'0 4px 12px rgba(200,81,46,0.35)'}}>
              <div style={{position:'absolute',inset:5,borderRadius:'50%',background:'var(--paper)'}}></div>
              <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',width:10,height:10,borderRadius:'50%',background:'var(--terracotta)',zIndex:2}}></div>
            </div>
            <span style={{fontFamily:'Fraunces',fontWeight:600,fontSize:20,color:'var(--ink)'}}>SurakshaPath</span>
          </div>
          <span className="sp-eyebrow"><span className="dot"></span> Sign in</span>
          <h1 style={{fontFamily:'Fraunces',fontSize:38,fontWeight:500,letterSpacing:'-0.02em',color:'var(--ink)',margin:'16px 0 0',lineHeight:1.05}}>
            Welcome<br/><span style={{fontStyle:'italic',color:'var(--terracotta)'}}>back.</span>
          </h1>
        </div>

        {error && <div className="sp-error" style={{marginBottom:20}}>{error}</div>}

        <form onSubmit={handleSubmit} className="sp-form-card" style={{display:'flex',flexDirection:'column',gap:16}}>
          <div>
            <label className="sp-label">Email</label>
            <input className="sp-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required/>
          </div>
          <div>
            <label className="sp-label">Password</label>
            <input className="sp-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required/>
          </div>
          <button type="submit" className="sp-btn sp-btn-primary" disabled={loading} style={{width:'100%',marginTop:8,justifyContent:'center'}}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <div style={{textAlign:'center',marginTop:20,fontSize:13,color:'var(--ink-soft)'}}>
          <Link to="/forgot-password" className="sp-link">Forgot password?</Link>
          {' · '}
          New here? <Link to="/signup" className="sp-link">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
