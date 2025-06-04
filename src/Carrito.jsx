import { useNavigate } from 'react-router-dom';

export function Carrito({ carrito, setCarrito }) {
  const navigate = useNavigate();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const remover = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const irAComprar = () => {
    navigate('/comprar');
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
          <button onClick={irAComprar} style={{ marginTop: '1rem', backgroundColor: '#008CBA', color: 'white' }}>
            Ir a Comprar
          </button>
        </>
      )}
    </div>
  );
}
