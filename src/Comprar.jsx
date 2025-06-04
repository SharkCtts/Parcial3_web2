import { useState, useEffect } from 'react';
import Header from './Header';
import './App.css'; // Usa el mismo CSS del header y carrito

function Comprar() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const navigate = () => {
    window.history.back(); // para regresar a la página anterior
  };

  return (
    <div className="App">
      <Header />
      <div className="carrito" style={{ margin: '2rem auto', maxWidth: '600px' }}>
        <h2>Tu Carrito de Compra</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <>
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                </li>
              ))}
            </ul>
            <h3>Total: ${total}</h3>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button onClick={() => window.history.back()} style={{ padding: '0.5rem 1rem' }}>
                Regresar a comprar
              </button>
              <button
                onClick={() => alert('Compra iniciada!')}
                style={{ padding: '0.5rem 1rem', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Iniciar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comprar;
