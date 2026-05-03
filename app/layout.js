
import Navbar from "./components/Navbar";
import { ToastContainer, Slide } from "react-toastify";

import "./globals.css";
export const metadata = {
  title: "Bubble - Instant Chat ",
  description: "A service that let you chat to your friends without having to login or create account.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="">
      <body
        className=" h-screen"
      >
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={1300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Slide}
        />
        {children}
      </body>
    </html >
  );
}
