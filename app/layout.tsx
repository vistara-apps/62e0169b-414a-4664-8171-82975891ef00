import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'ChronoFilter - Curate Your Twitter Feed, Reclaim Your Focus',
  description: 'A Base mini app that helps Twitter users cut through the noise and focus on relevant content using advanced filtering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
