import React, { useState } from 'react';

export default function AdminPanel() {
  const rol = localStorage.getItem('rol') || 'OPERADORA';
  const [stock, setStock] = useState({ c5kg: 80, c11kg: 200, c15kg: 90, c45kg: 30 });
  return (
    <div>
      <h1>Panel de Control ({rol})</h1>

      <div style={{ background: '#e0f7fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Stock en Bodega (Tiempo Real)</h3>
        <ul>
          <li>Cilindros 5 kg: {stock.c5kg} unidades</li>
          <li>Cilindros 11 kg: {stock.c11kg} unidades</li>
          <li>Cilindros 15 kg: {stock.c15kg} unidades</li>
          <li>Cilindros 45 kg: {stock.c45kg} unidades</li>
        </ul>
      </div>
      <h2>Pedidos Recibidos</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Dirección</th>
            <th>Producto</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#101</td>
            <td>Juan Pérez</td>
            <td>Av. Argentina 120, Chillán</td>
            <td>1x Cilindro 11 kg</td>
            <td>Pendiente</td>
            <td>
              <button onClick={() => alert('Pedido Asignado a Camión 1')}>Asignar Repartidor</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}