import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHistorial, getResumenHistorial } from '../services/api';

function Historial() {
  const { user } = useAuth();
  const [historial, setHistorial] = useState(null);
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const loadHistorial = async () => {
      setLoading(true);
      const [hist, res] = await Promise.all([
        getHistorial(user.id),
        getResumenHistorial(user.id)
      ]);
      setHistorial(hist);
      setResumen(res);
      setLoading(false);
    };
    
    loadHistorial();
  }, [user]);

  if (loading) return <div className="text-center py-10">Cargando historial...</div>;
  if (!historial) return <div className="text-center py-10">No se encontró historial</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Historial de Compras</h1>
      <p className="text-gray-600 mb-6">
        {user?.nombre} - {user?.email}
      </p>
      
      {resumen && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Resumen</h2>
          <p>Total gastado: <span className="font-bold text-green-600">${resumen.total_gastado}</span></p>
          <p>Número de pedidos: <span className="font-bold">{resumen.nro_pedidos}</span></p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
      {historial.pedidos?.length === 0 ? (
        <p>No hay pedidos registrados</p>
      ) : (
        historial.pedidos?.map(pedido => (
          <div key={pedido.id} className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Pedido #{pedido.id}</span>
              <span className={`text-sm px-2 py-1 rounded ${
                pedido.estado === 'entregado' ? 'bg-green-200 text-green-800' :
                pedido.estado === 'enviado' ? 'bg-blue-200 text-blue-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {pedido.estado}
              </span>
            </div>
            <p className="text-gray-600 text-sm">Fecha: {new Date(pedido.fecha).toLocaleDateString()}</p>
            <p className="text-xl font-bold text-blue-600">${pedido.total}</p>
            
            <details className="mt-2">
              <summary className="cursor-pointer text-gray-600">Ver productos</summary>
              <ul className="mt-2 pl-4 border-l-2 border-gray-200">
                {pedido.productos?.map((prod, idx) => (
                  <li key={idx}>
                    {prod.nombre} - {prod.cantidad} x ${prod.precio}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))
      )}
    </div>
  );
}

export default Historial;