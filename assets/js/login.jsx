import { useState } from 'react';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const manejarLogin = (e) => {
    e.preventDefault();
    if (usuario === 'vicente' && password === 'abc123') {
      alert('¡Bienvenido, Admin Vicente!');
      localStorage.setItem('usuarioAdmin', 'vicente'); //cambiar la wea echa como el oyo
    } else {
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

class UsuarioAdmins {
    constructor(){
        this.listaAdmins = [
            {usuario : 'vicente', password : 'abc123'},
            {usuario : 'juan', password : 'juan123'},
            {usuario : 'benja', password : 'benja123'}
            ];
        }

    validarUsuario(usuarioInput,claveInput) {
        return thisAdmins.find(
            (admin) => admin.usuario.toLowerCase() === usuarioInput.trim().toLowerCase() && admin.clave === claveInput
            );
        }
    }
export const adminService = new UsuarioAdmin();

  return (
    <div className="login-container">
      <h3>Iniciar Sesión</h3>
      <form onSubmit={manejarLogin}>
        <div>
          <label>Usuario / Email:</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-ingresar">Ingresar</button>
      </form>
    </div>
  );
}