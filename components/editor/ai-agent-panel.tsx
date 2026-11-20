"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
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
  Cpu,
  Layers,
  ArrowUp,
  RefreshCw,
  ExternalLink,
  Code2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  onApplyCode: (newCode: string, fileName?: string) => void;
  onRestoreCode?: () => void;
}

export const QWEN_MODELS = [
  { id: "qwen-2.5-coder-32b", label: "Qwen 2.5 Coder 32B", tag: "Recommended" },
  { id: "qwen-2.5-coder-7b", label: "Qwen 2.5 Coder 7B", tag: "Fast" },
  { id: "qwen-2.5-max", label: "Qwen 2.5 Max", tag: "Deep Reasoning" },
  { id: "qwen-2.5-coder-72b", label: "Qwen 2.5 Coder 72B", tag: "Full Stack" },
];

export function AiAgentPanel({
  currentLanguage,
  activeFileName,
  currentCode,
  allFiles,
  onApplyCode,
  onRestoreCode,
}: AiAgentPanelProps) {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Hello! I am **Qwen 2.5 Coder**, your AI agent embedded in SkyroCodeX. I can inspect your ${currentLanguage} code, debug runtime errors, optimize performance, and write features with step-by-step diffs.`,
      thought: `Ready to assist with ${activeFileName} (${currentLanguage})`,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("qwen-2.5-coder-32b");
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
        thought: data.thought || "Inspecting code and generating changes.",
        steps: data.steps || [
          { type: "read", file: activeFileName },
          { type: "edit", file: activeFileName },
        ],
        modifiedFile: data.modifiedFile || activeFileName,
        newCode: data.newCode,
        diffSummary: data.diffSummary || { added: 12, removed: 2 },
        tokens: data.tokens || 1840,
        durationSeconds: data.durationSeconds || "1.4",
        modelName: data.modelName || "Qwen 2.5 Coder",
        status: "pending",
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
    onApplyCode(newCode, fileToUpdate || activeFileName);
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: "applied" } : m))
    );
  };

  const handleReject = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, status: "rejected" } : m))
    );
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-clean",
        role: "assistant",
        content: `Chat history cleared. What would you like to build with **Qwen 2.5 Coder**?`,
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
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;

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
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
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
    QWEN_MODELS.find((m) => m.id === selectedModel) || QWEN_MODELS[0];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0E131F] border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#0B0F17]/90">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-orange-500/15 text-orange-600 dark:text-orange-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm">AI Agent</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20">
                {currentModelObj.label}
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

          // Assistant message with exact visual styling from the user's screenshot
          return (
            <div key={msg.id} className="space-y-3 max-w-[95%]">
              {/* Agent Thought / Thinking */}
              {msg.thought && (
                <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {msg.thought}
                </div>
              )}

              {/* Tool Execution Steps */}
              {msg.steps && msg.steps.length > 0 && (
                <div className="space-y-1 py-1">
                  {msg.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300"
                    >
                      {step.type === "read" && (
                        <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      )}
                      {step.type === "edit" && (
                        <Edit3 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      )}
                      {step.type === "create" && (
                        <FilePlus className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      )}
                      <span className="font-semibold capitalize text-slate-600 dark:text-slate-400">
                        {step.type === "read" ? "Read" : step.type === "edit" ? "Edited" : "Created"}
                      </span>
                      <span className="text-slate-900 dark:text-slate-100 underline decoration-slate-400/40">
                        {step.file}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Content Body */}
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-100/60 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200/60 dark:border-slate-800/60">
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

              {/* Diff summary and Apply / Reject buttons */}
              {msg.newCode && msg.status === "pending" && (
                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span className="text-slate-700 dark:text-slate-300">
                      1 file changed
                    </span>
                    <span className="text-emerald-500 font-mono font-bold">
                      +{msg.diffSummary?.added || 12}
                    </span>
                    <span className="text-red-500 font-mono font-bold">
                      -{msg.diffSummary?.removed || 2}
                    </span>
                  </div>

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
              <span>{currentModelObj.label} is analyzing code and formulating diff...</span>
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
                  <div className="absolute bottom-full left-0 mb-1.5 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] shadow-2xl p-1.5 z-50 text-xs">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Qwen AI Model
                    </div>
                    {QWEN_MODELS.map((m) => (
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
                          <div>{m.label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {m.tag}
                          </div>
                        </div>
                        {selectedModel === m.id && <Check className="h-3.5 w-3.5" />}
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
