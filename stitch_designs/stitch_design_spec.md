### Code Roaster — Visual Language & Interface Architecture

I have designed the comprehensive visual language, design system, and two core screens for **Code Roaster**, following an **architectural blueprint / technical drafting desk** aesthetic.

---

### 1. Visual Language & Token Architecture (Tailwind CSS Implementation)

```js
// tailwind.config.js snippet
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#111111',
          subtle: '#333333',
          faint: '#777777',
        },
        canvas: {
          DEFAULT: '#F5F5F3', // Paper / drafting linen surface
          grid: '#E4E4DF',   // Technical drafting grid lines
        },
        panel: {
          DEFAULT: '#FDFDFD',
          hover: '#F7F7F5',
        },
        hairline: '#E6E6E2',
        accent: {
          DEFAULT: '#D94826', // Burnt orange-red CTA / roast mark
          hover: '#C23D1D',
          subtle: '#FCEBE6',
        },
        severity: {
          fatal: '#D94826',        // Warm red-orange
          'fatal-bg': '#FEF2F0',
          smell: '#D97706',        // Amber / gold
          'smell-bg': '#FFFBEB',
          optimization: '#16A34A', // Green
          'optimization-bg': '#F0FDF4',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'drafting': '4px 4px 0px #111111',
        'drafting-sm': '2px 2px 0px #111111',
        'inset-hairline': 'inset 0 0 0 1px #E6E6E2',
      },
      borderRadius: {
        DEFAULT: '0px', // Strict architectural zero-radius
      }
    }
  }
}
```

#### Key Component Styles
- **Workstation Container:** `max-w-[1360px] mx-auto bg-panel border-2 border-ink shadow-drafting` on a millimeter grid paper canvas (`bg-[#F5F5F3]`).
- **Section Headers:** Tracked-out uppercase monospace (e.g. `01 // ROAST`, `INPUT // SRC — YOUR CODE`) using `font-mono text-xs tracking-widest uppercase font-bold text-ink`.
- **Buttons & Controls:** Sharp square corners (`rounded-none`), 1–2px solid ink borders, with tactile translation active states (`active:translate-x-[1px] active:translate-y-[1px]`).
- **Diagnosis Markers:** High-visibility comparison pairs:
  - `✕ Diagnosis:` in `text-severity-fatal font-mono text-xs`
  - `✓ Expected:` in `text-severity-optimization font-mono text-xs`

---

### 2. Generated Screens Overview

1. **Screen 1: Code Roaster — Workstation & States (Code Roaster — Workstation & States)**
   - **Top Drafting Bar:** Tracked app title `CODE ROASTER v1.4.2 [RELEASE]`, roast level segmented control (`[1] MILD`, `[2] MEDIUM`, `[3] SAVAGE`), CPython 3.12 selector, `+ ERROR MESSAGE` toggle, and primary burnt-orange `ROAST MY CODE [Ctrl+Enter]` CTA.
   - **Left Editor Panel:** 24-line code gutter with active line markers, syntax-highlighted code, load/clear quick-actions, and live coordinate status (`LN: 14 | COL: 28 | SPACES: 4`).
   - **Right Audit Panel:** Dedicated state inspection showing the **Empty State** (centered `64x64` bordered box with `{}` glyph and waiting instructions) alongside toggles for **Loading** (rotating technical slash `/` parser) and **Error** (`!` badge with `RETRY ANALYSIS`).
   - **Footer Telemetry:** Real-time engine status (`gemini-1.5-pro`, `48ms` latency) and workshop provenance credit (`Made at GDG Nashik Pre-DevFest Workshop`).

2. **Screen 2: Code Roaster — Roast Report & Solution (Code Roaster — Roast Report & Solution)**
   - **01 // ROAST:** Burnt orange bordered verdict quote delivering high-grade technical sarcasm on mutable default list arguments.
   - **02 // WHAT'S WRONG:** Numbered defect cards with black index chips (`[#01]`, `[#02]`, `[#03]`), colored severity badges (`[!] FATAL`, `[?] SMELL`, `[✓] OPTIMIZATION`), and `✕ Diagnosis` / `✓ Expected` code diffs.
   - **03 // FIX:** Refactored `solution.py` code block with `[COPY CODE]` and `[APPLY TO EDITOR]` actions.
   - **Editor Error Bindings:** Shows lines 11–14 tinted in the source editor corresponding to the reported memory leak.