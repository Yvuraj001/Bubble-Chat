import "./globals.css";
import { Button1 } from "./components/Buttons";
import Logo from "./components/logo";
import Footer from "./components/footer";
import { faqs, features } from "./constants";



export default function Page() {
  return (
    <div className="relative w-full bg-[#070a12] text-slate-100 h-screen flex flex-col overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section
        aria-label="Hero"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-20 flex flex-col items-center text-center"
      >

        {/* Brand emblem */}
        <div className="mb-6 scale-90 sm:scale-100">
          <Logo />
        </div>

        {/* Catchy headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.15]">
          Private chat rooms that <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">vanish without a trace.</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
          Create a temporary room in one click. No phone number, no passwords, no app download. When the room closes, everything is gone forever.
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button1 text="Create / Join Room" />
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
          >
            <span>How it works</span>
            <svg
              className="w-4 h-4 text-emerald-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-8 max-w-2xl w-full border-t border-white/[0.08] pt-8">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-white">0s</span>
            <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Signup Friction</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/[0.08]">
            <span className="text-xl sm:text-2xl font-bold text-emerald-400">100%</span>
            <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Ephemeral</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-teal-300">Free</span>
            <span className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Forever</span>
          </div>
        </div>
      </section>

      {/* Features & Comparison Section */}
      <section
        id="features"
        aria-label="Why choose Bubble Chat"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Engineered for Privacy
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why people choose Bubble over traditional apps
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            A lighter, faster, and completely disposable way to communicate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <article
              key={f.title}
              className="glass-panel glass-panel-hover rounded-3xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner">
                    {f.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{f.body}</p>
              </div>

              <ul className="space-y-2.5 border-t border-white/[0.06] pt-5">
                {f.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-emerald-400"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Comparison Matrix Card */}
          <article className="glass-panel glass-panel-hover rounded-3xl p-7 flex flex-col justify-between border-emerald-500/20 bg-gradient-to-b from-[#111928]/80 to-[#0b101c]/80">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shadow-inner">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 3h5v5" />
                    <path d="M8 3H3v5" />
                    <path d="M12 22v-8.3" />
                    <path d="M21 3l-8.5 8.5" />
                    <path d="M3 3l8.5 8.5" />
                  </svg>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Head-to-head
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Bubble vs. Big Tech</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Mainstream messengers tie chats to your real-world identity and archive conversations indefinitely.
              </p>
            </div>

            <div className="space-y-2 border-t border-white/[0.06] pt-4">
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                <span className="text-xs font-semibold text-emerald-300">Bubble Chat</span>
                <span className="text-[11px] font-medium text-emerald-200">No Signup • 0 Storage</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-xs text-slate-400">WhatsApp</span>
                <span className="text-[11px] text-slate-500">Phone Req • Metadata Logs</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-xs text-slate-400">Telegram</span>
                <span className="text-[11px] text-slate-500">Account Req • Cloud Stored</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        aria-label="How Bubble Chat works"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 w-full"
      >
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Three Simple Steps
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How Bubble works
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            No downloads or email confirmations. Connect with anyone in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Pick Any Handle",
              desc: "Choose any nickname you like. No passwords, credentials, or phone numbers needed.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              ),
            },
            {
              step: "02",
              title: "Create or Join Room",
              desc: "Enter a secret room name and share it with your friend. Both join the same room name.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              ),
            },
            {
              step: "03",
              title: "Chat & Vanish",
              desc: "Exchange live encrypted-feeling messages. When everyone leaves, all messages vanish forever.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h20" />
                  <path d="M20 12l-4-4" />
                  <path d="M20 12l-4 4" />
                </svg>
              ),
            },
          ].map((s) => (
            <div
              key={s.step}
              className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col items-start text-left relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                {s.icon}
              </div>
              <span className="text-[11px] font-bold text-emerald-400 tracking-wider mb-1">
                STEP {s.step}
              </span>
              <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        aria-label="Frequently asked questions"
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 w-full"
      >
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
            Got Questions?
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group glass-panel rounded-2xl p-5 cursor-pointer border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-200"
            >
              <summary className="text-white font-medium text-sm sm:text-base list-none flex justify-between items-center gap-4">
                <span>{faq.q}</span>
                <div className="w-6 h-6 rounded-full bg-white/[0.05] flex items-center justify-center text-emerald-400 group-open:rotate-45 group-open:bg-emerald-500/20 transition-all duration-200 shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </summary>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-3 pt-3 border-t border-white/[0.05]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-14 glass-panel rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.07] to-transparent">
          <h3 className="text-2xl font-bold text-white">Ready for private conversations?</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mt-2 mb-6">
            Jump into a real-time room right now with zero friction.
          </p>
          <Button1 text="Create a Room Now" />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}