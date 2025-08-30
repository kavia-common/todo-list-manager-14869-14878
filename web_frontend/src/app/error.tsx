"use client";

import { useEffect } from "react";

// PUBLIC_INTERFACE
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold">Something went wrong!</h2>
      <button
        className="btn btn-primary"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
