"use client";
import React, { ReactNode, useContext } from "react";
import { AccordionContext } from "./Accordion";

interface AccordionContentProps {
  children: ReactNode;
  index: number;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, index }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within an Accordion");

  const isOpen = context.openItems.has(index);

  return (
    <div className={`accordion-content ${isOpen ? "open" : "hidden"}`}>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
