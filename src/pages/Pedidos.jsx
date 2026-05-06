import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPedidos, createPedido } from '../services/api';

function Pedidos() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);

  // Cargar pedidos al montar - getPedidos NO necesita parámetro
  useEffect(() => {
    const loadPedidos = async () => {
      setLoading(true);
      
      console.log('=== DEPURACIÓN ===');
      console.log('Usuario logueado:', user);
      console.log('ID del usuario:', user?.id);
      
      const data = await getPedidos(); // ← Sin parámetro!
      
      console.log('Pedidos recibidos:', data);
      setPedidos(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    
    if (user) {
      loadPedidos();
    } else {
      console.log('No hay usuario logueado');
      setLoading(false);
    }
  }, [user]);

  // Crear un nuevo pedido
  const handleCreatePedido = async (e) => {
    e.preventDefault();
    if (!productoId || cantidad < 1) {
      alert('Ingresa un producto ID válido');
      return;
    }

    setCreating(true);
    try {
      const nuevoPedido = {
        usuarioId: user?.id, // Usa el ID real del token
        items: [{ productoId: parseInt(productoId), cantidad: parseInt(cantidad) }]
      };
      
      console.log('Creando pedido:', nuevoPedido);
      
      const resultado = await createPedido(nuevoPedido);
      alert(`Pedido creado con éxito! ID: ${resultado.id}`);
      
      // Recargar la lista de pedidos
      const pedidosActualizados = await getPedidos();
      setPedidos(Array.isArray(pedidosActualizados) ? pedidosActualizados : []);
      
      // Limpiar formulario
      setProductoId('');
      setCantidad(1);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear pedido: ' + (error.response?.data?.message || error.message));
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div className="text-center py-10">Cargando pedidos...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>

      {/* Formulario para crear pedido */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Crear nuevo pedido</h2>
        <form onSubmit={handleCreatePedido} className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="block text-sm font-medium mb-1">ID del Producto</label>
            <input
              type="number"
              value={productoId}
              onChange={(e) => setProductoId(e.target.value)}
              className="border rounded px-3 py-2 w-32"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              min="1"
              className="border rounded px-3 py-2 w-24"
              required
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-blue-400"
          >
            {creating ? 'Creando...' : 'Agregar al carrito'}
          </button>
        </form>
      </div>

      {/* Lista de pedidos */}
      {pedidos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tienes pedidos aún</p>
          <p className="text-gray-400 text-sm mt-2">
            Crea un pedido usando el formulario de arriba
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Pedido #{pedido.id}</h3>
                  <p className="text-gray-600 text-sm">
                    Fecha: {pedido.creadoEn ? new Date(pedido.creadoEn).toLocaleString() : 'Fecha no disponible'}
                  </p>
                  <p className="text-gray-600 text-sm">Usuario: {pedido.usuarioId}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">${pedido.total}</p>
                  <p className={`text-sm px-2 py-1 rounded inline-block ${
                    pedido.estado === 'ENTREGADO' ? 'bg-green-200 text-green-800' :
                    pedido.estado === 'ENVIADO' ? 'bg-blue-200 text-blue-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {pedido.estado}
                  </p>
                </div>
              </div>
              
              {pedido.detalle && pedido.detalle.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-gray-600 text-sm">Ver detalles</summary>
                  <div className="mt-2 pl-4 border-l-2 border-gray-200">
                    {pedido.detalle.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        Producto ID: {item.productoId} - 
                        Cantidad: {item.cantidad} - 
                        Precio: ${item.precioUnitario} - 
                        Subtotal: ${item.subtotal}
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pedidos;