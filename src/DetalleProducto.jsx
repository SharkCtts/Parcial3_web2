import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { productos } from './data';
import Header from './Header';
import './DetalleProducto.css'; // nuevo CSS solo para este componente

function DetalleProducto() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));
  const [busqueda, setBusqueda] = useState('');

  if (!producto) return <div>Producto no encontrado</div>;

  return (
    <div className="App">
      <Header className= "top-bar" busqueda={busqueda} setBusqueda={setBusqueda} />

      <div className="detalle">
        <h2>{producto.nombre}</h2>
        <model-viewer
          src={producto.modelo}
          alt={producto.nombre}
          auto-rotate
          camera-controls
          ar
        />
        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p><strong>Dimensiones:</strong> {producto.dimensiones}</p>
      </div>
    </div>
  );
}

export default DetalleProducto;
