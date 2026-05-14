"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // Future: send to Sentry or similar
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-5xl font-bold text-accent/20 mb-4">Oops</div>
        <h2 className="text-xl font-bold text-slate-lightest mb-3">
          Something went wrong
        </h2>
        <p className="text-slate text-sm mb-8 leading-relaxed">
          An error occurred while loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          <span className="relative z-10">Try again</span>
        </button>
      </div>
    </div>
  );
}
