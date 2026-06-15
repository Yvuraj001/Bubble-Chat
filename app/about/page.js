import About from "../components/about";
import Footer from "../components/footer";
import React from 'react'

const page = () => {
  return (
    <div>
      <About/>
      <Footer/>
    </div>
  )
}

export default page

export const metadata = {
  title: "Bubble / About",
  description: "Instant and realtime - Temporary chat app that let you talk anyone for free without need to login or singup",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/about",
  },
};