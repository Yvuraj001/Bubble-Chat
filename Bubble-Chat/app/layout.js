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
    <html lang="en" className="dark min-h-screen bg-[#0b0b0e] text-white antialiased selection:bg-[#e10098] selection:text-white">
      <body className="flex flex-col min-h-screen bg-[#0b0b0e] text-white overflow-x-hidden font-body">
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
          toastClassName="!bg-[#141419] !border !border-[#26262e] !rounded-xl !shadow-2xl !text-white !p-0 font-mono"
        />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
