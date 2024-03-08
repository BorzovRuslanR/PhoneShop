'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppBar from '@/components/AppBar'
import Providers from '@/components/Providers'
import Footer from '@/features/footer/Footer'
import ScrollToTop from '@/features/scrollToTop/ScrollToTop'
import MobileAppBar from '@/features/mobileAppBar/MobileAppBar'
import { useMediaQuery } from 'react-responsive';
import { Toaster } from '@/components/ui/toaster'



const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
           {isMobile ? <MobileAppBar /> : <AppBar />}
          <main className="container py-24">{children}</main>  
      </Providers>
      <Toaster />
      <Footer />
      <ScrollToTop />
      </body>
    </html>
  )
}