
import React from 'react'
import Create from '../components/Createpage'
import Footer from '../components/footer'
const page = () => {


  return (
    <div>
      <Create/>
      <Footer/>
    </div>
  )
}

export default page

export const metadata = {
  title: "Bubble / Create Room",
  description: "Create a room for SECRET & PRIVATE conversations",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/create",
  },
};