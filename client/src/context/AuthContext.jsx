import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('agrocare-token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.data.user);
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('agrocare-token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { user: userData, token } = res.data.data;
    localStorage.setItem('agrocare-token', token);
    setUser(userData);
    setIsAuthenticated(true);
    return res.data;
  }, []);

  const register = useCallback(async (data) => {
    const res = await api.post('/auth/register', data);
    const { user: userData, token } = res.data.data;
    localStorage.setItem('agrocare-token', token);
    setUser(userData);
    setIsAuthenticated(true);
    return res.data;
  }, []);

  const continueWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const res = await api.post('/auth/google', {
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        uid: user.uid
      });
      
      const { user: userData, token } = res.data.data;
      localStorage.setItem('agrocare-token', token);
      setUser(userData);
      setIsAuthenticated(true);
      return res.data;
    } catch (error) {
      console.error("Google Auth Error", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try { await api.post('/auth/logout'); } catch {}
    localStorage.removeItem('agrocare-token');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((data) => {
    setUser(prev => ({ ...prev, ...data }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, continueWithGoogle, logout, updateUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
