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
    <main className="relative w-full min-h-screen bg-[#0b0b0e] text-white py-14 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-10 w-full mb-12">
        <div className="flex flex-col items-center text-center gap-4">
          <Logo />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141419] border border-[#26262e] text-[#38bdf8] text-xs font-mono font-semibold uppercase tracking-widest mt-2">
            Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#a1a1aa] max-w-xl leading-relaxed">
            Everything you need to know about Bubble Chat, rooms, privacy, and how it works.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-[#131317] rounded-xl p-5 cursor-pointer border border-[#26262f] hover:border-[#383845] transition-colors"
            >
              <summary className="text-white font-medium text-sm sm:text-base list-none flex justify-between items-center gap-4">
                <span className="font-heading font-medium">{faq.q}</span>
                <div className="w-6 h-6 rounded-md bg-[#181820] border border-[#2a2a38] flex items-center justify-center text-[#e10098] group-open:rotate-45 transition-transform duration-200 shrink-0">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="12" y2="12" />
                  </svg>
                </div>
              </summary>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mt-3 pt-3 border-t border-[#26262f]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold text-sm text-white bg-[#e10098] hover:bg-[#c90087] transition-colors"
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
