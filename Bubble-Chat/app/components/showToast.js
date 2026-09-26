import React from "react";

export const WarningToast = ({ message, onClose }) => {
  return (
    <div className="w-full max-w-sm rounded-xl border border-[#e10098]/40 bg-[#141419] p-3.5 shadow-2xl text-white flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-[#1f1620] border border-[#e10098]/30 text-[#e10098] flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <span className="text-xs font-mono font-medium text-white truncate">
          {message || "Warning"}
        </span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="p-1 rounded text-[#a1a1aa] hover:text-white hover:bg-[#202028] transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const UserJoinedToast = ({ message, onClose }) => {
  return (
    <div className="w-full max-w-sm rounded-xl border border-[#38bdf8]/40 bg-[#141419] p-3.5 shadow-2xl text-white flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-[#0e1724] border border-[#38bdf8]/30 text-[#38bdf8] flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        </div>
        <span className="text-xs font-mono font-semibold text-white truncate">
          {message || "A user joined the room"}
        </span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="p-1 rounded text-[#a1a1aa] hover:text-white hover:bg-[#202028] transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const UserLeftToast = ({ message, onClose }) => {
  return (
    <div className="w-full max-w-sm rounded-xl border border-[#e10098]/40 bg-[#141419] p-3.5 shadow-2xl text-white flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-7 h-7 rounded-lg bg-[#1f1620] border border-[#e10098]/30 text-[#e10098] flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
        </div>
        <span className="text-xs font-mono font-semibold text-white truncate">
          {message || "A user left the room"}
        </span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          type="button"
          className="p-1 rounded text-[#a1a1aa] hover:text-white hover:bg-[#202028] transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};