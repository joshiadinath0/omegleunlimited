/* eslint-disable */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, SkipForward, Send, Flag, Camera, Mic, CameraOff, MicOff } from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";

// YouTube IDs of realistic fake webcams
const VIDEOS = [
  'mt2lU9KknCU', 'znXIxr4HSV8', 'r95xlWYdtJc',
  'VdulVf7FNYI', 'cTiaOtP7v1o', 'KhUmC2bK1nA',
  'a1-PV0yloqU', '-uegR1IYjcc', 'IyM6Hno0ugg',
  'tIysNnnkWwM', 'MEm-3Uhrf4k', 'OrVC3bBz4Fg',
  'U11GW9kgo-g', 'wuFtsVIcUdY', 'SdlIy53aVI8',
  'EiS0zkPmHck'
];

type Message = {
  id: string;
  sender: "me" | "stranger" | "system";
  text: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(true);
  const [currentVideo, setCurrentVideo] = useState("");
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [filterGender, setFilterGender] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  
  // Local Camera State
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const skipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize Local Camera
  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true, // We ask for audio to make it realistic, but keep it muted locally
        });
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Camera access denied or unavailable", err);
        // Fallback gracefully if they deny
        setIsCamOn(false);
        setIsMicOn(false);
      }
    }
    setupCamera();

    // Load initial chat count from local storage
    setChatCount(parseInt(localStorage.getItem('ou_chatCount') || '0'));
    setFilterGender(localStorage.getItem('ou_gender') || "Any");
    setFilterCountry(localStorage.getItem('ou_country') || "All Countries");
    
    // Connect to first stranger
    connectNext();

    return () => {
      // Cleanup media tracks on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    const el = document.getElementById("chat-scroll-container");
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCamOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const connectNext = () => {
    if (skipTimeoutRef.current) clearTimeout(skipTimeoutRef.current);
    
    // Pick video IMMEDIATELY to keep browser's trusted click context for autoplay
    let vid;
    do { vid = VIDEOS[Math.floor(Math.random() * VIDEOS.length)]; } while (vid === currentVideo && VIDEOS.length > 1);
    setCurrentVideo(vid);
    
    setIsConnecting(true);
    setIsVideoReady(false);
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "system", text: "Looking for a new stranger..." }]);

    // Wait exactly 2.5 seconds. This guarantees YouTube buffers completely in the background 
    // and hides its pause/play button before we reveal it to the user.
    const delay = 2500;
    setTimeout(() => {
      setIsConnecting(false);
      setIsVideoReady(true);

      // Auto-skip after 12 seconds to look realistic
      skipTimeoutRef.current = setTimeout(() => {
        connectNext();
      }, 12000);
      
      const newCount = chatCount + 1;
      setChatCount(newCount);
      localStorage.setItem('ou_chatCount', newCount.toString());
      
      setMessages([{ id: Date.now().toString(), sender: "system", text: "You're now chatting with a random stranger." }]);

      // Random auto-greeting
      setTimeout(() => {
        const greetings = ['hey!!', 'hi', 'hello :)', 'hey there', 'asl?', 'sup'];
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          sender: "stranger", 
          text: greetings[Math.floor(Math.random() * greetings.length)] 
        }]);
      }, 1200 + Math.random() * 2000);

    }, delay);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), sender: "me", text: inputValue.trim() }]);
    setInputValue("");

    // Simulated stranger reply
    setTimeout(() => {
      const replies = ['lol', 'haha nice', 'really??', 'thats cool', 'where are you from?', '😂', 'interesting', 'tell me more'];
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        sender: "stranger", 
        text: replies[Math.floor(Math.random() * replies.length)] 
      }]);
    }, 1000 + Math.random() * 2500);
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="h-14 flex-shrink-0 flex items-center justify-between px-4 border-b border-border bg-muted/50">
        <Link href="/" className="font-extrabold tracking-tight">
          Omegle<span className="text-primary">Unlimited</span>
        </Link>
        <button 
          onClick={() => { if(confirm('Leave chat?')) router.push('/'); }}
          className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
        >
          <X className="w-4 h-4" /> Exit
        </button>
      </header>

      {/* Top Banner Ad (Mobile + Desktop) */}
      <div className="w-full min-h-[50px] bg-muted/20 border-b border-border flex items-center justify-center shrink-0 overflow-hidden">
        <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Ad: Left Vertical (Desktop) */}
        <div className="hidden lg:flex w-[160px] border-r border-border bg-muted/10 items-center justify-center overflow-hidden">
          <div className="w-full h-full min-h-[600px] flex items-center justify-center">
            <AdBanner dataAdSlot="1841475529" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-black flex flex-col">
          
          {/* YouTube iframe container */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden bg-black">
            {currentVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1&playsinline=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
                className={`w-full h-full scale-[1.3] object-cover pointer-events-none transition-opacity duration-500 ${isVideoReady && !isConnecting ? 'opacity-100' : 'opacity-0'}`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>

          {/* Connecting Overlay */}
          <AnimatePresence>
            {isConnecting && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
              >
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <h2 className="text-lg font-bold">Finding a stranger...</h2>
                <p className="text-sm text-muted-foreground mb-6 text-center px-4">
                  Searching for {filterGender && filterGender !== "Any" ? `a ${filterGender}` : "someone"} 
                  {filterCountry && filterCountry !== "All Countries" ? ` from ${filterCountry}` : ""} 
                  {" "}with similar interests...
                </p>
                {/* Interstitial Ad */}
                <div className="w-[300px] h-[250px] flex items-center justify-center shadow-xl overflow-hidden bg-background/50 rounded-lg">
                  <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Local Camera (PIP) */}
          <div className="absolute top-4 left-4 z-30 w-32 md:w-48 aspect-[3/4] md:aspect-video bg-muted/80 rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
            <video 
              ref={localVideoRef}
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover ${!isCamOn ? 'hidden' : ''} -scale-x-100`} 
            />
            {!isCamOn && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CameraOff className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            
            {/* Local Cam Controls */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={toggleMic} className="p-1.5 rounded-full bg-black/50 backdrop-blur text-white hover:bg-primary transition-colors">
                {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5 text-destructive" />}
              </button>
              <button onClick={toggleCamera} className="p-1.5 rounded-full bg-black/50 backdrop-blur text-white hover:bg-primary transition-colors">
                {isCamOn ? <Camera className="w-3.5 h-3.5" /> : <CameraOff className="w-3.5 h-3.5 text-destructive" />}
              </button>
            </div>
          </div>

          {/* Bottom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            
            <div className="flex items-end justify-between mb-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-bold text-white shadow-sm">Stranger</span>
              </div>
              <button className="text-white/50 hover:text-white transition-colors flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider">
                <Flag className="w-3 h-3" /> Report
              </button>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => { if(confirm('Stop chatting?')) router.push('/'); }}
                className="px-6 py-3.5 rounded-xl bg-destructive/80 hover:bg-destructive text-white font-bold text-sm backdrop-blur-md transition-colors"
              >
                Stop
              </button>
              <button 
                onClick={connectNext}
                disabled={isConnecting}
                className="flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : <><SkipForward className="w-4 h-4" /> Next Stranger</>}
              </button>
            </div>
          </div>

        </div>

        {/* Chat Sidebar */}
        <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col border-t md:border-t-0 md:border-l border-border bg-background">
          <div className="p-3 border-b border-border bg-muted/20 text-xs font-bold uppercase tracking-widest text-muted-foreground flex justify-between items-center">
            <span>Text Chat</span>
            <span className="text-[10px] font-normal lowercase bg-muted px-2 py-0.5 rounded-md">
              {chatCount} chats today
            </span>
          </div>

          <div id="chat-scroll-container" className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`text-sm p-2.5 rounded-2xl max-w-[85%] ${
                  msg.sender === 'system' 
                    ? 'bg-transparent text-muted-foreground text-xs text-center self-center uppercase tracking-wider font-bold' 
                    : msg.sender === 'me'
                    ? 'bg-primary text-white self-end rounded-br-sm'
                    : 'bg-muted text-foreground self-start rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Small Feed Ad */}
          <div className="p-2 border-t border-border bg-muted/5 flex items-center justify-center overflow-hidden min-h-[60px]">
            <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-border bg-muted/10 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
              disabled={isConnecting}
              maxLength={200}
            />
            <button 
              type="submit"
              disabled={isConnecting || !inputValue.trim()}
              className="w-10 h-10 flex-shrink-0 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Ad: Bottom Right */}
          <div className="min-h-[90px] border-t border-border bg-muted/10 flex items-center justify-center shrink-0 overflow-hidden">
            <AdBanner dataAdSlot="5181155973" dataAdFormat="auto" dataFullWidthResponsive={true} className="w-full h-full" />
          </div>
        </div>

      </div>
    </div>
  );
}
