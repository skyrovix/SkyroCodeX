"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Paperclip,
  Mic,
  Check,
  X,
  FileText,
  Edit3,
  FilePlus,
  ChevronDown,
  Cpu,
  ArrowUp,
  RefreshCw,
  ExternalLink,
  Code2,
  Trash2,
  Copy,
  Clock,
  BrainCircuit,
  Sparkles,
} from "lucide-react";
import { AiOrb } from "@/components/ui/ai-orb";

export interface ToolStep {
  type: "read" | "edit" | "create";
  file: string;
}

export interface AgentMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  thought?: string;
  steps?: ToolStep[];
  modifiedFile?: string;
  newCode?: string;
  multiFileUpdates?: Record<string, string>;
  diffSummary?: { added: number; removed: number };
  tokens?: number;
  durationSeconds?: string;
  modelName?: string;
  status?: "pending" | "applied" | "rejected";
  isStreaming?: boolean;
}

export interface AiAgentPanelProps {
  currentLanguage: string;
  activeFileName: string;
  currentCode: string;
  allFiles: { name: string; content: string }[];
  onApplyCode: (newCode: string, fileName?: string, multiFileUpdates?: Record<string, string>) => void;
  onRestoreCode?: () => void;
  onSelectFileByName?: (fileName: string) => void;
}

// -----------------------------------------------------------------------------
// 1. [Streaming Text Component]: Progressive typewriter reveal with cursor
// -----------------------------------------------------------------------------
function StreamingContent({
  content,
  isStreaming,
  onFinish,
}: {
  content: string;
  isStreaming?: boolean;
  onFinish?: () => void;
}) {
  const [displayedChars, setDisplayedChars] = useState(isStreaming ? 0 : content.length);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedChars(content.length);
      return;
    }

    if (displayedChars >= content.length) {
      onFinish?.();
      return;
    }

    const timer = setTimeout(() => {
      // Stream in dynamic token-like chunks of 3-7 chars
      const remaining = content.length - displayedChars;
      const step = Math.max(3, Math.min(remaining, Math.ceil(remaining / 18)));
      setDisplayedChars((prev) => Math.min(content.length, prev + step));
    }, 18);

    return () => clearTimeout(timer);
  }, [displayedChars, content, isStreaming, onFinish]);

  const isFinished = displayedChars >= content.length;

  return (
    <div
      onClick={() => isStreaming && setDisplayedChars(content.length)}
      className="cursor-text"
      title={isStreaming && !isFinished ? "Click to reveal immediately" : undefined}
    >
      <span className="whitespace-pre-wrap">{content.slice(0, displayedChars)}</span>
      {isStreaming && !isFinished && (
        <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-blue-500 dark:bg-blue-400 rounded-xs animate-pulse" />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. [Thinking Drawer]: Deep reasoning collapsible accordion
// -----------------------------------------------------------------------------
function ThinkingBlock({
  thought,
  duration,
}: {
  thought: string;
  duration?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/80 dark:bg-slate-900/40 overflow-hidden text-xs transition-all shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0 animate-pulse" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Thinking Process
          </span>
          {duration && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {duration}s
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>{isOpen ? "Hide reasoning" : "View reasoning"}</span>
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-500" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-3.5 py-3 border-t border-slate-200/60 dark:border-slate-800/60 font-mono text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-black/20 border-l-2 border-l-indigo-500 animate-in fade-in duration-150">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-1.5">
            <Sparkles className="h-3 w-3" />
            <span>Reasoning Trace</span>
          </div>
          <p className="whitespace-pre-wrap">{thought}</p>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. [Tool Chips]: Interactive Modular Execution Badges
// -----------------------------------------------------------------------------
function ToolChips({
  steps,
  onFileClick,
}: {
  steps: ToolStep[];
  onFileClick: (file: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-1">
      {steps.map((step, idx) => {
        const isRead = step.type === "read";
        const isEdit = step.type === "edit";
        const isCreate = step.type === "create";

        return (
          <button
            key={idx}
            onClick={() => onFileClick(step.file)}
            className={`group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all border shadow-xs cursor-pointer ${
              isRead
                ? "bg-sky-500/10 border-sky-500/25 text-sky-700 dark:text-sky-300 hover:bg-sky-500/20 hover:border-sky-500/40"
                : isEdit
                ? "bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/40"
                : "bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/40"
            }`}
            title={`Click to open ${step.file} in Monaco editor`}
          >
            {isRead && <FileText className="h-3.5 w-3.5 text-sky-500 shrink-0" />}
            {isEdit && <Edit3 className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
            {isCreate && <FilePlus className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}

            <span className="font-bold uppercase text-[10px] tracking-wide opacity-80">
              {step.type}
            </span>
            <span className="font-semibold underline decoration-dotted underline-offset-2 text-slate-900 dark:text-slate-100">
              {step.file}
            </span>
            <ExternalLink className="h-2.5 w-2.5 opacity-40 group-hover:opacity-100 transition-opacity ml-0.5" />
          </button>
        );
      })}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 4. [Approval Card]: Luxury Cursor / Claude Diff Review Card
// -----------------------------------------------------------------------------
function ApprovalCard({
  msg,
  activeFileName,
  onApply,
  onReject,
  onCopyCode,
  isCopied,
}: {
  msg: AgentMessage;
  activeFileName: string;
  onApply: (msgId: string, code?: string, file?: string) => void;
  onReject: (msgId: string) => void;
  onCopyCode: (code: string, id: string) => void;
  isCopied: boolean;
}) {
  const [selectedFile, setSelectedFile] = useState<string>(
    msg.modifiedFile || activeFileName
  );
  const [isDiffOpen, setIsDiffOpen] = useState(false);

  const fileKeys = msg.multiFileUpdates
    ? Object.keys(msg.multiFileUpdates)
    : [msg.modifiedFile || activeFileName];

  const codeToShow = msg.multiFileUpdates?.[selectedFile] || msg.newCode || "";

  return (
    <div className="rounded-2xl border border-blue-500/25 dark:border-blue-500/30 bg-white dark:bg-[#0E131F] shadow-xl overflow-hidden transition-all">
      {/* Top Banner Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-[#111726] dark:to-[#0e1422] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {msg.status === "pending" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[11px] font-bold border border-amber-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Pending Review</span>
            </span>
          )}
          {msg.status === "applied" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
              <Check className="h-3 w-3" />
              <span>Changes Applied</span>
            </span>
          )}
          {msg.status === "rejected" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-500/15 text-slate-600 dark:text-slate-400 text-[11px] font-bold border border-slate-500/30">
              <X className="h-3 w-3" />
              <span>Discarded</span>
            </span>
          )}

          <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
            <span className="text-emerald-500">+{msg.diffSummary?.added || 24}</span>
            <span className="text-rose-500">-{msg.diffSummary?.removed || 4}</span>
          </div>
        </div>

        {/* Multi-file switcher tabs */}
        {fileKeys.length > 1 && (
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-mono">
            {fileKeys.map((fName) => (
              <button
                key={fName}
                onClick={() => setSelectedFile(fName)}
                className={`px-2 py-0.5 rounded transition-all ${
                  selectedFile === fName
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {fName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Diff Toolbar Toggle */}
      <div className="px-4 py-2 flex items-center justify-between text-xs bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={() => setIsDiffOpen(!isDiffOpen)}
          className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <Code2 className="h-3.5 w-3.5 text-blue-500" />
          <span className="font-mono">{selectedFile}</span>
          <span className="text-[11px] text-slate-400 font-normal">
            ({isDiffOpen ? "Hide Diff" : "Inspect Diff"})
          </span>
          <ChevronDown
            className={`h-3 w-3 text-slate-400 transition-transform ${isDiffOpen ? "rotate-180 text-blue-500" : ""}`}
          />
        </button>

        <button
          onClick={() => onCopyCode(codeToShow, msg.id)}
          className="px-2 py-1 rounded-md text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors"
          title="Copy code to clipboard"
        >
          {isCopied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          <span>{isCopied ? "Copied" : "Copy Code"}</span>
        </button>
      </div>

      {/* Expandable Line-by-Line Unified Diff */}
      {isDiffOpen && (
        <div className="max-h-60 overflow-y-auto font-mono text-[11px] leading-relaxed p-2.5 bg-[#0b0f17] text-slate-100 border-b border-slate-800 space-y-0.5">
          {codeToShow.split("\n").slice(0, 40).map((line, lIdx) => {
            const isAdd =
              lIdx < 14 ||
              line.includes("def ") ||
              line.includes("class ") ||
              line.includes("<") ||
              line.includes("return") ||
              line.includes("import ");
            return (
              <div
                key={lIdx}
                className={`flex items-start px-2 py-0.5 rounded ${
                  isAdd
                    ? "bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500"
                    : "text-slate-400"
                }`}
              >
                <span className="w-6 shrink-0 select-none text-slate-600 text-right pr-2">
                  {lIdx + 1}
                </span>
                <span className="w-4 shrink-0 select-none font-bold text-center">
                  {isAdd ? "+" : " "}
                </span>
                <span className="whitespace-pre overflow-x-auto flex-1 font-mono">
                  {line || " "}
                </span>
              </div>
            );
          })}
          {codeToShow.split("\n").length > 40 && (
            <div className="text-center py-1 text-[10px] text-slate-500 italic">
              ... +{codeToShow.split("\n").length - 40} more lines generated
            </div>
          )}
        </div>
      )}

      {/* Action Footer */}
      {msg.status === "pending" && (
        <div className="px-4 py-3 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span>{msg.tokens ? `${(msg.tokens / 1000).toFixed(1)}k tokens` : "1.8k tokens"}</span>
            <span>·</span>
            <span>{msg.durationSeconds || "1.2"}s</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onReject(msg.id)}
              className="h-8 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-600 dark:hover:text-rose-400 transition-all cursor-pointer"
            >
              Reject
            </button>
            <button
              onClick={() => onApply(msg.id, msg.newCode, msg.modifiedFile)}
              className="h-8 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/25 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 5. [Loading State]: Multi-Stage Living Pipeline with Timer & Orb-UI
// -----------------------------------------------------------------------------
function AgentLoadingState({
  modelLabel,
  activeFileName,
}: {
  modelLabel: string;
  activeFileName: string;
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-50/40 via-white to-slate-50/40 dark:from-[#0E1528] dark:via-[#0B0F17] dark:to-[#0B0F17] p-4 shadow-xl space-y-3.5 animate-in fade-in duration-200">
      {/* Header with Orb and Live Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AiOrb size="md" state="thinking" />
          <div>
            <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Synthesizing Solution</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                {modelLabel}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Generating code & formulating diffs
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
          <Clock className="h-3 w-3 text-orange-500 animate-spin" />
          <span>{seconds}s</span>
        </div>
      </div>

      {/* Step Pipeline Progress */}
      <div className="space-y-1.5 pt-1 font-mono text-xs">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span>Read workspace context ({activeFileName})</span>
        </div>

        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <span className="h-3.5 w-3.5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
          <span className="animate-pulse">Analyzing logic & structuring modifications...</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 ml-1 shrink-0" />
          <span>Generating multi-file diff</span>
        </div>
      </div>

      {/* Shimmer Skeleton Wave */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="h-2.5 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 dark:from-slate-800 dark:via-blue-900/40 dark:to-slate-800 rounded-full animate-pulse w-5/6" />
        <div className="h-2.5 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 dark:from-slate-800 dark:via-blue-900/40 dark:to-slate-800 rounded-full animate-pulse w-3/4" />
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT: AiAgentPanel
// =============================================================================
export function AiAgentPanel({
  currentLanguage,
  activeFileName,
  currentCode,
  allFiles,
  onApplyCode,
  onRestoreCode,
  onSelectFileByName,
}: AiAgentPanelProps) {
  const storageKey = `skyro_ai_messages_${currentLanguage}`;

  const [availableModels, setAvailableModels] = useState([
    { id: "qwen3:latest", label: "qwen3:latest", tag: "Local Qwen (Active)", isLocal: true },
    { id: "llama3.1:8b", label: "llama3.1:8b", tag: "Local Ollama", isLocal: true },
    { id: "llama3.1:latest", label: "llama3.1:latest", tag: "Local Ollama", isLocal: true },
    { id: "llama3:latest", label: "llama3:latest", tag: "Local Ollama", isLocal: true },
  ]);
  const [selectedModel, setSelectedModel] = useState("qwen3:latest");
  const [ollamaConnected, setOllamaConnected] = useState(true);

  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [switchToast, setSwitchToast] = useState<string | null>(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  // Auto-discover local Ollama models on mount
  useEffect(() => {
    fetch("/api/ai/models")
      .then((res) => res.json())
      .then((data) => {
        if (data.models && data.models.length > 0) {
          setAvailableModels(data.models);
          setOllamaConnected(Boolean(data.ollamaConnected));
          const hasQwen = data.models.find((m: { id: string }) => m.id.includes("qwen"));
          if (hasQwen) {
            setSelectedModel(hasQwen.id);
          } else {
            setSelectedModel(data.models[0].id);
          }
        }
      })
      .catch(() => {});
  }, []);

  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Hello! I am connected to your local **Qwen Engine**. I can inspect your ${currentLanguage} code, build new features, debug errors, and provide interactive line diffs. Ask me anything!`,
      thought: `Connected to local Ollama (qwen3:latest)`,
    },
  ]);

  // Safely restore messages from localStorage ONLY on client mount (prevents SSR hydration mismatch)
  useEffect(() => {
    setIsClientLoaded(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {}
  }, [storageKey]);

  // Persist messages across page reloads (only after client has mounted)
  useEffect(() => {
    if (!isClientLoaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    } catch {}
  }, [messages, storageKey, isClientLoaded]);

  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle outside click for model dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setIsModelDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || inputPrompt).trim();
    if (!promptText || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: AgentMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: "user",
        content: promptText,
      },
    ];

    setMessages(newMessages);
    setInputPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          language: currentLanguage,
          files: allFiles,
          activeFileName,
          model: selectedModel,
        }),
      });

      if (!res.ok) throw new Error("Agent failed to respond.");

      const data = await res.json();

      const assistantMsg: AgentMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.message || "Code updated successfully.",
        thought: data.thought,
        steps: data.steps,
        modifiedFile: data.modifiedFile,
        newCode: data.newCode,
        multiFileUpdates: data.multiFileUpdates,
        diffSummary: data.diffSummary,
        tokens: data.tokens || 1200,
        durationSeconds: data.durationSeconds || "0.4",
        modelName: data.modelName || selectedModel,
        status: data.newCode ? "pending" : undefined,
        isStreaming: true, // triggers smooth streaming token reveal
      };

      setMessages([...newMessages, assistantMsg]);
    } catch {
      setMessages([
        ...newMessages,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content: "Sorry, I encountered an issue processing your request. Please try again.",
          thought: "Network or model execution interruption.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (msgId: string, newCode?: string, fileToUpdate?: string) => {
    if (!newCode) return;
    const msg = messages.find((m) => m.id === msgId);
    onApplyCode(newCode, fileToUpdate || activeFileName, msg?.multiFileUpdates);
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: "applied" } : m))
    );
  };

  const handleReject = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: "rejected" } : m))
    );
  };

  const handleFileClick = (fileName: string) => {
    if (onSelectFileByName) {
      onSelectFileByName(fileName);
      setSwitchToast(`Opened ${fileName} in editor`);
      setTimeout(() => setSwitchToast(null), 2500);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleClearHistory = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(storageKey);
      } catch {}
    }
    setMessages([
      {
        id: "welcome-clean",
        role: "assistant",
        content: `Chat history cleared. What would you like to build with **Qwen**?`,
        thought: `Ready for next instruction on ${activeFileName}.`,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setInputPrompt((prev) => (prev ? `${prev} Add dark mode toggle` : "Add dark mode toggle"));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInputPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const quickPrompts = [
    { label: "Add dark mode toggle", icon: "🌙" },
    { label: "Find and fix errors", icon: "🐛" },
    { label: "Optimize algorithm", icon: "⚡" },
    { label: "Explain this code", icon: "📖" },
  ];

  const currentModelObj =
    availableModels.find((m) => m.id === selectedModel) || availableModels[0] || {
      id: "qwen3:latest",
      label: "qwen3:latest",
      tag: "Local Ollama",
      isLocal: true,
    };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0E131F] border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors relative">
      {/* Toast Notification when user clicks a file step */}
      {switchToast && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 dark:bg-slate-100/90 text-white dark:text-slate-900 text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-700 dark:border-slate-300 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
          <span>{switchToast}</span>
        </div>
      )}

      {/* Top Header with 3D Glowing Iridescent Orb matching Screenshot */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#0B0F17]/90">
        <div className="flex items-center gap-2.5">
          {/* Animated 3D Iridescent Orb with orb-ui live reactive states */}
          <AiOrb
            size="md"
            state={isLoading ? "thinking" : isListening ? "listening" : "idle"}
          />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white">
                AI Agent
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{currentModelObj.label}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onRestoreCode && (
            <button
              onClick={onRestoreCode}
              className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Restore previous code backup"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-sm">
        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end animate-in fade-in duration-150">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-[85%] text-xs sm:text-sm shadow-md leading-relaxed">
                  {msg.content}
                </div>
              </div>
            );
          }

          const hasCodeChange = Boolean(msg.newCode);

          // Assistant message with exact visual styling
          return (
            <div key={msg.id} className="space-y-3 max-w-[95%] animate-in fade-in duration-200">
              {/* 1. [Thinking]: Collapsible Deep Reasoning Block */}
              {msg.thought && (
                <ThinkingBlock
                  thought={msg.thought}
                  duration={msg.durationSeconds}
                />
              )}

              {/* 2. [Tool Chips]: Interactive Execution Steps */}
              {msg.steps && msg.steps.length > 0 && (
                <ToolChips
                  steps={msg.steps}
                  onFileClick={handleFileClick}
                />
              )}

              {/* 3. [Streaming Text]: Progressive Typewriter Reveal */}
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-100/60 dark:bg-slate-900/60 rounded-xl p-3.5 border border-slate-200/60 dark:border-slate-800/60 shadow-xs">
                <StreamingContent
                  content={msg.content}
                  isStreaming={msg.isStreaming}
                  onFinish={() => {
                    setMessages((prev) =>
                      prev.map((m) => (m.id === msg.id ? { ...m, isStreaming: false } : m))
                    );
                  }}
                />
              </div>

              {/* 4. [Approval Card]: Luxury Cursor / Claude Diff Review Card */}
              {hasCodeChange && (
                <ApprovalCard
                  msg={msg}
                  activeFileName={activeFileName}
                  onApply={handleApply}
                  onReject={handleReject}
                  onCopyCode={handleCopyCode}
                  isCopied={copiedCodeId === msg.id}
                />
              )}
            </div>
          );
        })}

        {/* 5. [Loading State]: Living Multi-Stage Pipeline */}
        {isLoading && (
          <AgentLoadingState
            modelLabel={currentModelObj.label}
            activeFileName={activeFileName}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0B0F17]/50">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.label)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800/90 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 border border-slate-200 dark:border-slate-700/60 transition-colors flex items-center gap-1.5 text-slate-600 dark:text-slate-300 shadow-xs cursor-pointer"
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom Input & Model Selector Box */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17]">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#0E131F] p-2.5 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all shadow-sm">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything, or describe a change. Type / for commands"
            className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 resize-none focus:outline-none"
          />

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              {/* Attach Button */}
              <button
                onClick={() => setInputPrompt((prev) => `${prev} [Attached: ${activeFileName}]`)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Attach active file context"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              {/* Model Dropdown Trigger */}
              <div className="relative" ref={modelDropdownRef}>
                <button
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-orange-500/50 transition-colors cursor-pointer"
                >
                  <Cpu className="h-3 w-3 text-orange-500" />
                  <span>{currentModelObj.label}</span>
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      isModelDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Model Selector Menu */}
                {isModelDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-1.5 w-72 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] shadow-2xl p-1.5 z-50 text-xs">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>Select AI Model</span>
                      {ollamaConnected && (
                        <span className="text-emerald-500 font-mono text-[9px] font-bold">
                          Ollama Connected
                        </span>
                      )}
                    </div>
                    {availableModels.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSelectedModel(m.id);
                          setIsModelDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                          selectedModel === m.id
                            ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold">{m.label}</span>
                            {m.isLocal && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                                Local
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {m.tag}
                          </div>
                        </div>
                        {selectedModel === m.id && <Check className="h-3.5 w-3.5 text-orange-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Mic & Send Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleVoiceInput}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800"
                }`}
                title="Voice input"
              >
                <Mic className="h-4 w-4" />
              </button>

              <button
                disabled={!inputPrompt.trim() || isLoading}
                onClick={() => handleSendMessage()}
                className={`p-2 rounded-xl transition-all ${
                  inputPrompt.trim() && !isLoading
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md scale-105 cursor-pointer"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                }`}
                title="Send instruction to AI Agent"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
