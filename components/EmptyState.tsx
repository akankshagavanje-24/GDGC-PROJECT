import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none font-mono">
      <div className="w-16 h-16 border-2 border-dashed border-frame/40 flex items-center justify-center text-2xl font-black text-frame/40 mb-4 bg-canvas">
        &#123;&#125;
      </div>
      <h3 className="font-display font-black text-base uppercase tracking-wider text-frame mb-2">
        Awaiting Code Submission
      </h3>
      <p className="text-xs text-frame/60 max-w-xs leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press{" "}
        <kbd className="px-1 py-0.5 border border-frame/30 bg-canvas text-frame font-bold">
          Ctrl+Enter
        </kbd>{" "}
        (&#8984;+Enter on Mac).
      </p>
    </div>
  );
}
