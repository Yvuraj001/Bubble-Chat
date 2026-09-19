"use client";

import React from 'react';
import Logo from './logo';
import { useRouter } from 'next/navigation';
import { techStack, steps } from '../constants';
const About = () => {
  const router = useRouter();



  return (
    <main className="relative w-full bg-[#070a12] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <Logo />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mt-2">
            Open Source Ephemeral Messaging
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl leading-tight">
            Chat freely without the <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">digital baggage</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Bubble is built for conversations that matter in the moment. No phone numbers, no tracking cookies, and no database archives.
          </p>
        </div>

        {/* What is Bubble Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">What is Bubble?</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Bubble is a lightweight, high-performance messaging app engineered with Next.js and Socket.io. It provides zero-friction communication portals where privacy is guaranteed by architecture: data exists only in active memory streams, never on persistent disk.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "Storage", val: "Zero Disk Logs" },
              { label: "Account", val: "Not Required" },
              { label: "Protocol", val: "WebSockets" },
              { label: "Lifecycle", val: "Ephemeral" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-3.5 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                  {stat.label}
                </span>
                <span className="text-xs font-semibold text-white">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Steps */}
        <div>
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Workflow</span>
            <h2 className="text-2xl font-bold text-white mt-1">How it operates</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((item) => (
              <div key={item.step} className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>Technology Stack</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-sm font-bold text-white">{tech.name}</span>
                  <span className="text-[11px] text-emerald-400 block font-medium mt-0.5">{tech.role}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 pb-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 cursor-pointer"
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