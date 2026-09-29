import React from "react";
import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  string,
  { badgeBg: string; badgeText: string; border: string }
> = {
  "FATAL BUG": {
    badgeBg: "bg-fatal-bg",
    badgeText: "text-fatal",
    border: "border-fatal",
  },
  "CODE SMELL": {
    badgeBg: "bg-smell-bg",
    badgeText: "text-smell",
    border: "border-smell",
  },
  OPTIMIZATION: {
    badgeBg: "bg-optimization-bg",
    badgeText: "text-optimization",
    border: "border-optimization",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = index < 10 ? `0${index}` : `${index}`;
  const config =
    severityConfig[issue.severity] || severityConfig["CODE SMELL"];

  return (
    <div className="border border-frame bg-panel p-3 shadow-[2px_2px_0px_#111111] flex flex-col gap-2.5 font-mono text-xs">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-2">
        <div className="flex items-center gap-2">
          {/* Black Index Chip */}
          <span className="bg-frame text-canvas px-1.5 py-0.5 font-bold text-[10px]">
            #{paddedIndex}
          </span>
          <span className="font-bold text-frame">
            LINE {issue.line}
          </span>
          {/* Severity Badge */}
          <span
            className={`px-1.5 py-0.5 font-bold text-[10px] border ${config.badgeBg} ${config.badgeText} ${config.border}`}
          >
            {issue.severity}
          </span>
        </div>
        <div className="text-right text-[11px] text-frame/70 font-semibold break-words max-w-[50%]">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet with left accent border stripe */}
      <div className="bg-canvas border-l-4 border-accent p-2 overflow-x-auto text-[11px] text-frame">
        <pre className="font-mono whitespace-pre">
          <code>{issue.codeSnippet}</code>
        </pre>
      </div>

      {/* Diagnosis & Expected Lines */}
      <div className="flex flex-col gap-1 text-[11px] leading-relaxed">
        <div className="text-fatal">
          <span className="font-black mr-1.5">✕</span>
          <span className="font-bold mr-1">Diagnosis:</span>
          <span className="text-frame/90">{issue.diagnosis}</span>
        </div>
        <div className="text-optimization">
          <span className="font-black mr-1.5">✓</span>
          <span className="font-bold mr-1">Expected:</span>
          <span className="text-frame/90">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
