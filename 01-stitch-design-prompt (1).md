# Code Roaster — Design Prompt (Stitch MCP)

Paste this single prompt into Stitch (via MCP inside Antigravity) to generate the full visual reference before any code is written.

---

```
Design the visual language for "Code Roaster," a developer tool that roasts pasted code with AI and shows the fix. Generate a design system and two key screens.

Aesthetic direction: "architectural blueprint / technical drafting desk" — not a typical soft SaaS look. Think: a printed architectural drawing, a lab notebook, a terminal panel. Sharp corners (no large border-radius), visible 1-2px borders on every panel, a faint drafting grid in the page background, monospace used heavily for all data/code/labels, small uppercase tracked-out section labels formatted like "01 // ROAST".

Color tokens:
- ink / frame (near-black): #111111
- canvas (page background, off-white/paper): #F5F5F3
- panel (card surface, slightly warmer white): #FDFDFD
- subtle border / hairline: #E6E6E2
- accent (burnt orange/red, used sparingly for CTAs, errors, highlights): #D94826
- severity colors: fatal = warm red-orange, code smell = amber/gold, optimization = green

Typography: a geometric sans display face (like Space Grotesk) for headings/titles, and a monospace face (like JetBrains Mono) for everything else — body copy, labels, code, buttons, badges, status text.

Layout for the main screen: a single centered "workstation" card (max width ~1360px) with a hard 2px border and a small drop shadow, divided into:
1. A top bar: app name (bold, tracked-out, uppercase) + version tag on the left, controls (roast level radio group, language dropdown, "+ ERROR MESSAGE" toggle button, primary "ROAST MY CODE" button with a Ctrl+Enter hint badge) on the right.
2. A two-column body below the top bar: left ~55% is a code editor panel (line-number gutter + textarea, a small header strip labeled "INPUT // SRC — Your Code" with Sample/Clear links, and a status strip at the bottom showing cursor position and language). Right ~45% is a report panel (header strip labeled "AUDIT // REPORT — Roast Report") that can show an empty state, a loading state, an error state, or a results view.
3. A footer status bar: left side shows "STATUS: ONLINE (model name)" and "ENGINE: GOOGLE GEMINI", right side shows the app name/version, and a small line crediting "Made at GDG Nashik Pre-DevFest Workshop".

Second screen: the results view of the report panel, showing numbered sections in the "01 // ROAST", "02 // WHAT'S WRONG", "03 // FIX", "04 // TAKEAWAY" style — issue cards with a small black index chip, a severity badge (colored per severity), a code snippet in a bordered/left-accent-striped block, and a "Diagnosis" / "Expected" pair of lines with a ✕ and ✓ marker. Below the issues, a "corrected code" block with a filename-style header ("solution.py") and Copy / Apply buttons.

Also design the empty, loading, and error states of the report panel: each is a centered column with a 64x64 bordered icon square ("{}" for empty, a spinning "/" for loading, "!" in accent color for error), a bold uppercase heading, and short muted mono body text — plus a "RETRY ANALYSIS" button for the error state.

Export the color tokens, type scale, and component styles (buttons, badges, cards, input fields) so they can be handed to a coding agent to implement in Tailwind CSS.
```

---

**After Stitch finishes:** keep the generated screens and the token list (hex values, font names) open — you'll reference them directly while running the coding prompt in `02-antigravity-build-prompt.md`, so every component the agent writes matches this look instead of drifting to a generic default.
