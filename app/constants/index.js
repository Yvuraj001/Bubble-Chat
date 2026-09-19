export const features = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    badge: "Frictionless",
    title: "No Account Needed",
    body: "Unlike WhatsApp or Telegram, you don't need a phone number, email, or login credentials. Pick a handle, create a room, and start chatting instantly.",
    bullets: [
      "Zero phone verification",
      "No email registration",
      "Instant disposable identity",
    ],
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    badge: "Ephemeral",
    title: "Real-Time & Temporary",
    body: "Messages are delivered instantly via WebSockets with zero persistent retention. When everyone exits the room, the conversation vanishes permanently.",
    bullets: [
      "Sub-millisecond WebSocket delivery",
      "Zero permanent disk storage",
      "Auto-purged when empty",
    ],
  },
];

export const faqs = [
  {
    q: "Do I need to create an account to use Bubble Chat?",
    a: "No. Bubble Chat requires zero registration. Just choose any display name, create or join a room code, and start chatting immediately. No email, no phone number, and no password required.",
  },
  {
    q: "Are Bubble Chat messages stored anywhere?",
    a: "No messages are stored on our servers permanently. All conversations are temporary — when everyone leaves a room, the messages disappear permanently.",
  },
  {
    q: "How do I invite someone to my chat room?",
    a: "After creating a room, share the room name or unique room code with anyone. They can enter it from any browser to join instantly without downloading an app.",
  },
  {
    q: "Is Bubble Chat free to use?",
    a: "Yes! Bubble Chat is 100% free with no subscription tiers, paywalls, or hidden costs.",
  },
  {
    q: "What makes Bubble Chat different from WhatsApp or Telegram?",
    a: "WhatsApp and Telegram require verified phone numbers and store cloud message history. Bubble Chat is built strictly for instant, anonymous, disposable conversations that leave zero footprint.",
  },
  {
    q: "Can I use Bubble Chat on mobile devices?",
    a: "Yes. Bubble Chat works smoothly on any modern desktop or mobile web browser without requiring an app store download.",
  },
];
export const techStack = [
  {
    name: "Next.js",
    role: "Frontend Framework",
    desc: "React server & client components",
  },
  {
    name: "Socket.io",
    role: "Real-time Engine",
    desc: "Bidirectional WebSocket channels",
  },
  {
    name: "Tailwind CSS",
    role: "Styling Engine",
    desc: "Modern utility-first styling",
  },
  {
    name: "Node.js",
    role: "WebSocket Server",
    desc: "Ephemeral connection pooling",
  },
];

export const steps = [
  {
    step: "01",
    title: "Create a Room",
    desc: "Pick any username and define a room name. You are instantly connected to an isolated socket room.",
  },
  {
    step: "02",
    title: "Share the Room Name",
    desc: "Send your room name or link to friends. They can join from any browser without downloading apps.",
  },
  {
    step: "03",
    title: "Real-Time Chat",
    desc: "Messages stream live with instant delivery and typing indicators. No page refreshing required.",
  },
  {
    step: "04",
    title: "Vanish on Exit",
    desc: "When everyone closes their browser tab, the room memory buffer is automatically destroyed.",
  },
];