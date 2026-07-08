import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import { POSTS } from "@/lib/seo-data";

export const dynamic = "force-static";

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
