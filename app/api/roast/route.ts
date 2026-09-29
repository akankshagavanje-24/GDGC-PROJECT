import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

const VALID_LANGUAGES = new Set<string>(LANGUAGES.map((l) => l.id));
const VALID_ROAST_LEVELS = new Set<string>(ROAST_LEVELS.map((r) => r.id));

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  if (!code.trim()) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  const language: LanguageId =
    typeof body.language === "string" && VALID_LANGUAGES.has(body.language)
      ? (body.language as LanguageId)
      : DEFAULTS.language;

  const roastLevel: RoastLevel =
    typeof body.roastLevel === "string" && VALID_ROAST_LEVELS.has(body.roastLevel)
      ? (body.roastLevel as RoastLevel)
      : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    console.error("API /api/roast error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
