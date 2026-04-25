import axios from 'axios';

//url del api gateway
const API_BASE = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error.message);
    return Promise.reject(error);
  }
);