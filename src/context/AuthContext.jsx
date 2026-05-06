import { createContext, useState, useContext, useEffect } from 'react';
import { apiMs3 } from '../services/config';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

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
        
        // Decodificar el token para obtener el ID real del usuario
        const decoded = jwtDecode(res.data.token);
        console.log('Token decodificado:', decoded);
        
        // Guardar usuario con el ID real del token
        const userData = {
          id: decoded.id,  // ← Este es el ID que espera MS2
          email: email,
          nombre: res.data.usuario?.nombre || email.split('@')[0]
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
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
        
        // Decodificar el token para obtener el ID
        const decoded = jwtDecode(res.data.token);
        
        const newUser = {
          id: decoded.id,
          email: userData.email,
          nombre: userData.nombre
        };
        
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        return { success: true };
      }
      return { success: false, error: 'No se recibió token' };
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Error al registrar usuario';
      return { success: false, error: mensaje };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token) {
      // Si hay token pero no hay usuario guardado, decodificamos
      try {
        const decoded = jwtDecode(token);
        setUser({ 
          id: decoded.id, 
          email: decoded.email || 'usuario@ejemplo.com',
          nombre: decoded.nombre || 'Usuario'
        });
      } catch (e) {
        console.error('Error decodificando token:', e);
      }
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