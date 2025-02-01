"use client"; // Add this directive at the top of the file

import React, { createContext, ReactNode, useState } from "react";

interface AccordionProps {
  children: ReactNode;
  multiple?: boolean; // Allow multiple items to be open at once
}

interface AccordionContextValue {
  openItems: Set<number>;
  toggleItem: (index: number) => void;
  multiple: boolean;
}

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

export const Accordion: React.FC<AccordionProps> = ({ children, multiple = false }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (!multiple) newSet.clear();
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, multiple }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};
