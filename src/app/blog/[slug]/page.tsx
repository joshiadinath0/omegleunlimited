import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-static";

const POSTS = [
  { 
    slug: "omegle-unban-guide", 
    title: "How to get unbanned from Omegle and OmeTV in 2026",
    content: "If you are looking for an Omegle unban guide, you probably realized that changing your IP address or using a VPN no longer works. The moderation algorithms are too strict now. The only real solution to bypass a hardware ban is to use a completely unmoderated alternative like OmegleUnlimited, which does not track your IP address or issue bans."
  },
  { 
    slug: "is-omegle-coming-back", 
    title: "Is Omegle coming back? The truth about the shutdown.",
    content: "The original Omegle shut down permanently due to legal pressure and server costs. The founder has stated it is never coming back. However, the community has migrated to open-source and free alternatives like OmegleUnlimited, which use modern WebRTC technology to keep the spirit of random chat alive without the corporate tracking."
  },
  { 
    slug: "how-to-be-safe-on-random-video-chat", 
    title: "How to stay safe on random video chat apps",
    content: "When talking to strangers online, never reveal your real name, school, or location. Always use a VPN if you are concerned about IP tracking. The safest way to chat is using platforms like OmegleUnlimited that do not require account registration or social media linking."
  }
];

export async function generateStaticParams() {
  return POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);
  return {
    title: `${post?.title} | OmegleUnlimited Blog`,
    description: post?.content.substring(0, 150) + "...",
  };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);

  if (!post) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Omegle<span className="text-primary">Unlimited</span> Blog
        </Link>
      </header>

      {/* Ad: Top Banner */}
      <div className="w-full bg-muted/20 border-b border-border py-4 flex items-center justify-center px-4 overflow-hidden">
        <div className="w-[728px] max-w-full min-h-[90px] flex items-center justify-center">
          <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full p-6 sm:p-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">{post.title}</h1>
        <div className="prose prose-invert max-w-none mb-12">
          <p className="text-lg leading-relaxed text-muted-foreground">{post.content}</p>
        </div>
        
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Tired of reading?</h3>
          <p className="text-muted-foreground mb-6">Skip the hassle and just use the best random video chat directly in your browser.</p>
          <Link href="/" className="inline-flex px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all">
            Start Video Chatting Free
          </Link>
        </div>
      </main>
    </div>
  );
}
