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
export const getPedidos = async (usuarioId) => {
  if (USE_MOCK) return mockPedidos;
  const res = await apiMs2.get(`/pedidos?usuario_id=${usuarioId}`);
  return res.data;
};

export const getPedidoById = async (id) => {
  if (USE_MOCK) return mockPedidos.find(p => p.id === id);
  const res = await apiMs2.get(`/pedidos/${id}`);
  return res.data;
};

export const createPedido = async (pedidoData) => {
  if (USE_MOCK) return { success: true, id: Date.now(), mensaje: 'Pedido creado (mock)' };
  const res = await apiMs2.post('/pedidos', pedidoData);
  return res.data;
};

export const updatePedidoEstado = async (id, estado) => {
  if (USE_MOCK) return { success: true, estado };
  const res = await apiMs2.put(`/pedidos/${id}/estado`, { estado });
  return res.data;
};

// ========== MS3 - Usuarios ==========
export const getUsuarios = async () => {
  if (USE_MOCK) return [mockUsuario];
  const res = await apiMs3.get('/usuarios');
  return res.data;
};

export const getUsuario = async (id) => {
  if (USE_MOCK) return mockUsuario;
  const res = await apiMs3.get(`/usuarios/${id}`);
  return res.data;
};

export const createUsuario = async (usuarioData) => {
  if (USE_MOCK) return { success: true, id: 'mock_id_123' };
  const res = await apiMs3.post('/usuarios', usuarioData);
  return res.data;
};

export const updateUsuario = async (id, usuarioData) => {
  if (USE_MOCK) return { success: true, mensaje: 'Usuario actualizado (mock)' };
  const res = await apiMs3.put(`/usuarios/${id}`, usuarioData);
  return res.data;
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
  if (USE_MOCK) return mockVentasPorCategoria;
  const res = await apiMs5.get('/analytics/ventas-por-categoria');
  return res.data;
};

export const getTopProductos = async () => {
  if (USE_MOCK) return mockTopProductos;
  const res = await apiMs5.get('/analytics/top-productos');
  return res.data;
};

export const getUsuariosActivos = async () => {
  if (USE_MOCK) return mockUsuariosActivos;
  const res = await apiMs5.get('/analytics/usuarios-activos');
  return res.data;
};

export const getIngresosPorMes = async () => {
  if (USE_MOCK) return mockIngresosPorMes;
  const res = await apiMs5.get('/analytics/ingresos-por-mes');
  return res.data;
};