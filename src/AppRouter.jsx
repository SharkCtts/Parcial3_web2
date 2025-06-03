import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Perfil from './Perfil.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default AppRouter;
