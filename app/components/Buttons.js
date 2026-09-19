import React from 'react';
import Link from 'next/link';

export const Button1 = ({ text }) => {
  return (
    <Link
      href="/create"
      className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 shadow-[0_0_25px_-5px_rgba(52,211,153,0.5)] hover:shadow-[0_0_35px_0_rgba(52,211,153,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        <span>{text}</span>
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
      {/* Light sheen effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </Link>
  );
};

export const Button2 = ({ text }) => {
  return (
    <Link
      href="/about"
      className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm text-white/90 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]"
    >
      <span>{text}</span>
      <svg
        className="w-4 h-4 text-emerald-400 transition-transform duration-300 group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};
