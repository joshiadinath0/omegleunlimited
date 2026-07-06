import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | OmegleUnlimited",
  description: "Terms of Service for using OmegleUnlimited.",
  alternates: {
    canonical: "https://omegleunlimited.com/terms",
  },
};

export default function TermsPage() {
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
        
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 7, 2026</p>
        
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <p>By using the OmegleUnlimited website, you agree to comply with and be bound by the following Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Age Requirement</h2>
            <p>You must be at least 18 years of age to use this website. If you are under 18, you are not authorized to use the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Intellectual Property</h2>
            <p>All video content played on this platform is embedded directly from public sources (such as YouTube) using official public developer tools. The original content creators retain all ownership and copyright rights to their respective videos.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Local Media Feed</h2>
            <p>The service utilizes your local device camera and microphone to enhance the simulated interface. By granting permission, you acknowledge that this feed remains strictly on your local device and is not broadcast, transmitted, or recorded by OmegleUnlimited.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Disclaimer of Warranties</h2>
            <p>The service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. OmegleUnlimited makes no warranties regarding the accuracy, completeness, or reliability of any content or connection stability.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Limitation of Liability</h2>
            <p>In no event shall OmegleUnlimited be liable for any damages arising out of your use of or inability to use the service.</p>
          </section>
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
