import React, { useState } from 'react';

export default function TrackingPedido() {
  const [codigo, setCodigo] = useState('');
  const [pedido, setPedido] = useState(null);

  const buscarPedido = (e) => {
    e.preventDefault();
    if (!codigo) return;
    setPedido({
      id: codigo,
      estado: 'En Camino',
      repartidor: 'Juan Pérez (Camión #3)',
      direccion: 'Av. O\'Higgins #450, Chillán',
      estimado: '20 - 35 minutos'
    });
  };
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>📦 Seguimiento de tu Pedido</h2>
      <p style={{ color: '#666' }}>Ingresa el código de compra para conocer el estado del despacho.</p>
      <form onSubmit={buscarPedido} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Ej: PED-1024"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Buscar
        </button>
      </form>
      {pedido && (
        <div style={{ borderTop: '2px solid #eee', paddingTop: '15px' }}>
          <h3>Estado del Pedido: <span style={{ color: '#2e7d32' }}>{pedido.estado}</span></h3>
          <p><strong>N° Orden:</strong> {pedido.id}</p>
          <p><strong>Repartidor:</strong> {pedido.repartidor}</p>
          <p><strong>Dirección:</strong> {pedido.direccion}</p>
          <p><strong>Tiempo Estimado:</strong> {pedido.estimado}</p>
        </div>
      )}
    </div>
  );
}