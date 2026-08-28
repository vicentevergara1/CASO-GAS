import React, { useState } from 'react';
import { productosGas, zonasDespacho } from './mercancia';
export default function CatalogoGas() {
  const [tipoCliente, setTipoCliente] = useState('residencial');
  return (
    <div>
      <h2>Catálogo Completo - Gas El Volcán</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Tarifa:</label>
        <select value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)} style={{ padding: '8px' }}>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial / PYME</option>
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {productosGas.map((p) => (
          <div key={p.codigo} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff' }}>
            <span style={{ fontSize: '0.8em', color: '#666' }}>[{p.codigo}] {p.categoria}</span>
            <h3>{p.nombre}</h3>
            <p style={{ fontSize: '0.9em', color: '#444' }}>{p.desc}</p>
            <p style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#d32f2f' }}>
              ${(tipoCliente === 'residencial' ? p.precioRes : p.precioCom).toLocaleString('es-CL')}
            </p>
            <p style={{ fontSize: '0.9em', color: p.stock < 15 ? 'red' : 'green' }}>Stock: {p.stock} {p.unidad}</p>
            <button style={{ width: '100%', padding: '10px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px' }}>
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}