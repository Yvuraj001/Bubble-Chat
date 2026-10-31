"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname?.startsWith("/chat")) return null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e2e8f0] bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Removed 'Ephemeral' badge */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-white border border-[#e2e8f0] group-hover:border-[#0284c7] transition-colors">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="#0284c7" />
              <circle cx="12" cy="10" r="1" fill="#0284c7" />
              <circle cx="15" cy="10" r="1" fill="#0284c7" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-tight text-[#0f172a] font-heading">
            bubble<span className="text-[#0284c7]">.</span>
          </span>
        </Link>

        {/* Right CTA / GitHub button */}
        <div className="flex items-center gap-2.5">
          <Link
            href="https://github.com/Yvuraj001/Bubble-Chat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="rounded-sm border border-[#e2e8f0] bg-white p-2 text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
            </svg>
          </Link>

          <Link
            href="/#start"
            className="inline-flex items-center gap-2 rounded-sm bg-[#4f46e5] px-4 py-2 text-xs font-mono font-semibold text-white transition-colors hover:bg-[#4338ca]"
          >
            <span>Start chatting</span>
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
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
