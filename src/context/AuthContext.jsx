import { createContext, useState, useContext, useEffect } from 'react';
import { apiMs3 } from '../services/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiMs3.post('/api/v1/usuarios/login', { email, password });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.usuario || { email, nombre: email.split('@')[0] });
        return { success: true };
      }
      return { success: false, error: 'No se recibió token' };
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al iniciar sesión';
      return { success: false, error: mensaje };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
  setLoading(true);
  try {
    const res = await apiMs3.post('/api/v1/usuarios/signup', userData);
    
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setUser(res.data.data?.usuario);
      return { success: true };
    }
    return { success: false, error: 'No se recibió token' };
  } catch (error) {
    const mensaje = error.response?.data?.message || 'Error al registrar usuario';
    return { success: false, error: mensaje };
  } finally {
    setLoading(false);
  }
}

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Opcional: Decodificar token para obtener info del usuario
      // o llamar a /api/v1/usuarios/perfil
      setUser({ email: 'usuario@ejemplo.com' }); // Placeholder
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}