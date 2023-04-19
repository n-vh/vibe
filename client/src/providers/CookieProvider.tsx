import { PropsWithChildren, useState, createContext } from 'react';
import { useLocalStorage } from '../hooks';

export const CookieContext = createContext({
  showCookies: true,
  closeCookies: () => {},
});

export function CookieProvider({ children }: PropsWithChildren) {
  const [showCookies, setShowCookies] = useLocalStorage('cookies', true);

  const closeCookies = () => {
    setShowCookies(false);
  };

  return (
    <CookieContext.Provider value={{ showCookies, closeCookies }}>
      {children}
    </CookieContext.Provider>
  );
}
