import { createContext, PropsWithChildren } from 'react';
import { useLocalStorage } from '../hooks';

export const AuthContext = createContext({
  isAuthorized: false,
  signIn: (token: string) => {},
  signOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorage('token', '');

  const signIn = (token: string) => {
    setToken(token);
  };

  const signOut = () => {
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ isAuthorized: !!token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
