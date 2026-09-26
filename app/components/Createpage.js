"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const Create = () => {
  const router = useRouter();
  const [isChecked, setisChecked] = useState(true);
  const [name, setname] = useState("");
  const [roomName, setroomName] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const n = e.target.name.value.trim();
    const r = e.target.RoomName.value.trim();
    if (!n || !r) return;
    setname(n);
    setroomName(r);
    if (isChecked) {
      localStorage.setItem("name", n);
      localStorage.setItem("roomName", r);
    }
    router.push(`/chat?room=${encodeURIComponent(r)}&name=${encodeURIComponent(n)}`);
  };

  const handlenameChange = (e) => setname(e.target.value);
  const handleroomChange = (e) => setroomName(e.target.value);

  const handleOnChange = () => {
    const nextChecked = !isChecked;
    setisChecked(nextChecked);
    if (nextChecked) {
      localStorage.setItem("name", name);
      localStorage.setItem("roomName", roomName);
    }
  };

  const generateRandomRoom = () => {
    const adjectives = ["quick", "cozy", "silent", "secret", "neon", "amber", "hidden", "cosmic"];
    const nouns = ["room", "bubble", "oasis", "haven", "fox", "signal", "node", "whisper"];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const generated = `${randomAdjective}-${randomNoun}-${randomNum}`;
    setroomName(generated);
  };

  useEffect(() => {
    const n = localStorage.getItem("name") || "";
    const r = localStorage.getItem("roomName") || "";
    setname(n);
    setroomName(r);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-[#0b0b0e]">
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Creation Card */}
        <div className="lg:col-span-7 bg-[#131317] rounded-2xl p-6 sm:p-10 border border-[#26262f] shadow-xl relative overflow-hidden">
          {/* Top highlight strip in solid accent color */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#e10098]" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#181820] border border-[#2a2a38] flex items-center justify-center text-[#e10098]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight font-heading">Create or Join Room</h1>
              <p className="text-xs font-mono text-[#71717a]">Instant temporary connection • Zero setup</p>
            </div>
          </div>

          <form onSubmit={handlesubmit} className="space-y-5">
            {/* Display Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2"
              >
                Your Display Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-[#71717a] pointer-events-none">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Alex"
                  required
                  value={name}
                  onChange={handlenameChange}
                  className="w-full pl-11 pr-4 py-3 rounded-lg text-sm text-white placeholder-[#71717a] bg-[#181820] border border-[#26262f] outline-none focus:border-[#e10098] transition-colors"
                />
              </div>
            </div>

            {/* Room Name Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="RoomName"
                  className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#a1a1aa]"
                >
                  Room Name or Code
                </label>
                <button
                  type="button"
                  onClick={generateRandomRoom}
                  className="text-[11px] font-mono font-medium text-[#38bdf8] hover:text-[#0ea5e9] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>Generate Random</span>
                </button>
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-[#71717a] pointer-events-none">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="RoomName"
                  name="RoomName"
                  placeholder="e.g. secret-coffee-123"
                  required
                  value={roomName}
                  onChange={handleroomChange}
                  className="w-full pl-11 pr-4 py-3 rounded-lg text-sm text-white placeholder-[#71717a] bg-[#181820] border border-[#26262f] outline-none focus:border-[#e10098] transition-colors"
                />
              </div>
              <p className="text-[11px] font-mono text-[#71717a] mt-1.5 flex items-center gap-1">
                <span>Tip: Share this exact name with anyone you want in the room.</span>
              </p>
            </div>

            {/* Remember info checkbox */}
            <label className="flex items-center gap-3 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleOnChange}
                className="w-4 h-4 rounded accent-[#e10098] cursor-pointer bg-[#181820] border-[#26262f]"
              />
              <span className="text-xs text-[#a1a1aa]">
                Remember my details locally on this device
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-3 py-3 px-6 rounded-lg font-mono font-semibold text-sm text-white bg-[#e10098] hover:bg-[#c90087] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Chat Room</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        {/* Right Side: Information & Visual Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Quick instructions card */}
          <div className="bg-[#131317] rounded-2xl p-6 sm:p-7 border border-[#26262f]">
            <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2 font-heading">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
              <span>How Joining Works</span>
            </h2>
            <div className="space-y-3 text-xs text-[#a1a1aa] leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#181820] border border-[#26262f] text-[#38bdf8] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                  1
                </div>
                <p>Type any room name of your choice.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#181820] border border-[#26262f] text-[#38bdf8] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                  2
                </div>
                <p>Send that room name or URL to your contact.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-[#181820] border border-[#26262f] text-[#38bdf8] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                  3
                </div>
                <p>Chat simultaneously. Close the tab to destroy history.</p>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Card */}
          <div className="bg-[#131317] rounded-2xl p-6 border border-[#26262f]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#181820] border border-[#26262f] text-[#e10098] flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-white font-heading">Privacy Guarantee</h3>
            </div>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              No server-side databases log your conversation. Once all users disconnect, memory buffers are immediately purged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
