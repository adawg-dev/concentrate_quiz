"use client";

import '@mantine/core/styles.css';
import { usePathname } from 'next/navigation';
import { Appbar } from '@/components/Appbar/Appbar';
import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';

// export const metadata = {
//   title: 'concentrate.ai quiz',
//   description: 'quiz for Todd Lieberman',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <div style={{ display: 'flex' }}>
            {!isLoginPage && <Appbar/>}
            <main style={{ flex: 1 }}>
              {children}
            </main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
