"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
    <div className="relative h-full flex flex-col flex-1 bg-[#0b0b0e] text-white font-sans overflow-hidden">
      {/* Connection error overlay */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4">
          <div className="border border-[#e10098]/40 bg-[#141419] text-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-[#1f1620] border border-[#e10098]/40 flex items-center justify-center mx-auto mb-4 text-[#e10098]">
              <svg
                width="24"
                height="24"
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
            <h3 className="text-lg font-bold text-white mb-1 font-heading">Server Offline</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
              Unable to reach the WebSocket gateway. Redirecting to home...
            </p>
            <div className="w-5 h-5 border-2 border-[#e10098] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      )}

      {/* Chat Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#26262e] bg-[#0e0e12]">
        {/* Left: User & Room Info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#e10098] flex items-center justify-center text-sm font-bold text-white uppercase shrink-0 font-heading">
            {Sender?.[0] || "?"}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight font-heading">
                {Sender || "Anonymous"}
              </span>
              <span className="text-[10px] font-mono uppercase font-semibold px-1.5 py-0.2 rounded bg-[#181820] text-[#38bdf8] border border-[#26262f]">
                You
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
              <span>Room:</span>
              <span className="font-mono font-semibold text-white">{roomName || "..."}</span>
            </div>
          </div>
        </div>

        {/* Right: Room Status, Link Share & Leave */}
        <div className="flex items-center gap-2.5">
          {/* Active members pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141419] border border-[#26262e] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]"></span>
            <span className="text-[#a1a1aa] font-medium">
              {Count > 1 ? `${Count} active in room` : "Waiting for peer..."}
            </span>
          </div>

          {/* Copy Room Link Helper */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141419] hover:bg-[#1c1c24] border border-[#26262e] text-xs font-mono font-medium text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            title="Copy invite link"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[#38bdf8]">Link Copied!</span>
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181820] hover:bg-[#20202a] border border-[#26262f] text-[#a1a1aa] hover:text-white text-xs font-mono font-semibold transition-colors cursor-pointer"
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
        className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4 overflow-x-hidden bg-[#0b0b0e]"
      >
        {/* Empty State */}
        {messages.length === 0 && showMessagesToNewUser.length < 1 && (
          <div className="flex flex-col items-center justify-center h-full max-w-sm mx-auto text-center px-4 py-12 select-none">
            <div className="w-14 h-14 rounded-2xl bg-[#141419] border border-[#26262e] text-[#e10098] flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01" strokeWidth="3" />
                <path d="M12 10h.01" strokeWidth="3" />
                <path d="M16 10h.01" strokeWidth="3" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white mb-1 font-heading">Room Created: {roomName}</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
              Share the room code or URL with your friend. Messages will appear here in real time.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141419] border border-[#26262e] text-[11px] text-[#71717a] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span>
              <span>Room names are case-sensitive</span>
            </div>
          </div>
        )}

        {/* Previously stored messages (if any) */}
        {showMessagesToNewUser.length > 0 && (
          <div className={`flex flex-col gap-4 mb-6 ${isnewUser ? "" : "hidden"}`}>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#26262e]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#71717a] px-2">
                Earlier Messages
              </span>
              <div className="flex-1 h-px bg-[#26262e]" />
            </div>

            {showMessagesToNewUser.map((msg, i) => {
              const isMe = msg.sender === Sender;
              return (
                <div key={i} className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
                  <span className="text-[11px] font-mono font-medium text-[#71717a] px-1">
                    {isMe ? "You" : msg.sender || "Anonymous"}
                  </span>

                  {msg.replyTo && (
                    <div className="max-w-[75%] sm:max-w-md bg-[#141419] border-l-2 border-[#38bdf8] px-3 py-1.5 rounded-r-lg text-xs text-[#a1a1aa] mb-1">
                      <span className="font-mono font-semibold text-[#38bdf8] block text-[10px]">{msg.replyTo.sender}</span>
                      <span className="truncate block opacity-80">{msg.replyTo.text}</span>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-xl text-sm leading-relaxed break-words ${
                      isMe
                        ? "bg-[#e10098] text-white font-medium"
                        : "bg-[#181820] text-white border border-[#26262f]"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2 px-1 text-[10px] font-mono text-[#71717a]">
                    <span>{msg.time || "00:00"}</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setreplyTo(msg);
                        inputRef.current?.focus();
                      }}
                      className="text-[#38bdf8] hover:text-[#0ea5e9] font-medium cursor-pointer transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#26262e]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#38bdf8] px-2">
                Live Conversation
              </span>
              <div className="flex-1 h-px bg-[#26262e]" />
            </div>
          </div>
        )}

        {/* Live Messages List */}
        {messages.map((msg, i) => {
          const isMe = msg.type === "sent";
          return (
            <div key={i} className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
              <span className="text-[11px] font-mono font-medium text-[#71717a] px-1">
                {isMe ? "You" : msg.sender || "Anonymous"}
              </span>

              {/* Reply Quote Banner */}
              {msg.replyTo && (
                <div className="max-w-[75%] sm:max-w-md bg-[#141419] border-l-2 border-[#38bdf8] px-3 py-1.5 rounded-r-lg text-xs text-[#a1a1aa] mb-1">
                  <span className="font-mono font-semibold text-[#38bdf8] block text-[10px]">
                    Replying to {msg.replyTo.sender}
                  </span>
                  <span className="truncate block opacity-80">{msg.replyTo.text}</span>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-xl text-sm leading-relaxed break-words ${
                  isMe
                    ? "bg-[#e10098] text-white font-medium"
                    : "bg-[#181820] text-white border border-[#26262f]"
                }`}
              >
                {msg.text}
              </div>

              {/* Actions & Timestamp */}
              <div className="flex items-center gap-2 px-1 text-[10px] font-mono text-[#71717a]">
                <span>{msg.time || "00:00"}</span>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setreplyTo(msg);
                    inputRef.current?.focus();
                  }}
                  className="text-[#38bdf8] hover:text-[#0ea5e9] font-medium cursor-pointer transition-colors"
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
        <div className="relative z-20 mx-4 sm:mx-6 mb-2 p-3 rounded-xl border border-[#26262e] bg-[#141419] flex items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            <div className="w-1 h-7 rounded-full bg-[#38bdf8] shrink-0" />
            <div className="overflow-hidden">
              <span className="text-[11px] font-mono font-bold text-[#38bdf8] block tracking-wide">
                Replying to {replyTo.sender}
              </span>
              <p className="text-xs text-[#a1a1aa] truncate">{replyTo.text}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setreplyTo(null)}
            className="w-6 h-6 rounded-md bg-[#202028] hover:bg-[#2a2a35] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors shrink-0 cursor-pointer"
            title="Cancel reply"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Message Input Form */}
      <div className="relative z-20 p-3.5 sm:px-6 border-t border-[#26262e] bg-[#0e0e12]">
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
              className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#71717a] bg-[#16161c] border border-[#26262f] outline-none focus:border-[#e10098] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="w-11 h-11 rounded-lg bg-[#e10098] hover:bg-[#c90087] text-white font-bold flex items-center justify-center transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer shrink-0 font-mono"
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
