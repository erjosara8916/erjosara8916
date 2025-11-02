import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ExternalLinkData {
  title: string;
  url: string;
  description?: string;
  buttonText?: string;
}

interface ExternalLinkContextType {
  linkData: ExternalLinkData | null;
  isOpen: boolean;
  openLink: (data: ExternalLinkData) => void;
  closeLink: () => void;
}

const ExternalLinkContext = createContext<ExternalLinkContextType | undefined>(undefined);

export const useExternalLink = () => {
  const context = useContext(ExternalLinkContext);
  if (!context) {
    throw new Error('useExternalLink must be used within an ExternalLinkProvider');
  }
  return context;
};

interface ExternalLinkProviderProps {
  children: ReactNode;
}

export const ExternalLinkProvider: React.FC<ExternalLinkProviderProps> = ({ children }) => {
  const [linkData, setLinkData] = useState<ExternalLinkData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openLink = (data: ExternalLinkData) => {
    setLinkData(data);
    setIsOpen(true);
  };

  const closeLink = () => {
    setLinkData(null);
    setIsOpen(false);
  };

  const value = {
    linkData,
    isOpen,
    openLink,
    closeLink,
  };

  return (
    <ExternalLinkContext.Provider value={value}>
      {children}
    </ExternalLinkContext.Provider>
  );
};