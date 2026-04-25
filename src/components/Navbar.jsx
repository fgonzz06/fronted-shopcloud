import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ShopCloud</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Productos</Link>
          <Link to="/pedidos" className="hover:text-gray-300">Mis Pedidos</Link>
          <Link to="/perfil/1" className="hover:text-gray-300">Mi Perfil</Link>
          <Link to="/historial/1" className="hover:text-gray-300">Historial</Link>
          <Link to="/analytics" className="hover:text-gray-300">Analytics</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar