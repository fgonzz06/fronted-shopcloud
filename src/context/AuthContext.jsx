import { createContext, useState, useContext, useEffect } from 'react';
import { apiMs3 } from '../services/config';
import { doMockLogin } from '../services/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Si el backend MS3 está disponible
      const res = await apiMs3.post('/auth/login', { email, password });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
      return { success: false, error: 'No se recibió token' };
    } catch (error) {
      // Si el backend no está disponible, usar mock
      console.warn('Usando mock login - backend no disponible');
      const mockRes = doMockLogin(email);
      if (mockRes.success) {
        localStorage.setItem('token', mockRes.user.token);
        localStorage.setItem('user', JSON.stringify(mockRes.user));
        setToken(mockRes.user.token);
        setUser(mockRes.user);
        return { success: true };
      }
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  };

  // Verificar si hay sesión al cargar
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}