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
  description: "Here you will know how to use this.",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/about",
  },
};