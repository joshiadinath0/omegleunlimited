import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | OmegleUnlimited",
  description: "Learn more about OmegleUnlimited, the safest and most fun alternative to classic random video chat.",
  alternates: {
    canonical: "https://omegleunlimited.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center px-6 py-4 border-b border-border bg-muted/30 backdrop-blur-md">
        <Link href="/" className="text-xl font-extrabold tracking-tight hover:text-primary transition-colors">
          Omegle<span className="text-primary">Unlimited</span>
        </Link>
      </header>
      
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 sm:p-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        
        <h1 className="text-4xl font-extrabold mb-8 text-foreground">About Us</h1>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Welcome to OmegleUnlimited, the ultimate destination for random online video exploration. We created this platform to offer a fun, safe, and unlimited alternative for users who miss the spontaneity of classic random chat websites.
          </p>
          <p>
            Our platform pairs you with randomly selected entertaining and trending videos from across the internet, simulating the classic stranger-discovery flow in a safe, curated manner. By eliminating direct user-to-user video transmission, we ensure a clean, family-friendly, and completely secure experience with zero risk of encountering inappropriate content.
          </p>
          <p>
            We are constantly expanding our video repository to keep the experience fresh, engaging, and entertaining. Thank you for using OmegleUnlimited!
          </p>
        </div>
      </main>

      <footer className="py-8 text-center border-t border-border bg-muted/10">
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} OmegleUnlimited.com
        </p>
      </footer>
    </div>
  );
}
