"use client";

import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-1.5 border border-frame bg-canvas px-2 py-1">
        <span className="font-bold text-frame/70 uppercase mr-1">Intensity:</span>
        <div className="flex items-center gap-2">
          {ROAST_LEVELS.map((level, idx) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`flex items-center gap-1 cursor-pointer px-1.5 py-0.5 border ${
                  isSelected
                    ? "bg-frame text-canvas border-frame font-bold"
                    : "border-transparent text-frame hover:border-subtle"
                } transition-colors`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span className="opacity-70">[{idx + 1}]</span>
                <span>{level.label.toUpperCase()}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Dropdown */}
      <div className="flex items-center gap-1.5">
        <label htmlFor="language-select" className="sr-only">
          Language
        </label>
        <div className="relative">
          <select
            id="language-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-panel border border-frame px-3 py-1.5 pr-7 font-mono text-xs font-semibold text-frame focus:outline-none focus:ring-1 focus:ring-accent cursor-pointer"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-frame text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`px-2.5 py-1.5 border border-dashed font-mono text-xs font-semibold transition-all ${
          errorDrawerOpen
            ? "bg-frame text-canvas border-frame"
            : "bg-panel text-frame border-frame hover:bg-canvas"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Action Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`px-4 py-1.5 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 border border-frame transition-all shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
          isRoasting
            ? "bg-accent/80 text-white cursor-wait animate-pulse"
            : "bg-accent text-white hover:bg-[#c23d1d] cursor-pointer"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="bg-frame/20 px-1 py-0.5 text-[10px] font-normal border border-white/30">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
