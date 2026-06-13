
import Navbar from "./components/Navbar";
import { ToastContainer, Slide } from "react-toastify";

import "./globals.css";
export const metadata = {
  title: "Bubble / Instant Chat ",
  description: "A service that let you chat to your friends without having to login or create account.",
  verification: {
    google: "google6303c4a18fefe718.html",
  },
  other: {
    "google-adsense-account": "ca-pub-8180810397719502",
  }
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
        {children}
      </body>
    </html >
  );
}
