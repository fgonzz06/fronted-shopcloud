import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">ShopCloud</Link>
        
        {/* Links de navegación */}
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-gray-300">Productos</Link>
          <Link to="/pedidos" className="hover:text-gray-300">Mis Pedidos</Link>
          
          {/* Links que solo se ven si hay usuario logueado */}
          {user && (
            <>
              <Link to={`/perfil/${user.id}`} className="hover:text-gray-300">Mi Perfil</Link>
              <Link to={`/historial/${user.id}`} className="hover:text-gray-300">Historial</Link>
            </>
          )}
          
          <Link to="/analytics" className="hover:text-gray-300">Analytics</Link>
          
          {/* Sección de usuario o login */}
          {user ? (
            <>
              <span className="text-green-300">Hola, {user.nombre}</span>
              <button onClick={logout} className="hover:text-gray-300">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">
                Registrarse
              </Link>
            </>
            
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;