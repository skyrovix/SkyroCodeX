import { ExecutionRequest, ExecutionResponse } from "@/types/execution";
import { getLanguageConfig } from "@/lib/languages";
import { truncateOutput } from "@/lib/security/sanitizer";

export const DEFAULT_PISTON_URL = "https://emkc.org/api/v2/piston";

export function getPistonBaseUrl(): string {
  const url = process.env.PISTON_API_URL?.trim();
  if (!url) return DEFAULT_PISTON_URL;
  return url.replace(/\/+$/, ""); // Remove trailing slashes
}

export async function executeWithPiston(req: ExecutionRequest): Promise<ExecutionResponse> {
  const startTime = Date.now();
  const config = getLanguageConfig(req.language);

  if (!config.pistonRuntime) {
    return {
      success: false,
      stdout: "",
      stderr: `Language '${req.language}' does not support server-side execution.`,
      output: `Language '${req.language}' does not support server-side execution.`,
      exitCode: 1,
      status: "error",
      timeMs: 0,
      memoryKb: 0,
      errorMessage: "Unsupported language runtime",
    };
  }

  const baseUrl = getPistonBaseUrl();
  const executeEndpoint = `${baseUrl}/execute`;

  // Prepare payload
  const files = req.files && req.files.length > 0
    ? req.files.map((f) => ({ name: f.name, content: f.content }))
    : [{ name: config.defaultFileName, content: req.code }];

  const payload = {
    language: config.pistonRuntime.language,
    version: config.pistonRuntime.version,
    files,
    stdin: req.stdin || "",
    args: [],
    compile_timeout: 10000,
    run_timeout: 5000, // 5s CPU limit as requested
    compile_memory_limit: -1,
    run_memory_limit: 268435456, // 256MB in bytes
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s global network timeout

  try {
    const response = await fetch(executeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const elapsed = Date.now() - startTime;

    if (!response.ok) {
      const errText = await response.text();
      return {
        success: false,
        stdout: "",
        stderr: `Piston execution engine error (${response.status}): ${errText}`,
        output: `Error connecting to execution sandbox.`,
        exitCode: 1,
        timeMs: elapsed,
        memoryKb: 0,
        status: "error",
        errorMessage: `HTTP ${response.status}: ${errText}`,
      };
    }

    const data = await response.json();
    const run = data.run || {};
    const compile = data.compile;

    // Check if compilation failed
    if (compile && compile.code !== 0) {
      const compileErr = truncateOutput(compile.stderr || compile.output || "Compilation error");
      return {
        success: false,
        stdout: "",
        stderr: compileErr,
        output: compileErr,
        exitCode: compile.code ?? 1,
        timeMs: elapsed,
        memoryKb: 0,
        status: "compilation_error",
        errorMessage: "Compilation failed",
      };
    }

    const stdout = truncateOutput(run.stdout || "");
    const stderr = truncateOutput(run.stderr || "");
    const output = truncateOutput(run.output || stdout || stderr);
    const exitCode = typeof run.code === "number" ? run.code : run.signal ? 137 : 0;
    const isTimeout = run.signal === "SIGKILL" || run.signal === "SIGTERM" || exitCode === 137;

    return {
      success: exitCode === 0 && !isTimeout,
      stdout,
      stderr,
      output,
      exitCode,
      timeMs: elapsed,
      memoryKb: 0, // Piston does not always return exact memory usage in v2, placeholder
      status: isTimeout ? "timeout" : exitCode === 0 ? "success" : "error",
      errorMessage: isTimeout ? "Time limit exceeded (5.0s limit reached)." : undefined,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    const elapsed = Date.now() - startTime;
    const isAbort = error instanceof Error && error.name === "AbortError";

    return {
      success: false,
      stdout: "",
      stderr: isAbort
        ? "Execution timed out before sandbox could complete."
        : `Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      output: isAbort
        ? "Execution timed out (5s limit)."
        : "Failed to communicate with sandbox engine.",
      exitCode: 1,
      timeMs: elapsed,
      memoryKb: 0,
      status: isAbort ? "timeout" : "error",
      errorMessage: error instanceof Error ? error.message : "Network error",
    };
  }
}
