"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Video, ShieldAlert } from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

const INTERESTS = [
  "🎮 Gaming",
  "🎵 Music",
  "📸 Photography",
  "😂 Memes",
  "🎬 Movies",
  "🌎 Travel",
  "🤖 AI & Tech",
  "💃 Dance",
  "🐶 Pets",
  "🍕 Food",
];

const COUNTRIES = [
  { name: "All Countries", flag: "🌎" },
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "India", flag: "🇮🇳" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Nigeria", flag: "🇳🇬" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Poland", flag: "🇵🇱" }
];

export default function Home() {
  const router = useRouter();
  const [onlineCount, setOnlineCount] = useState(14293);
  const [nickname, setNickname] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [gender, setGender] = useState("Any");
  const [country, setCountry] = useState("All Countries");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Simulate live online count
    const interval = setInterval(() => {
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 80) - 30);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ageConfirmed) {
      alert("Please confirm you are 18 or older to continue.");
      return;
    }
    
    setIsConnecting(true);
    
    // Save to localStorage for the chat page
    localStorage.setItem("ou_nickname", nickname.trim() || "Anonymous");
    localStorage.setItem("ou_interests", JSON.stringify(selectedInterests));
    localStorage.setItem("ou_gender", gender);
    localStorage.setItem("ou_country", country);

    setTimeout(() => {
      router.push("/chat");
    }, 1200);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "OmegleUnlimited",
    "url": "https://omegleunlimited.com",
    "applicationCategory": "SocialNetworkingApplication",
    "operatingSystem": "All",
    "description": "Free random video chat with no bans or limits. Meet new people instantly.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Omegle<span className="text-primary">Unlimited</span>
        </Link>
        <div className="flex items-center gap-2 bg-success/10 border border-success/30 rounded-full px-3 py-1.5 text-xs font-semibold text-success">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          {onlineCount.toLocaleString()} online
        </div>
      </header>

      {/* Ad: Top Banner */}
      <div className="w-full bg-muted/20 border-b border-border py-4 flex items-center justify-center px-4 overflow-hidden">
        <div className="w-[728px] max-w-full min-h-[90px] flex items-center justify-center">
          <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
        </div>
      </div>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-muted/40 border border-border backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl"
        >
          <div className="text-xs font-bold tracking-widest uppercase text-primary mb-4">
            Free & Unlimited
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-3">
            Talk to <span className="text-primary italic">strangers</span> with no limits
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mb-8">
            No account needed. No bans. No time limits. Just click and start chatting with random people instantly.
          </p>

          <form onSubmit={handleStart} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="nickname" className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Your Nickname
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="e.g. cooluser123"
                maxLength={20}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option>Any</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                Interests <span className="lowercase font-normal">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                      selectedInterests.includes(interest)
                        ? "bg-primary border-primary text-white"
                        : "bg-transparent border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                ageConfirmed ? "bg-primary/5 border-primary/30" : "bg-background border-border hover:border-primary/50"
              }`}
              onClick={() => setAgeConfirmed(!ageConfirmed)}
            >
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
              />
              <span className="text-xs text-muted-foreground leading-relaxed select-none">
                I confirm I am 18 years or older and agree to the{" "}
                <Link href="/terms" className="underline hover:text-foreground">Terms of Service</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isConnecting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-4 font-bold text-base transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Video className="w-5 h-5" />
                  Start Chatting Now
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing you agree to our <Link href="/terms" className="underline hover:text-foreground">Terms</Link> & <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.<br />
            We do not store your personal data.
          </p>
        </motion.div>
      </main>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-t border-border bg-muted/20">
        <div className="p-8 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">Instant Connection</h3>
          <p className="text-sm text-muted-foreground">Connect with a stranger in under a second, no waiting in queues.</p>
        </div>
        <div className="p-8 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">100% Anonymous</h3>
          <p className="text-sm text-muted-foreground">No account, no email, no phone number required. Pure anonymity.</p>
        </div>
        <div className="p-8 text-center flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg">No Bans Ever</h3>
          <p className="text-sm text-muted-foreground">Unlike the old Omegle, we never ban users. Chat as long as you want.</p>
        </div>
      </section>

      {/* SEO Section */}
      <section className="w-full bg-background py-16 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">The Best Omegle Alternative in {new Date().getFullYear()}</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Looking for a safe, free, and unrestricted <strong className="text-foreground">Omegle alternative</strong> or <strong className="text-foreground">OmeTV alternative</strong>? You&apos;re in the right place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/20 border border-border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">How to get an Omegle Unban?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If you&apos;re tired of searching for an <strong>omegle unban</strong> or figuring out how to bypass unfair restrictions, OmegleUnlimited is the perfect solution. We don&apos;t track your IP address or require registration, meaning there are absolutely no bans. Start a fresh <strong>stranger chat</strong> instantly without ever worrying about being blocked.
              </p>
            </div>
            
            <div className="bg-muted/20 border border-border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">OmeTV Alternative & Unban</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                OmeTV is known for strict rules and unexpected account bans. If you need an <strong>ometv unban</strong> or just want a better <strong>ometv alternative</strong>, our platform offers a limitless, anonymous environment. Talk to strangers, use our advanced gender and country filters, and enjoy a completely unrestricted video chat experience.
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
            <h3 className="text-lg font-bold mb-2">Why choose OmegleUnlimited for Stranger Chat?</h3>
            <p className="text-muted-foreground text-sm">
              As the internet&apos;s premier random video chat platform, we combine the classic thrill of meeting random people with modern security and a gorgeous interface. Whether you want to make new friends, practice a language, or just kill time, OmegleUnlimited is the ultimate chat network.
            </p>
          </div>
        </div>
      </section>

      {/* Ad: Below Fold */}
      <div className="w-full bg-background py-8 flex items-center justify-center border-t border-border px-4 overflow-hidden">
        <div className="w-[728px] max-w-full min-h-[90px] flex items-center justify-center">
          <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border bg-background">
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
