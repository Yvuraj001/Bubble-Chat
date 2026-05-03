"use client"
import Logo from './logo'
import { useRouter } from 'next/navigation'

const about = () => {
  const router = useRouter()

  return (
    <main className="relative w-full min-h-screen bg-linear-to-br from-[#022c22] via-[#065f46] to-[#0d9488] overflow-hidden">

      {/* overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <p className="text-emerald-200/60 text-sm tracking-widest uppercase">About the project</p>
          <h1 className="text-white text-4xl font-bold leading-tight">
            Chat without the <span className="text-[#27bb4e]">baggage</span>
          </h1>
          <p className="text-emerald-200/60 text-base leading-relaxed max-w-xl">
           Bubble is an open, real-time messaging app built for people who just want to talk —
            no accounts, no tracking, no clutter. Create a room, share the name, and chat instantly.
          </p>
        </div>

        {/* What is this */}
        <div className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-xl">What is Bubble?</h2>
          </div>
          <p className="text-emerald-200/60 text-sm leading-relaxed">
            Bubble is a lightweight, real-time chat application powered by <span className="text-emerald-300">Socket.io</span> and <span className="text-emerald-300">Next.js</span>.
            It lets anyone create a temporary chat room and invite others by simply sharing the room name.
            No registration, no passwords, no data stored on servers. When everyone leaves, the room disappears.
          </p>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {[
              { label: "Built with", value: "Next.js + Socket.io" },
              { label: "Storage", value: "None — ephemeral" },
              { label: "Auth required", value: "Nope, just a name" },
              { label: "Messages saved", value: "Never" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                <p className="text-emerald-300/50 text-[11px] uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-white text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to use */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-xl">How to use</h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                step: "01",
                title: "Create a Room",
                desc: "Click 'Create Room' on the home page. Enter your name and pick a room name. You'll be taken straight into the chat.",
                svg: (
                  <svg width="22" height="22" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                )
              },
              {
                step: "02",
                title: "Share the Room Name",
                desc: "Tell your friends the room name you chose. They can join from the 'Join Room' page by entering the exact same name.",
                svg: (
                  <svg width="22" height="22" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                  </svg>
                )
              },
              {
                step: "03",
                title: "Start Chatting",
                desc: "Once inside the room, messages appear in real-time for everyone. No refresh needed. Just type and hit send.",
                svg: (
                  <svg width="22" height="22" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                )
              },
              {
                step: "04",
                title: "Leave Anytime",
                desc: "Just close the tab. No account to delete, no data left behind. The room vanishes when everyone's gone.",
                svg: (
                  <svg width="22" height="22" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/10 transition-all group">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center group-hover:bg-[#27bb4e]/30 transition-all">
                  {item.svg}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#27bb4e] text-xs font-bold tracking-widest">{item.step}</span>
                    <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                  </div>
                  <p className="text-emerald-200/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-xl">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Next.js", role: "Frontend" },
              { name: "Socket.io", role: "Real-time" },
              { name: "Node.js", role: "Backend" },
              { name: "Tailwind", role: "Styling" },
            ].map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-1 bg-white/5 border border-white/5 rounded-xl py-4 px-3 hover:border-emerald-400/30 transition-all">
                <span className="text-white font-semibold text-sm">{tech.name}</span>
                <span className="text-emerald-300/50 text-[11px] uppercase tracking-widest">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 text-center pb-4">
          <p className="text-emerald-200/50 text-sm">Ready to try it?</p>
          <button
            onClick={() => router.push('/')}
            className="py-3 px-8 text-sm rounded-2xl font-semibold cursor-pointer tracking-wide text-white border border-[#27bb4e] bg-[#27bb4e] hover:bg-[#22a845] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            
            Go to Home
          </button>
        </div>

      </div>
    </main>
  )
}

export default about