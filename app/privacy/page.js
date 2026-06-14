import React from 'react'
import Logo from '../components/logo'
import Footer from '../components/footer';

export default function PrivacyPage() {
  return (
    <main className="relative w-full min-h-screen bg-linear-to-br from-[#022c22] via-[#065f46] to-[#0d9488] overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.12)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">

        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <p className="text-emerald-200/60 text-sm tracking-widest uppercase">Privacy & Policy</p>
          <h1 className="text-white text-3xl font-bold leading-tight">We don't collect your data</h1>
          <p className="text-emerald-200/60 text-base leading-relaxed max-w-xl">
            Bubble is built for private, ephemeral conversations. This site does not collect personal information,
            does not store chat messages on any persistent database, and does not send any user data to third-party
            services or analytics providers.
          </p>
        </div>

        <div className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-8 flex flex-col gap-4">
          <h2 className="text-white font-semibold text-xl">What we do (and don't)</h2>
          <ul className="text-emerald-200/60 list-disc ml-5 space-y-2">
            <li>This site does not collect names, email addresses, or profile data.</li>
            <li>Messages are ephemeral and not persisted to a permanent storage by design.</li>
            <li>We do not use analytics, trackers, or advertising services that share data with third parties.</li>
            <li>No personal data is sold, shared, or otherwise provided to external companies.</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="text-white font-semibold">Cookies & Third-Party Tools</h3>
          <p className="text-emerald-200/60 text-sm">We do not use cookies for tracking. Minimal technical cookies or headers required for basic operation (routing, WebSocket handshakes) may be used but are not used to identify you.</p>
        </div>

        <div className="text-emerald-200/60 text-sm text-center">If you have questions, open an issue or contact the project on GitHub.</div>

      </div>
      <Footer/>
    </main>
  )
}

export const metadata = {
  title: "Privacy - Bubble",
  description: "Privacy policy: Bubble does not collect or share user data.",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/privacy",
  },
};
