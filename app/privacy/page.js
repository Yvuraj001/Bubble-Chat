import React from 'react';
import Logo from '../components/logo';
import Footer from '../components/footer';

export const metadata = {
  title: "Privacy Policy - Bubble Chat",
  description: "Bubble Chat privacy policy: zero tracking, no accounts, no persistent message storage.",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#070a12] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-10 w-full mb-12">
        <div className="flex flex-col items-center text-center gap-4">
          <Logo />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mt-2">
            Data Privacy & Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            We don't collect or store your data. Period.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Bubble is engineered from the ground up for ephemeral communication. We do not sell data, we do not monetize your chats, and we do not run user-tracking scripts.
          </p>
        </div>

        {/* Guarantees Box */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Core Privacy Principles</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-emerald-400 mb-1">Zero Registration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never ask for emails, phone numbers, passwords, real names, or social logins.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-emerald-400 mb-1">Ephemeral RAM Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Messages stream directly between active peers in RAM. When rooms close, memory buffers are wiped.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-emerald-400 mb-1">No Tracking or Ad SDKs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No third-party tracking scripts, fingerprinting libraries, or advertising analytics run on this platform.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-emerald-400 mb-1">No Data Monetization</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never monetize, profile, sell, or disclose your metadata to brokers or advertisers.
              </p>
            </div>
          </div>
        </div>

        {/* Technical details */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
          <h3 className="text-base font-bold text-white mb-2">Cookies & Local Storage</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bubble only utilizes your browser's local storage if you explicitly check "Remember my details locally" to store your chosen handle and room name for your convenience. No marketing cookies are used.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
