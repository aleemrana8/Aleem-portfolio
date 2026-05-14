"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    if (process.env.NODE_ENV === "production") {
      // Future: send to Sentry or similar
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#030712] text-white min-h-screen flex items-center justify-center">
        <div className="text-center px-6 max-w-md">
          <div className="text-6xl font-bold text-sky-400/20 mb-4">500</div>
          <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm text-sky-400 border border-sky-400/35 hover:border-sky-400/70 hover:bg-sky-400/5 transition-all duration-300"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
