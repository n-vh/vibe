import { useContext } from 'react';
import { AuthContext, ConfirmContext, DeleteContext, SearchContext } from '../providers';

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useConfirmModalContext() {
  return useContext(ConfirmContext);
}

export function useDeleteContext() {
  return useContext(DeleteContext);
}

export function useSearchContext() {
  return useContext(SearchContext);
}
