import { useState, useEffect } from 'react';
import Header from './Header';
import './App.css';

function Facturas() {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    let facturasGuardadas = JSON.parse(localStorage.getItem('factura'));
    if (!facturasGuardadas) {
      facturasGuardadas = [];
    } else if (!Array.isArray(facturasGuardadas)) {
      facturasGuardadas = [facturasGuardadas];
    }
    setFacturas(facturasGuardadas);
  }, []);

  return (
    <div className="App">
      <Header />
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <h2>Historial de Facturas</h2>
        {facturas.length === 0 ? (
          <p>No hay facturas guardadas.</p>
        ) : (
          facturas.map((factura, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>Factura #{index + 1}</h3>
              <p><b>Fecha:</b> {new Date(factura.fecha).toLocaleString()}</p>

              <h4>Datos del cliente:</h4>
              <p><b>Nombre:</b> {factura.usuario?.nombre}</p>
              <p><b>Dirección:</b> {factura.usuario?.direccion}</p>
              <p><b>Ciudad:</b> {factura.usuario?.ciudad}</p>
              <p><b>Teléfono:</b> {factura.usuario?.telefono}</p>

              <h4>Productos comprados:</h4>
              <ul>
                {factura.productos?.map((item) => (
                  <li key={item.id}>
                    {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                  </li>
                ))}
              </ul>

              <h4>Total: ${factura.total}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Facturas;
