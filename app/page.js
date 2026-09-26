"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "./components/footer";
import { faqs } from "./constants";

export default function Page() {
  const router = useRouter();

  const [handle, setHandle] = useState("");
  const [room, setRoom] = useState("");

  const generateRandomRoom = () => {
    const adjectives = ["stealth", "cozy", "silent", "secret", "neon", "amber", "hidden", "cosmic"];
    const nouns = ["haven", "oasis", "signal", "relay", "stream", "bubble", "vault", "grove"];
    const num = Math.floor(100 + Math.random() * 900);
    setRoom(`${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}-${num}`);
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    const finalName = handle.trim() || `anon-${Math.floor(100 + Math.random() * 900)}`;
    const finalRoom = room.trim() || `room-${Math.floor(1000 + Math.random() * 9000)}`;
    if (typeof window !== "undefined") {
      localStorage.setItem("name", finalName);
      localStorage.setItem("roomName", finalRoom);
    }
    router.push(`/chat?room=${encodeURIComponent(finalRoom)}&name=${encodeURIComponent(finalName)}`);
  };

  const handleInstantRoom = () => {
    const randHandle = `guest-${Math.floor(100 + Math.random() * 900)}`;
    const adjectives = ["swift", "hyper", "cipher", "flux", "void", "nova"];
    const nouns = ["chamber", "portal", "channel", "lounge", "spot"];
    const randRoom = `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}-${Math.floor(100 + Math.random() * 900)}`;
    if (typeof window !== "undefined") {
      localStorage.setItem("name", randHandle);
      localStorage.setItem("roomName", randRoom);
    }
    router.push(`/chat?room=${encodeURIComponent(randRoom)}&name=${encodeURIComponent(randHandle)}`);
  };

  const benefits = [
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      label: "No account",
      desc: "No email, no phone, no password. Pick a name and go.",
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: "Messages disappear",
      desc: "When you close the tab, your conversation is gone forever.",
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      label: "Instant & live",
      desc: "Messages appear in real time — no refresh, no lag.",
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      label: "Nothing saved",
      desc: "We don't store chats on any server — not even temporarily.",
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Pick a name",
      desc: "Choose any display name you like — no real info required.",
    },
    {
      num: "2",
      title: "Create or join a room",
      desc: "Make up any room name, or use a code someone shared with you.",
    },
    {
      num: "3",
      title: "Chat, then vanish",
      desc: "Talk freely. Close the tab and every message is gone for good.",
    },
  ];

  return (
    <div className="relative w-full bg-[#0b0b0e] text-white flex flex-col min-h-screen overflow-x-hidden font-body">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 w-full text-center">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141419] border border-[#26262e] text-[#38bdf8] text-xs font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>No sign-up · No storage · No trace</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.1] text-white">
          A chat room that{" "}
          <span className="text-[#e10098]">disappears</span>
          {" "}when you leave.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#a1a1aa] max-w-xl mx-auto leading-relaxed">
          Start a private conversation in seconds. No app, no account, no history. Just talk — and walk away clean.
        </p>

        {/* ── Room launcher card ── */}
        <div className="mt-10 w-full max-w-lg mx-auto bg-[#121216] border border-[#26262e] rounded-2xl p-5 text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-white font-heading">Start chatting</span>
            <button
              type="button"
              onClick={generateRandomRoom}
              className="flex items-center gap-1.5 text-[11px] font-mono text-[#38bdf8] hover:text-[#0ea5e9] transition-colors cursor-pointer"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Random room
            </button>
          </div>

          <form onSubmit={handleHeroSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              placeholder="Your name"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white placeholder-[#71717a] bg-[#181820] border border-[#26262f] outline-none focus:border-[#e10098] transition-colors"
            />
            <input
              type="text"
              placeholder="Room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white placeholder-[#71717a] bg-[#181820] border border-[#26262f] outline-none focus:border-[#e10098] transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg font-mono font-semibold text-sm text-white bg-[#e10098] hover:bg-[#c90087] transition-colors cursor-pointer shrink-0"
            >
              Enter →
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#1e1e26] flex items-center justify-between text-xs text-[#71717a] font-mono">
            <span>Don&apos;t want to type?</span>
            <button
              type="button"
              onClick={handleInstantRoom}
              className="text-white hover:text-[#e10098] underline transition-colors cursor-pointer"
            >
              1-click instant room →
            </button>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS STRIP ───────────────────────────────────────── */}
      <section className="relative z-10 w-full border-y border-[#26262e] bg-[#0e0e12] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.label} className="flex flex-col gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#141419] border border-[#26262e] flex items-center justify-center text-[#e10098]">
                  {b.icon}
                </div>
                <div>
                  <span className="block text-sm font-semibold text-white font-heading">{b.label}</span>
                  <span className="block text-xs text-[#a1a1aa] mt-0.5 leading-relaxed">{b.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] px-2.5 py-1 rounded bg-[#141419] border border-[#26262e]">
            How it works
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white font-heading">
            Three steps, then you&apos;re talking.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden sm:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-[#26262e]" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold font-mono border ${i === 1 ? "bg-[#e10098] border-[#e10098] text-white" : "bg-[#141419] border-[#26262e] text-white"}`}>
                {step.num}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white font-heading">{step.title}</h3>
                <p className="text-sm text-[#a1a1aa] mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY BUBBLE ───────────────────────────────────────────── */}
      <section className="relative z-10 w-full bg-[#0e0e12] border-y border-[#26262e] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: copy */}
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e10098] px-2.5 py-1 rounded bg-[#141419] border border-[#26262e]">
                Why Bubble
              </span>
              <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-white font-heading leading-tight">
                Other apps keep records.<br />We&apos;re built to forget.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
                WhatsApp, Telegram, and iMessage all tie your conversations to your identity and save them on their servers. Bubble is different — it holds nothing. The moment you leave, it&apos;s as if the conversation never happened.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-[#a1a1aa]">
                {[
                  "No phone number or email ever asked",
                  "Chat history deleted the moment you leave",
                  "No ads, no tracking, no data sold",
                  "Works on any browser — no download needed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-[#e10098] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: comparison card */}
            <div className="bg-[#121216] border border-[#26262e] rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-2 border-b border-[#26262e] text-xs font-mono">
                <div className="px-5 py-3 text-[#a1a1aa] border-r border-[#26262e]">
                  Other apps
                </div>
                <div className="px-5 py-3 text-[#38bdf8] font-semibold">
                  Bubble
                </div>
              </div>
              {/* Rows */}
              {[
                ["Requires your phone number", "No personal info needed"],
                ["Saves your chat history", "Messages vanish on exit"],
                ["Needs an app download", "Any browser, instant access"],
                ["Tracks & profiles you", "Zero tracking, ever"],
              ].map(([other, bubble], i) => (
                <div key={i} className={`grid grid-cols-2 text-xs ${i < 3 ? "border-b border-[#26262e]" : ""}`}>
                  <div className="px-5 py-3.5 text-[#71717a] border-r border-[#26262e] flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-[#e10098] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    {other}
                  </div>
                  <div className="px-5 py-3.5 text-[#a1a1aa] flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {bubble}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <section id="faq" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] px-2.5 py-1 rounded bg-[#141419] border border-[#26262e]">
            FAQ
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white font-heading">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-[#121216] rounded-xl border border-[#26262e] hover:border-[#383845] transition-colors"
            >
              <summary className="text-white font-medium text-sm list-none flex justify-between items-center gap-4 px-5 py-4 cursor-pointer">
                <span className="font-heading">{faq.q}</span>
                <div className="w-6 h-6 rounded bg-[#181820] border border-[#2a2a38] flex items-center justify-center text-[#e10098] group-open:rotate-45 transition-transform duration-200 shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </summary>
              <p className="text-sm text-[#a1a1aa] leading-relaxed px-5 pb-4 pt-2 border-t border-[#1e1e26]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-24 w-full">
        <div className="bg-[#121216] border border-[#26262e] rounded-2xl px-8 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Ready to talk privately?
          </h2>
          <p className="mt-3 text-sm text-[#a1a1aa] max-w-sm mx-auto leading-relaxed">
            No signup required. Create a room in seconds and share the name with whoever you want to chat with.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold text-sm text-white bg-[#e10098] hover:bg-[#c90087] transition-colors"
            >
              Create a room
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="https://github.com/Yvuraj001/Bubble-Chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold text-sm text-white bg-[#181820] hover:bg-[#20202a] border border-[#26262e] transition-colors"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}