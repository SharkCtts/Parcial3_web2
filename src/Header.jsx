// Header.jsx
import logo from './assets/logo.png';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header({ busqueda, setBusqueda }) {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const handleUsuarioClick = () => {
    if (usuario) {
      localStorage.removeItem('usuario');
      setUsuario(null);
    } else {
      navigate('/perfil');
    }
  };

  return (
    <header className="top-bar">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Tienda 3D</h1>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador"
      />

      <div className="usuario">
        <button className="boton-usuario" onClick={handleUsuarioClick}>
          👤 {usuario ? usuario.nombre : 'Perfil'}
        </button>
      </div>
    </header>
  );
}

export default Header;
