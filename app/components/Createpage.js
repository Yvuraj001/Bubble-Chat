"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Create = () => {
  const router = useRouter();
  const [isChecked, setisChecked] = useState(true);
  const [name, setname] = useState("");
  const [roomName, setroomName] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const n = e.target.name.value.trim();
    const r = e.target.RoomName.value.trim();
    setname(n);
    setroomName(r);
    if (isChecked) {
      localStorage.setItem("name", n);
      localStorage.setItem("roomName", r);
    }
    router.push(`/chat?room=${r}&name=${n}`);
  };

  const handlenameChange = (e) => setname(e.target.value);
  const handleroomChange = (e) => setroomName(e.target.value);

  const handleOnChange = () => {
    setisChecked(!isChecked);
    if (isChecked) {
      localStorage.setItem("name", name);
      localStorage.setItem("roomName", roomName);
    }
  };

  useEffect(() => {
    const n = localStorage.getItem("name") || "";
    const r = localStorage.getItem("roomName") || "";
    setname(n);
    setroomName(r);
  }, []);

  return (
    <div
      className="relative overflow-hidden min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #022c22 0%, #065f46 50%, #0d9488 100%)",
      }}
    >
      {/* Background  */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-left blob */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.15)",
          }}
        />

        {/* Top-right blob */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(13, 148, 136, 0.12)",
          }}
        />

        {/* Bottom-left blob */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "10%",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(6, 95, 70, 0.2)",
          }}
        />

        {/* Bottom-right blob */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-40px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(52, 211, 153, 0.1)",
          }}
        />

        {/* Center accent */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          }}
        />
      </div>
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.12) 0%, transparent 65%)",
        }}
      />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl w-full items-center">
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(52,211,153,0.25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <h1 className="text-white text-2xl font-bold mb-1 tracking-tight">
              Create or Join Room
            </h1>
            <p className="text-emerald-300/70 text-sm mb-8">
              Start chatting instantly — no sign-up needed
            </p>

            <form className="space-y-5" onSubmit={handlesubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-widest text-emerald-300/90 mb-2"
                >
                  Your Name
                </label>
                <div className="relative flex items-center">
                  <svg
                    className="absolute left-3.5 text-emerald-400/60 pointer-events-none"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. John"
                    required
                    value={name}
                    onChange={handlenameChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid rgba(52,211,153,0.7)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(52,211,153,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid rgba(52,211,153,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="RoomName"
                  className="block text-xs font-semibold uppercase tracking-widest text-emerald-300/90 mb-2"
                >
                  Room Name
                </label>
                <div className="relative flex items-center">
                  <svg
                    className="absolute left-3.5 text-emerald-400/60 pointer-events-none"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <rect x="9" y="3" width="13" height="8" rx="2" />
                  </svg>
                  <input
                    type="text"
                    id="RoomName"
                    name="RoomName"
                    placeholder="Whatever123"
                    required
                    value={roomName}
                    onChange={handleroomChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid rgba(52,211,153,0.7)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(52,211,153,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid rgba(52,211,153,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={name && roomName < 1}
                  checked={isChecked}
                  onChange={handleOnChange}
                  className="w-4 h-4 accent-emerald-400 cursor-pointer"
                />
                <span className="text-sm text-emerald-200/80">
                  Save my name and room for next time
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white tracking-wide transition-all"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  boxShadow: "0 4px 15px rgba(16,185,129,0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 22px rgba(16,185,129,0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(16,185,129,0.35)";
                }}
              >
                Create Now →
              </button>
            </form>
          </div>

          <div className="hidden lg:block">
            <img
              src="./loginimg.png"
              className="w-full object-cover rounded-2xl opacity-90"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
              alt="login img"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Create;
