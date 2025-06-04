import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Perfil from './Perfil.jsx';
import DetalleProducto from './DetalleProducto.jsx';
import './index.css';
import Comprar from './Comprar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/comprar" element={<Comprar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
