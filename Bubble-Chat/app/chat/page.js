import { Suspense } from "react";
import ChatPage from "./ChatPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_top_left,_#fef3c7,_transparent_30%),radial-gradient(circle_at_bottom_right,_#ddd6fe,_transparent_40%),#f8fafc] text-[#64748b]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4f46e5] border-t-transparent" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#4f46e5]">
            Connecting to Room...
          </span>
        </div>
      }
    >
      <ChatPage />
    </Suspense>
  );
}
