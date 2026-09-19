import React from 'react';
import Footer from "../components/footer";
import Logo from "../components/logo";
import Link from "next/link";
import { faqs } from '../constants';

export const metadata = {
  title: "Frequently Asked Questions - Bubble Chat",
  description: "Find answers to frequently asked questions about Bubble Chat temporary rooms, privacy, and security.",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/faq",
  },
};

const Page = () => {
 

  return (
    <main className="relative w-full h-screen bg-[#070a12] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-10 w-full mb-12">
        <div className="flex flex-col items-center text-center gap-4">
          <Logo />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mt-2">
            Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Everything you need to know about Bubble Chat, rooms, privacy, and how it works.
          </p>
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

        <div className="text-center pt-4">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200"
          >
            <span>Start a Chat Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Page;
