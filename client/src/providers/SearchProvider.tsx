import { PropsWithChildren, useState, createContext } from 'react';

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
