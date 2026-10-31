"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const sharedRoom = new URLSearchParams(window.location.search).get("room");
    if (sharedRoom) setRoom(sharedRoom);
  }, []);

  const enterRoom = (name, roomName) => {
    localStorage.setItem("name", name);
    localStorage.setItem("roomName", roomName);
    router.push(`/chat?room=${encodeURIComponent(roomName)}&name=${encodeURIComponent(name)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = handle.trim() || `anon-${Math.floor(100 + Math.random() * 900)}`;
    const roomName = room.trim() || `room-${Math.floor(1000 + Math.random() * 9000)}`;
    enterRoom(name, roomName);
  };

  const startInstantRoom = () => {
    const name = `guest-${Math.floor(100 + Math.random() * 900)}`;
    const adjectives = ["swift", "hyper", "cipher", "flux", "void", "nova"];
    const nouns = ["chamber", "portal", "channel", "lounge", "spot"];
    const roomName = `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}-${Math.floor(100 + Math.random() * 900)}`;
    enterRoom(name, roomName);
  };

  return (
    <section id="start" className="relative flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_#fef3c7,_transparent_34%),radial-gradient(circle_at_bottom_right,_#ddd6fe,_transparent_35%),#f8fafc] px-5 py-16 text-center text-[#0f172a]">
      <div className="w-full max-w-2xl">
        <p className="mb-6 text-xs font-mono uppercase tracking-[0.2em] text-[#7c3aed]">
          Private by default
        </p>

        <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-[#0f172a] sm:text-6xl">
          Talk freely.<br className="hidden sm:block" /> <span className="text-[#4f46e5]">Leave no trace.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#64748b] sm:text-base">
          Start a temporary chat room in seconds. No account, no chat history.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-9 flex w-full max-w-xl flex-col gap-2 border border-[#c7d2fe] bg-white/80 p-2 shadow-[8px_8px_0_#ddd6fe] sm:flex-row">
          <label className="sr-only" htmlFor="display-name">Your name</label>
          <input
            id="display-name"
            type="text"
            placeholder="Your name"
            value={handle}
            onChange={(event) => setHandle(event.target.value)}
            className="min-w-0 flex-1 border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#4f46e5]"
          />
          <label className="sr-only" htmlFor="room-name">Room name</label>
          <input
            id="room-name"
            type="text"
            placeholder="Room name"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            className="min-w-0 flex-1 border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#4f46e5]"
          />
          <button
            type="submit"
            className="shrink-0 bg-[#4f46e5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4338ca]"
          >
            Join room <span aria-hidden="true">→</span>
          </button>
        </form>

        <button
          type="button"
          onClick={startInstantRoom}
          className="mt-5 border-b border-[#f59e0b] text-sm text-[#64748b] transition-colors hover:text-[#0f172a]"
        >
          or start a random room
        </button>
      </div>
    </section>
  );
}
