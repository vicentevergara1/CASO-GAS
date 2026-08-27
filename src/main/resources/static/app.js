import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CatalogoGas from './pages/CatalogoGas';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import TrackingPedido from './pages/TrackingPedido';

function App() {
  return (
    <Router>
      <header style={{ background: '#d32f2f', padding: '1rem', color: 'white' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>🔥 Gas El Volcán - Chillán</h2>
          <div>
            <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Catálogo</Link>
            <Link to="/tracking" style={{ color: 'white', marginRight: '15px' }}>Mi Pedido</Link>
            <Link to="/login" style={{ color: 'white' }}>Acceso Personal</Link>
          </div>
        </nav>
      </header>

      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<CatalogoGas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/tracking" element={<TrackingPedido />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;