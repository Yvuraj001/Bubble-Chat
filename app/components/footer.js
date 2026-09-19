import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#070a12]/90 backdrop-blur-md py-12 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <span className="font-bold text-sm tracking-tight text-white">Bubble Chat</span>
          </div>
          <p className="text-xs text-slate-500 text-center md:text-left mt-1">
            Free anonymous real-time chat rooms — no registration, zero logs, vanishes on leave.
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/create" className="hover:text-emerald-400 transition-colors">
                Create Room
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="text-xs text-slate-600 text-center md:text-right">
          © {new Date().getFullYear()} Bubble Chat. Open source project.
        </div>
      </div>
    </footer>
  );
};

export default Footer;