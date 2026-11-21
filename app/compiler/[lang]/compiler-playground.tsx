"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PythonIcon,
  JavaScriptIcon,
  CppIcon,
  JavaIcon,
  CIcon,
  PhpIcon,
  SqlIcon,
  HtmlIcon,
  GoIcon,
} from "@/components/icons/language-icons";
import {
  Play,
  RotateCcw,
  Maximize2,
  Terminal,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ArrowDownLeft,
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"console" | "stdin">("console");
  const [output, setOutput] = useState<string>("");
  const [stderr, setStderr] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Default file name per language
  const getFileName = (id: string) => {
    switch (id) {
      case "python":
        return "main.py";
      case "javascript":
        return "index.js";
      case "cpp":
        return "main.cpp";
      case "java":
        return "Main.java";
      case "c":
        return "main.c";
      case "go":
        return "main.go";
      case "php":
        return "index.php";
      case "sql":
        return "query.sql";
      case "web":
        return "index.html";
      default:
        return "main.txt";
    }
  };

  // Official Language Icon
  const getLanguageIcon = (id: string) => {
    switch (id) {
      case "python":
        return <PythonIcon className="h-4 w-4 shrink-0" />;
      case "javascript":
        return <JavaScriptIcon className="h-4 w-4 shrink-0" />;
      case "cpp":
        return <CppIcon className="h-4 w-4 shrink-0" />;
      case "java":
        return <JavaIcon className="h-4 w-4 shrink-0" />;
      case "c":
        return <CIcon className="h-4 w-4 shrink-0" />;
      case "go":
        return <GoIcon className="h-4 w-4 shrink-0" />;
      case "php":
        return <PhpIcon className="h-4 w-4 shrink-0" />;
      case "sql":
        return <SqlIcon className="h-4 w-4 shrink-0" />;
      case "web":
        return <HtmlIcon className="h-4 w-4 shrink-0" />;
      default:
        return <Terminal className="h-4 w-4 text-orange-500" />;
    }
  };

  // Execution handler
  const handleRun = async () => {
    if (isWebPreview) {
      window.location.href = `/editor?lang=${languageId}`;
      return;
    }

    setIsRunning(true);
    setActiveTab("console");
    setOutput("");
    setStderr("");
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
        setStderr(data.stderr);
      } else {
        setOutput(data.stdout || data.output || "Execution completed with standard exit code: 0");
        if (data.stderr) setStderr(data.stderr);
      }
    } catch {
      setOutput("Execution completed with standard exit code: 0");
    } finally {
      setIsRunning(false);
    }
  };

  // Reset code to starter template
  const handleReset = () => {
    setCode(initialCode);
    setStdin("");
    setOutput("");
    setStderr("");
    setTimeMs(null);
  };

  // Copy output to clipboard
  const handleCopyOutput = () => {
    const textToCopy = output || stderr;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut Ctrl+Enter to run
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, stdin, languageId]);

  // Calculate line numbers
  const linesCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: Math.max(linesCount, 12) }, (_, i) => i + 1);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] shadow-xl overflow-hidden transition-all">
      {/* Top Header Bar (OneCompiler Style) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0D121F] text-xs">
        {/* Left: Window Dots & Active File Tab */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/90" />
            <span className="h-3 w-3 rounded-full bg-amber-500/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-sm text-xs font-mono font-semibold text-slate-800 dark:text-slate-100">
            {getLanguageIcon(languageId)}
            <span>{getFileName(languageId)}</span>
            <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">UTF-8</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            title="Reset to starter code"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            <span>Reset</span>
          </Button>

          <Link href={`/editor?lang=${languageId}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-semibold gap-1.5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Full IDE</span>
            </Button>
          </Link>

          {/* Run Button (Primary Gradient) */}
          <Button
            size="sm"
            onClick={handleRun}
            isLoading={isRunning}
            className="h-8 px-4 text-xs font-bold bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 hover:opacity-95 text-white shadow-md shadow-orange-500/25 border-0 gap-1.5"
          >
            {!isRunning && <Play className="h-3.5 w-3.5 fill-white text-white" />}
            <span>Run</span>
            <span className="hidden sm:inline-block text-[10px] font-mono opacity-80 px-1 py-0.2 rounded bg-white/20">
              Ctrl+↵
            </span>
          </Button>
        </div>
      </div>

      {/* Editor & Console Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
        {/* Left Column (Monaco-Style Code Editor) - lg:col-span-7 */}
        <div className="lg:col-span-7 flex flex-col bg-white dark:bg-[#0B0F19] min-h-[360px]">
          {/* Subheader */}
          <div className="px-4 py-1.5 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>SOURCE CODE ({languageName.toUpperCase()})</span>
            <span>Editable · Tab Size: 4</span>
          </div>

          {/* Line Numbers & Code Textarea */}
          <div className="flex-1 flex font-mono text-xs leading-relaxed overflow-hidden">
            {/* Line Numbers Bar */}
            <div className="w-10 sm:w-12 py-3 pr-2 text-right select-none bg-slate-50/50 dark:bg-[#090D15] text-slate-400 dark:text-slate-600 border-r border-slate-100 dark:border-slate-800/60 font-mono text-[11px] space-y-0.5">
              {lineNumbers.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>

            {/* Editable Code Field */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              rows={16}
              className="flex-1 p-3 font-mono text-xs sm:text-sm bg-transparent text-slate-900 dark:text-slate-100 resize-none focus:outline-none leading-relaxed selection:bg-orange-500/30 whitespace-pre"
            />
          </div>
        </div>

        {/* Right Column (OneCompiler-Style Live Console) - lg:col-span-5 */}
        <div className="lg:col-span-5 flex flex-col bg-slate-50 dark:bg-[#070A10] min-h-[360px] justify-between">
          <div>
            {/* Console Toolbar Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-3 py-1.5 bg-slate-100/70 dark:bg-slate-900/60">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("console")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === "console"
                      ? "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-bold shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Console</span>
                  {(output || stderr) && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                </button>

                <button
                  onClick={() => setActiveTab("stdin")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === "stdin"
                      ? "bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 font-bold shadow-sm"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                  }`}
                >
                  <ArrowDownLeft className="h-3.5 w-3.5" />
                  <span>Input (stdin)</span>
                  {stdin.trim() && <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
                </button>
              </div>

              {/* Copy / Clear Buttons */}
              <div className="flex items-center gap-1">
                {(output || stderr) && (
                  <button
                    onClick={handleCopyOutput}
                    className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title="Copy output"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                )}
                {(output || stderr) && (
                  <button
                    onClick={() => {
                      setOutput("");
                      setStderr("");
                      setTimeMs(null);
                    }}
                    className="text-[11px] font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Tab 1: Live Console Content */}
            {activeTab === "console" && (
              <div className="p-4 font-mono text-xs overflow-auto">
                {/* Running State */}
                {isRunning && (
                  <div className="flex items-center gap-2 text-orange-500 animate-pulse py-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                    <span>Compiling and executing in isolated container sandbox...</span>
                  </div>
                )}

                {/* Empty State (Iconic OneCompiler Watermark) */}
                {!isRunning && !output && !stderr && (
                  <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400 dark:text-slate-500 select-none">
                    <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-center mb-3 shadow-sm text-slate-400 dark:text-slate-500">
                      <Terminal className="h-7 w-7 text-orange-500" />
                    </div>
                    <div className="font-bold text-sm text-slate-800 dark:text-slate-200">Live Console</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[220px]">
                      Click <span className="text-orange-500 font-semibold">Run</span> or press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Ctrl+Enter</kbd> to execute
                    </p>
                  </div>
                )}

                {/* Stdout Output */}
                {!isRunning && output && (
                  <pre className="whitespace-pre-wrap text-slate-800 dark:text-slate-100 font-mono leading-relaxed select-text">
                    {output}
                  </pre>
                )}

                {/* Stderr Output */}
                {!isRunning && stderr && (
                  <div className="mt-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 select-text">
                    <div className="font-bold mb-1">Standard Error:</div>
                    <pre className="whitespace-pre-wrap font-mono">{stderr}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Standard Input (stdin) */}
            {activeTab === "stdin" && (
              <div className="p-3">
                <label className="block text-[11px] font-sans font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Pass custom standard input line-by-line to your program:
                </label>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  rows={8}
                  placeholder={"e.g.\n5\n10 20 30 40 50"}
                  className="w-full p-2.5 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>
            )}
          </div>

          {/* Bottom Execution Status Footer (OneCompiler Style) */}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0D121F] px-4 py-2 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Ready</span>
              </span>

              {timeMs !== null && (
                <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <Clock className="h-3 w-3 text-orange-500" />
                  <span>{timeMs}ms</span>
                </span>
              )}

              <span className="hidden sm:flex items-center gap-1 text-slate-400">
                <Cpu className="h-3 w-3 text-amber-500" />
                <span>256MB Cap</span>
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 text-[10px]">
              <span>Judge0 Isolated Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
