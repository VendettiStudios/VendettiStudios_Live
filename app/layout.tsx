import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from "next/script";
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
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
   (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "qvxrhapu0z");

    // Force Clarity to capture the full page
    window.clarity = window.clarity || function() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

    clarity("set", "pageView", { view: "full" });
  `}
        </Script>
      </body>
    </html>
  );
}