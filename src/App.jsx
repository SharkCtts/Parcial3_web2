import { useEffect, useState } from 'react';
import '@google/model-viewer';
import { productos } from './data';
import { Carrito } from './Carrito';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './Header';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargado, setCargado] = useState(false); // <-- aquí

  const navigate = useNavigate();

  useEffect(() => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    setCarrito(JSON.parse(carritoGuardado));
  }
  setCargado(true);
}, []);

useEffect(() => {
  if (cargado) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
}, [carrito, cargado]);



  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  

  return (
    <div className="App">
      <Header busqueda={busqueda} setBusqueda={setBusqueda} />
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
              onClick={() => navigate(`/producto/${item.id}`)}
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
