import React from 'react'
import Link from 'next/link'


const footer = () => {
  return (
    <footer className="relative z-10 border-t border-emerald-400/10 py-10 px-6 text-center">
      <nav aria-label="Footer navigation">
        <ul className="flex flex-wrap justify-center gap-6 text-xs text-emerald-200/40 mb-6">
          <li>
            <Link href="/" className="hover:text-emerald-200/70 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-emerald-200/70 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-emerald-200/70 transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-emerald-200/70 transition-colors">
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
      <p className="text-emerald-200/20 text-xs">
        © {new Date().getFullYear()} Bubble Chat. Free anonymous real-time chat
        rooms — no sign-up required.
      </p>
    </footer>
  );
}

export default footer