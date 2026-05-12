import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Map', path: '/map' },
    { name: 'Groups', path: '/manage-group' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sp-nav" style={{position:'fixed',top:20,left:'50%',transform:'translateX(-50%)',zIndex:100}}>
      <div className="brand">
        <div className="brand-mark"></div>
        <Link to="/" style={{fontFamily:'Fraunces',fontWeight:600,fontSize:17,color:'var(--ink)',textDecoration:'none'}}>SurakshaPath</Link>
      </div>
      {user && (
        <div className="sp-nav-links">
          {links.map(link => (
            <Link key={link.name} to={link.path} style={{
              fontSize:13, fontWeight:500, textDecoration:'none',
              color: location.pathname === link.path ? 'var(--terracotta)' : 'var(--ink-soft)',
              transition:'color .2s',
            }}>{link.name}</Link>
          ))}
        </div>
      )}
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        {user ? (
          <>
            <Link to="/lost-mode" style={{padding:'9px 18px',borderRadius:999,background:'var(--terracotta)',color:'var(--paper)',fontSize:13,fontWeight:600,textDecoration:'none',boxShadow:'0 8px 20px -6px rgba(200,81,46,0.4)'}}>SOS</Link>
            <button onClick={handleLogout} style={{padding:'9px 18px',borderRadius:999,background:'var(--ink)',color:'var(--cream)',fontSize:13,fontWeight:600,border:'none',cursor:'pointer'}}>Log out</button>
          </>
        ) : (
          <Link to="/login" className="cta" style={{padding:'9px 18px',borderRadius:999,background:'var(--ink)',color:'var(--cream)',fontSize:13,fontWeight:600,textDecoration:'none'}}>Launch app</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
