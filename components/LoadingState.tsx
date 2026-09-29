import React from "react";

export function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none font-mono"
    >
      <div
        aria-hidden="true"
        className="w-16 h-16 border-2 border-frame flex items-center justify-center text-3xl font-black text-accent mb-4 bg-canvas shadow-[2px_2px_0px_#111111]"
      >
        <span className="inline-block animate-spin">/</span>
      </div>
      <h3 className="font-display font-black text-base uppercase tracking-wider text-frame mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="text-xs text-frame/60 max-w-xs leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
