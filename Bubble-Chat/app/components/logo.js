import React from "react";

const Logo = () => (
  <div className="flex flex-col items-center justify-center select-none">
    {/* Solid App Icon */}
    <div className="relative w-16 h-16 rounded-2xl bg-[#141419] border border-[#26262e] flex items-center justify-center">
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e10098"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <circle cx="8" cy="12" r="1" fill="#e10098" />
        <circle cx="12" cy="12" r="1" fill="#e10098" />
        <circle cx="16" cy="12" r="1" fill="#e10098" />
      </svg>
    </div>

    {/* Brand typography */}
    <div className="mt-3.5 text-center">
      <div className="flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-heading">
          bubble<span className="text-[#e10098]">.</span>
        </span>
      </div>
      <div className="flex items-center justify-center mt-1">
        <span className="text-[10px] font-mono uppercase font-semibold tracking-widest px-2 py-0.5 rounded bg-[#141419] text-[#38bdf8] border border-[#26262e]">
          Anonymous Ephemeral Chat
        </span>
      </div>
    </div>
  </div>
);

export default Logo;