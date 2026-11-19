export const MAX_CODE_LENGTH = 65536; // 64 KB
export const MAX_STDIN_LENGTH = 16384; // 16 KB
export const MAX_OUTPUT_LENGTH = 131072; // 128 KB

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateExecutionInput(code: string, stdin?: string): ValidationResult {
  if (typeof code !== "string" || code.trim().length === 0) {
    return { valid: false, error: "Source code cannot be empty." };
  }

  if (code.length > MAX_CODE_LENGTH) {
    return {
      valid: false,
      error: `Source code exceeds maximum permitted size of ${MAX_CODE_LENGTH / 1024} KB.`,
    };
  }

  if (stdin && stdin.length > MAX_STDIN_LENGTH) {
    return {
      valid: false,
      error: `Standard input exceeds maximum permitted size of ${MAX_STDIN_LENGTH / 1024} KB.`,
    };
  }

  return { valid: true };
}

export function truncateOutput(output: string, maxLength = MAX_OUTPUT_LENGTH): string {
  if (!output) return "";
  if (output.length > maxLength) {
    return output.slice(0, maxLength) + "\n\n[Output truncated: Exceeded 128 KB buffer limit]";
  }
  return output;
}

