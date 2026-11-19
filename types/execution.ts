export interface ExecutionRequest {
  language: string;
  code: string;
  stdin?: string;
  files?: Array<{
    name: string;
    content: string;
  }>;
}

export interface ExecutionResponse {
  success: boolean;
  stdout: string;
  stderr: string;
  output: string;
  exitCode: number;
  timeMs?: number;
  memoryKb?: number;
  status: "success" | "error" | "timeout" | "compilation_error";
  errorMessage?: string;
}

export interface ExecutionStats {
  timeMs: number;
  memoryKb: number;
  exitCode: number;
  status: "idle" | "running" | "success" | "error" | "timeout" | "compilation_error";
}
