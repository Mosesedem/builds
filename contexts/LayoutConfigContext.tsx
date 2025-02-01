"use client"
import React, { createContext, useContext, useState } from 'react';

type LayoutConfig = {
  hideHeader?: boolean;
  hideFooter?: boolean;
};

type LayoutConfigContextType = {
  config: LayoutConfig;
  setConfig: React.Dispatch<React.SetStateAction<LayoutConfig>>;
};

const LayoutConfigContext = createContext<LayoutConfigContextType | undefined>(undefined);

export const LayoutConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<LayoutConfig>({});
  return (
    <LayoutConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </LayoutConfigContext.Provider>
  );
};

export const useLayoutConfig = () => {
  const context = useContext(LayoutConfigContext);
  if (!context) {
    throw new Error('useLayoutConfig must be used within a LayoutConfigProvider');
  }
  return context;
};
