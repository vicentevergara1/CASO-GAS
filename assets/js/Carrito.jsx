import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();
  const modificarCantidad = (codigo, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.codigo === codigo) {
        const nuevaCant = item.cantidad + delta;
        return nuevaCant > 0 ? { ...item, cantidad: nuevaCant } : item;
      }
      return item;
    }));
  };
  const eliminarItem = (codigo) => {
    setCarrito(prev => prev.filter(item => item.codigo !== codigo));
  };

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const finalizarCompra = () => {
    if (carrito.length === 0) return;
    const codigoPedido = 'PED-' + Math.floor(1000 + Math.random() * 9000);
    const pedidos = JSON.parse(localStorage.getItem('pedidosGlobales')) || [];
    pedidos.push({
      id: codigoPedido,
      items: carrito,
      total: total,
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString()
    });
    localStorage.setItem('pedidosGlobales', JSON.stringify(pedidos));

    alert(`¡Compra realizada con éxito!\nTu código de seguimiento es: ${codigoPedido}`);
    setCarrito([]);
    navigate('/tracking');
  };
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>🛒 Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p style={{ color: '#666' }}>El carrito está vacío. Agrega balones de gas desde el catálogo.</p>
      ) : (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
            {carrito.map((item) => (
              <div key={item.codigo} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <div>
                  <strong>{item.nombre}</strong> ({item.tipoCliente})
                  <div style={{ fontSize: '14px', color: '#666' }}>Precio unitario: ${item.precio.toLocaleString('es-CL')}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => modificarCantidad(item.codigo, -1)} style={{ padding: '4px 8px', cursor: 'pointer' }}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => modificarCantidad(item.codigo, 1)} style={{ padding: '4px 8px', cursor: 'pointer' }}>+</button>
                  <button onClick={() => eliminarItem(item.codigo)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', borderTop: '2px solid #ccc', paddingTop: '15px' }}>
            <h3>Total: ${total.toLocaleString('es-CL')}</h3>
            <button onClick={finalizarCompra} style={{ background: '#2e7d32', color: 'white', border: 'none', padding: '12px 24px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}