'use client';

import React, {PropsWithChildren} from 'react'
import { ThemeProvider } from './theme-provider'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

export default function Providers({children}: PropsWithChildren) {
  return (
    <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
              {children}
              <ReactQueryDevtools/>
          </SessionProvider>
        </QueryClientProvider>
    </ThemeProvider>
  )
}
