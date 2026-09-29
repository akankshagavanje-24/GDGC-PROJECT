import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-frame bg-panel px-4 py-2 font-mono text-xs select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1">
        {/* Left Status Telemetry */}
        <div className="flex items-center gap-2">
          <span className="text-frame/60">STATUS:</span>
          {isRoasting ? (
            <span className="text-smell font-bold animate-pulse">
              ● PROCESSING...
            </span>
          ) : (
            <span className="text-optimization font-bold flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-optimization" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden md:inline text-frame/30">|</span>
          <span className="hidden md:inline text-frame/50">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right Tag */}
        <div className="text-frame/60 tracking-widest uppercase font-semibold text-[11px]">
          {`${APP.name} ${APP.version} // LIVE`}
        </div>
      </div>

      {/* Workshop Attribution Line */}
      <div className="mt-1 text-center text-[10px] text-frame/40 tracking-wider">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
