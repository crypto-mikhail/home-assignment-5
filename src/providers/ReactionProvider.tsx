import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

interface ReactionContextType {
  isAdding: boolean;
  toggleAdding: () => void;
}

const ReactionContext = createContext<ReactionContextType | undefined>(undefined);

export const ReactionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAdding, setIsAdding] = useState(false);

  const toggleAdding = () => {
    setIsAdding((prevState) => !prevState);
  };

  return (
    <ReactionContext.Provider value={{ isAdding, toggleAdding }}>
      {children}
    </ReactionContext.Provider>
  );
};

export const useReactionContext = (): ReactionContextType => {
  const context = useContext(ReactionContext);
  if (!context) {
    throw new Error('useReactionContext must be used within a ReactionProvider');
  }
  return context;
};
