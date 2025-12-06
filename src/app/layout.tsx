import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'E-Store - Online Shopping',
  description: 'Your one-stop shop for quality products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
