import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Define the metadata including the title and description
export const metadata: Metadata = {
  title: 'Vendetti Studios',
  description: 'A End-End Digital Services Agency',
  robots: {
    index: true,
    follow: true,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title as string}</title>
        <link 
          rel="canonical" 
          href="https://vendettistudios.com"
          key="canonical"
        />
        <meta name="description" content={metadata.description as string} />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}