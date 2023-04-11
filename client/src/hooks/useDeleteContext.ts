import { useContext } from 'react';
import { DeleteContext } from '../providers/DeleteProvider';

export function useDeleteContext() {
  return useContext(DeleteContext);
}
