"use client";
import React, { ReactNode, useContext } from "react";
import { AccordionContext } from "./Accordion";

interface AccordionItemProps {
  children: ReactNode;
  index: number;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, index }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within an Accordion");

  const isOpen = context.openItems.has(index);

  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      {children}
    </div>
  );
};
