import { ExecutionRequest, ExecutionResponse } from "@/types/execution";
import { truncateOutput } from "@/lib/security/sanitizer";

const PAIZA_LANG_MAP: Record<string, string> = {
  python: "python3",
  javascript: "javascript",
  java: "java",
  c: "c",
  cpp: "cpp",
  go: "go",
  php: "php",
  sql: "mysql",
};

export async function executeWithPaiza(req: ExecutionRequest): Promise<ExecutionResponse> {
  const startTime = Date.now();
  const paizaLang = PAIZA_LANG_MAP[req.language] || req.language;

  try {
    // 1. Create runner session
    const createRes = await fetch("https://api.paiza.io/runners/create.json", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        source_code: req.code,
        language: paizaLang,
        input: req.stdin || "",
        api_key: "guest",
        longpoll: "true",
      }).toString(),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`Paiza Runner Create error (${createRes.status}): ${errText}`);
    }

    const { id } = await createRes.json();
    if (!id) throw new Error("No session ID returned from sandbox runner");

    // 2. Poll for completion (up to 8 seconds)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let details: any = null;
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const detRes = await fetch(`https://api.paiza.io/runners/get_details.json?id=${id}&api_key=guest`);
      if (detRes.ok) {
        details = await detRes.json();
        if (details.status === "completed") break;
      }
    }

    const elapsed = Date.now() - startTime;

    if (!details || details.status !== "completed") {
      return {
        success: false,
        stdout: "",
        stderr: "Sandbox execution timed out after 6.0 seconds.",
        output: "Time limit exceeded.",
        exitCode: 137,
        timeMs: elapsed,
        memoryKb: 0,
        status: "timeout",
        errorMessage: "Sandbox timeout",
      };
    }

    // Check compilation errors (build_stderr)
    const compileErr = details.build_stderr || "";
    if (compileErr && details.build_exit_code && details.build_exit_code !== 0 && details.build_exit_code !== "0") {
      const formatted = truncateOutput(compileErr);
      return {
        success: false,
        stdout: "",
        stderr: formatted,
        output: formatted,
        exitCode: parseInt(details.build_exit_code, 10) || 1,
        timeMs: elapsed,
        memoryKb: 0,
        status: "compilation_error",
        errorMessage: "Compilation failed",
      };
    }

    const stdout = truncateOutput(details.stdout || "");
    const stderr = truncateOutput(details.stderr || "");
    const rawExitCode = details.exit_code ?? 0;
    const exitCode = typeof rawExitCode === "string" ? parseInt(rawExitCode, 10) : rawExitCode;
    const isTimeout = details.result === "timeout" || exitCode === 137;
    const isSuccess = details.result === "success" && exitCode === 0;

    const timeSec = details.time ? parseFloat(details.time) : elapsed / 1000;
    const memoryBytes = details.memory ? parseInt(details.memory, 10) : 0;
    const memoryKb = Math.round(memoryBytes / 1024);

    return {
      success: isSuccess,
      stdout,
      stderr,
      output: truncateOutput(stdout || stderr || "Execution completed with no output."),
      exitCode,
      timeMs: Math.round(timeSec * 1000),
      memoryKb,
      status: isTimeout ? "timeout" : isSuccess ? "success" : "error",
      errorMessage: !isSuccess && stderr ? stderr : undefined,
    };
  } catch (error: unknown) {
    const elapsed = Date.now() - startTime;
    return {
      success: false,
      stdout: "",
      stderr: `Sandbox execution failed: ${error instanceof Error ? error.message : "Network error"}`,
      output: "Execution failed.",
      exitCode: 1,
      timeMs: elapsed,
      memoryKb: 0,
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Execution failed",
    };
  }
}

