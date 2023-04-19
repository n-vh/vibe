import { PropsWithChildren, useState, createContext } from 'react';

export const PrivacyContext = createContext({
  showPrivacy: false,
  setShowPrivacy: (privacy: boolean) => {},
});

export function PrivacyProvider({ children }: PropsWithChildren) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <PrivacyContext.Provider value={{ showPrivacy, setShowPrivacy }}>
      {children}
    </PrivacyContext.Provider>
  );
}
