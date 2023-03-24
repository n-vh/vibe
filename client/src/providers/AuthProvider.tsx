import { createContext, PropsWithChildren, useEffect } from 'react';
import { useQuery } from 'urql';
import { useLocalStorage } from '../hooks';

export const AuthContext = createContext({
  isAuthorized: false,
  user: { id: '', username: '', avatar: '' },
  signIn: (token: string) => {},
  signOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorage('token', '');
  const [user, setUser] = useLocalStorage('user', { id: '', username: '', avatar: '' });
  const [data, execute] = useQuery({
    query: 'query { me { id username avatar } }',
    requestPolicy: 'network-only',
    pause: true,
  });

  const signIn = (token: string) => {
    setToken(token);
  };

  const signOut = () => {
    setToken('');
  };

  useEffect(() => {
    if (data.error) {
      signOut();
    } else if (data.data?.me) {
      setUser(data.data.me);
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      execute({
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthorized: !!token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
