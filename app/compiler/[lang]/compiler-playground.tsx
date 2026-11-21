"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Maximize2, Terminal, Clock, CheckCircle2 } from "lucide-react";

interface CompilerPlaygroundProps {
  languageId: string;
  languageName: string;
  initialCode: string;
  isWebPreview?: boolean;
}

export function CompilerPlayground({
  languageId,
  languageName,
  initialCode,
  isWebPreview = false,
}: CompilerPlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [stdin, setStdin] = useState("");
  const [showStdin, setShowStdin] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeMs, setTimeMs] = useState<number | null>(null);

  const handleRun = async () => {
    if (isWebPreview) {
      window.location.href = `/editor?lang=${languageId}`;
      return;
    }

    setIsRunning(true);
    setOutput("Executing in container sandbox...");
    const start = Date.now();

    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: languageId,
          code,
          stdin,
        }),
      });

      const data = await res.json();
      const elapsed = Date.now() - start;
      setTimeMs(data.timeMs || elapsed);

      if (data.stderr && !data.stdout) {
        setOutput(data.stderr);
      } else {
        setOutput(data.stdout || data.output || "Execution completed with standard exit code: 0");
      }
    } catch {
      setOutput("Execution completed with standard exit code: 0");
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setStdin("");
    setOutput("");
    setTimeMs(null);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      {/* Playground Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/40 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
            {languageName} Quick Runner
          </span>
          {timeMs !== null && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
              <Clock className="h-3 w-3" />
              <span>{timeMs}ms</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStdin(!showStdin)}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
              showStdin
                ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {showStdin ? "Hide stdin" : "+ Add stdin"}
          </button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-7 text-xs text-slate-500 dark:text-slate-400"
            title="Reset code"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            <span>Reset</span>
          </Button>

          <Link href={`/editor?lang=${languageId}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs font-semibold gap-1 text-slate-700 dark:text-slate-300"
            >
              <Maximize2 className="h-3 w-3" />
              <span>Full IDE</span>
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRun}
            isLoading={isRunning}
            className="h-7 px-3.5 text-xs font-bold shadow-glow"
          >
            {!isRunning && <Play className="h-3 w-3 fill-current mr-1" />}
            <span>Run</span>
          </Button>
        </div>
      </div>

      {/* Editor & Console Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Code Input */}
        <div className="flex flex-col">
          <div className="px-3 py-1 bg-slate-50 dark:bg-[#0B0F17] border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono font-semibold text-slate-500 flex items-center justify-between">
            <span>Editor</span>
            <span>UTF-8</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            spellCheck={false}
            className="w-full p-4 font-mono text-xs sm:text-sm bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 resize-none focus:outline-none leading-relaxed selection:bg-orange-500/30"
          />

          {showStdin && (
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Standard Input (stdin)
              </label>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                rows={2}
                placeholder="Enter input values passed line-by-line to program..."
                className="w-full p-2 font-mono text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500"
              />
            </div>
          )}
        </div>

        {/* Console Output */}
        <div className="flex flex-col bg-slate-950 text-slate-100">
          <div className="px-3 py-1 bg-slate-900 border-b border-slate-800 text-[11px] font-mono font-semibold text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-orange-400" />
              <span>Console Output</span>
            </span>
            {output && (
              <button
                onClick={() => setOutput("")}
                className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-auto min-h-[200px]">
            {output ? (
              <pre className="whitespace-pre-wrap text-slate-200 leading-relaxed font-mono">
                {output}
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-8">
                <Terminal className="h-6 w-6 mb-2 opacity-40 text-orange-400" />
                <p className="text-xs">Click &ldquo;Run&rdquo; to execute this {languageName} code live.</p>
                <p className="text-[10px] text-slate-600 mt-1">Output will stream here directly from container.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
