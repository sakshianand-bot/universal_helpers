import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TradelineProvider } from './contexts/TradelineContext';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TradelineProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <AppRoutes />
          </div>
        </TradelineProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
