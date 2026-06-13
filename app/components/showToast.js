export const WarningToast = ({ message, onClose }) => {
  return (
    <div className="max-w-lg rounded-xl border shadow-md p-2 text-sm overflow-hidden bg-yellow-900 border-yellow-300 pointer-events-auto absolute right-0">
      <div className="flex gap-2 justify-between ml-1 text-yellow-50">
        <div className="flex min-w-0 items-start gap-2">
          <div className="h-6 flex items-center">
            <div
              style={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-label="Warning"
              >
                <path d="M8.708 3.708a1.5 1.5 0 0 1 2.466-.173l.118.173 6.5 11.03A1.5 1.5 0 0 1 16.5 17h-13a1.5 1.5 0 0 1-1.292-2.262zm1.684.45a.5.5 0 0 0-.823.058l-6.5 11.03A.5.5 0 0 0 3.5 16h13a.5.5 0 0 0 .43-.754l-6.5-11.03zM10 13a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m0-5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 10 8" />
              </svg>
            </div>
          </div>

          <div className="mt-0.5 min-w-0 break-words">
            <div className="select-text  text-amber-400">
              {message || "Message not set"}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="inline-flex items-center justify-center h-6 w-6 rounded-md hover:bg-yellow-800 transition-colors"
        >
          <div
            style={{
              width: 12,
              height: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.147 4.146a.5.5 0 0 1 .707.707L10.707 10l5.147 5.147a.5.5 0 0 1-.63.771l-.078-.064L10 10.707l-5.146 5.147a.5.5 0 0 1-.708-.707L9.293 10 4.146 4.853a.5.5 0 0 1 .708-.707L10 9.293z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export const UserJoinedToast = ({ message, onClose }) => {
  return (
    <div className="max-w-lg rounded-xl border shadow-md p-2 text-[16px] overflow-hidden bg-green-900 border-green-300 pointer-events-auto absolute right-0">
      <div className="flex gap-2 justify-between ml-1 text-green-50">
        <div className="flex min-w-0 items-start gap-2">
          <div className="h-6 flex items-center">
            <div
              style={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-label="Success"
                className="text-green-400"
              >
                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.03 7.28a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06 0L5.97 10.34a.75.75 0 111.06-1.06L9 11.25l3.97-3.97a.75.75 0 011.06 0z" />
              </svg>
            </div>
          </div>

          <div className="mt-0.5 min-w-0 break-words">
            <div className="select-text text-green-400">
              {message || "A user joined the chat"}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="inline-flex items-center justify-center h-6 w-6 rounded-md hover:bg-green-800 transition-colors"
        >
          <div
            style={{
              width: 12,
              height: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.147 4.146a.5.5 0 0 1 .707.707L10.707 10l5.147 5.147a.5.5 0 0 1-.707.707L10 10.707l-5.147 5.147a.5.5 0 0 1-.707-.707L9.293 10 4.146 4.853a.5.5 0 0 1 .707-.707L10 9.293z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export const UserLeftToast = ({ message, onClose }) => {
  return (
    <div className="max-w-lg rounded-xl border shadow-md p-2 text-[16px] overflow-hidden bg-red-900 border-red-300 pointer-events-auto absolute right-0">
      <div className="flex gap-2 justify-between ml-1 text-red-50">
        <div className="flex min-w-0 items-start gap-2">
          <div className="h-6 flex items-center">
            <div
              style={{
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-label="User Left"
                className="text-red-400"
              >
                <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm3.53 12.47a.75.75 0 01-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 01-1.06-1.06L8.94 10 6.47 7.53a.75.75 0 011.06-1.06L10 8.94l2.47-2.47a.75.75 0 011.06 1.06L11.06 10l2.47 2.47z" />
              </svg>
            </div>
          </div>

          <div className="mt-0.5 min-w-0 break-words">
            <div className="select-text text-red-400">
              {message || "A user left the chat"}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="inline-flex items-center justify-center h-6 w-6 rounded-md hover:bg-red-800 transition-colors"
        >
          <div
            style={{
              width: 12,
              height: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15.147 4.146a.5.5 0 0 1 .707.707L10.707 10l5.147 5.147a.5.5 0 0 1-.707.707L10 10.707l-5.147 5.147a.5.5 0 0 1-.707-.707L9.293 10 4.146 4.853a.5.5 0 0 1 .707-.707L10 9.293z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};