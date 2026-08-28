import React, { useState } from 'react';
export default function RepartidorPanel() {
  const [misPedidos, setMisPedidos] = useState([
    { id: 101, cliente: 'Juan Pérez', direccion: 'Av. Argentina 120, Chillán', producto: 'Cilindro 11 kg', estado: 'Asignado' }
  ]);
  const cambiarEstado = (id, nuevoEstado) => {
    setMisPedidos(misPedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
  };
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '10px' }}>
      <h2>🚛 Entregas Asignadas</h2>
      {misPedidos.map(p => (
        <div key={p.id} style={{ border: '2px solid #333', borderRadius: '8px', padding: '15px', marginBottom: '15px', background: '#fff' }}>
          <h3>Pedido #{p.id}</h3>
          <p><strong>Cliente:</strong> {p.cliente}</p>
          <p><strong>Dirección:</strong> {p.direccion}</p>
          <p><strong>Cilindro:</strong> {p.producto}</p>
          <p><strong>Estado Actual:</strong> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>{p.estado}</span></p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => cambiarEstado(p.id, 'En Camino')}
              style={{ flex: 1, padding: '12px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '5px' }}>
              En Camino
            </button>
            <button
              onClick={() => cambiarEstado(p.id, 'Entregado')}
              style={{ flex: 1, padding: '12px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}>
              Entregado
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}