import React from 'react';
import Link from 'next/link';

export const Button1 = ({ text, href = "/create", className = "" }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold text-sm text-white bg-[#e10098] hover:bg-[#c90087] transition-colors cursor-pointer ${className}`}
    >
      <span>{text}</span>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
};

export const Button2 = ({ text, href = "/about", className = "" }) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold text-sm text-white bg-[#141419] hover:bg-[#1c1c24] border border-[#26262e] hover:border-[#383844] transition-colors cursor-pointer ${className}`}
    >
      <span>{text}</span>
      <svg
        className="w-4 h-4 text-[#38bdf8]"
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
