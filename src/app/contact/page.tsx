"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center px-6 py-4 border-b border-border bg-muted/30 backdrop-blur-md">
        <Link href="/" className="text-xl font-extrabold tracking-tight hover:text-primary transition-colors">
          Omegle<span className="text-primary">Unlimited</span>
        </Link>
      </header>
      
      <main className="flex-1 max-w-2xl w-full mx-auto p-6 sm:p-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
        
        <h1 className="text-4xl font-extrabold mb-4 text-foreground">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions, feedback, or need to report a video? Fill out the form below and we will get back to you as soon as possible.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Name</label>
            <input
              id="name"
              type="text"
              required
              className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Email Address</label>
            <input
              id="email"
              type="email"
              required
              className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-y"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={status !== "idle"}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3.5 font-bold text-base transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
            {status === "sending" && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {status === "success" && "Message Sent!"}
          </button>
        </form>
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
