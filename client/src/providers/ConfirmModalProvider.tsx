import { PropsWithChildren, useState, createContext } from 'react';

export const ConfirmContext = createContext({
  showConfirmModal: false,
  closeConfirmModal: () => {},
  openConfirmModal: () => {},
});

export function ConfirmModalProvider({ children }: PropsWithChildren) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  return (
    <ConfirmContext.Provider
      value={{ showConfirmModal, closeConfirmModal, openConfirmModal }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}
