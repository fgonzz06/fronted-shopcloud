import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHistorial, getResumenHistorial } from '../services/api';

function Historial() {
  const { user } = useAuth();
  const [historial, setHistorial] = useState(null);
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!user) return;
    
    const loadHistorial = async () => {
      setLoading(true);
      try {
        const [hist, res] = await Promise.all([
          getHistorial(user.id),
          getResumenHistorial(user.id)
        ]);
        
        console.log('Historial recibido:', hist);
        console.log('Resumen recibido:', res);
        
        setHistorial(hist);
        setResumen(res);
      } catch (error) {
        console.error('Error cargando historial:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadHistorial();
  }, [user]);

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) return <div className="text-center py-10">Cargando historial...</div>;
  if (!historial) return <div className="text-center py-10">No se encontró historial</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Historial de Compras</h1>
      <p className="text-gray-600 mb-6">
        {user?.nombre || user?.email || 'Usuario'} - {user?.email}
      </p>
      
      {resumen && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Resumen</h2>
          <p>Total gastado: <span className="font-bold text-green-600">${resumen.total_gastado || 0}</span></p>
          <p>Número de pedidos: <span className="font-bold">{resumen.nro_pedidos || 0}</span></p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
      {!historial.pedidos || historial.pedidos?.length === 0 ? (
        <p>No hay pedidos registrados</p>
      ) : (
        historial.pedidos?.map(pedido => {
          // Usar detalle como en el primer código
          const detalles = pedido.detalle || [];
          const isExpanded = expandedId === pedido.id;
          
          return (
            <div key={pedido.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">Pedido #{pedido.id}</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  pedido.estado === 'ENTREGADO' || pedido.estado === 'entregado' ? 'bg-green-200 text-green-800' :
                  pedido.estado === 'ENVIADO' || pedido.estado === 'enviado' ? 'bg-blue-200 text-blue-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {pedido.estado || 'PENDIENTE'}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Fecha: {pedido.creadoEn ? new Date(pedido.creadoEn).toLocaleDateString() : 
                       pedido.fecha ? new Date(pedido.fecha).toLocaleDateString() : 
                       'Fecha no disponible'}
              </p>
              <p className="text-xl font-bold text-blue-600">${pedido.total || 0}</p>
              
              {/* Botón para ver detalles */}
              <button 
                onClick={() => toggleDetails(pedido.id)}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
              </button>
              
              {isExpanded && detalles.length > 0 && (
                <div className="mt-2 pl-4 border-l-2 border-gray-200">
                  {detalles.map((item, idx) => (
                    <div key={idx} className="text-sm py-1">
                      Producto ID: {item.productoId} - 
                      Cantidad: {item.cantidad} - 
                      Precio: ${item.precioUnitario} - 
                      Subtotal: ${item.subtotal}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Historial;