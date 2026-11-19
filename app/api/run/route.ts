import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { executeCode } from "@/lib/execution/engine";
import { getRateLimiter } from "@/lib/security/rate-limiter";
import { validateExecutionInput } from "@/lib/security/sanitizer";

const executionSchema = z.object({
  language: z.string().min(1, "Language is required"),
  code: z.string().min(1, "Source code is required"),
  stdin: z.string().optional().default(""),
  files: z
    .array(
      z.object({
        name: z.string(),
        content: z.string(),
      })
    )
    .optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimiter = getRateLimiter();
    const rateLimit = await rateLimiter.limit(ip);

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait before executing code again.",
          status: "error",
          remaining: 0,
          reset: rateLimit.reset,
        },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimit.reset.toString(),
            "X-RateLimit-Limit": rateLimit.limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.reset.toString(),
          },
        }
      );
    }

    // 2. Body Parsing & Zod Validation
    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    const parseResult = executionSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: parseResult.error.errors.map((e) => e.message).join(", "),
        },
        { status: 400 }
      );
    }

    const { language, code, stdin, files } = parseResult.data;

    // 3. Security Sanitization and Size Limits
    const inputValidation = validateExecutionInput(code, stdin);
    if (!inputValidation.valid) {
      return NextResponse.json(
        { success: false, error: inputValidation.error },
        { status: 400 }
      );
    }

    // 4. Delegate to Execution Engine (Piston / Judge0)
    const result = await executeCode({
      language,
      code,
      stdin,
      files,
    });

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "X-RateLimit-Limit": rateLimit.limit.toString(),
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      },
    });
  } catch (error: unknown) {
    console.error("Execution route unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        stdout: "",
        stderr: "Internal server error occurred during code execution.",
        output: "Internal server error.",
        exitCode: 1,
        timeMs: 0,
        memoryKb: 0,
        status: "error",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

