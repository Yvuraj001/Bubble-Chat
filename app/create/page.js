import React from 'react';
import Create from '../components/Createpage';
import Footer from '../components/footer';

export const metadata = {
  title: "Create Room - Bubble Chat",
  description: "Create or join a temporary private chat room instantly. No login or registration required.",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com/create",
  },
};

const Page = () => {
  return (
    <div className="flex flex-col min-h-full flex-1 bg-[#070a12]">
      <Create />
      <Footer />
    </div>
  );
};

export default Page;