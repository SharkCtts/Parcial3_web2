export function Carrito({ carrito, setCarrito }) {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const remover = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
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
        </>
      )}
    </div>
  );
}
