"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import useSocket from "../hook/socket";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import chkstatus from "../components/chkstatus";
import {
  WarningToast,
  UserJoinedToast,
  UserLeftToast,
} from "../components/showToast";
import Link from "next/link";

const Page = () => {
  const socketRef = useSocket();

  const messageContainerRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [roomName, setroomName] = useState("");
  const [message, setmessage] = useState("");
  const [senderID, setsenderID] = useState("");
  const [Sender, setSender] = useState("");
  const [Count, setCount] = useState(1);

  const [isactive, setisactive] = useState(false);
  const [messages, setmessages] = useState([]);
  const [showError, setshowError] = useState(false);
  const [showMessagesToNewUser, setshowMessagesToNewUser] = useState([]);
  const [isnewUser, setisnewUser] = useState(false);
  const [copied, setCopied] = useState(false);

  const [replyTo, setreplyTo] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    socketRef.current.emit("message", {
      message,
      roomName,
      senderID: senderID,
      sender: Sender,
      type: "sent",
      time: currentTime,
      replyTo: replyTo ? replyTo : null,
    });

    setmessages((prev) => [
      ...prev,
      {
        text: message,
        sender: "You",
        type: "sent",
        time: currentTime,
        replyTo: replyTo ? replyTo : null,
      },
    ]);

    setmessage("");
    setreplyTo(null);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    // getting room name and sender name
    const paramName = decodeURI(searchParams.get("name") || "");
    const paramroomName = decodeURI(searchParams.get("room") || "");

    if (!paramName || !paramroomName || paramName === "null" || paramroomName === "null") {
      router.push("/create");
      return;
    } else {
      setroomName(paramroomName);
      setSender(paramName);
    }

    socket.on("connect", () => {
      socket.emit("username", paramName);
      socket.emit("join-room", paramroomName);
      setisnewUser(true);
      setsenderID(socket.id);
    });

    socket.on(
      "recived-message",
      ({ text, senderID, sender, time, replyTo }) => {
        if (senderID === socket.id) return;
        setisactive(true);

        setmessages((prev) => [
          ...prev,
          {
            text: text,
            sender: sender,
            type: "recived",
            time: time,
            replyTo: replyTo,
          },
        ]);

        if (document.visibilityState === "hidden") {
          document.title = "(1) New Message • Bubble";
        }
      },
    );

    // New user
    socket.on("newuser", (username) => {
      toast(<UserJoinedToast message={`${username} joined the chat`} />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 2500,
      });

      setisactive(true);
    });

    socket.on("user-left", (user) => {
      setisactive(false);
      toast(<UserLeftToast message={`${user} left the chat`} />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 2000,
      });
    });

    socket.on("room-count", ({ count }) => {
      setCount(count);
    });

    return () => {
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  // fetching messages from server
  const fetchMessages = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_MESSAGE_Server_URL) return;
      const sendPost = await fetch(
        `${process.env.NEXT_PUBLIC_MESSAGE_Server_URL}?room=${roomName}`,
      );
      const data = await sendPost.json();

      if (data && data.message) {
        setshowMessagesToNewUser(data.message);
      }
    } catch (e) {
      // ignore fetch message failure on empty or custom server
    }
  };

  const handlePaste = (e) => {
    const clipboard = e.clipboardData;

    if (clipboard.files.length > 0) {
      e.preventDefault();
      toast(<WarningToast message="Only plain text messages are supported" />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 2000,
      });
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/create?room=${encodeURIComponent(roomName)}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // useeffect to show recived messages from Redis
  useEffect(() => {
    if (roomName) fetchMessages();
  }, [roomName]);

  // useEffect to scroll to end
  useEffect(() => {
    const container = messageContainerRef.current;
    if (container && (messages.length > 0 || showMessagesToNewUser.length > 0)) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, showMessagesToNewUser]);

  // useEffect to change title back to normal when user comes back to page
  useEffect(() => {
    const reset = () => {
      if (document.visibilityState === "visible")
        document.title = "Bubble / Chat";
    };
    document.addEventListener("visibilitychange", reset);
    return () => document.removeEventListener("visibilitychange", reset);
  }, []);

  // Alert on reloading page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
    };
  }, []);

  // Getting server response
  useEffect(() => {
    const checkServer = async () => {
      try {
        const isActive = await chkstatus();
        if (!isActive) {
          setshowError(true);
        }
      } catch (err) {
        setshowError(true);
      }
    };

    checkServer();
  }, []);

  useEffect(() => {
    if (!showError) return;
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [showError]);

  return (
    <div className="relative h-full flex flex-col flex-1 bg-[#070a12] text-slate-100 font-sans overflow-hidden">
      {/* Connection error overlay */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
          <div className="glass-panel border-red-500/30 bg-[#160b0e]/95 text-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-4 text-red-400">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Server Offline</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Unable to reach the WebSocket gateway. Redirecting to home...
            </p>
            <div className="w-6 h-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      )}

      {/* Chat Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-[#090d16]/90 backdrop-blur-xl">
        {/* Left: User & Room Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-sm font-bold text-slate-950 uppercase shadow-md shadow-emerald-500/20 shrink-0">
            {Sender?.[0] || "?"}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">
                {Sender || "Anonymous"}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                You
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Room:</span>
              <span className="font-mono font-bold text-emerald-400">{roomName || "..."}</span>
            </div>
          </div>
        </div>

        {/* Right: Room Status, Link Share & Leave */}
        <div className="flex items-center gap-3">
          {/* Active members pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">
              {Count > 1 ? `${Count} active in room` : "Waiting for peer..."}
            </span>
          </div>

          {/* Copy Room Link Helper */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Copy invite link"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy Invite Link</span>
              </>
            )}
          </button>

          {/* Leave Room CTA */}
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Leave</span>
          </Link>
        </div>
      </div>

      {/* Messages Stream Container */}
      <div
        ref={messageContainerRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4 overflow-x-hidden bg-[radial-gradient(#10b98108_1px,transparent_1px)] [background-size:16px_16px]"
      >
        {/* Empty State */}
        {messages.length === 0 && showMessagesToNewUser.length < 1 && (
          <div className="flex flex-col items-center justify-center h-full max-w-sm mx-auto text-center px-4 py-12 select-none">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/5">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01" strokeWidth="3" />
                <path d="M12 10h.01" strokeWidth="3" />
                <path d="M16 10h.01" strokeWidth="3" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-1">Room Created: {roomName}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Share the room code or URL with your friend. Messages will appear here in real time.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Room names are case-sensitive</span>
            </div>
          </div>
        )}

        {/* Previously stored messages (if any) */}
        {showMessagesToNewUser.length > 0 && (
          <div className={`flex flex-col gap-4 mb-6 ${isnewUser ? "" : "hidden"}`}>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 px-2">
                Earlier Messages
              </span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {showMessagesToNewUser.map((msg, i) => {
              const isMe = msg.sender === Sender;
              return (
                <div key={i} className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
                  <span className="text-[11px] font-medium text-slate-400 px-1">
                    {isMe ? "You" : msg.sender || "Anonymous"}
                  </span>

                  {msg.replyTo && (
                    <div className="max-w-[75%] sm:max-w-md bg-white/[0.03] border-l-2 border-emerald-400 px-3 py-1.5 rounded-r-xl text-xs text-slate-400 mb-1">
                      <span className="font-semibold text-emerald-300 block text-[10px]">{msg.replyTo.sender}</span>
                      <span className="truncate block opacity-80">{msg.replyTo.text}</span>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md break-words ${
                      isMe
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-br-xs"
                        : "glass-panel bg-[#111726]/90 text-slate-100 rounded-bl-xs border border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500">
                    <span>{msg.time || "00:00"}</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setreplyTo(msg);
                        inputRef.current?.focus();
                      }}
                      className="text-emerald-400/80 hover:text-emerald-300 font-medium cursor-pointer transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-emerald-500/30" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 px-2">
                Live Conversation
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-emerald-500/30" />
            </div>
          </div>
        )}

        {/* Live Messages List */}
        {messages.map((msg, i) => {
          const isMe = msg.type === "sent";
          return (
            <div key={i} className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
              <span className="text-[11px] font-medium text-slate-400 px-1">
                {isMe ? "You" : msg.sender || "Anonymous"}
              </span>

              {/* Reply Quote Banner */}
              {msg.replyTo && (
                <div className="max-w-[75%] sm:max-w-md bg-white/[0.04] border-l-2 border-emerald-400 px-3 py-1.5 rounded-r-xl text-xs text-slate-400 mb-1 backdrop-blur-sm">
                  <span className="font-semibold text-emerald-300 block text-[10px]">
                    Replying to {msg.replyTo.sender}
                  </span>
                  <span className="truncate block opacity-80">{msg.replyTo.text}</span>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-lg break-words ${
                  isMe
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-br-xs"
                    : "glass-panel bg-[#111726]/90 text-slate-100 rounded-bl-xs border border-white/10"
                }`}
              >
                {msg.text}
              </div>

              {/* Actions & Timestamp */}
              <div className="flex items-center gap-2 px-1 text-[10px] text-slate-500">
                <span>{msg.time || "00:00"}</span>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setreplyTo(msg);
                    inputRef.current?.focus();
                  }}
                  className="text-emerald-400/80 hover:text-emerald-300 font-medium cursor-pointer transition-colors"
                >
                  Reply
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Reply Preview Bar */}
      {replyTo && (
        <div className="relative z-20 mx-4 sm:mx-6 mb-2 p-3 rounded-2xl glass-panel border border-emerald-500/30 bg-[#0d1522]/95 backdrop-blur-xl flex items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            <div className="w-1 h-8 rounded-full bg-emerald-400 shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[11px] font-bold text-emerald-400 block tracking-wide">
                Replying to {replyTo.sender}
              </span>
              <p className="text-xs text-slate-300 truncate">{replyTo.text}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setreplyTo(null)}
            className="w-7 h-7 rounded-xl bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
            title="Cancel reply"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Message Input Form */}
      <div className="relative z-20 p-4 sm:px-6 border-t border-white/[0.08] bg-[#090d16]/95 backdrop-blur-xl">
        <form onSubmit={handlesubmit} className="max-w-7xl mx-auto flex items-center gap-3">
          <input
            type="text"
            style={{ display: "none" }}
            defaultValue={roomName || ""}
            name="room"
          />
          <input
            type="text"
            name="name"
            style={{ display: "none" }}
            defaultValue={Sender || ""}
          />

          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              required={true}
              autoComplete="off"
              ref={inputRef}
              name="message"
              placeholder="Type a message (Enter to send)..."
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              onPaste={handlePaste}
              className="w-full px-5 py-3.5 rounded-2xl text-sm text-white placeholder-slate-500 bg-white/[0.04] border border-white/10 outline-none focus:border-emerald-400/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none cursor-pointer shrink-0"
            aria-label="Send message"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;