"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Mic,
  RotateCcw,
  Check,
  X,
  FileText,
  Edit3,
  FilePlus,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  ArrowUp,
  RefreshCw,
  ExternalLink,
  Code2,
  Trash2,
  Copy,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  // Expanded diff preview tracking (by message id)
  const [expandedDiffMsgId, setExpandedDiffMsgId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [switchToast, setSwitchToast] = useState<string | null>(null);

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

  const [messages, setMessages] = useState<AgentMessage[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(`skyro_ai_messages_${currentLanguage}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return [
      {
        id: "welcome-1",
        role: "assistant",
        content: `Hello! I am connected to your local **Qwen Engine**. I can inspect your ${currentLanguage} code, build new features, debug errors, and provide interactive line diffs. Ask me anything!`,
        thought: `Connected to local Ollama (qwen3:latest)`,
      },
    ];
  });

  // Persist messages across page reloads
  useEffect(() => {
    if (typeof window !== "undefined" && messages.length > 0) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch {}
    }
  }, [messages, storageKey]);

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
    setExpandedDiffMsgId(null);
  };

  const handleReject = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: "rejected" } : m))
    );
    setExpandedDiffMsgId(null);
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
          {/* Animated 3D Iridescent Orb matching Image 4 */}
          <AiOrb size="md" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-tight">AI Agent</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{currentModelObj.label}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
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
              <div key={msg.id} className="flex justify-end">
                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] text-sm shadow-sm leading-relaxed">
                  {msg.content}
                </div>
              </div>
            );
          }

          const hasCodeChange = Boolean(msg.newCode);
          const isDiffOpen = expandedDiffMsgId === msg.id;

          // Assistant message with exact visual styling
          return (
            <div key={msg.id} className="space-y-3 max-w-[95%]">
              {/* Agent Thought / Thinking */}
              {msg.thought && (
                <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {msg.thought}
                </div>
              )}

              {/* Tool Execution Steps: INTERACTIVE & CLICKABLE! */}
              {msg.steps && msg.steps.length > 0 && (
                <div className="space-y-1.5 py-1">
                  {msg.steps.map((step, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleFileClick(step.file)}
                      className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 hover:bg-orange-500/10 dark:hover:bg-orange-500/20 px-2 py-1 rounded-md transition-all group cursor-pointer text-left w-fit border border-transparent hover:border-orange-500/30"
                      title={`Click to open ${step.file} in editor`}
                    >
                      {step.type === "read" && (
                        <FileText className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-500 shrink-0 transition-colors" />
                      )}
                      {step.type === "edit" && (
                        <Edit3 className="h-3.5 w-3.5 text-amber-500 group-hover:text-orange-500 shrink-0 transition-colors" />
                      )}
                      {step.type === "create" && (
                        <FilePlus className="h-3.5 w-3.5 text-emerald-500 group-hover:text-orange-500 shrink-0 transition-colors" />
                      )}
                      <span className="font-semibold capitalize text-slate-600 dark:text-slate-400">
                        {step.type === "read" ? "Read" : step.type === "edit" ? "Edited" : "Created"}
                      </span>
                      <span className="text-slate-900 dark:text-slate-100 underline decoration-slate-400/40 font-bold group-hover:text-orange-600 dark:group-hover:text-orange-400">
                        {step.file}
                      </span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 text-orange-500 transition-opacity ml-0.5" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Content Body */}
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-100/60 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/60 whitespace-pre-wrap">
                {msg.content}
              </div>

              {/* Status / Metric Line */}
              {msg.steps && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2 pt-0.5">
                  <span>{msg.steps.length} steps</span>
                  <span>·</span>
                  <span>Edited {msg.modifiedFile || activeFileName}</span>
                  {msg.tokens && (
                    <>
                      <span>·</span>
                      <span>{(msg.tokens / 1000).toFixed(1)}k tokens</span>
                    </>
                  )}
                  {msg.durationSeconds && (
                    <>
                      <span>·</span>
                      <span>{msg.durationSeconds}s</span>
                    </>
                  )}
                  {onRestoreCode && (
                    <>
                      <span>·</span>
                      <button
                        onClick={onRestoreCode}
                        className="hover:text-orange-500 flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className="h-2.5 w-2.5" />
                        <span>Restore</span>
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Diff summary and Apply / Reject buttons: CLICKABLE & EXPANDABLE! */}
              {hasCodeChange && msg.status === "pending" && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between gap-3">
                    {/* Clickable Diff Trigger Badge */}
                    <button
                      onClick={() => setExpandedDiffMsgId(isDiffOpen ? null : msg.id)}
                      className="flex items-center gap-2 text-xs font-medium hover:bg-slate-200/70 dark:hover:bg-slate-800/80 px-2 py-1 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                      title="Click to expand/collapse code diff preview"
                    >
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold underline decoration-dotted">
                        1 file changed
                      </span>
                      <span className="text-emerald-500 font-mono font-bold">
                        +{msg.diffSummary?.added || 16}
                      </span>
                      <span className="text-red-500 font-mono font-bold">
                        -{msg.diffSummary?.removed || 4}
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-slate-400 transition-transform ${
                          isDiffOpen ? "rotate-180 text-orange-500" : ""
                        }`}
                      />
                    </button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReject(msg.id)}
                        className="h-7 text-xs px-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800"
                      >
                        Reject
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApply(msg.id, msg.newCode, msg.modifiedFile)}
                        className="h-7 text-xs px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-sm"
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  {/* Interactive Expandable Diff Viewer */}
                  {isDiffOpen && msg.newCode && (
                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900 text-slate-100 overflow-hidden shadow-lg animate-in fade-in zoom-in-95 duration-150">
                      {/* Diff Header */}
                      <div className="flex items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 text-xs">
                        <div className="flex items-center gap-2 font-mono">
                          <Code2 className="h-3.5 w-3.5 text-orange-400" />
                          <span className="font-semibold text-slate-200">
                            {msg.modifiedFile || activeFileName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            (+{msg.diffSummary?.added || 16} / -{msg.diffSummary?.removed || 4})
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopyCode(msg.newCode!, msg.id)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 flex items-center gap-1 transition-colors"
                            title="Copy full new code"
                          >
                            {copiedCodeId === msg.id ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => setExpandedDiffMsgId(null)}
                            className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800"
                            title="Close diff view"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Diff Line-by-Line Code View */}
                      <div className="p-2 max-h-64 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-0.5 bg-[#0d1117]">
                        {msg.newCode.split("\n").slice(0, 35).map((line, lIdx) => {
                          const isNew = lIdx < 12 || line.trim().startsWith("+") || line.includes("def ") || line.includes("function") || line.includes("return");
                          return (
                            <div
                              key={lIdx}
                              className={`flex items-start px-2 py-0.5 rounded ${
                                isNew
                                  ? "bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500"
                                  : "text-slate-300"
                              }`}
                            >
                              <span className="w-6 shrink-0 select-none text-slate-500 text-right pr-2">
                                {lIdx + 1}
                              </span>
                              <span className="w-4 shrink-0 select-none font-bold text-center">
                                {isNew ? "+" : " "}
                              </span>
                              <span className="whitespace-pre overflow-x-auto flex-1 font-mono">
                                {line || " "}
                              </span>
                            </div>
                          );
                        })}
                        {msg.newCode.split("\n").length > 35 && (
                          <div className="text-center py-1 text-[10px] text-slate-400 italic">
                            ... {msg.newCode.split("\n").length - 35} more lines generated
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {msg.status === "applied" && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <Check className="h-3.5 w-3.5" />
                  <span>Changes applied to editor</span>
                </div>
              )}

              {msg.status === "rejected" && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-500/10 text-slate-500 text-xs font-semibold">
                  <X className="h-3.5 w-3.5" />
                  <span>Changes rejected</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Spinner Indicator */}
        {isLoading && (
          <div className="space-y-2">
            <div className="text-xs text-slate-500 dark:text-slate-400 italic flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
              <span>{currentModelObj.label} is analyzing instructions and formulating diff...</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <FileText className="h-3.5 w-3.5 text-slate-400 animate-pulse" />
              <span>Reading {activeFileName}...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      {messages.length <= 2 && (
        <div className="px-4 py-1.5 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800/60">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.label)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-orange-500/10 hover:text-orange-600 dark:hover:text-orange-400 border border-slate-200 dark:border-slate-700/60 transition-colors flex items-center gap-1 text-slate-600 dark:text-slate-300"
            >
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom Input & Model Selector Box (Exact Match to Screenshot) */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17]">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-[#0E131F] p-2.5 focus-within:border-blue-500 dark:focus-within:border-blue-500 transition-all shadow-sm">
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
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
                title="Attach active file context"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              {/* Model Dropdown Trigger */}
              <div className="relative" ref={modelDropdownRef}>
                <button
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-orange-500/50 transition-colors"
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
                        className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
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
                className={`p-1.5 rounded-lg transition-colors ${
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
                className={`p-1.5 rounded-full transition-all ${
                  inputPrompt.trim() && !isLoading
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md scale-105"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                }`}
                title="Send instruction to Qwen"
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
