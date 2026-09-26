import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-[#26262e] bg-[#0e0e12] py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#141419] border border-[#26262e] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white font-heading">Bubble Chat</span>
          </div>
          <p className="text-xs text-[#71717a] text-center md:text-left mt-0.5">
            Free anonymous real-time chat rooms — zero registration, zero disk logs, vanishes on leave.
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6 text-xs font-mono text-[#a1a1aa]">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/create" className="hover:text-white transition-colors">
                Create Room
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="text-xs font-mono text-[#71717a] text-center md:text-right">
          © {new Date().getFullYear()} Bubble Chat. Open source.
        </div>
      </div>
    </footer>
  );
};

export default Footer;