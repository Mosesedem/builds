import React from 'react';
import { Toaster } from 'sonner'
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { LayoutConfigProvider } from '@/contexts/LayoutConfigContext';
import { ClientLayoutWrapper } from '@/components/ClientLayoutWrapper';
import './globals.css';
import { Theme, ThemePanel  } from "@radix-ui/themes";


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Proton Medicare - Modern Healthcare Solutions',
  description: 'Find and compare medicare plans, enroll online, and manage your healthcare journey.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Theme>
          <LayoutConfigProvider>
            {/* Client-side wrapper */}
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            <Toaster />
          </LayoutConfigProvider>
          {/* <ThemePanel /> */}
          </Theme>
         
        </ThemeProvider>
      </body>
    </html>
  );
}

