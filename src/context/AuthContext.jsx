import { createContext, useState, useContext } from 'react';
import { mockUsuario, doMockLogin } from '../services/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simula llamada a MS3 - Usuarios
      // Cuando tengas API real: const res = await api.post('/usuarios/login', { email, password })
      
      // Por ahora, mock: cualquier email/password funciona
      if (email && password) {
        const mockResponse = doMockLogin(email);
        setUser(mockResponse.user);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        return { success: true };
      } else {
        return { success: false, error: 'Credenciales inválidas' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  // Verificar si hay sesión al cargar
  useState(() => { checkAuth(); }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}