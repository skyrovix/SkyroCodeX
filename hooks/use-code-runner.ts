"use client";

import { useState, useCallback } from "react";
import { ExecutionResponse, ExecutionStats } from "@/types/execution";

export function useCodeRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [output, setOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<ExecutionStats>({
    timeMs: 0,
    memoryKb: 0,
    exitCode: 0,
    status: "idle",
  });

  const runCode = useCallback(
    async (
      language: string,
      code: string,
      stdin = "",
      files?: Array<{ name: string; content: string }>
    ): Promise<ExecutionResponse | null> => {
      setIsRunning(true);
      setErrorMessage(null);
      setStats((prev) => ({ ...prev, status: "running" }));

      try {
        const response = await fetch("/api/run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            code,
            stdin,
            files,
          }),
        });

        const data: ExecutionResponse & { error?: string } = await response.json();

        if (!response.ok) {
          const err = data.error || `Execution failed with HTTP ${response.status}`;
          setErrorMessage(err);
          setStderr(err);
          setOutput(err);
          setStats({
            timeMs: 0,
            memoryKb: 0,
            exitCode: response.status === 429 ? 429 : 1,
            status: response.status === 429 ? "timeout" : "error",
          });
          return null;
        }

        setStdout(data.stdout || "");
        setStderr(data.stderr || "");
        setOutput(data.output || (data.stdout ? data.stdout : data.stderr));
        setErrorMessage(data.errorMessage || null);

        setStats({
          timeMs: data.timeMs || 0,
          memoryKb: data.memoryKb || 0,
          exitCode: data.exitCode,
          status: data.status,
        });

        return data;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to connect to execution server";
        setErrorMessage(message);
        setStderr(message);
        setOutput(message);
        setStats({
          timeMs: 0,
          memoryKb: 0,
          exitCode: 1,
          status: "error",
        });
        return null;
      } finally {
        setIsRunning(false);
      }
    },
    []
  );

  const clearOutput = useCallback(() => {
    setStdout("");
    setStderr("");
    setOutput("");
    setErrorMessage(null);
    setStats({
      timeMs: 0,
      memoryKb: 0,
      exitCode: 0,
      status: "idle",
    });
  }, []);

  return {
    isRunning,
    stdout,
    stderr,
    output,
    errorMessage,
    stats,
    runCode,
    clearOutput,
  };
}

