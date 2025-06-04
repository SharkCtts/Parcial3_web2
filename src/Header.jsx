import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Header({ busqueda, setBusqueda }) {
  const [usuario, setUsuario] = useState(null);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  // Carga favoritos cada vez que se abre el desplegable
  useEffect(() => {
    if (mostrarFavoritos) {
      const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
      setFavoritos(favs);
    }
  }, [mostrarFavoritos]);

  const handleUsuarioClick = () => {
    if (usuario) {
      localStorage.removeItem('usuario');
      setUsuario(null);
    } else {
      navigate('/perfil');
    }
  };

  const toggleFavoritos = () => {
    setMostrarFavoritos(!mostrarFavoritos);
  };

  const eliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((item) => item.id !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
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

      <div className="botones-header">
        <button className="boton-favoritos" onClick={toggleFavoritos}>
          ⭐ Favoritos
        </button>

        <button className="boton-usuario" onClick={handleUsuarioClick}>
          👤 {usuario ? usuario.nombre : 'Perfil'}
        </button>

        {mostrarFavoritos && (
          <ul className="lista-favoritos">
            {favoritos.length === 0 ? (
              <li>No tienes favoritos.</li>
            ) : (
              favoritos.map((item) => (
                <li key={item.id}>
                  <span>{item.nombre}</span>
                  <div className="acciones-favorito">
                    <button onClick={() => eliminarFavorito(item.id)}>Eliminar</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
