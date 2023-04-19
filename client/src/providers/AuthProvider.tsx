import { createContext, PropsWithChildren, useEffect } from 'react';
import { useQuery } from 'urql';
import { useLocalStorage } from '../hooks';
import { Query } from '../graphql';

const defaultUser = { id: '', username: '', avatar: '' };

export const AuthContext = createContext({
  isAuthorized: false,
  user: defaultUser,
  signIn: (token: string) => {},
  signOut: () => {},
  changeAvatar: (avatar: string) => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorage('token', '');
  const [user, setUser] = useLocalStorage('user', defaultUser);
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
    setUser(defaultUser);
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
      value={{ isAuthorized: !!user.id, user, signIn, signOut, changeAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
}
