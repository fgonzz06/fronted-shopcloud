import axios from 'axios';


export const USE_MOCK = false;
//  Url Ms1 
export const API_BASE = 'http://localhost:8001'

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