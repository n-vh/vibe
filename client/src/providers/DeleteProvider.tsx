import { PropsWithChildren, useState, createContext } from 'react';

export const DeleteContext = createContext({
  showDelete: '',
  resetShowDelete: () => {},
  setDeleteID: (deleteVibeID: string) => {},
});

export function DeleteProvider({ children }: PropsWithChildren) {
  const [showDelete, setDeleteID] = useState('');

  const resetShowDelete = () => {
    setDeleteID('');
  };

  return (
    <DeleteContext.Provider value={{ showDelete, setDeleteID, resetShowDelete }}>
      {children}
    </DeleteContext.Provider>
  );
}
