import type { Metadata } from "next";
import Link from "next/link";
import { Zap, ShieldCheck, Video } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-static";

const COMPETITORS = [
  { slug: "ometv", name: "OmeTV" },
  { slug: "chatroulette", name: "Chatroulette" },
  { slug: "monkey", name: "Monkey App" },
  { slug: "emerald-chat", name: "Emerald Chat" },
  { slug: "omegle-web", name: "Omegle Web" },
  { slug: "chathub", name: "ChatHub" }
];

export async function generateStaticParams() {
  return COMPETITORS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const competitor = COMPETITORS.find(c => c.slug === slug)?.name || "Omegle";
  return {
    title: `Best ${competitor} Alternative in 2026 | OmegleUnlimited`,
    description: `Tired of being banned on ${competitor}? OmegleUnlimited is the ultimate free alternative with zero bans, instant connections, and no sign-up required.`,
    keywords: [`${competitor} alternative`, `better than ${competitor}`, `unbanned on ${competitor}`, `random video chat`],
  };
}

export default async function AlternativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const competitor = COMPETITORS.find(c => c.slug === slug)?.name || "Omegle";

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Omegle<span className="text-primary">Unlimited</span>
        </Link>
      </header>

      {/* Ad: Top Banner */}
      <div className="w-full bg-muted/20 border-b border-border py-4 flex items-center justify-center px-4 overflow-hidden">
        <div className="w-[728px] max-w-full min-h-[90px] flex items-center justify-center">
          <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl bg-muted/40 border border-border backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-xs font-bold tracking-widest uppercase text-destructive mb-4">
            Don't Use {competitor}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            The #1 Free Alternative to <span className="text-primary italic">{competitor}</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg mb-8 leading-relaxed">
            Are you tired of getting banned on {competitor} for absolutely no reason? OmegleUnlimited fixes everything wrong with {competitor}. We have zero moderation, zero bans, and lightning-fast connections. 
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-background border border-border rounded-xl p-4 flex flex-col items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-success" />
              <h3 className="font-bold text-sm">Unbannable</h3>
              <p className="text-xs text-muted-foreground">We never ban IP addresses.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-4 flex flex-col items-center gap-2">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-sm">Instant Video</h3>
              <p className="text-xs text-muted-foreground">No waiting in fake queues.</p>
            </div>
          </div>

          <Link href="/" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all">
            <Video className="w-5 h-5" />
            Switch to OmegleUnlimited Now
          </Link>
        </div>
      </main>
    </div>
  );
}
