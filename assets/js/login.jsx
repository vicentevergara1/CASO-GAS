import React, { useState } from 'react';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Iniciando sesión con el usuario: ${usuario}`);
  };
  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#d32f2f', marginTop: 0 }}>🔑 Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Usuario / Email:</label>
          <input 
            type="text" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Contraseña:</label>
          <input 
            type="password" 
            value={clave} 
            onChange={(e) => setClave(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}