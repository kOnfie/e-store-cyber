import type { Metadata } from 'next';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { Providers } from './providers';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'E-Store - Online Shopping',
  description: 'Your one-stop shop for quality products',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
