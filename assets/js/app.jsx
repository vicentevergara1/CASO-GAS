import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CatalogoGas from './CatalogoGas';
import Login from './login';
import AdminPanel from './admin';
import TrackingPedido from './TrackingPedido';
import RepartidorPanel from './RepartidorPanel';
import AdminUsuarios from './AdminUsuarios';

function App() {
  const [carrito, setCarrito] = useState([]);
  const agregarAlCarrito = (producto, tipoCliente) => {
    const precio = tipoCliente === 'residencial' ? producto.precioRes : producto.precioCom;
    setCarrito((prev) => {
      const existe = prev.find((item) => item.codigo === producto.codigo);
      if (existe) {
        return prev.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, precioSeleccionado: precio, cantidad: 1 }];
    });
  };
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  return (
    <Router>
      <header style={{ background: '#d32f2f', padding: '1rem 2rem', color: 'white' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>Gas El Volcán - Chillán</h2>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
            <Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Seguimiento</Link>
            <Link to="/repartidor" style={{ color: 'white', textDecoration: 'none' }}>Repartidor</Link>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Administración</Link>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', background: '#b71c1c', padding: '6px 12px', borderRadius: '4px' }}>
              Acceso
            </Link>
            <div style={{ background: 'white', color: '#d32f2f', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold' }}>
              🛒 {totalUnidades}
            </div>
          </div>
        </nav>
      </header>
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<CatalogoGas agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tracking" element={<TrackingPedido />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/repartidor" element={<RepartidorPanel />} />
        </Routes>
      </main>
    </Router>
  );
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);