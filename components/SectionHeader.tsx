import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const paddedNumber = number < 10 ? `0${number}` : `${number}`;

  return (
    <div className="flex items-center justify-between border-b border-frame bg-canvas px-3 py-1.5 font-mono text-xs select-none">
      <span className="font-bold tracking-widest uppercase text-frame">
        {`${paddedNumber} // ${title}`}
      </span>
      {children && <div className="text-[11px] text-frame/70">{children}</div>}
    </div>
  );
}
