import Navbar from "./components/Navbar";
import { ToastContainer, Slide } from "react-toastify";

import "./globals.css";
export const metadata = {
  title: "Bubble / Instant Chat ",
  description:
    "A service that let you chat to your friends without having to login or create account.",
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
