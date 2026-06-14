
import "./globals.css";
import { Button1, Button2 } from "./components/Buttons";
import Logo from "./components/logo";
import Footer from "./components/footer";

const features = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#27bb4e"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "No Account Needed",
    body: "Unlike WhatsApp or Telegram, you don't need a phone number, email, or account. Just pick a username, create a room, and start chatting instantly. Zero sign-up friction.",
    bullets: ["No phone number", "No email signup", "Instant access"],
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#27bb4e"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Real-Time & Temporary",

    body: "Messages are live and instant — no delays, no servers storing your chats forever. When the room closes, the conversation is gone. Perfect for quick collabs, events, or private chats.",
    bullets: [
      "Live instant messages",
      "No message history stored",
      "Room expires when you leave",
    ],
  },
];

const faqs = [
  {
    q: "Do I need to create an account to use Bubble Chat?",
    a: "No. Bubble Chat requires zero registration. Just pick a display name, create or join a room, and start chatting immediately. No email, no phone number, no password.",
  },
  {
    q: "Are Bubble Chat messages stored anywhere?",
    a: "Messages are not stored permanently on our servers. They are automatically deleted when all participants leave the room.",
  },
  {
    q: "How do I invite someone to my chat room?",
    a: "After creating a room, you receive a unique room link or code. Share it with anyone — they can join instantly from any browser, no download required.",
  },
  {
    q: "Is Bubble Chat free to use?",
    a: "Yes, Bubble Chat is completely free with no paid plans or hidden fees.",
  },
  {
    q: "What makes Bubble Chat different from WhatsApp or Telegram?",
    a: "WhatsApp and Telegram require accounts and store your messages. Bubble Chat is built for instant, anonymous, disposable conversations that leave no trace.",
  },
  {
    q: "Can I use Bubble Chat on mobile?",
    a: "Yes. Bubble Chat works in any modern browser on mobile or desktop — no app download needed.",
  },
];

export default function Page() {
  return (
    <main
      role="main"
      className="relative w-full min-h-[50vh] bg-linear-to-br from-[#022c22] via-[#065f46] to-[#0d9488] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_60%)] pointer-events-none"
      />

      {/* Hero */}
      <section
        aria-label="Hero"
        className="relative z-10 m-auto min-h-[50vh] text-white flex items-center"
      >
        <div className="flex flex-col mx-auto justify-center items-center gap-8">
          <div className="logo drop-shadow-lg">
            <Logo />
          </div>

          <h1 className="text-emerald-200/70 text-lg tracking-widest uppercase text-center">
            Instant Anonymous Chat Rooms
            <span className="block text-sm text-center mt-1 normal-case tracking-normal font-normal">
              Free instant chat. Real-time. No account needed.
            </span>
          </h1>

          <div className="flex gap-4">
            <button aria-label="Create or join a Bubble Chat room">
              <Button1 text={"Create / Join Room"} />
            </button>
            <a href="#how-it-works">
              <div className="relative inline-flex items-center justify-center p-6 px-8 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-white rounded-2xl shadow-md group bg-[#27bb4e]">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#27bb4e] group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full   transition-all duration-300 transform group-hover:translate-x-full ease">
                  How it works?
                </span>
                <span className="relative invisible">Button Text</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        aria-label="Why choose Bubble Chat"
        className="relative z-10 w-full lg:px-6 pb-20 mt-10 mx-auto"
      >
        <h2 className="text-center text-emerald-200/50 text-xs tracking-widest uppercase mb-10">
          Why Bubble?
        </h2>

        <div className="flex gap-2.5 ml-5 lg:gap-10 w-[90%] md:ml-12 flex-wrap md:flex-nowrap justify-center">
          {features.map((f) => (
            <article
              key={f.title}
              className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300 group w-91"
            >
              <div className="w-12 h-12 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center group-hover:bg-[#27bb4e]/30 transition-all">
                {f.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-emerald-200/60 text-sm leading-relaxed">
                  {f.body}
                </p>
              </div>
              <ul
                className="flex flex-col gap-2 mt-4"
                aria-label={`${f.title} features`}
              >
                {f.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs text-emerald-300/70"
                  >
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      stroke="#27bb4e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Comparison Card */}
          <article className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300 group w-91">
            <div className="w-12 h-12 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center group-hover:bg-[#27bb4e]/30 transition-all">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="#27bb4e"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 3v18h18" />
                <path d="M7 14l3-3 4 4 5-6" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Bubble vs. the Rest
              </h3>
              <p className="text-emerald-200/60 text-sm leading-relaxed">
                Traditional apps like WhatsApp and Telegram require accounts and
                store your data. Bubble is built for instant, anonymous,
                disposable conversations — faster, lighter, and completely
                private.
              </p>
            </div>
            <table className="w-full mt-auto text-[10px] border-collapse">
              <caption className="sr-only">
                Bubble Chat compared to WhatsApp and Telegram
              </caption>
              <thead>
                <tr>
                  <th className="text-left text-emerald-300/50 pb-2 font-normal">
                    App
                  </th>
                  <th className="text-left text-emerald-300/50 pb-2 font-normal">
                    Requirements
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-white/5 px-3 py-2 rounded-l-lg border border-emerald-400/20 text-emerald-300 font-medium">
                    Bubble Chat
                  </td>
                  <td className="bg-white/5 px-3 py-2 rounded-r-lg border border-emerald-400/20 border-l-0 text-emerald-200/70">
                    No signup · No storage
                  </td>
                </tr>
                <tr>
                  <td className="bg-white/5 px-3 py-2 rounded-l-lg border border-white/10 text-white/80">
                    WhatsApp
                  </td>
                  <td className="bg-white/5 px-3 py-2 rounded-r-lg border border-white/10 border-l-0 text-white/40">
                    Login · Data sharing
                  </td>
                </tr>
                <tr>
                  <td className="bg-white/5 px-3 py-2 rounded-l-lg border border-white/10 text-white/80">
                    Telegram
                  </td>
                  <td className="bg-white/5 px-3 py-2 rounded-r-lg border border-white/10 border-l-0 text-white/40">
                    Account · Storage
                  </td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        aria-label="How Bubble Chat works"
        className="relative z-10 w-full lg:px-6 pb-20 mx-auto"
      >
        <h2 className="text-center text-emerald-200/50 text-xs tracking-widest uppercase mb-10">
          How It Works
        </h2>
        <ol className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-start max-w-3xl mx-auto px-6">
          {[
            {
              step: "1",
              title: "Pick a Username",
              desc: "No email or phone needed — just choose any display name.",
            },
            {
              step: "2",
              title: "Create or Join a Room",
              desc: "Generate a new room instantly or enter a room code to join a friend.",
            },
            {
              step: "3",
              title: "Chat in Real Time",
              desc: "Send messages live. When everyone leaves, the room and all messages vanish.",
            },
          ].map((s) => (
            <li
              key={s.step}
              className="flex flex-col items-center text-center gap-3 flex-1"
            >
              <span
                aria-hidden="true"
                className="w-10 h-10 rounded-full bg-[#27bb4e]/20 border border-[#27bb4e]/40 flex items-center justify-center text-emerald-300 font-bold text-lg"
              >
                {s.step}
              </span>
              <h3 className="text-white font-semibold">{s.title}</h3>
              <p className="text-emerald-200/60 text-sm leading-relaxed">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-label="Frequently asked questions"
        className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-24"
      >
        <h2 className="text-center text-emerald-200/50 text-xs tracking-widest uppercase mb-10">
          Frequently Asked Questions
        </h2>
        <dl className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-white/5 border border-emerald-400/20 rounded-2xl px-6 py-4 cursor-pointer hover:border-emerald-400/40 transition-all"
            >
              <summary className="text-white font-medium text-sm list-none flex justify-between items-center gap-4">
                <dt>{faq.q}</dt>
                <span
                  aria-hidden="true"
                  className="text-emerald-400 group-open:rotate-45 transition-transform duration-200 text-xl shrink-0"
                >
                  +
                </span>
              </summary>
              <dd className="text-emerald-200/60 text-sm leading-relaxed mt-3">
                {faq.a}
              </dd>
            </details>
          ))}
        </dl>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
