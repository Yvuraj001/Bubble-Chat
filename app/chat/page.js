import { Suspense } from "react";
import ChatPage from "./ChatPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex-1  bg-[#070a12] flex flex-col items-center justify-center text-slate-400 gap-3">
          <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Connecting to Room...
          </span>
        </div>
      }
    >
      <ChatPage />
    </Suspense>
  );
}