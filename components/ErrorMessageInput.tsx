"use client";

import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-frame bg-canvas px-4 py-2.5 sm:px-6 animate-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between mb-1.5 font-mono text-xs">
        <span className="font-bold tracking-wider uppercase text-frame/80 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent" />
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-frame/60 hover:text-frame font-bold uppercase hover:underline cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        aria-label="Error message or terminal traceback input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="Paste runtime error stacktrace or compiler message here (e.g. TypeError: can only concatenate list (not 'float') to list)..."
        className="w-full bg-panel border border-frame p-2 font-mono text-xs text-frame placeholder:text-frame/40 focus:outline-none focus:ring-1 focus:ring-accent resize-y"
      />
    </div>
  );
}
