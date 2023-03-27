import { useContext } from 'react';
import { SearchContext } from '../providers/SearchProvider';

export function useSearchContext() {
  return useContext(SearchContext);
}
