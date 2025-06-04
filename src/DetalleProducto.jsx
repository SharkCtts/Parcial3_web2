import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productos } from './data';
import Header from './Header';
import './DetalleProducto.css';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find((p) => p.id === parseInt(id));
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Escuchar el evento carritoActualizado para sincronizar carrito
  useEffect(() => {
    const actualizarCarrito = () => {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        setCarrito(JSON.parse(carritoGuardado));
      } else {
        setCarrito([]);
      }
    };
    window.addEventListener('carritoActualizado', actualizarCarrito);
    return () => {
      window.removeEventListener('carritoActualizado', actualizarCarrito);
    };
  }, []);

  // Guardar carrito en localStorage cuando cambie y emitir evento para que App se actualice si está abierta
  useEffect(() => {
  if (carrito.length > 0) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log('Guardado carrito:', carrito);
  }
}, [carrito]);

const agregarAlCarrito = () => {
  const existe = carrito.find((item) => item.id === producto.id);
  if (existe) {
    setCarrito(
      carrito.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  } else {
    setCarrito([...carrito, { ...producto, cantidad: 1 }]);
  }
};

  const agregarAFavoritos = () => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const yaExiste = favoritos.find((item) => item.id === producto.id);
  if (!yaExiste) {
    favoritos.push(producto);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert('Agregado a favoritos');
  } else {
    alert('Ya está en favoritos');
  }
};


  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="App">
      <Header />
      <div className="detalle">
        <h2>{producto.nombre}</h2>
        <model-viewer
          src={producto.modelo}
          alt={producto.nombre}
          auto-rotate
          camera-controls
          ar
          style={{ width: '500px', height: '500px' }}
        />
        <p>
          <strong>Precio:</strong> ${producto.precio}
        </p>
        <p>
          <strong>Descripción:</strong> {producto.descripcion}
        </p>
        <p>
          <strong>Dimensiones:</strong> {producto.dimensiones}
        </p>

        <div className="acciones">
          <button onClick={agregarAlCarrito}>Agregar al carrito 🛒</button>
          <button onClick={() => navigate('/')}>Volver al menú principal 🏠</button>
          <button onClick={agregarAFavoritos}>❤️ Favorito</button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
