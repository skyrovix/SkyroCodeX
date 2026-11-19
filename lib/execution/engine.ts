import { ExecutionRequest, ExecutionResponse } from "@/types/execution";
import { executeWithPiston, getPistonBaseUrl, DEFAULT_PISTON_URL } from "./piston";
import { executeWithJudge0 } from "./judge0";
import { executeWithPaiza } from "./paiza";

export async function executeCode(req: ExecutionRequest): Promise<ExecutionResponse> {
  const engine = (process.env.CODE_EXECUTION_ENGINE || "auto").toLowerCase();

  // 1. Explicit Judge0 selection
  if (engine === "judge0") {
    return executeWithJudge0(req);
  }

  // 2. Explicit Paiza selection
  if (engine === "paiza") {
    return executeWithPaiza(req);
  }

  // 3. Auto / Piston mode with failover
  const baseUrl = getPistonBaseUrl();
  const isCustomPiston = baseUrl !== DEFAULT_PISTON_URL && !baseUrl.includes("emkc.org");

  if (isCustomPiston) {
    // Self-hosted Piston configured by user
    return executeWithPiston(req);
  }

  // If using public EMKC Piston (which now returns 401 whitelist-only),
  // seamlessly failover to the isolated Paiza cloud sandbox so the user's code executes instantly!
  try {
    const pistonResult = await executeWithPiston(req);

    // If Piston returns 401 or whitelist error, failover to Paiza sandbox
    if (
      !pistonResult.success &&
      (pistonResult.stderr.includes("401") ||
        pistonResult.stderr.includes("whitelist") ||
        pistonResult.errorMessage?.includes("401"))
    ) {
      return await executeWithPaiza(req);
    }

    return pistonResult;
  } catch (error) {
    console.warn("Piston failed, falling back to Paiza sandbox:", error);
    return executeWithPaiza(req);
  }
}
