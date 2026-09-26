"use client";

import React from 'react';
import Logo from './logo';
import { useRouter } from 'next/navigation';
import { techStack, steps } from '../constants';

const About = () => {
  const router = useRouter();

  return (
    <main className="relative w-full bg-[#0b0b0e] text-white py-14 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <Logo />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141419] border border-[#26262e] text-[#38bdf8] text-xs font-mono font-semibold uppercase tracking-widest mt-2">
            Open Source Ephemeral Messaging
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-2xl leading-tight font-heading">
            Chat freely without the <span className="text-[#e10098]">digital baggage</span>
          </h1>
          <p className="text-sm sm:text-base text-[#a1a1aa] max-w-2xl leading-relaxed">
            Bubble is built for conversations that matter in the moment. No phone numbers, no tracking cookies, and no database archives.
          </p>
        </div>

        {/* What is Bubble Card */}
        <div className="bg-[#131317] rounded-2xl p-6 sm:p-10 border border-[#26262f]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#181820] border border-[#2a2a38] flex items-center justify-center text-[#e10098]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white font-heading">What is Bubble?</h2>
          </div>
          <p className="text-sm text-[#a1a1aa] leading-relaxed">
            Bubble is a lightweight, high-performance messaging app engineered with Next.js and Socket.io. It provides zero-friction communication portals where privacy is guaranteed by architecture: data exists only in active memory streams, never on persistent disk.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Storage", val: "Zero Disk Logs" },
              { label: "Account", val: "Not Required" },
              { label: "Protocol", val: "WebSockets" },
              { label: "Lifecycle", val: "Ephemeral" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#181820] border border-[#26262f] rounded-xl p-3.5 text-center">
                <span className="text-[10px] font-mono uppercase font-bold text-[#38bdf8] tracking-wider block mb-1">
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-semibold text-white">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Steps */}
        <div>
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#e10098] px-2.5 py-1 rounded bg-[#141419] border border-[#26262e]">
              Workflow
            </span>
            <h2 className="text-2xl font-bold text-white mt-3 font-heading">How it operates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((item) => (
              <div key={item.step} className="bg-[#131317] rounded-2xl p-6 border border-[#26262f] flex gap-4 items-start hover:border-[#383845] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#181820] border border-[#2a2a38] text-[#38bdf8] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1 font-heading">{item.title}</h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-[#131317] rounded-2xl p-6 sm:p-8 border border-[#26262f]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-heading">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
            <span>Technology Stack</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-[#181820] border border-[#26262f] rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-sm font-bold text-white font-heading">{tech.name}</span>
                  <span className="text-[11px] font-mono text-[#e10098] block font-medium mt-0.5">{tech.role}</span>
                </div>
                <p className="text-[11px] text-[#71717a] mt-2">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-2 pb-6">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold text-sm text-white bg-[#e10098] hover:bg-[#c90087] transition-colors cursor-pointer"
          >
            <span>Back to Home</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default About;