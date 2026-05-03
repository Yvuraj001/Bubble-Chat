"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const create = () => {

  const router = useRouter()
  const [isChecked, setisChecked] = useState(true)
  const [name, setname] = useState('')
  const [roomName, setroomName] = useState("")
  let Name
  let Room
  const handlesubmit = async (e) => {
    e.preventDefault(e)
    setname(e.target.name.value.trim())
    setroomName(e.target.RoomName.value.trim())
    if(isChecked){
      localStorage.setItem('name', name)
    localStorage.setItem('roomName', roomName)
    }
    
    router.push(`/chat?room=${e.target.RoomName.value.trim()}&name=${e.target.name.value.trim()}`)


  }
  const handlenameChange = (e) => {
    setname(e.target.value)
  }
  const handleroomChange = (e) => {
    setroomName(e.target.value)
  }



  const handleOnChange = () => {
    setisChecked(!isChecked)
   if(isChecked){
    localStorage.setItem('name', name)
    localStorage.setItem('roomName', roomName)
   }
}

// Setting localstorage for saving name and room name

useEffect(() => {

  Name = localStorage.getItem("name") ? localStorage.getItem("name") : ""
  Room = localStorage.getItem("roomName") ? localStorage.getItem("roomName") : ""
  setname(Name)
  setroomName(Room)


}, [])




return (
  <div className='relative bg-linear-to-br from-[#022c22] via-[#065f46] to-[#0d9488] overflow-hidden'>
    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_60%)] pointer-events-none" />
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center">
      <div className="py-4 px-4 md:px-8">
        <div className="grid items-center gap-6 max-w-6xl w-full lg:grid-cols-2">

          <div className="border border-emerald-400/30 rounded-lg p-6 max-w-md mx-auto shadow-lg md:p-8 lg:mx-0 bg-white/10 backdrop-blur-sm">

            <div className="flex flex-col">
              <h1 className="text-white text-2xl font-bold mb-4">Create or Join Room</h1>

            </div>

            <form className="space-y-6" onSubmit={handlesubmit}>
              <div>
                <label htmlFor="name" className="mb-2 text-emerald-100 font-medium text-sm inline-block">Enter Your Name</label>
                <input type="text" id="name" name="name" placeholder="e.g. John" required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white/90 w-full outline-1 -outline-offset-1 outline-emerald-300 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 placeholder:text-slate-400" value={name} onChange={handlenameChange} />
              </div>
              <div>
                <label htmlFor="RoomName" className="mb-2 text-emerald-100 font-medium text-sm inline-block">Set a Room Name</label>
                <input type="text" id="RoomName" name="RoomName" placeholder="Whatever123" required
                  className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white/90 w-full outline-1 -outline-offset-1 outline-emerald-300 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 placeholder:text-slate-400" value={roomName} onChange={handleroomChange} />
              </div>
              <label className='mb-4 text-emerald-100 font-medium text-sm flex gap-3'>
                <input
                  type="checkbox"
                  disabled={name && roomName < 1}
                  checked={isChecked}
                  onChange={handleOnChange}
                  className='w-4'
                />
                Save my name and room
              </label>

              <button type="submit"
                className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-[#27bb4e] bg-[#27bb4e] hover:bg-[#22a845] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400">
                Create now
              </button>
            </form>
          </div>

          <div className="aspect-71/50 max-lg:w-4/5 mx-auto">
            <img src="./loginimg.png" className="w-full object-cover" alt="login img" />
          </div>

        </div>
      </div>
    </main>
  </div>
)
}

export default create


//  div for password

//  <div>
//                            <label htmlFor="RoomPass"
//                               className="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-white">Set Password for Room </label>
//                            <input type="text" id="RoomPass" name="RoomPass" placeholder="@anything123" required
//                               className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-white dark:bg-white dark:outline-slate-700" />
//                         </div>

