import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | OmegleUnlimited",
  description: "Read our privacy policy to see how OmegleUnlimited protects your data and ensures a completely safe, anonymous experience.",
  alternates: {
    canonical: "https://omegleunlimited.com/privacy",
  },
};

export default function PrivacyPage() {
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
        
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: July 7, 2026</p>
        
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <p>At OmegleUnlimited, we prioritize your privacy. This privacy policy describes the types of information we collect and how we use it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information Collection</h2>
            <p>We do not require users to create an account, register, or provide any personal information (such as email address or phone number) to use our platform. The nickname and interests you enter are stored only in your browser&apos;s local storage (cookies/localStorage) for session persistence, and are never stored on our servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Camera and Microphone Access</h2>
            <p>Our chat interface requests permission to access your local camera and microphone. This feed is displayed <strong>locally on your device only</strong> to enhance the realism of the experience. We do not transmit, record, or store your video/audio streams on our servers under any circumstances.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Log Data</h2>
            <p>Like most websites, we may collect information that your browser sends whenever you visit our site. This may include your IP address, browser type, pages visited, and timestamps. This data is used solely for traffic analysis and site maintenance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Advertisements</h2>
            <p>We use third-party advertising companies (such as Google AdSense) to serve ads when you visit our website. These companies may use cookies and web beacons to serve ads based on your prior visits to this or other websites.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, you can reach us via our <Link href="/contact" className="text-primary hover:underline">Contact page</Link>.</p>
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
