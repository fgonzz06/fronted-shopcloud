import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProductById, getCategories, createPedido } from '../services/api';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [categoriaNombre, setCategoriaNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      
      const prod = await getProductById(id);
      setProduct(prod);
      
      if (prod && prod.categoria_id) {
        const cats = await getCategories();
        const cat = cats.find(c => c.id === prod.categoria_id);
        setCategoriaNombre(cat ? cat.nombre : 'Sin categoría');
      }
      
      setLoading(false);
    };
    
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      const nuevoPedido = {
        usuarioId: user.id,
        items: [{ productoId: parseInt(id), cantidad: 1 }]
      };
      
      console.log('Creando pedido desde ProductDetail:', nuevoPedido);
      
      const resultado = await createPedido(nuevoPedido);
      
      alert(`Producto agregado al carrito! Pedido #${resultado.id}`);
      navigate('/pedidos'); // Redirige a la lista de pedidos
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      alert('Error al agregar producto: ' + (error.response?.data?.message || error.message));
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="text-center py-10">Cargando producto...</div>;
  if (!product) return <div className="text-center py-10">Producto no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img 
          src={`https://picsum.photos/id/${product.id + 10}/400/400`}
          alt={product.nombre}
          className="w-full md:w-1/2 rounded-lg shadow"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.nombre}</h1>
          <p className="text-gray-600 mb-2">Categoría: {categoriaNombre}</p>
          <p className="text-4xl font-bold text-blue-600 mb-4">${product.precio}</p>
          <p className="text-gray-700 mb-4">
            {product.descripcion || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Stock disponible: {product.stock} unidades
          </p>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0 || adding}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-gray-400"
          >
            {adding ? 'Agregando...' : (product.stock > 0 ? 'Agregar al carrito' : 'Sin stock')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;