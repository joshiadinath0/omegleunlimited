import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OmegleUnlimited – Free Random Video Chat",
  description: "Free random video chat with no bans or limits. Meet new people instantly. The ultimate Omegle alternative.",
  keywords: ["omegle", "omegle alternative", "random video chat", "chat with strangers", "omegle unlimited"],
  openGraph: {
    title: "OmegleUnlimited – Free Random Video Chat",
    description: "Free random video chat with no bans or limits. Meet new people instantly. The ultimate Omegle alternative.",
    url: "https://omegleunlimited.com",
    siteName: "OmegleUnlimited",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5660093143324976"
          crossOrigin="anonymous"
        ></script>
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
      </body>
    </html>
  );
}
