// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Cargar categorías y mapearlas por ID
      const cats = await getCategories();
      const categoriesMap = {};
      cats.forEach(cat => {
        categoriesMap[cat.id] = cat.nombre;
      });
      setCategories(categoriesMap);
      
      // Cargar productos
      const prods = await getProducts();
      setProducts(prods);
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  if (loading) return <div className="text-center py-10">Cargando productos...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Productos Destacados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="border rounded-lg p-4 hover:shadow-lg transition">
            <img 
              src={`https://picsum.photos/id/${product.id + 10}/200/150`} 
              alt={product.nombre}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{product.nombre}</h2>
            <p className="text-gray-600">
              Categoría: {categories[product.categoria_id] || 'Sin categoría'}
            </p>
            <p className="text-2xl font-bold text-blue-600 mt-2">${product.precio}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock} unidades</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;