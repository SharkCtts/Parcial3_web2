import { useEffect } from 'react';

export function Carrito({ carrito, setCarrito }) {
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const remover = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <div className="carrito">
      <h2>🛒</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                <button onClick={() => remover(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </>
      )}
    </div>
  );
}
