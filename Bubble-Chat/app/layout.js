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
    <html lang="en" className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#bae6fd] selection:text-[#0f172a]">
      <body className="flex flex-col min-h-screen bg-[#f8fafc] text-[#0f172a] overflow-x-hidden font-body">
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
          theme="light"
          transition={Slide}
          toastClassName="!bg-white !border !border-[#e2e8f0] !rounded-xl !shadow-lg !text-[#0f172a] !p-0 font-mono"
        />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
