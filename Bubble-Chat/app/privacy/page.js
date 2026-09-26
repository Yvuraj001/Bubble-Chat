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
    <main className="relative w-full min-h-screen bg-[#0b0b0e] text-white py-14 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-10 w-full mb-12">
        <div className="flex flex-col items-center text-center gap-4">
          <Logo />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141419] border border-[#26262e] text-[#38bdf8] text-xs font-mono font-semibold uppercase tracking-widest mt-2">
            Data Privacy & Security
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading">
            We don't collect or store your data. Period.
          </h1>
          <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl leading-relaxed">
            Bubble is engineered from the ground up for ephemeral communication. We do not sell data, we do not monetize your chats, and we do not run user-tracking scripts.
          </p>
        </div>

        {/* Guarantees Box */}
        <div className="bg-[#131317] rounded-2xl p-6 sm:p-10 border border-[#26262f] space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-heading">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
            <span>Core Privacy Principles</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#181820] border border-[#26262f] rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#e10098] mb-1 font-heading">Zero Registration</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                We never ask for emails, phone numbers, passwords, real names, or social logins.
              </p>
            </div>
            <div className="bg-[#181820] border border-[#26262f] rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#38bdf8] mb-1 font-heading">Ephemeral RAM Delivery</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Messages stream directly between active peers in RAM. When rooms close, memory buffers are wiped.
              </p>
            </div>
            <div className="bg-[#181820] border border-[#26262f] rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#e10098] mb-1 font-heading">No Tracking or Ad SDKs</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                No third-party tracking scripts, fingerprinting libraries, or advertising analytics run on this platform.
              </p>
            </div>
            <div className="bg-[#181820] border border-[#26262f] rounded-xl p-5">
              <h3 className="text-sm font-bold text-[#38bdf8] mb-1 font-heading">No Data Monetization</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                We never monetize, profile, sell, or disclose your metadata to brokers or advertisers.
              </p>
            </div>
          </div>
        </div>

        {/* Technical details */}
        <div className="bg-[#131317] rounded-2xl p-6 sm:p-8 border border-[#26262f]">
          <h3 className="text-base font-bold text-white mb-2 font-heading">Cookies & Local Storage</h3>
          <p className="text-xs text-[#a1a1aa] leading-relaxed">
            Bubble only utilizes your browser's local storage if you explicitly check "Remember my details locally" to store your chosen handle and room name for your convenience. No marketing cookies are used.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
