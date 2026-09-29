"use client";

import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { FixedCode } from "./FixedCode";
import { IssueCard } from "./IssueCard";
import { LoadingState } from "./LoadingState";
import { SectionHeader } from "./SectionHeader";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (corrected: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const issueCount = result?.issues?.length || 0;
  const issuesLabel =
    issueCount === 1 ? "1 ISSUE DETECTED" : `${issueCount} ISSUES DETECTED`;

  const takeawaySectionNumber =
    result && result.correctedCode && result.correctedCode.trim() ? 4 : 3;

  return (
    <div className="flex flex-col h-full bg-panel overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b border-frame bg-canvas flex items-center justify-between font-mono text-xs select-none">
        <span className="text-frame/60 uppercase font-semibold">
          {"AUDIT // REPORT"}
        </span>
        <span className="font-bold text-frame">Roast Report</span>
        <div className="w-12" aria-hidden="true" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="p-4 sm:p-6 flex flex-col gap-6 font-mono">
            {/* Section 01: Roast */}
            <div className="flex flex-col gap-2">
              <SectionHeader number={1} title="Roast">
                <span className="font-bold text-accent uppercase tracking-wider">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="p-4 bg-canvas border-l-4 border-accent text-sm text-frame font-mono leading-relaxed shadow-[2px_2px_0px_#111111]">
                &quot;{result.roast}&quot;
              </div>
            </div>

            {/* Section 02: What's Wrong */}
            <div className="flex flex-col gap-2">
              <SectionHeader number={2} title="What's Wrong">
                <span
                  className={`font-bold uppercase tracking-wider ${
                    issueCount === 0 ? "text-optimization" : "text-fatal"
                  }`}
                >
                  {issuesLabel}
                </span>
              </SectionHeader>

              {issueCount === 0 ? (
                <div className="p-4 border border-optimization bg-optimization-bg text-optimization font-mono text-xs font-semibold">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard
                      key={`${issue.line}-${idx}`}
                      index={idx + 1}
                      issue={issue}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Section 03: Fix (Only when correctedCode is non-empty) */}
            {result.correctedCode && result.correctedCode.trim() && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section (Section 3 or 4) */}
            {result.takeaway && result.takeaway.trim() && (
              <div className="flex flex-col gap-2">
                <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
                <div className="p-4 border border-frame bg-panel text-xs text-frame leading-relaxed shadow-[2px_2px_0px_#111111]">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
