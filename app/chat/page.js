import { Suspense } from "react";
import ChatPage from "./ChatPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 bg-[#0b0b0e] flex flex-col items-center justify-center text-[#a1a1aa] gap-3">
          <div className="w-8 h-8 border-2 border-[#e10098] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#38bdf8]">
            Connecting to Room...
          </span>
        </div>
      }
    >
      <ChatPage />
    </Suspense>
  );
}