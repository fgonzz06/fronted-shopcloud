import { api } from './config'; 
import { 
  mockProducts, 
  mockProductDetail, 
  mockPedidos, 
  mockUsuario, 
  mockHistorial, 
  mockVentasCategoria, 
  mockTopProductos 
} from './mockData';

// cambiar a false con las urls reales
const USE_MOCK = true;


// Productos ms1
export const getProducts = async (skip = 0, limit = 20) => {
  if (USE_MOCK) return mockProducts;
  

  try {
    const res = await api.get('/productos/', {
      params: {skip, limit}
    });
    return res.data;
  }catch (error){
    console.error('Error fetching products: ', error);
    return [];
  }
};


export const getProductById = async (id) => {
  if (USE_MOCK) return mockProductDetail(id);
  
  try {
    const res = await api.get(`/productos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const getCategories = async (skip = 0, limit = 100) => {
  if (USE_MOCK) return mockCategories;
  
  try {
    const res = await api.get(`/categorias/`, {
      params: { skip, limit }
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Pedidos ms2

export const getPedidos = async (usuarioId) => {
  if (USE_MOCK) return mockPedidos;
  const res = await api.get(`/pedidos?usuario_id=${usuarioId}`);
  return res.data;
};

export const getPedidoById = async (id) => {
  if (USE_MOCK) return mockPedidos.find(p => p.id === id);
  const res = await api.get(`/pedidos/${id}`);
  return res.data;
};

export const createPedido = async (pedidoData) => {
  if (USE_MOCK) return { success: true, id: Date.now(), mensaje: 'Pedido creado (mock)' };
  const res = await api.post('/pedidos', pedidoData);
  return res.data;
};

export const updatePedidoEstado = async (id, estado) => {
  if (USE_MOCK) return { success: true, estado };
  const res = await api.put(`/pedidos/${id}/estado`, { estado });
  return res.data;
};


// Usuarios ms3
export const getUsuarios = async () => {
  if (USE_MOCK) return [mockUsuario];
  const res = await api.get('/usuarios');
  return res.data;
};

export const getUsuario = async (id) => {
  if (USE_MOCK) return mockUsuario;
  const res = await api.get(`/usuarios/${id}`);
  return res.data;
};

export const createUsuario = async (usuarioData) => {
  if (USE_MOCK) return { success: true, id: 'mock_id_123' };
  const res = await api.post('/usuarios', usuarioData);
  return res.data;
};

export const updateUsuario = async (id, usuarioData) => {
  if (USE_MOCK) return { success: true, mensaje: 'Usuario actualizado (mock)' };
  const res = await api.put(`/usuarios/${id}`, usuarioData);
  return res.data;
};


// Historial ms4
export const getHistorial = async (usuarioId) => {
  if (USE_MOCK) return mockHistorial;
  const res = await api.get(`/historical/${usuarioId}`);
  return res.data;
};

export const getResumenHistorial = async (usuarioId) => {
  if (USE_MOCK) return mockResumenHistorial;
  const res = await api.get(`/historical/resumen/${usuarioId}`);
  return res.data;
};


// Analytics ms5
export const getVentasPorCategoria = async () => {
  if (USE_MOCK) return mockVentasPorCategoria;
  const res = await api.get('/analytics/ventas-por-categoria');
  return res.data;
};

export const getTopProductos = async () => {
  if (USE_MOCK) return mockTopProductos;
  const res = await api.get('/analytics/top-productos');
  return res.data;
};

export const getUsuariosActivos = async () => {
  if (USE_MOCK) return mockUsuariosActivos;
  const res = await api.get('/analytics/usuarios-activos');
  return res.data;
};

export const getIngresosPorMes = async () => {
  if (USE_MOCK) return mockIngresosPorMes;
  const res = await api.get('/analytics/ingresos-por-mes');
  return res.data;
};