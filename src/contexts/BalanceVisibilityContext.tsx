import { createContext, useContext, useState, ReactNode } from 'react';

interface BalanceVisibilityContextType {
  showBalance: boolean;
  toggleBalance: () => void;
}

const BalanceVisibilityContext = createContext<BalanceVisibilityContextType | undefined>(undefined);

export function BalanceVisibilityProvider({ children }: { children: ReactNode }) {
  const [showBalance, setShowBalance] = useState(() => {
    // Check session storage for persisted preference during session
    const stored = sessionStorage.getItem('nexbank-show-balance');
    return stored !== null ? JSON.parse(stored) : true; // Default to visible
  });

  const toggleBalance = () => {
    setShowBalance((prev: boolean) => {
      const newValue = !prev;
      sessionStorage.setItem('nexbank-show-balance', JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <BalanceVisibilityContext.Provider value={{ showBalance, toggleBalance }}>
      {children}
    </BalanceVisibilityContext.Provider>
  );
}

export function useBalanceVisibility() {
  const context = useContext(BalanceVisibilityContext);
  if (!context) {
    throw new Error('useBalanceVisibility must be used within a BalanceVisibilityProvider');
  }
  return context;
}
