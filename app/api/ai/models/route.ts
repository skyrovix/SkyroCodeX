import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if Ollama is running locally
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch("http://localhost:11434/api/tags", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const localModels = (data.models || []).map((m: { name: string; size: number }) => {
        const sizeGb = (m.size / (1024 * 1024 * 1024)).toFixed(1);
        const isQwen = m.name.toLowerCase().includes("qwen");
        return {
          id: m.name,
          label: `${m.name}`,
          tag: isQwen ? "Local Qwen (Recommended)" : `Local Ollama (${sizeGb} GB)`,
          isLocal: true,
        };
      });

      // Sort Qwen models first
      localModels.sort((a: { id: string }, b: { id: string }) => {
        if (a.id.toLowerCase().includes("qwen")) return -1;
        if (b.id.toLowerCase().includes("qwen")) return 1;
        return 0;
      });

      return NextResponse.json({
        ollamaConnected: true,
        models: [
          ...localModels,
          { id: "qwen-2.5-coder-32b", label: "Qwen 2.5 Coder 32B", tag: "Cloud Fallback", isLocal: false },
        ],
      });
    }
  } catch {
    // Ollama not reachable
  }

  return NextResponse.json({
    ollamaConnected: false,
    models: [
      { id: "qwen3:latest", label: "qwen3:latest", tag: "Local Ollama", isLocal: true },
      { id: "llama3.1:8b", label: "llama3.1:8b", tag: "Local Ollama", isLocal: true },
      { id: "qwen-2.5-coder-32b", label: "Qwen 2.5 Coder 32B", tag: "Cloud", isLocal: false },
    ],
  });
}

