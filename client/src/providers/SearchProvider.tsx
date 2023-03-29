import { PropsWithChildren, useState, createContext } from 'react';
import Search from '../components/Search';

export const SearchContext = createContext({
  showSearch: false,
  setShowSearch: (search: boolean) => {},
  searchUser: '',
  setSearchUser: (user: string) => {},
});

export function SearchProvider({ children }: PropsWithChildren) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchUser, setSearchUser] = useState('');

  return (
    <SearchContext.Provider
      value={{ showSearch, setShowSearch, searchUser, setSearchUser }}
    >
      {children}
    </SearchContext.Provider>
  );
}
