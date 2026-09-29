import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const rawMsg = error instanceof Error ? error.message : String(error);
  switch (status) {
    case 400:
      return `Invalid request sent to Gemini API. Details: ${rawMsg}`;
    case 403:
      return "Access forbidden. Please check that your GEMINI_API_KEY in .env.local is valid and has permission to access Gemini.";
    case 404:
      return `Model not found (${AI.model}). Check AI.model in config/app.config.ts.`;
    case 429:
      return "Rate limit exceeded. Too many requests to Gemini. Please wait a moment and try again.";
    case 503:
      return "Gemini servers are temporarily overloaded. Please retry in a few moments.";
    default:
      return `Gemini API Error: ${rawMsg}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  let attempt = 0;
  while (attempt < AI.maxAttempts) {
    attempt++;
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || !responseText.trim()) {
        throw new Error("Received an empty response from Gemini.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(
          `Failed to parse Gemini response as JSON: ${parseError instanceof Error ? parseError.message : String(parseError)}`
        );
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: unknown) {
      // Check for 503 or overload status to retry
      const anyErr = err as { status?: number; statusCode?: number; code?: number };
      const status = anyErr?.status || anyErr?.statusCode || anyErr?.code;

      if (status === 503 && attempt < AI.maxAttempts) {
        const waitMs = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      const message = friendlyErrorMessage(status, err);
      throw new Error(message);
    }
  }

  throw new Error("Failed to get analysis from Gemini after maximum retry attempts.");
}
