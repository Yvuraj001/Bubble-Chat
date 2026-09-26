 import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
 

const useSocket = () => {
  const socketRef = useRef(null)

  useEffect(() => {

    socketRef.current = io(`${process.env.NEXT_PUBLIC_Socket_Server_URL}`) || "fuck"

    return () => socketRef.current.disconnect()
  }, [])
 
  return socketRef


}

export default useSocket