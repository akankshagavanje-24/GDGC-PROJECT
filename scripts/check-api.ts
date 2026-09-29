import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function runCheck() {
  console.log(`Checking Gemini API connection using model: ${AI.model}...`);
  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: can only concatenate list (not \"float\") to list",
    });

    console.log("✓ API connection succeeded!");
    console.log(`Roast: "${result.roast}"`);
    console.log(`Issues detected: ${result.issues.length}`);
    console.log(`Takeaway: "${result.takeaway}"`);
    console.log(`Corrected code provided: ${Boolean(result.correctedCode)}`);
    process.exit(0);
  } catch (error) {
    console.error("✕ API check failed:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

runCheck();
