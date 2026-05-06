import axios from 'axios';

// MODO MOCK (true = datos falsos, false = APIs reales)
export const USE_MOCK = false;

// URL del Load Balancer (API Gateway)
const LOAD_BALANCER_URL = 'https://j0v80gv9x5.execute-api.us-east-1.amazonaws.com';

// TODOS los microservicios usan la MISMA URL
// El Load Balancer redirige según la ruta (path)
export const MS1_URL = LOAD_BALANCER_URL;  // Productos (usa /productos/*)
export const MS2_URL = LOAD_BALANCER_URL;  // Pedidos (usa /pedidos/*)
export const MS3_URL = LOAD_BALANCER_URL;  // Usuarios (usa /usuarios/*)
export const MS4_URL = LOAD_BALANCER_URL;  // Historial (usa /historial/*)
export const MS5_URL = LOAD_BALANCER_URL;  // Analytics (usa /ventas-por-categoria/*, etc.)


export const apiMs1 = axios.create({
  baseURL: MS1_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const apiMs2 = axios.create({
  baseURL: MS2_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const apiMs3 = axios.create({
  baseURL: MS3_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const apiMs4 = axios.create({
  baseURL: MS4_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const apiMs5 = axios.create({
  baseURL: MS5_URL,
  headers: { 'Content-Type': 'application/json' },
});


// Interceptor para agregar token a todas las peticiones (MS2, MS3, etc.)
const addTokenInterceptor = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiMs1.interceptors.request.use(addTokenInterceptor);
apiMs2.interceptors.request.use(addTokenInterceptor);
apiMs3.interceptors.request.use(addTokenInterceptor);
apiMs4.interceptors.request.use(addTokenInterceptor);
apiMs5.interceptors.request.use(addTokenInterceptor);

// Interceptor de errores
const errorInterceptor = (error) => {
  console.error('Error en la petición:', error.message);
  return Promise.reject(error);
};

apiMs1.interceptors.response.use((res) => res, errorInterceptor);
apiMs2.interceptors.response.use((res) => res, errorInterceptor);
apiMs3.interceptors.response.use((res) => res, errorInterceptor);
apiMs4.interceptors.response.use((res) => res, errorInterceptor);
apiMs5.interceptors.response.use((res) => res, errorInterceptor);