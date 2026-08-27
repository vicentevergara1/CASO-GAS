import React, { useState } from 'react';
const productosOficiales = [
  { id: 'CL001', nombre: 'Cilindro GLP 5 kg', precio: 6500, desc: 'Uso residencial pequeño' },
  { id: 'CL002', nombre: 'Cilindro GLP 11 kg', precio: 12000, desc: 'Estándar doméstico' },
  { id: 'CL003', nombre: 'Cilindro GLP 15 kg', precio: 16000, desc: 'Alto consumo hogar' },
  { id: 'CL004', nombre: 'Cilindro GLP 45 kg', precio: 45000, desc: 'Uso comercial / industrial' }
];
export default function CatalogoGas() {
  const [direccion, setDireccion] = useState('');
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const solicitarGas = (prod) => {
    if (!direccion) {
      alert('Ingresa una dirección de despacho en Chillán');
      return;
    }
    setPedidoRealizado(true);
  };
  return (
    <div>
      <h1>Solicitud de Cilindros a Domicilio</h1>

      <div style={{ marginBottom: '20px', background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <label style={{ fontWeight: 'bold' }}>Dirección de Entrega (Chillán / Comunas):</label>
        <input
          type="text"
          placeholder="Ej: Av. O'Higgins 450, Chillán"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px' }}
        />
      </div>
      {pedidoRealizado && (
        <div style={{ background: '#e8f5e9', padding: '10px', color: '#2e7d32', marginBottom: '20px' }}>
          ¡Pedido registrado! La operadora lo asignará a un repartidor en breve.
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {productosOficiales.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            <h3>{p.nombre}</h3>
            <p>{p.desc}</p>
            <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#d32f2f' }}>${p.precio.toLocaleString('es-CL')}</p>
            <button
              onClick={() => solicitarGas(p)}
              style={{ background: '#2e7d32', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}>
              Pedir Gas
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}