import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { SafetyProvider } from './context/SafetyContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SafetyProvider>
        <Router>
          <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
            <AppRoutes />
          </div>
        </Router>
      </SafetyProvider>
    </AuthProvider>
  );
}

export default App;
