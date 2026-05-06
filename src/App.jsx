import { Routes, Route } from 'react-router-dom';  // ← Quité BrowserRouter
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Pedidos from './pages/Pedidos';
import Perfil from './pages/Perfil';
import Historial from './pages/Historial';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Registro from './pages/Registro';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>   {}
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/perfil/:id" element={<Perfil />} />
          <Route path="/historial/:id" element={<Historial />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </div>
    </>
  );
}

export default App;