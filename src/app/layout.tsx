import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
