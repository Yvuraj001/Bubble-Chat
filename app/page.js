"use client"
import { useEffect, useState } from 'react'
import "./globals.css"
import { Button1, Button2 } from './components/Buttons'
import Logo from './components/logo'

const page = () => {

  return (
    <main className='relative w-full min-h-[50vh] bg-linear-to-br from-[#022c22] via-[#065f46] to-[#0d9488] overflow-hidden'>

      {/* overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_60%)] pointer-events-none" />

      <section className='relative z-10 m-auto min-h-[50vh] text-white flex items-center'>
        <div className='flex flex-col mx-auto justify-center items-center gap-8'>

          <div className="logo drop-shadow-lg">
            <Logo />
          </div>

          <p className="text-emerald-200/70 text-lg tracking-widest uppercase">
            Instant rooms. Real-time chat.
          </p>
          <div className='flex gap-4'>
            <div className="actions flex gap-4">
              <button ><Button1 text={"Create/Join Room"} /></button>

            </div>

            <div className="how">
              <button><Button2 text={"How it works?"} /></button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="relative z-10 w-full   lg:px-6 pb-20 mt-10 mx-auto">

        <p className="text-center text-emerald-200/50 text-xs tracking-widest uppercase mb-10">
          Why Bubble?
        </p>

        
        <div className='flex gap-2.5 ml-5  lg:gap-10 w-[90%] md:ml-12 flex-wrap md:flex-nowrap   justify-center'>

          {/* Card 1 */}
          <div className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300 group w-91">
            <div className="w-12 h-12 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center group-hover:bg-[#27bb4e]/30 transition-all">
              <svg width="230" height="230" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">No Account Needed</h3>
              <p className="text-emerald-200/60 text-sm leading-relaxed">
                Unlike WhatsApp or Telegram, you don't need a phone number, email, or account. Just pick a name, create a room and start chatting instantly. Zero sign-up friction.
              </p>
            </div>
            <ul className="flex flex-col gap-2 mt-4">
              {["No phone number", "No email signup", "Instant access"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-emerald-300/70">
                  <svg width="14" height="14" fill="none" stroke="#27bb4e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300 group w-91">
            <div className="w-12 h-12 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center group-hover:bg-[#27bb4e]/30 transition-all">
              <svg width="24" height="24" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Real-Time & Ephemeral</h3>
              <p className="text-emerald-200/60 text-sm leading-relaxed">
                Messages are live and instant — no delays, no servers storing your chats forever. When the room is gone, the conversation is gone. Perfect for quick collabs, events, or private chats.
              </p>
            </div>
            <ul className="flex flex-col gap-2 mt-4">
              {["Live instant messages", "No message history stored", "Room expires when you leave"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-emerald-300/70">
                  <svg width="14" height="14" fill="none" stroke="#27bb4e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white/5 border border-emerald-400/20 backdrop-blur-sm rounded-2xl p-6 flex flex-col gap-4 hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300 group w-91">

            <div className="w-12 h-12 rounded-xl bg-[#27bb4e]/20 border border-[#27bb4e]/30 flex items-center justify-center group-hover:bg-[#27bb4e]/30 transition-all">
              <svg width="24" height="24" fill="none" stroke="#27bb4e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3 3v18h18" />
                <path d="M7 14l3-3 4 4 5-6" />
              </svg>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Why Us?</h3>
              <p className="text-emerald-200/60 text-sm leading-relaxed">
                Traditional apps like WhatsApp and Telegram are built for long-term communication with accounts,
                contacts, and stored chats. This app is built for instant, disposable conversations — faster, lighter,
                and completely anonymous.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-auto text-[10px]">


              <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg border border-emerald-400/20">
                <span className="text-emerald-300 font-medium">Us</span>
                <span className="text-emerald-200/70">No signup • No storage</span>
              </div>


              <div className="flex items-center justify-between bg-white/5 px-2 md:px-3 py-2 rounded-lg border border-white/10">
                <span className="text-white/80">WhatsApp</span>
                <span className="text-white/40">Login • Data sharing </span>
              </div>


              <div className="flex items-center justify-between bg-white/5 px-2  md:px-3 py-2 rounded-lg border border-white/10">
                <span className="text-white/80">Telegram</span>
                <span className="text-white/40">Account • storage</span>
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  )
}

export default page
