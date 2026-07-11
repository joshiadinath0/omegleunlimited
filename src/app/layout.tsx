import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmegleUnlimited – Free Random Video Chat",
  description: "Free random video chat with no bans or limits. Meet new people instantly. The ultimate Omegle alternative.",
  keywords: [
    "omegle", "omegle alternative", "random video chat", "chat with strangers", "omegle unlimited",
    "omegle unban", "ometv alternative", "free video chat", "talk to strangers", "cam to cam",
    "chatroulette alternative", "monkey app alternative", "meet new people", "video chat no login",
    "flirting chat", "late night chat", "singles video chat", "dating chat"
  ],
  openGraph: {
    title: "OmegleUnlimited – Free Random Video Chat",
    description: "Free random video chat with no bans or limits. Meet new people instantly. The ultimate Omegle alternative.",
    url: "https://omegleunlimited.com",
    siteName: "OmegleUnlimited - Omegle Alternative",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmegleUnlimited – Free Random Video Chat",
    description: "Free random video chat with no bans or limits. Meet new people instantly.",
  },
  alternates: {
    canonical: "https://omegleunlimited.com",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5660093143324976"
          crossOrigin="anonymous"
        ></script>
        {/* Monetag Popunder */}
        <script 
          src="https://5gvci.com/act/files/tag.min.js?z=11256850" 
          data-cfasync="false" 
          async
        ></script>
        {/* Google Site Name JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "OmegleUnlimited - Omegle Alternative",
              "alternateName": ["OmegleUnlimited", "Omegle Unlimited"],
              "url": "https://omegleunlimited.com/"
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground flex flex-col`}>
        {children}
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-1BJ87447KJ`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1BJ87447KJ', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        {/* Monetag In-Page Ad */}
        <Script
          id="monetag-in-page"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11256849',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
      </body>
    </html>
  );
}
