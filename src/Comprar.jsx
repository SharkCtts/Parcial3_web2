import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './App.css';

function Comprar() {
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState([]);
  const [usuarioInfo, setUsuarioInfo] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    telefono: '',
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    const infoGuardada = localStorage.getItem('usuario_info');
    if (infoGuardada) {
      setUsuarioInfo(JSON.parse(infoGuardada));
    }
  }, []);

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuarioInfo((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnviar = (e) => {
    e.preventDefault();

    if (!usuarioInfo.nombre || !usuarioInfo.direccion || !usuarioInfo.ciudad || !usuarioInfo.telefono) {
      alert('Por favor, completa todos los campos');
      return;
    }

    localStorage.setItem('usuario_info', JSON.stringify(usuarioInfo));
    setCompraConfirmada(true);
  };

  const manejarSeguirComprando = () => {
    // Guardar resumen en "factura"
    const resumen = {
      usuario: usuarioInfo,
      productos: carrito,
      total,
      fecha: new Date().toISOString(),
    };
    localStorage.setItem('factura', JSON.stringify(resumen));

    // Limpiar carrito y datos de usuario
    localStorage.removeItem('carrito');
    localStorage.removeItem('usuario_info');

    // Redirigir a página principal
    navigate('/');
  };

  return (
    <div className="App">
      <Header />
      <div className="carrito" style={{ margin: '2rem auto', maxWidth: '600px' }}>
        <h2>Tu Carrito de Compra</h2>

        {compraConfirmada ? (
          <>
            <h3>✅ Resumen de tu compra:</h3>

            <div style={{ textAlign: 'left', marginTop: '1rem' }}>
              <h4>🧾 Información del usuario</h4>
              <p><strong>Nombre:</strong> {usuarioInfo.nombre}</p>
              <p><strong>Dirección:</strong> {usuarioInfo.direccion}</p>
              <p><strong>Ciudad:</strong> {usuarioInfo.ciudad}</p>
              <p><strong>Teléfono:</strong> {usuarioInfo.telefono}</p>

              <h4 style={{ marginTop: '1.5rem' }}>📦 Detalles del carrito</h4>
              <ul>
                {carrito.map((item) => (
                  <li key={item.id}>
                    {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                  </li>
                ))}
              </ul>

              <h3>Total a pagar: ${total}</h3>

              <div style={{ marginTop: '2rem' }}>
                <button
                  onClick={manejarSeguirComprando}
                  style={{
                    padding: '0.6rem 1.2rem',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          </>
        ) : carrito.length === 0 ? (
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

            {!mostrarFormulario ? (
              <div style={{ marginTop: '1rem' }}>
                <button
                  onClick={() => setMostrarFormulario(true)}
                  style={{ padding: '0.5rem 1rem', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                  Ingresar datos para compra
                </button>
                <button
                  onClick={() => window.history.back()}
                  style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}
                >
                  Regresar a comprar
                </button>
              </div>
            ) : (
              <form onSubmit={manejarEnviar} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={usuarioInfo.nombre}
                  onChange={manejarCambio}
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={usuarioInfo.direccion}
                  onChange={manejarCambio}
                />
                <input
                  type="text"
                  name="ciudad"
                  placeholder="Ciudad"
                  value={usuarioInfo.ciudad}
                  onChange={manejarCambio}
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={usuarioInfo.telefono}
                  onChange={manejarCambio}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem' }}>
                    Confirmar compra
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Comprar;
