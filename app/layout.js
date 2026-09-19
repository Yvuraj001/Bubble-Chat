import Navbar from "./components/Navbar";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "Bubble Chat - Free Temporary Anonymous Chat Rooms",
  description:
    "Create temporary chat rooms instantly. No signup, no phone number, no app download. Share a link and start chatting in real time.",
  alternates: {
    canonical: "https://bubble-chat-wy6m.onrender.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-dvh bg-[#070a12] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      <body className="flex flex-col h-dvh bg-[#070a12] text-slate-100 overflow-x-hidden font-sans">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
          toastClassName="!bg-[#111726]/95 !border !border-white/10 !backdrop-blur-xl !rounded-2xl !shadow-2xl !text-slate-100"
        />
        <main className="flex-1 min-h-0 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
