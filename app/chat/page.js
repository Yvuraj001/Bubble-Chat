"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import useSocket from '../hook/socket'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import chkstatus from '../components/chkstatus'
 

const page = () => {

  const socketRef = useSocket()
  
  const scrollEnd = useRef(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  

  const [roomName, setroomName] = useState("")
  const [message, setmessage] = useState("")
  const [senderID, setsenderID] = useState("")
  const [Sender, setSender] = useState("")
  const [Count, setCount] = useState(1)
  const [isuser, setisuser] = useState("Everybody")
  const [isactive, setisactive] = useState(false)
  const [messages, setmessages] = useState([])
  const [showError, setshowError] = useState(false)

 
  const handlesubmit = (e) => {
    e.preventDefault()

    socketRef.current.emit("message", { message, roomName, senderID: senderID, sender: Sender, type: "sent" })

    setmessages((prev) => [...prev, { text: message, sender: "You", type: "sent" }])

    setmessage("")


  }
 
  useEffect(() => {
    const socket = socketRef.current
     
  
     
    // getting room name and sender name
    const paramName = decodeURI(searchParams.get("name"))
    const paramroomName = decodeURI(searchParams.get("room"))

    if (!paramName || !paramroomName) {

      router.push('/create')
    }
    else {
      setroomName(paramroomName)
      setSender(paramName)

    }


    socket.on("connect", () => {

      socket.emit('username', paramName)
      socket.emit("join-room", paramroomName)


      setsenderID(socket.id)
    })

    socket.on("recived-message", ({ message, senderID, sender, }) => {
      if (senderID === socket.id) return
      setisactive(true)
      setisuser(sender)
      setmessages((prev) => [...prev, { text: message, sender: sender, type: "recived" }])

    })
    // New user
    socket.on("newuser", (username) => {
      toast.success(`${username} joined chat!!`)
      setisuser(username)
      setisactive(true)

    })

    socket.on("user-left", (user) => {
      setisuser(user)
      setisactive(false)
      toast.error(`${user} left chat!!`);

    });
    socket.on('room-count', ({ count }) => {
      setCount(count)
    })

    return () => {
      socket.off("disconnect")
      socket.disconnect()
    }
  }, [])

  // useEffect to scroll to end
  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Alert on reloading page

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()

    }

    window.addEventListener("beforeunload", handleBeforeUnload, { capture: true })

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, { capture: true })
    }
  }, [])
  
  // Gettign server response

  useEffect(() => {
  const checkServer = async () => {
    try {
      const isActive = await chkstatus()  
      if (!isActive) {
        setshowError(true)
      }
    } catch (err) {
      setshowError(true)   
    }
  }

  checkServer()
}, [])

  useEffect(() => {
  if (!showError) return

  const timer = setTimeout(() => router.push("/"), 3000)
  return () => clearTimeout(timer)
}, [showError])

  return (



    <div className="relative flex flex-col h-[95%] bg-linear-to-br from-[#022c22] via-[#065f46] to-[#0d9488] text-white font-sans overflow-hidden">
     {/* error overlay */}
     {showError && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="bg-white text-gray-800 rounded-2xl p-8 w-85 text-center shadow-2xl">

      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <circle cx="12" cy="16" r="0.8" fill="#dc2626" />
        </svg>
      </div>

      <p className="text-base font-semibold text-gray-900 mb-1">Connection Failed</p>
      <p className="text-sm text-gray-500 leading-relaxed">
       Failed to connect to server.Chek you internet :(
      </p>

    </div>
  </div>
)}

      {/* overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_60%)] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-1 md:px-6 py-2 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-full bg-[#27bb4e] flex items-center justify-center text-[10px] md:text-sm font-bold uppercase shadow-lg">
          {Sender?.[0] || "?"}
        </div>
        <div>
          <p className="text-[10px] md:text-sm font-semibold text-white">{Sender || "Anonymous"}</p>
          <p className="text-[10px] md:text-xs text-emerald-300/60 tracking-widest ">Inside - <strong className='uppercase'>{roomName || "..."}</strong></p>
        </div>
        <div className='ml-auto flex  items-center justify-center text-[10px] md:text-[14px] gap-2 opacity-60 text-white'>{isuser} is {isactive ? "online" : "offline"}</div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
          <span style={{ display: Count > 1 ? "block" : "none" }} className="text-xs text-emerald-300/60">{Count} people are active </span>
          <span style={{ display: Count < 2 ? "block" : "none" }} className="text-xs text-emerald-300/60  ">Only you are here!</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 py-6 space-y-3 scrollbar-thin scrollbar-thumb-white/10">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-2 opacity-30">
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
            <p className="text-sm">No messages yet. Say something!</p>
            <p className="text-sm" style={{ display: isactive.length < 0 ? "none" : "block" }}>Waiting for messages.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col gap-1 ${msg.type === "sent" ? "items-end" : "items-start"}`}>
            <span className="text-[11px] text-emerald-300/50 px-1">
              {msg.sender || "not specified"}
            </span>
            <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md
            ${msg.type === "sent"
                ? "bg-[#27bb4e] text-white rounded-br-sm"
                : "bg-white/10 text-white/90 rounded-bl-sm backdrop-blur-sm border border-white/10"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input Area */}
      <div className="relative z-10 px-6 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <form onSubmit={handlesubmit} className="flex items-center gap-3">

          <input type="text" style={{ display: 'none' }} defaultValue={roomName || ""} name='room' />
          <input type="text" name='name' style={{ display: 'none' }} defaultValue={Sender || ""} />

          <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 focus-within:border-emerald-400/60 transition-colors backdrop-blur-sm">
            <input
              type="text"
              required={true}
              name='message'
              placeholder='Type a message...'
              value={message}
              onChange={(e) => { setmessage(e.target.value) }}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-emerald-200/30 outline-none"
            />
          </div>

          <button
            type='submit'
            className="w-10 h-10 rounded-xl bg-[#27bb4e] hover:bg-[#22a845] flex items-center justify-center transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>

    </div>
  )

}

export default page





