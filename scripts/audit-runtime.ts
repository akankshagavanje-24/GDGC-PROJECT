import { LIMITS, SAMPLE } from "../config/app.config";

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

async function assert(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    results.push({ name, passed: true });
    console.log(`✓ [PASS] ${name}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    results.push({ name, passed: false, details: msg });
    console.error(`✕ [FAIL] ${name}: ${msg}`);
  }
}

async function main() {
  console.log("Starting Runtime & API Test Suite on http://localhost:3000...\n");

  // 1. GET /
  await assert("GET / returns 200 and contains app shell", async () => {
    const res = await fetch("http://localhost:3000/");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    const html = await res.text();
    if (!html.includes("Code Roaster")) throw new Error("App name missing from HTML");
    if (!html.includes("Awaiting Code Submission")) throw new Error("Empty state missing from HTML");
  });

  // 2. Empty code
  await assert("POST /api/roast returns 400 for empty code", async () => {
    const res = await fetch("http://localhost:3000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "" }),
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    const data = await res.json();
    if (data.error !== "No code provided.") throw new Error(`Unexpected error message: ${data.error}`);
  });

  // 3. Whitespace code
  await assert("POST /api/roast returns 400 for whitespace code", async () => {
    const res = await fetch("http://localhost:3000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "   \n\t   " }),
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    const data = await res.json();
    if (data.error !== "No code provided.") throw new Error(`Unexpected error message: ${data.error}`);
  });

  // 4. Exceed max code length
  await assert("POST /api/roast returns 400 when code exceeds 20,000 characters", async () => {
    const hugeCode = "x".repeat(LIMITS.maxCodeLength + 10);
    const res = await fetch("http://localhost:3000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: hugeCode }),
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    const data = await res.json();
    if (!data.error.includes("exceeds maximum allowed length")) {
      throw new Error(`Unexpected error message: ${data.error}`);
    }
  });

  // 5. Exceed max error message length
  await assert("POST /api/roast returns 400 when error message exceeds 4,000 characters", async () => {
    const hugeError = "e".repeat(LIMITS.maxErrorMessageLength + 10);
    const res = await fetch("http://localhost:3000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "print('hello')", errorMessage: hugeError }),
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    const data = await res.json();
    if (!data.error.includes("exceeds maximum allowed length")) {
      throw new Error(`Unexpected error message: ${data.error}`);
    }
  });

  // 6. Invalid JSON body
  await assert("POST /api/roast returns 400 for malformed JSON", async () => {
    const res = await fetch("http://localhost:3000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ malformed json",
    });
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    const data = await res.json();
    if (data.error !== "Invalid JSON in request body.") {
      throw new Error(`Unexpected error message: ${data.error}`);
    }
  });

  // 7. Full end-to-end API call with real Gemini output validation
  await assert("POST /api/roast returns 200 with conforming schema for sample bug", async () => {
    const res = await fetch("http://localhost:3000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: SAMPLE.language,
        code: SAMPLE.code,
        roastLevel: "savage",
        errorMessage: "TypeError: can only concatenate list (not 'float') to list",
      }),
    });
    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Expected 200, got ${res.status}: ${err}`);
    }
    const data = await res.json();
    if (!data.roast || typeof data.roast !== "string") {
      throw new Error("Missing or invalid 'roast' field");
    }
    if (!Array.isArray(data.issues)) {
      throw new Error("'issues' field is not an array");
    }
    if (data.issues.length > 0) {
      const first = data.issues[0];
      if (typeof first.line !== "number") throw new Error("Issue line is not a number");
      if (!first.severity) throw new Error("Issue severity missing");
      if (!first.codeSnippet) throw new Error("Issue codeSnippet missing");
      if (!first.diagnosis) throw new Error("Issue diagnosis missing");
      if (!first.expected) throw new Error("Issue expected missing");
    }
    if (!data.correctedCode || typeof data.correctedCode !== "string") {
      throw new Error("Missing or invalid 'correctedCode' field");
    }
    if (!data.takeaway || typeof data.takeaway !== "string") {
      throw new Error("Missing or invalid 'takeaway' field");
    }
  });

  // 8. Unknown language / roast level fallback to defaults
  await assert("POST /api/roast gracefully handles unknown language & roast level", async () => {
    const res = await fetch("http://localhost:3000/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "unknown_lang_xyz",
        roastLevel: "ultra_extreme_xyz",
        code: "def test():\n    return 42\n",
      }),
    });
    if (res.status !== 200) {
      const err = await res.text();
      throw new Error(`Expected 200, got ${res.status}: ${err}`);
    }
    const data = await res.json();
    if (!data.roast) throw new Error("Roast output missing on fallback");
  });

  console.log("\n=========================================");
  const passedCount = results.filter((r) => r.passed).length;
  console.log(`Results: ${passedCount}/${results.length} tests passed.`);
  console.log("=========================================\n");

  if (passedCount < results.length) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test suite runner crashed:", err);
  process.exit(1);
});
