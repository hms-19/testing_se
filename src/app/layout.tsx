'use client';

import React, { ReactNode, useEffect } from 'react';
import AppWrappers from './AppWrappers';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { CustomProvider } from 'rsuite';

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.title = 'Sports Empire';
  }, []);

  return (
    <html lang="en">
      <body id={'root'} suppressHydrationWarning={true}>
        <AppWrappers>
          <CustomProvider>
            <Provider store={store}>{children}</Provider>
          </CustomProvider>
        </AppWrappers>
      </body>
    </html>
  );
}
