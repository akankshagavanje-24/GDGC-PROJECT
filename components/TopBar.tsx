import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-frame bg-panel px-4 py-3 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-accent" />
        <h1 className="font-display font-black tracking-widest text-lg sm:text-xl uppercase text-frame">
          {APP.name}
        </h1>
        <span className="font-mono text-xs font-semibold px-1.5 py-0.5 border border-frame bg-canvas text-frame">
          {APP.version} [RELEASE]
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        {children}
      </div>
    </header>
  );
}
