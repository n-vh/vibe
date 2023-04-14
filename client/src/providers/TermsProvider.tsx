import { PropsWithChildren, useState, createContext } from 'react';

export const TermsContext = createContext({
  showTerms: false,
  setShowTerms: (search: boolean) => {},
});

export function TermsProvider({ children }: PropsWithChildren) {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <TermsContext.Provider value={{ showTerms, setShowTerms }}>
      {children}
    </TermsContext.Provider>
  );
}
