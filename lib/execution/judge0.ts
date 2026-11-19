import { ExecutionRequest, ExecutionResponse } from "@/types/execution";
import { getLanguageConfig } from "@/lib/languages";
import { truncateOutput } from "@/lib/security/sanitizer";

export const DEFAULT_JUDGE0_URL = "http://localhost:2358";

export async function executeWithJudge0(req: ExecutionRequest): Promise<ExecutionResponse> {
  const startTime = Date.now();
  const config = getLanguageConfig(req.language);

  if (!config.judge0Id) {
    return {
      success: false,
      stdout: "",
      stderr: `Language '${req.language}' has no Judge0 mapping.`,
      output: `Language '${req.language}' has no Judge0 mapping.`,
      exitCode: 1,
      timeMs: 0,
      memoryKb: 0,
      status: "error",
      errorMessage: "Unsupported language runtime",
    };
  }

  const baseUrl = (process.env.JUDGE0_API_URL || DEFAULT_JUDGE0_URL).replace(/\/+$/, "");
  const apiKey = process.env.JUDGE0_API_KEY;

  const url = `${baseUrl}/submissions?base64_encoded=false&wait=true`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["X-Auth-Token"] = apiKey;
    headers["X-RapidAPI-Key"] = apiKey;
  }

  const payload = {
    source_code: req.code,
    language_id: config.judge0Id,
    stdin: req.stdin || "",
    cpu_time_limit: 5, // 5s CPU limit
    memory_limit: 262144, // 256MB in KB
    wall_time_limit: 10,
    max_file_size: 4096,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
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
        stderr: `Judge0 returned HTTP ${response.status}: ${errText}`,
        output: "Judge0 error.",
        exitCode: 1,
        timeMs: elapsed,
        memoryKb: 0,
        status: "error",
        errorMessage: errText,
      };
    }

    const data = await response.json();
    const stdout = truncateOutput(data.stdout || "");
    const stderr = truncateOutput(data.stderr || data.compile_output || "");
    const output = truncateOutput(stdout || stderr || data.message || "");
    const statusCode = data.status?.id; // 3 = Accepted, 5 = Time Limit Exceeded, 6 = Compilation Error, etc.
    const isTimeout = statusCode === 5;
    const isCompilationError = statusCode === 6;
    const isSuccess = statusCode === 3;

    const timeMs = data.time ? parseFloat(data.time) * 1000 : elapsed;
    const memoryKb = data.memory ? parseFloat(data.memory) : 0;

    return {
      success: isSuccess,
      stdout,
      stderr,
      output,
      exitCode: isSuccess ? 0 : 1,
      timeMs: Math.round(timeMs),
      memoryKb: Math.round(memoryKb),
      status: isTimeout ? "timeout" : isCompilationError ? "compilation_error" : isSuccess ? "success" : "error",
      errorMessage: !isSuccess ? data.status?.description : undefined,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    const elapsed = Date.now() - startTime;
    return {
      success: false,
      stdout: "",
      stderr: `Judge0 Connection Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      output: "Failed to connect to Judge0 sandbox.",
      exitCode: 1,
      timeMs: elapsed,
      memoryKb: 0,
      status: "error",
    };
  }
}
