import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { authService } from '../main';
import type { AppContextType, User } from '../type';

const AppConext = createContext(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState('Fecthing Location');

  async function fetchUser() {
    try {
      const token = localStorage.getItem('token');

      const { data } = await axios.get(`${authService}/api/auth/me`, {
        headers: {
          Authorization: `Bearer token ${token} `,
        },
      });

      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppConext.Provider
      value={{ isAuth, loading, setIsAuth, setLoading, setUser, user }}
    >
      {children}
    </AppConext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppConext);
  if (!context) {
    throw new Error('useAppData must be used within AppProvider');
  }
  return context;
};
