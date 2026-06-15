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

  const [replyTo, setreplyTo] = useState(null);

  const handlesubmit = (e) => {
    e.preventDefault();

    socketRef.current.emit("message", {
      message,
      roomName,
      senderID: senderID,
      sender: Sender,
      type: "sent",
      time: new Date().getHours() + ":" + new Date().getMinutes(),
      replyTo: replyTo ? replyTo : null,
    });

    setmessages((prev) => [
      ...prev,
      {
        text: message,
        sender: "You",
        type: "sent",
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        replyTo: replyTo ? replyTo : null,
      },
    ]);

    setmessage("");
    setreplyTo(null);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const socket = socketRef.current;

    // getting room name and sender name
    const paramName = decodeURI(searchParams.get("name"));
    const paramroomName = decodeURI(searchParams.get("room"));

    if (!paramName || !paramroomName) {
      router.push("/create");
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
          document.title = "(1) New Message";
        }
      },
    );
    // New user
    socket.on("newuser", (username) => {
      toast(<UserJoinedToast message={`${username} joined the chat.`} />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 2100,
      });

      setisactive(true);
    });

    socket.on("user-left", (user) => {
      setisactive(false);
      toast(<UserLeftToast message={`${user} left the chat.`} />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 1600,
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
    const sendPost = await fetch(
      `${process.env.NEXT_PUBLIC_MESSAGE_Server_URL}?room=${roomName}`,
    );
    const data = await sendPost.json();

    if (data) {
      setshowMessagesToNewUser(data.message);
    }
  };

  const handlePaste = (e) => {
    const clipboard = e.clipboardData;

    if (clipboard.files.length > 0) {
      e.preventDefault();
      toast(<WarningToast message="Only plain text is allowed" />, {
        closeButton: false,
        className: "!bg-transparent !shadow-none !p-0",
        autoClose: 2000,
      });
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

  // Gettign server response

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
console.log(showMessagesToNewUser , replyTo)
  return (
    <div className="relative  h-full overflow-hidden">
      <div className="relative flex flex-col h-full  bg-linear-to-br  from-[#03341f] via-[#1b6137] to-[#0d3d1ff0] text-white font-sans overflow-hidden">
        {/* error overlay */}
        {showError && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white text-gray-800 rounded-2xl p-8 w-85 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <circle cx="12" cy="16" r="0.8" fill="#dc2626" />
                </svg>
              </div>

              <p className="text-base font-semibold text-gray-900 mb-1">
                Connection Failed
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Failed to connect to server.Check you internet :(
              </p>
            </div>
          </div>
        )}

        {/* overlay */}
        <div className="absolute inset-0   pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3  md:px-6 p-2.5 border-b border-white/10 bg-white/5 backdrop-blur-3xl">
          <div className="w-9 h-9 rounded-full bg-[#27bb4e] flex items-center justify-center text-[10px] md:text-sm font-bold uppercase shadow-lg">
            {Sender?.[0] || "?"}
          </div>
          <div>
            <p className="text-[10px] md:text-sm font-semibold text-white">
              {Sender || "Anonymous"}
            </p>
            <p className="text-[10px] md:text-xs text-emerald-300/60 tracking-widest ">
              Inside -{" "}
              <strong className="uppercase">{roomName || "..."}</strong>
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            <span
              style={{ display: Count > 1 ? "block" : "none" }}
              className="text-xs text-emerald-300/60"
            >
              {Count} people are active{" "}
            </span>
            <span
              style={{ display: Count < 2 ? "block" : "none" }}
              className="text-xs text-emerald-300/60  "
            >
              Only you are here!
            </span>
          </div>
        </div>

        {/* Messages Area */}

        <div
          ref={messageContainerRef}
          className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-3 scrollbar-thin scrollbar-thumb-white/10 overflow-x-hidden bg-[url('/pattern.svg')] bg-repeat   "
        >
          {messages.length === 0 && showMessagesToNewUser.length < 1 && (
            <div className="flex flex-col items-center justify-center h-full gap-2 opacity-70  ">
              <svg
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <p className="text-sm opacity-[0.9]">
                No messages yet. Say something!
              </p>
              <p
                className="text-sm opacity-[0.9]"
                style={{ display: isactive.length < 0 ? "none" : "block" }}
              >
                Waiting for messages.
              </p>
              <p className="text-sm opacity-[0.7] font-mono">
               Remember: room name are CASE-SENSITIVE
              </p>
            </div>
          )}

          {/* showing message to new user */}

          {showMessagesToNewUser.length > 0 && (
            <div
              className={`flex flex-col gap-3 mt-6 ${isnewUser ? "" : "hidden"}`}
            >
              <h2 className="text-sm text-emerald-300/60 uppercase tracking-widest">
                Previously
              </h2>
              {showMessagesToNewUser.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${
                    msg.sender === Sender ? "items-end" : "items-start"
                  }`}
                >
                  {/*  shwoing reply above the message*/}

                  {msg.replyTo && (
                    <div>
                      <div className="border-l-4 border-green-500 pl-2 mb-2 text-xs">
                        <div className="font-semibold">
                          {msg.replyTo.sender}
                        </div>
                        <div className="opacity-70">{msg.replyTo.text}</div>
                      </div>
                    </div>
                  )}
                  <span className="text-[11px] text-emerald-300/80 px-1">
                    {msg.sender === Sender
                      ? "You"
                      : msg.sender || "not specified"}
                  </span>
                  <div
                    className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md
            ${
              msg.sender === Sender
                ? "bg-[#27bb4e] text-white rounded-br-sm"
                : "bg-white/10 text-white/90 rounded-bl-sm backdrop-blur-sm border border-white/10"
            }`}
                  >
                    {msg.text}{" "}
                  </div>

                  {/* showing reply button and time */}
                  <div className="flex gap-3 items-center">
                    <button
                      className=" text-sm text-green-300 cursor-pointer"
                      onClick={() => {
                        setreplyTo(msg);
                        inputRef.current?.focus();
                      }}
                    >
                      Reply
                    </button>
                    <span className="text-[11px] text-emerald-300/50 px-1 flex gap-3">
                      {msg.time || "00:00"}
                    </span>
                  </div>
                </div>
              ))}

              <div className="w-[78vw] flex items-center my-6 mx-auto">
                <div className="flex-1 h-px bg-linear-to-l from-transparent to-yellow-300/80 rounded-full"></div>
                <div className="px-4 text-sm text-emerald-300/60 uppercase tracking-widest">
                  New Messages
                </div>
                <div className="flex-1 h-px bg-linear-to-l from-transparent to-yellow-300/80  rounded-full"></div>
              </div>
            </div>
          )}

          {/* actual messages */}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 ${msg.type === "sent" ? "items-end" : "items-start"}`}
            >
              {/*  shwoing reply above the message*/}

              {msg.replyTo && (
                <div>
                  <div className="border-l-4 border-green-500 pl-2 mb-2 text-xs">
                    <div className="font-semibold">{msg.replyTo.sender}</div>
                    <div className="opacity-70">{msg.replyTo.text}</div>
                  </div>
                </div>
              )}
              <span className="text-[11px] text-emerald-300/80 px-1">
                {msg.sender || "not specified"}
              </span>
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md
            ${
              msg.type === "sent"
                ? "bg-[#27bb4e] text-white rounded-br-sm"
                : "bg-white/10 text-white/90 rounded-bl-sm backdrop-blur-sm border border-white/10"
            }`}
              >
                {msg.text}
              </div>

              <div className="flex gap-3 items-center">
                <button
                  className=" text-sm text-green-300 cursor-pointer"
                  onClick={() => {
                    setreplyTo(msg);
                    inputRef.current?.focus();
                  }}
                >
                  Reply
                </button>
                <span className="text-[11px] text-emerald-300/50 px-1 flex gap-3">
                  {msg.time || "00:00"}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* showing reply preview */}

        {replyTo && (
          <div className="mx-3 mb-2.5 bg-black/25 rounded-xl border border-white/10 px-3 py-2.5 flex items-center gap-3 ">
            <div className="w-0.5 self-stretch bg-[#27bb4e] shrink-0" />
            <div className="flex-1 overflow-hidden">
              <p className="text-[11px] font-medium text-green-400 mb-1 tracking-wide">
                {replyTo.sender}
              </p>
              <div className="h-px bg-white/10 mb-1" />
              <p className="text-[12px] text-white/65 truncate">
                {replyTo.text}
              </p>
            </div>
            <button
              onClick={() => setreplyTo(null)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center text-white/50 transition-all shrink-0"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Input Area */}

        <div className="relative z-10 px-6 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <form onSubmit={handlesubmit} className="flex items-center gap-3">
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

            <div className="flex-1 flex items-center gap-3 bg-white/10 border-2 border-white/10 rounded-xl px-4 py-2.5 focus-within:border-emerald-400/60 transition-colors backdrop-blur-sm">
              <input
                type="text"
                required={true}
                ref={inputRef}
                name="message"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
                onPaste={handlePaste}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-emerald-200/30 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-[#27bb4e] hover:bg-[#22a845] flex items-center justify-center transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-95"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// export default page for usgin search params(that is to upload on render)

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
