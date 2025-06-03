import { useEffect, useState } from 'react';
import '@google/model-viewer';
import { productos } from './data';
import { Carrito } from './Carrito';
import logo from './assets/logo.png';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Perfil from './Perfil';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleUsuarioClick = () => {
    if (usuario) {
      localStorage.removeItem('usuario');
      setUsuario(null);
    } else {
      navigate('/perfil');
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="App">
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

      <Carrito carrito={carrito} setCarrito={setCarrito} />
      <div className="galeria">
        {productosFiltrados.map((item) => (
          <div key={item.id} className="producto">
            <model-viewer
              src={item.modelo}
              alt={item.nombre}
              auto-rotate
              camera-controls
              ar
              style={{ width: '250px', height: '250px' }}
            />
            <h2>{item.nombre}</h2>
            <p>${item.precio}</p>
            <button onClick={() => agregarAlCarrito(item)}>Agregar</button>
          </div>
        ))}
      </div>
    </div>
  );
}




export default App;