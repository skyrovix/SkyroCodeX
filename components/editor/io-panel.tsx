"use client";

import React, { useState } from "react";
import { Terminal, ArrowDownLeft, Clock, Cpu, CheckCircle2, AlertCircle, Copy, Trash2, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTime, formatMemory } from "@/lib/utils";
import { ExecutionStats } from "@/types/execution";

export interface IOPanelProps {
  stdin: string;
  onStdinChange: (val: string) => void;
  stdout: string;
  stderr: string;
  output: string;
  stats: ExecutionStats;
  isRunning: boolean;
  onClear: () => void;
}

export function IOPanel({
  stdin,
  onStdinChange,
  stdout,
  stderr,
  output,
  stats,
  isRunning,
  onClear,
}: IOPanelProps) {
  const [activeTab, setActiveTab] = useState<"output" | "stdin">("output");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    if (stats.status === "running") {
      return (
        <Badge variant="warning" className="animate-pulse bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30">
          Running...
        </Badge>
      );
    }
    if (stats.status === "success") {
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle2 className="h-3 w-3" />
          <span>Exit code: 0</span>
        </Badge>
      );
    }
    if (stats.status === "timeout") {
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="h-3 w-3" />
          <span>Time Limit Exceeded</span>
        </Badge>
      );
    }
    if (stats.status === "error" || stats.status === "compilation_error") {
      return (
        <Badge variant="error" className="gap-1">
          <AlertCircle className="h-3 w-3" />
          <span>Exit code: {stats.exitCode}</span>
        </Badge>
      );
    }
    return <Badge variant="outline">Idle</Badge>;
  };

  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-[#0B0F17] border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 transition-colors">
      {/* Panel Header Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-3 py-1.5 bg-slate-100/80 dark:bg-slate-900/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("output")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === "output"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-orange-500" />
            <span>Console</span>
            {stderr && <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>}
          </button>

          <button
            onClick={() => setActiveTab("stdin")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === "stdin"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <ArrowDownLeft className="h-3.5 w-3.5 text-amber-500" />
            <span>I/O (stdin)</span>
            {stdin.trim().length > 0 && <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>}
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5">
          {activeTab === "output" && output && (
            <button
              onClick={handleCopy}
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
              title="Copy output"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          )}
          <button
            onClick={onClear}
            className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
            title="Clear output"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-auto p-3 font-mono text-xs bg-white dark:bg-[#0B0F17]">
        {activeTab === "output" ? (
          <div className="h-full flex flex-col justify-between">
            <div className="overflow-y-auto whitespace-pre-wrap select-text space-y-2">
              {isRunning && (
                <div className="flex items-center gap-2 text-orange-500 animate-pulse">
                  <span className="inline-block h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
                  <span>Compiling and running in sandbox...</span>
                </div>
              )}

              {!isRunning && !output && (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 select-none">
                  <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center mb-3 shadow-sm text-slate-400 dark:text-slate-500">
                    <Terminal className="h-7 w-7 text-orange-500" />
                  </div>
                  <div className="font-bold text-sm text-slate-800 dark:text-slate-200">Live Console</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[220px]">
                    Click <span className="text-orange-500 font-semibold">Run</span> or press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Ctrl+Enter</kbd> to execute
                  </p>
                </div>
              )}

              {!isRunning && stdout && (
                <div className="text-slate-800 dark:text-slate-100 leading-relaxed font-mono">{stdout}</div>
              )}

              {!isRunning && stderr && (
                <div className="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/25 p-2.5 rounded border border-rose-200 dark:border-rose-900/40">
                  <div className="font-semibold text-rose-700 dark:text-rose-300 mb-1">Standard Error:</div>
                  {stderr}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <label className="text-[11px] font-sans text-slate-600 dark:text-slate-400 mb-1 font-medium">
              Provide input passed to standard input (stdin) before execution:
            </label>
            <textarea
              value={stdin}
              onChange={(e) => onStdinChange(e.target.value)}
              placeholder="e.g. 5&#10;10 20 30"
              className="flex-1 w-full resize-none rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono text-xs"
            />
          </div>
        )}
      </div>

      {/* Execution Stats Footer */}
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 px-3 py-1.5 text-[11px] text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" title="Execution Wall Time">
            <Clock className="h-3 w-3 text-orange-500" />
            <span>Time: {formatTime(stats.timeMs)}</span>
          </div>

          <div className="flex items-center gap-1" title="Memory Consumed">
            <Cpu className="h-3 w-3 text-amber-500" />
            <span>Mem: {formatMemory(stats.memoryKb)}</span>
          </div>
        </div>

        <div>{getStatusBadge()}</div>
      </div>
    </div>
  );
}
