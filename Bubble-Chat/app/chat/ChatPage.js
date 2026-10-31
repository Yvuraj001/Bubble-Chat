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
      router.push("/");
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
      const url = `${window.location.origin}/?room=${encodeURIComponent(roomName)}`;
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
    <div className="relative flex h-full flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_#fef3c7,_transparent_30%),radial-gradient(circle_at_bottom_right,_#ddd6fe,_transparent_40%),#f8fafc] font-sans text-[#0f172a]">
      {/* Connection error overlay */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/20 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[#e2e8f0] bg-white p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ede9fe] text-[#4f46e5]">
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
            <h3 className="mb-1 text-lg font-bold text-[#0f172a] font-heading">Server Offline</h3>
            <p className="mb-4 text-xs leading-relaxed text-[#64748b]">
              Unable to reach the WebSocket gateway. Redirecting to home...
            </p>
            <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-[#4f46e5] border-t-transparent" />
          </div>
        </div>
      )}

      {/* Chat Header Bar */}
      <div className="relative z-20 border-b border-[#e2e8f0] bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
        {/* Left: User & Room Info */}
          <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ede9fe] text-sm font-bold uppercase text-[#4338ca] font-heading">
            {Sender?.[0] || "?"}
          </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold tracking-tight text-[#0f172a] font-heading">
                {roomName || "Room"}
              </div>
              <div className="text-xs text-[#64748b]">
                Signed in as {Sender || "Anonymous"}
              </div>
            </div>
          </div>

        {/* Right: Room Status, Link Share & Leave */}
        <div className="flex items-center gap-2">
          {/* Active members pill */}
          <div className="hidden items-center gap-2 text-xs text-[#64748b] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]"></span>
            <span>
              {Count > 1 ? `${Count} active in room` : "Waiting for peer..."}
            </span>
          </div>

          {/* Copy Room Link Helper */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="hidden items-center gap-1.5 rounded-sm border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-medium text-[#475569] transition-colors hover:border-[#ddd6fe] hover:bg-[#f5f3ff] hover:text-[#4338ca] md:inline-flex"
            title="Copy invite link"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[#4f46e5]">Copied</span>
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
            href="/"
            className="inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-semibold text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a]"
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
      </div>

      {/* Messages Stream Container */}
      <div
        ref={messageContainerRef}
        className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 sm:px-6"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
        {/* Empty State */}
        {messages.length === 0 && showMessagesToNewUser.length < 1 && (
          <div className="mx-auto flex h-full max-w-sm select-none flex-col items-center justify-center px-4 py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ede9fe] text-[#4f46e5]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 10h.01" strokeWidth="3" />
                <path d="M12 10h.01" strokeWidth="3" />
                <path d="M16 10h.01" strokeWidth="3" />
              </svg>
            </div>
            <h3 className="mb-1 text-base font-bold text-[#0f172a] font-heading">{roomName || "Your room"} is ready</h3>
            <p className="mb-4 text-xs leading-relaxed text-[#64748b]">
              Share the room code or URL with your friend. Messages will appear here in real time.
            </p>
            <button type="button" onClick={handleCopyLink} className="border-b border-[#f59e0b] text-xs font-semibold text-[#4f46e5] transition-colors hover:text-[#4338ca]">
              Copy invite link
            </button>
          </div>
        )}

        {/* Previously stored messages (if any) */}
        {showMessagesToNewUser.length > 0 && (
            <div className={`mb-6 flex flex-col gap-4 ${isnewUser ? "" : "hidden"}`}>
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e2e8f0]" />
              <span className="px-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#94a3b8]">
                Earlier Messages
              </span>
              <div className="h-px flex-1 bg-[#e2e8f0]" />
            </div>

            {showMessagesToNewUser.map((msg, i) => {
              const isMe = msg.sender === Sender;
              return (
                <div key={i} className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
                  <span className="px-1 text-[11px] font-mono font-medium text-[#64748b]">
                    {isMe ? "You" : msg.sender || "Anonymous"}
                  </span>

                  {msg.replyTo && (
                    <div className="mb-1 max-w-[75%] rounded-r-lg border-l-2 border-[#c4b5fd] bg-[#f5f3ff] px-3 py-1.5 text-xs text-[#64748b] sm:max-w-md">
                      <span className="block text-[10px] font-mono font-semibold text-[#4f46e5]">{msg.replyTo.sender}</span>
                      <span className="truncate block opacity-80">{msg.replyTo.text}</span>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-xl text-sm leading-relaxed break-words ${
                      isMe
                        ? "bg-[#4f46e5] text-white font-medium"
                        : "border border-[#e2e8f0] bg-white text-[#0f172a]"
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2 px-1 text-[10px] font-mono text-[#94a3b8]">
                    <span>{msg.time || "00:00"}</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setreplyTo(msg);
                        inputRef.current?.focus();
                      }}
                      className="font-medium text-[#4f46e5] transition-colors hover:text-[#4338ca]"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e2e8f0]" />
              <span className="px-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#4f46e5]">
                Live Conversation
              </span>
              <div className="h-px flex-1 bg-[#e2e8f0]" />
            </div>
          </div>
        )}

        {/* Live Messages List */}
        {messages.map((msg, i) => {
          const isMe = msg.type === "sent";
          return (
                <div key={i} className={`flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
              <span className="px-1 text-[11px] font-mono font-medium text-[#64748b]">
                {isMe ? "You" : msg.sender || "Anonymous"}
              </span>

              {/* Reply Quote Banner */}
              {msg.replyTo && (
                <div className="mb-1 max-w-[75%] rounded-r-lg border-l-2 border-[#c4b5fd] bg-[#f5f3ff] px-3 py-1.5 text-xs text-[#64748b] sm:max-w-md">
                  <span className="block text-[10px] font-mono font-semibold text-[#4f46e5]">
                    Replying to {msg.replyTo.sender}
                  </span>
                  <span className="truncate block opacity-80">{msg.replyTo.text}</span>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-xl text-sm leading-relaxed break-words ${
                  isMe
                    ? "bg-[#4f46e5] text-white font-medium"
                    : "border border-[#e2e8f0] bg-white text-[#0f172a]"
                }`}
              >
                {msg.text}
              </div>

              {/* Actions & Timestamp */}
              <div className="flex items-center gap-2 px-1 text-[10px] font-mono text-[#94a3b8]">
                <span>{msg.time || "00:00"}</span>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setreplyTo(msg);
                    inputRef.current?.focus();
                  }}
                  className="font-medium text-[#4f46e5] transition-colors hover:text-[#4338ca]"
                >
                  Reply
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Floating Reply Preview Bar */}
      {replyTo && (
        <div className="relative z-20 mx-auto mb-2 flex w-[calc(100%-2rem)] max-w-3xl items-center justify-between gap-3 rounded-xl border border-[#ddd6fe] bg-[#f5f3ff] p-3 sm:w-[calc(100%-3rem)]">
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            <div className="h-7 w-1 shrink-0 rounded-full bg-[#a78bfa]" />
            <div className="overflow-hidden">
              <span className="block text-[11px] font-mono font-bold tracking-wide text-[#4f46e5]">
                Replying to {replyTo.sender}
              </span>
              <p className="truncate text-xs text-[#64748b]">{replyTo.text}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setreplyTo(null)}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-[#64748b] transition-colors hover:bg-white hover:text-[#0f172a]"
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
      <div className="relative z-20 border-t border-[#e2e8f0] bg-white p-3.5 sm:px-6">
        <form onSubmit={handlesubmit} className="mx-auto flex max-w-3xl items-center gap-3">
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
              className="w-full rounded-sm border border-[#cbd5e1] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#4f46e5]"
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-[#4f46e5] font-mono font-bold text-white transition-colors hover:bg-[#4338ca] disabled:pointer-events-none disabled:opacity-40"
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
