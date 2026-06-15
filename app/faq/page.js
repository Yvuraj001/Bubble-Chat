import Footer from "../components/footer";

const page = () => {
  const faqs = [
    {
      q: "Do I need to create an account to use Bubble Chat?",
      a: "No. Bubble Chat requires zero registration. Just pick a display name, create or join a room, and start chatting immediately. No email, no phone number, no password.",
    },
    {
      q: "Are Bubble Chat messages stored anywhere?",
      a: "No messages aren't  stored on our servers permenently but temperory but deleted as soon as every lefts the chat. All conversations are temporary — when everyone leaves a room, the messages disappear permanently.",
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
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="relative  w-full max-w-3xl mx-auto px-6 mt-11"
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
      <Footer />
    </section>
  );
};

export default page;

export const metadata = {
  title: "Faq / Bubble",
  description: "Faqs: Common questions that came to your minds will be cleared on this page.",
  alternates: {
    canonical: "https://bubblechat.com/faq",
  },
};
