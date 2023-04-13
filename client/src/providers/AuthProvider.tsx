import { createContext, PropsWithChildren, useEffect } from 'react';
import { useQuery } from 'urql';
import { useLocalStorage } from '../hooks';
import { Query } from '../graphql';

export const AuthContext = createContext({
  isAuthorized: false,
  user: { id: '', username: '', avatar: '' },
  signIn: (token: string) => {},
  signOut: () => {},
  changeAvatar: (avatar: string) => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorage('token', '');
  const [user, setUser] = useLocalStorage('user', { id: '', username: '', avatar: '' });
  const [data, execute] = useQuery({
    query: Query.Me,
    requestPolicy: 'network-only',
    pause: true,
  });

  const signIn = (token: string) => {
    setToken(token);
  };

  const signOut = () => {
    setToken('');
    setUser({ id: '', username: '', avatar: '' });
  };

  const changeAvatar = (avatar: string) => {
    setUser({ ...user, avatar });
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
    <AuthContext.Provider
      value={{ isAuthorized: !!token, user, signIn, signOut, changeAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}
