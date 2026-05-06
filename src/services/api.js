import { apiMs1, apiMs2, apiMs3, apiMs4, apiMs5, USE_MOCK } from './config';
import {
  mockProducts,
  mockProductDetail,
  mockCategories,
  mockPedidos,
  mockUsuario,
  mockHistorial,
  mockResumenHistorial,
  mockVentasPorCategoria,
  mockTopProductos,
  mockUsuariosActivos,
  mockIngresosPorMes
} from './mockData';

// ========== MS1 - Productos ==========
export const getProducts = async (skip = 0, limit = 20) => {
  if (USE_MOCK) return mockProducts;
  try {
    const res = await apiMs1.get('/productos/', { params: { skip, limit } });
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  if (USE_MOCK) return mockProductDetail(id);
  try {
    const res = await apiMs1.get(`/productos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const getCategories = async (skip = 0, limit = 100) => {
  if (USE_MOCK) return mockCategories;
  try {
    const res = await apiMs1.get('/categorias/', { params: { skip, limit } });
    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// ========== MS2 - Pedidos ==========

// Listar mis propios pedidos (usa el token automáticamente)
export const getPedidos = async () => {
  if (USE_MOCK) return mockPedidos;
  
  try {
    console.log('=== getPedidos ===');
    console.log('Token en localStorage:', localStorage.getItem('token'));
    
    const res = await apiMs2.get('/pedidos/mis-pedidos');
    
    console.log('Pedidos recibidos:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    return [];
  }
};

// Obtener detalle de un pedido
export const getPedidoById = async (id) => {
  if (USE_MOCK) return mockPedidos.find(p => p.id === parseInt(id));
  
  try {
    const res = await apiMs2.get(`/pedidos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching pedido ${id}:`, error);
    return null;
  }
};

// Crear nuevo pedido
export const createPedido = async (pedidoData) => {
  if (USE_MOCK) return { success: true, id: Date.now(), mensaje: 'Pedido creado (mock)' };
  
  try {
    // El formato esperado por el backend
    const payload = {
      usuarioId: pedidoData.usuarioId,
      items: pedidoData.items.map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidad
      }))
    };
    console.log('Payload enviado a MS2:', payload);
    
    const res = await apiMs2.post('/pedidos', payload);
    return res.data;
  } catch (error) {
    console.error('Error creating pedido:', error);
    throw error;
  }
};

// Actualizar estado (opcional, para admin)
export const updatePedidoEstado = async (id, estado) => {
  if (USE_MOCK) return { success: true, estado };
  
  try {
    const res = await apiMs2.put(`/pedidos/${id}/estado`, { estado });
    return res.data;
  } catch (error) {
    console.error(`Error updating pedido ${id}:`, error);
    return null;
  }
};


// ========== MS3 - Usuarios ==========

export const getUsuario = async (id) => {
  if (USE_MOCK) return mockUsuario;
  try {
    const res = await apiMs3.get(`/api/v1/usuarios/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(`Error fetching usuario ${id}:`, error);
    return null;
  }
};

export const updateUsuarioDireccion = async (id, direccion) => {
  if (USE_MOCK) return { success: true, mensaje: 'Dirección actualizada (mock)' };
  try {
    const res = await apiMs3.put(`/api/v1/usuarios/${id}/direccion`, { direccion });
    return res.data.data;
  } catch (error) {
    console.error(`Error updating direccion for ${id}:`, error);
    return null;
  }
};

export const signup = async (userData) => {
  if (USE_MOCK) return { success: true, token: 'mock-token' };
  try {
    const res = await apiMs3.post('/api/v1/usuarios/signup', userData);
    return res.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const loginUsuario = async (email, password) => {
  if (USE_MOCK) return { success: true, token: 'mock-token' };
  try {
    const res = await apiMs3.post('/api/v1/usuarios/login', { email, password });
    return res.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// ========== MS4 - Historial ==========
export const getHistorial = async (usuarioId) => {
  if (USE_MOCK) return mockHistorial;
  const res = await apiMs4.get(`/historial/${usuarioId}`);
  return res.data;
};

export const getResumenHistorial = async (usuarioId) => {
  if (USE_MOCK) return mockResumenHistorial;
  const res = await apiMs4.get(`/historial/resumen/${usuarioId}`);
  return res.data;
};

// ========== MS5 - Analytics ==========
export const getVentasPorCategoria = async () => {
  if (USE_MOCK) return mockVentasCategoria;
  try {
    const res = await apiMs5.get('/analytics/ventas-por-categoria');
    // El MS5 devuelve { status: "success", data: [["Electrónica", "45", "15420.5"], ...] }
    if (res.data.status === 'success' && res.data.data) {
      // Convertir el array de arrays a objetos
      return res.data.data.map(row => ({
        categoria: row[0],
        total_items: parseInt(row[1]),
        ingresos: parseFloat(row[2])
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching ventas por categoria:', error);
    return [];
  }
};

export const getTopProductos = async () => {
  if (USE_MOCK) return mockTopProductos;
  try {
    const res = await apiMs5.get('/analytics/top-productos');
    // Devuelve: [["Laptop Gaming", "45", "44955"], ...]
    if (res.data.status === 'success' && res.data.data) {
      return res.data.data.map(row => ({
        nombre: row[0],
        unidades_vendidas: parseInt(row[1]),
        ingresos: parseFloat(row[2])
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching top productos:', error);
    return [];
  }
};

export const getUsuariosActivos = async () => {
  if (USE_MOCK) return mockUsuariosActivos;
  try {
    const res = await apiMs5.get('/analytics/usuarios-activos');
    if (res.data.status === 'success' && res.data.data) {
      return res.data.data.map(row => ({
        nombre: row[0],
        email: row[1],
        numero_pedidos: parseInt(row[2]),
        gasto_total: parseFloat(row[3])
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching usuarios activos:', error);
    return [];
  }
};

export const getIngresosPorMes = async () => {
  if (USE_MOCK) return mockIngresosPorMes;
  try {
    const res = await apiMs5.get('/analytics/ingresos-por-mes');
    if (res.data.status === 'success' && res.data.data) {
      return res.data.data.map(row => ({
        mes: row[0],
        ingresos: parseFloat(row[1])
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching ingresos por mes:', error);
    return [];
  }
};