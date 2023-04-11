import { useContext } from 'react';
import { ConfirmContext } from '../providers/ConfirmModalProvider';

export function useConfirmModalContext() {
  return useContext(ConfirmContext);
}
