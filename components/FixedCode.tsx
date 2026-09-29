"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (corrected: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const extension = langConfig ? langConfig.extension : "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-bold text-optimization uppercase tracking-wider">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-frame bg-panel shadow-[2px_2px_0px_#111111]">
        {/* Solution Block Header */}
        <div className="h-8 px-3 border-b border-frame bg-canvas flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-1.5 text-frame font-bold">
            <span className="text-frame/50">{"FILE //"}</span>
            <span>solution.{extension}</span>
          </div>
          <span className="text-optimization font-bold text-[10px] tracking-wider uppercase">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-3 bg-panel overflow-x-auto text-xs font-mono text-frame leading-relaxed">
          <pre className="whitespace-pre">
            <code>{code}</code>
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="p-2 border-t border-frame bg-canvas flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 py-1.5 px-3 border border-frame bg-panel font-mono text-xs font-bold uppercase transition-all hover:bg-frame hover:text-canvas cursor-pointer text-center"
          >
            {copyLabel}
          </button>
          <button
            type="button"
            onClick={() => onApply(code)}
            className="flex-1 py-1.5 px-3 border border-frame bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider transition-all hover:bg-[#c23d1d] cursor-pointer text-center shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          >
            APPLY TO EDITOR ↵
          </button>
        </div>
      </div>
    </div>
  );
}
