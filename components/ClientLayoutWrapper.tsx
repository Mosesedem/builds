'use client';

import React, { ReactNode } from 'react';
import { useLayoutConfig } from '@/contexts/LayoutConfigContext';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const ClientLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const { config } = useLayoutConfig();

  return (
    <div className="relative flex min-h-screen flex-col">
      {!config.hideHeader && <Header />}
      <main className="flex-1">{children}</main>
      {!config.hideFooter && <Footer />}
    </div>
  );
};
