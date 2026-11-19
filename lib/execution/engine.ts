import { ExecutionRequest, ExecutionResponse } from "@/types/execution";
import { executeWithPiston } from "./piston";
import { executeWithJudge0 } from "./judge0";

export async function executeCode(req: ExecutionRequest): Promise<ExecutionResponse> {
  const engine = (process.env.CODE_EXECUTION_ENGINE || "piston").toLowerCase();

  if (engine === "judge0") {
    return executeWithJudge0(req);
  }

  // Default to Piston
  return executeWithPiston(req);
}
