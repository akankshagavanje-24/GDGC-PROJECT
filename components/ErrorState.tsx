import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const displayMsg =
    error && error.trim()
      ? error
      : "An unknown error occurred during code evaluation.";

  return (
    <div
      role="alert"
      className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none font-mono"
    >
      <div
        aria-hidden="true"
        className="w-16 h-16 border-2 border-accent flex items-center justify-center text-3xl font-black text-accent mb-4 bg-fatal-bg shadow-[2px_2px_0px_#D94826]"
      >
        !
      </div>
      <h3 className="font-display font-black text-base uppercase tracking-wider text-accent mb-2">
        Analysis Failed
      </h3>
      <p className="text-xs text-frame/70 max-w-sm leading-relaxed mb-6 font-mono break-words">
        {displayMsg}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 border-2 border-frame bg-frame text-canvas hover:bg-panel hover:text-frame font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
