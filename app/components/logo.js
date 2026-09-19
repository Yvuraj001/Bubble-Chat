import React from "react";

const Logo = () => (
  <div className="flex flex-col items-center justify-center select-none">
    <div className="relative flex items-center justify-center">
      {/* Glow effect behind badge */}
      <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-125 pointer-events-none" />
      
      {/* Modern App Icon */}
      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#0b1322] via-[#0f1d32] to-[#162a47] border border-white/10 p-[1px] shadow-2xl shadow-emerald-500/10 flex items-center justify-center group">
        <div className="w-full h-full rounded-[23px] bg-gradient-to-b from-white/[0.08] to-transparent flex items-center justify-center">
          <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            <path d="M8 12h.01" strokeWidth="3" />
            <path d="M12 12h.01" strokeWidth="3" />
            <path d="M16 12h.01" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>

    {/* Brand typography */}
    <div className="mt-4 text-center">
      <div className="flex items-center justify-center gap-1.5">
        <span className="text-3xl font-extrabold tracking-tight text-white">
          bubble<span className="text-emerald-400 font-black">.</span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-emerald-500/40"></span>
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-400/90">
          Ephemeral Messenger
        </span>
        <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-emerald-500/40"></span>
      </div>
    </div>
  </div>
);

export default Logo;