import '@/styles/globals.css';
import { Metadata } from 'next';
import clsx from 'clsx';

import { Providers } from './providers';

import { siteConfig } from '@/config/site';
import { fontHeading, fontBody } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head className="light" />
      <body
        className={clsx(
          'min-h-screen bg-background font-body',
          fontBody.variable,
          fontHeading.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
