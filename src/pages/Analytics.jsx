import { useState, useEffect } from 'react';
import { 
  getVentasPorCategoria, 
  getTopProductos,
  getUsuariosActivos,
  getIngresosPorMes 
} from '../services/api';

function Analytics() {
  const [ventasCategoria, setVentasCategoria] = useState([]);
  const [topProductos, setTopProductos] = useState([]);
  const [usuariosActivos, setUsuariosActivos] = useState([]);
  const [ingresosMes, setIngresosMes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('categorias');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const [categorias, productos, usuarios, ingresos] = await Promise.all([
        getVentasPorCategoria(),
        getTopProductos(),
        getUsuariosActivos(),
        getIngresosPorMes()
      ]);
      
      setVentasCategoria(categorias);
      setTopProductos(productos);
      setUsuariosActivos(usuarios);
      setIngresosMes(ingresos);
      setLoading(false);
    };
    
    loadData();
  }, []);

  if (loading) return <div className="text-center py-10">Cargando estadísticas...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel de Analytics</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('categorias')}
          className={`py-2 px-4 ${activeTab === 'categorias' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
        >
          Ventas por Categoría
        </button>
        <button
          onClick={() => setActiveTab('productos')}
          className={`py-2 px-4 ${activeTab === 'productos' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
        >
          Top Productos
        </button>
        <button
          onClick={() => setActiveTab('usuarios')}
          className={`py-2 px-4 ${activeTab === 'usuarios' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
        >
          Usuarios Activos
        </button>
        <button
          onClick={() => setActiveTab('ingresos')}
          className={`py-2 px-4 ${activeTab === 'ingresos' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-500'}`}
        >
          Ingresos por Mes
        </button>
      </div>
      
      {/* Ventas por Categoría */}
      {activeTab === 'categorias' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Items Vendidos</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ingresos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ventasCategoria.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.categoria}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.total_items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">${item.ingresos.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Top Productos */}
      {activeTab === 'productos' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unidades Vendidas</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ingresos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProductos.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.unidades_vendidas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">${item.ingresos.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Usuarios Activos */}
      {activeTab === 'usuarios' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Pedidos</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Gastado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuariosActivos.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.numero_pedidos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">${item.gasto_total?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Ingresos por Mes */}
      {activeTab === 'ingresos' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mes</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ingresos</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ingresosMes.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.mes}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-semibold">${item.ingresos.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Analytics;