import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A funny and witty critique in Hinglish with emojis.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of detected issues, ordered from most serious to least.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue appears.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short title of the issue in Hinglish with an emoji.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact problematic code copied from the submission.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of why this is problematic, in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "How it should have been written or fixed, in Hinglish.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete fixed code in the same language without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Key learning or memorable tip in Hinglish with emojis.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
