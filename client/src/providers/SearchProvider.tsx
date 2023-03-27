import { PropsWithChildren, useState, createContext } from 'react';
import Search from '../components/Search';

export const SearchContext = createContext({
  showSearch: false,
  setShowSearch: (search: boolean) => {},
});

export function SearchProvider({ children }: PropsWithChildren) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
