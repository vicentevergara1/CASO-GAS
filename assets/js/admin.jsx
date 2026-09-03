import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('productosStore')) || [];
    setProductos(guardados);
  }, []);
  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nombre || !precio) return;

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio: parseFloat(precio)
    };

    const actualizados = [...productos, nuevoProducto];
    setProductos(actualizados);
    localStorage.setItem('productosStore', JSON.stringify(actualizados));
    setNombre('');
    setPrecio('');
  };
  const eliminarProducto = (id) => {
    const actualizados = productos.filter((p) => p.id !== id);
    setProductos(actualizados);
    localStorage.setItem('productosStore', JSON.stringify(actualizados));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>Panel de Administración - Gas El Volcán</h2>

      <form onSubmit={agregarProducto} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ flex: '1', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={{ width: '130px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Añadir
        </button>
      </form>

      <h3>Lista de Productos Registrados</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {productos.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', background: '#f9f9f9' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>{p.nombre}</h4>
            <p style={{ margin: '0 0 10px 0', color: '#555' }}>Precio: ${p.precio}</p>
            <button
              onClick={() => eliminarProducto(p.id)}
              style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}