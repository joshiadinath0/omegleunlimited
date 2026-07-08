import type { Metadata } from "next";
import Link from "next/link";
import { Users } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-static";

const ROOMS = [
  { slug: "anime", name: "Anime", emoji: "🎌" },
  { slug: "gaming", name: "Gaming", emoji: "🎮" },
  { slug: "kpop", name: "K-Pop", emoji: "🎵" },
  { slug: "roblox", name: "Roblox", emoji: "🧱" },
  { slug: "tiktok", name: "TikTok", emoji: "📱" },
  { slug: "snapchat", name: "Snapchat", emoji: "👻" },
  { slug: "bored", name: "Bored", emoji: "🥱" },
  { slug: "movies", name: "Movies", emoji: "🍿" }
];

export async function generateStaticParams() {
  return ROOMS.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS.find(r => r.slug === slug);
  return {
    title: `${room?.name || "Chat"} Video Chat Room | OmegleUnlimited`,
    description: `Join the free ${room?.name} video chat room. Meet new friends who love ${room?.name} instantly on OmegleUnlimited.`,
    keywords: [`${room?.name} chat`, `${room?.name} video chat`, `chat with ${room?.name} fans`, `omegle ${room?.name}`],
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = ROOMS.find(r => r.slug === slug) || { name: "Random", emoji: "👋" };

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
          <div className="text-6xl mb-6">{room.emoji}</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            The Official <span className="text-primary italic">{room.name}</span> Room
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg mb-8 leading-relaxed">
            Connect instantly with thousands of other people who love {room.name}. No registration required, just turn on your camera and start talking!
          </p>

          <Link href="/" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all">
            <Users className="w-5 h-5" />
            Join the {room.name} Room
          </Link>
        </div>
      </main>
    </div>
  );
}
