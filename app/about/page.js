import About from "../components/about";
import Footer from "../components/footer";
import React from 'react';

export const metadata = {
  title: "About - Bubble Chat",
  description: "Learn about Bubble Chat: an instant, ephemeral, anonymous real-time chat platform with zero storage and no registration.",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/about",
  },
};

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0b0e]">
      <About />
      <Footer />
    </div>
  );
};

export default Page;