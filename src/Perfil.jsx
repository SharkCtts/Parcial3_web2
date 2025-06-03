import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const [nombre, setNombre] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    const usuario = { nombre, clave };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    navigate('/');
  };

  return (
    <div className="perfil">
      <h2>Crear Perfil</h2>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Perfil;
