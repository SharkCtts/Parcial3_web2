import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Perfil from './Perfil.jsx';
import Comprar from './Comprar.jsx'; // Importa el nuevo componente

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/comprar" element={<Comprar />} />
    </Routes>
  );
}

export default AppRouter;
