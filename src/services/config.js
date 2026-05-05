import axios from 'axios';

// MODO MOCK (true = datos falsos, false = APIs reales)
export const USE_MOCK = false;

const BASE_IP = 'http://54.123.45.67'; // ip de ejemplo

// Cada microservicio en un puerto diferente (como están en el docker-compose)
export const MS1_URL = `${BASE_IP}:8001`;      // Productos
export const MS2_URL = `${BASE_IP}:8002`;      // Pedidos
export const MS3_URL = `${BASE_IP}:8003`;      // Usuarios
export const MS4_URL = `${BASE_IP}:8004`;      // Historial
export const MS5_URL = `${BASE_IP}:8005`;      // Analytics


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

const errorInterceptor = (error) => {
  console.error('Error en la petición:', error.message);
  return Promise.reject(error);
};

apiMs1.interceptors.response.use((res) => res, errorInterceptor);
apiMs2.interceptors.response.use((res) => res, errorInterceptor);
apiMs3.interceptors.response.use((res) => res, errorInterceptor);
apiMs4.interceptors.response.use((res) => res, errorInterceptor);
apiMs5.interceptors.response.use((res) => res, errorInterceptor);