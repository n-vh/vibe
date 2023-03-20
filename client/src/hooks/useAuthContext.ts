import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export function useAuthContext() {
  return useContext(AuthContext);
}
