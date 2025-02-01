"use client";
import React, { ReactNode, useContext } from "react";
import { AccordionContext } from "./Accordion";

interface AccordionTriggerProps {
  children: ReactNode;
  index: number;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, index }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within an Accordion");

  return (
    <button
      className="accordion-trigger"
      onClick={() => context.toggleItem(index)}
    >
      {children}
    </button>
  );
};
