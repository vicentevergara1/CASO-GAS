import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === 'admin') {
      localStorage.setItem('rol', 'ADMINISTRADOR');
      navigate('/admin');
    } else if (usuario === 'operadora') {
      localStorage.setItem('rol', 'OPERADORA');
      navigate('/admin');
    } else if (usuario === 'repartidor') {
      localStorage.setItem('rol', 'REPARTIDOR');
      navigate('/admin');
    } else {
      alert('Credenciales incorrectas (Usa: admin, operadora o repartidor)');
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Ingreso de Personal</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Usuario:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}