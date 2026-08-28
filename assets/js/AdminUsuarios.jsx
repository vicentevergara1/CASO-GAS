import React, { useState } from 'react';
export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Ana López', usuario: 'alopez', rol: 'OPERADORA', activo: true },
    { id: 2, nombre: 'Carlos Ruiz', usuario: 'cruiz', rol: 'REPARTIDOR', activo: true }
  ]);
  const toggleEstado = (id) => {
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
  };
  return (
    <div>
      <h2>👥 Gestión de Usuarios del Sistema</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.usuario}</td>
              <td>{u.rol}</td>
              <td>{u.activo ? 'Activo' : 'Desactivado'}</td>
              <td>
                <button onClick={() => toggleEstado(u.id)}>
                  {u.activo ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}