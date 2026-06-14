import Navbar from "./components/Navbar";
import { ToastContainer, Slide } from "react-toastify";

import "./globals.css";
export const metadata = {
  title: "Bubble / Instant Chat ",
   description:
    "Create temporary chat rooms instantly. No signup, no phone number, no app download. Share a link and start chatting in real time.",
     other: {
    "google-adsense-account": "ca-pub-8180810397719502",
  },
    alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" bg-[#05644b] h-full">
      <body className="h-full flex flex-col">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Slide}
        />
        <main className="flex-1 min-h-0">{children}</main>
      </body>
    </html>
  );
}
