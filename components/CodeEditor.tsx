"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const langConfig = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];
  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const textBefore = textarea.value.slice(0, textarea.selectionStart);
    const splitLines = textBefore.split("\n");
    setCursorPos({
      line: splitLines.length,
      col: splitLines[splitLines.length - 1].length + 1,
    });
  };

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + "    " + val.substring(end);
      onChange(updated);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
            start + 4;
        }
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-panel border-r-0 lg:border-r-2 border-frame overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b border-frame bg-canvas flex items-center justify-between font-mono text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="text-frame/60 uppercase font-semibold">
            {"INPUT // SRC"}
          </span>
          <span className="font-bold text-frame">— Your Code</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-accent hover:underline font-bold uppercase tracking-wider cursor-pointer"
          >
            [SAMPLE BUG]
          </button>
          <span className="text-frame/30">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-frame/60 hover:text-frame font-bold uppercase cursor-pointer"
          >
            [CLEAR]
          </button>
        </div>
      </div>

      {/* Editor Main: Gutter + Textarea */}
      <div className="relative flex-1 flex overflow-hidden font-mono text-xs leading-5">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-canvas border-r border-subtle select-none overflow-hidden py-3 text-right pr-2 text-frame/40 shrink-0"
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const lineNum = i + 1;
            const isErrorLine = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`h-5 transition-colors ${
                  isErrorLine
                    ? "bg-fatal-bg text-fatal font-bold border-l-2 border-fatal -ml-[1px] pl-[1px]"
                    : ""
                }`}
              >
                {lineNum < 10 ? `0${lineNum}` : lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <div className="relative flex-1 h-full">
          <textarea
            ref={textareaRef}
            aria-label="Source code input"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleSelect}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            wrap="off"
            spellCheck={false}
            placeholder={`// Paste your ${langConfig.label} code here...\n// Or click [SAMPLE BUG] above to load a test snippet.`}
            className="w-full h-full p-3 bg-transparent text-frame font-mono text-xs leading-5 resize-none focus:outline-none focus:ring-0 whitespace-pre overflow-auto"
          />
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 px-4 border-t border-frame bg-canvas flex items-center justify-between font-mono text-[11px] text-frame/70 select-none">
        <div className="flex items-center gap-2">
          <span>
            LN: {cursorPos.line} | COL: {cursorPos.col}
          </span>
          <span className="text-frame/30">·</span>
          <span className="uppercase font-semibold text-frame">
            {langConfig.label} (.{langConfig.extension})
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-frame/50">
          <span>UTF-8</span>
          <span>·</span>
          <span>TAB SIZE: 4</span>
        </div>
      </div>
    </div>
  );
}
