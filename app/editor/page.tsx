"use client";

import React, { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { CodeEditor } from "@/components/editor/code-editor";
import { EditorTabs, EditorFile } from "@/components/editor/editor-tabs";
import { IOPanel } from "@/components/editor/io-panel";
import { WebPreview } from "@/components/editor/web-preview";
import { ShortcutsModal } from "@/components/editor/shortcuts-modal";
import { ShareModal } from "@/components/editor/share-modal";
import { NewFileDialog } from "@/components/editor/new-file-dialog";
import { useCodeRunner } from "@/hooks/use-code-runner";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { SUPPORTED_LANGUAGES, getLanguageConfig } from "@/lib/languages";
import { SupportedLanguage } from "@/types/language";
import { generateShortId, downloadFile } from "@/lib/utils";
import {
  ZoomIn,
  ZoomOut,
  Code,
  Terminal,
  Eye,
  Files,
  Search,
  Settings,
  Keyboard,
  Wifi,
  ShieldCheck,
  Clock,
  Cpu,
  Plus,
  X,
} from "lucide-react";

function EditorContent() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get("lang");

  const initialLang: SupportedLanguage =
    langQuery && SUPPORTED_LANGUAGES[langQuery as SupportedLanguage]
      ? (langQuery as SupportedLanguage)
      : "python";

  const [language, setLanguage] = useState<SupportedLanguage>(initialLang);
  const [fontSize, setFontSize] = useState<number>(14);
  const [stdin, setStdin] = useState<string>("");
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [activeSidebarItem, setActiveSidebarItem] = useState<"files" | "search">("files");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);

  // Sync if query param changes dynamically
  useEffect(() => {
    if (langQuery && SUPPORTED_LANGUAGES[langQuery as SupportedLanguage]) {
      const targetLang = langQuery as SupportedLanguage;
      setLanguage(targetLang);
      setActiveFileIndex(0);
      const targetConfig = getLanguageConfig(targetLang);
      setRightPaneTab(targetConfig.isWebPreview ? "preview" : "output");
    }
  }, [langQuery]);

  // Files state (supports multi-tab files like HTML/CSS/JS or multiple code tabs)
  const [filesMap, setFilesMap] = useState<Record<string, EditorFile[]>>({});

  // Right pane tab switcher: "output" | "preview"
  const [rightPaneTab, setRightPaneTab] = useState<"output" | "preview">("output");

  // Mobile layout tab switcher: "editor" | "output"
  const [mobileTab, setMobileTab] = useState<"editor" | "output">("editor");

  // Modals
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [currentShortId, setCurrentShortId] = useState<string>("");

  const { isRunning, stdout, stderr, output, stats, runCode, clearOutput } = useCodeRunner();

  const currentLangConfig = useMemo(() => getLanguageConfig(language), [language]);

  // Initialize or fetch files for current language
  useEffect(() => {
    if (!filesMap[language]) {
      if (currentLangConfig.isWebPreview && currentLangConfig.files) {
        setFilesMap((prev) => ({
          ...prev,
          [language]: currentLangConfig.files!,
        }));
      } else {
        setFilesMap((prev) => ({
          ...prev,
          [language]: [
            {
              name: currentLangConfig.defaultFileName,
              language: currentLangConfig.monacoLang,
              content: currentLangConfig.starterCode,
            },
          ],
        }));
      }
      setActiveFileIndex(0);
    }
  }, [language, currentLangConfig, filesMap]);

  // Current active files list and current active file
  const currentFiles: EditorFile[] = filesMap[language] || [
    {
      name: currentLangConfig.defaultFileName,
      language: currentLangConfig.monacoLang,
      content: currentLangConfig.starterCode,
    },
  ];

  const activeFile = currentFiles[activeFileIndex] || currentFiles[0];

  const handleContentChange = (newContent: string) => {
    setFilesMap((prev) => {
      const langFiles = prev[language] ? [...prev[language]] : [...currentFiles];
      if (langFiles[activeFileIndex]) {
        langFiles[activeFileIndex] = {
          ...langFiles[activeFileIndex],
          content: newContent,
        };
      }
      return {
        ...prev,
        [language]: langFiles,
      };
    });
  };

  // Execution handler
  const handleRun = useCallback(async () => {
    setRightPaneTab(currentLangConfig.isWebPreview ? "preview" : "output");
    setMobileTab("output");

    if (currentLangConfig.isWebPreview) {
      return;
    }

    await runCode(
      currentLangConfig.id,
      activeFile.content,
      stdin,
      currentFiles.map((f) => ({ name: f.name, content: f.content }))
    );
  }, [currentLangConfig, activeFile, stdin, currentFiles, runCode]);

  // Open new file dialog
  const handleAddFile = () => {
    setIsNewFileDialogOpen(true);
  };

  // Create new file from dialog
  const handleCreateFile = (newFileName: string) => {
    const trimmed = newFileName.trim();
    if (!trimmed) return;
    if (currentFiles.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) return;

    const newFile: EditorFile = {
      name: trimmed,
      language: currentLangConfig.monacoLang,
      content: `# ${trimmed}\n`,
    };

    setFilesMap((prev) => ({
      ...prev,
      [language]: [...currentFiles, newFile],
    }));
    setActiveFileIndex(currentFiles.length);
  };

  // Close file handler (or reset single file)
  const handleCloseFile = (indexToClose: number) => {
    if (currentFiles.length <= 1) {
      const fileToClose = currentFiles[0];
      if (confirm(`Do you want to reset "${fileToClose.name}" to starter code?`)) {
        handleContentChange(currentLangConfig.starterCode);
      }
      return;
    }

    const fileToClose = currentFiles[indexToClose];
    if (!confirm(`Are you sure you want to close "${fileToClose.name}"?`)) return;

    setFilesMap((prev) => {
      const updated = currentFiles.filter((_, idx) => idx !== indexToClose);
      return {
        ...prev,
        [language]: updated,
      };
    });

    if (activeFileIndex >= indexToClose) {
      setActiveFileIndex(Math.max(0, activeFileIndex - 1));
    }
  };

  // Reset to starter template
  const handleReset = () => {
    if (confirm("Reset current code to starter template? Any unsaved changes will be lost.")) {
      if (currentLangConfig.isWebPreview && currentLangConfig.files) {
        setFilesMap((prev) => ({
          ...prev,
          [language]: currentLangConfig.files!,
        }));
      } else {
        setFilesMap((prev) => ({
          ...prev,
          [language]: [
            {
              name: currentLangConfig.defaultFileName,
              language: currentLangConfig.monacoLang,
              content: currentLangConfig.starterCode,
            },
          ],
        }));
      }
      setActiveFileIndex(0);
      clearOutput();
    }
  };

  // Copy active code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
  };

  // Download active file
  const handleDownload = () => {
    downloadFile(activeFile.name, activeFile.content);
  };

  // Share snippet
  const handleShare = () => {
    const id = generateShortId();
    setCurrentShortId(id);

    if (typeof window !== "undefined") {
      const snippetData = {
        shortId: id,
        language,
        files: currentFiles,
        stdin,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(`skyro_snippet_${id}`, JSON.stringify(snippetData));
    }

    setIsShareOpen(true);
  };

  // Hotkeys binding (Ctrl+Enter to run, Ctrl+S to share/save)
  useHotkeys({
    onRun: handleRun,
    onSave: handleShare,
    onEscape: () => {
      setIsShortcutsOpen(false);
      setIsShareOpen(false);
    },
  });

  const htmlFile =
    currentFiles.find((f) => f.name.endsWith(".html"))?.content ||
    (language === "html" ? activeFile.content : "");
  const cssFile =
    currentFiles.find((f) => f.name.endsWith(".css"))?.content ||
    (language === "css" ? activeFile.content : "");
  const jsFile =
    currentFiles.find((f) => f.name.endsWith(".js"))?.content ||
    (language === "javascript" ? activeFile.content : "");

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        currentLanguage={language}
        onLanguageChange={(newLang) => {
          setLanguage(newLang);
          setActiveFileIndex(0);
          const newConfig = getLanguageConfig(newLang);
          setRightPaneTab(newConfig.isWebPreview ? "preview" : "output");
        }}
        onRun={handleRun}
        isRunning={isRunning}
        onReset={handleReset}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onShare={handleShare}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 justify-around text-xs font-medium">
        <button
          onClick={() => setMobileTab("editor")}
          className={`flex items-center gap-1.5 py-1 px-3 rounded ${
            mobileTab === "editor" ? "bg-orange-600 text-white font-semibold" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          <Code className="h-4 w-4" />
          <span>Editor</span>
        </button>
        <button
          onClick={() => {
            const outTab = currentLangConfig.isWebPreview ? "preview" : "output";
            setRightPaneTab(outTab);
            setMobileTab("output");
          }}
          className={`flex items-center gap-1.5 py-1 px-3 rounded ${
            mobileTab === "output" ? "bg-orange-600 text-white font-semibold" : "text-slate-600 dark:text-slate-400"
          }`}
        >
          {currentLangConfig.isWebPreview ? <Eye className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
          <span>{currentLangConfig.isWebPreview ? "Preview" : "Console"}</span>
          {stats.status === "running" && <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping"></span>}
        </button>
      </div>

      {/* Main Split-Pane Workspace with Left Activity Bar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Vertical Activity Bar (OneCompiler / VS Code style) */}
        <div className="hidden sm:flex w-12 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-[#080C14] py-2 items-center shrink-0 select-none">
          {/* Top Activity Icons */}
          <div className="flex flex-col items-center gap-1 w-full">
            <button
              onClick={() => {
                if (isSidebarOpen && activeSidebarItem === "files") {
                  setIsSidebarOpen(false);
                } else {
                  setActiveSidebarItem("files");
                  setIsSidebarOpen(true);
                }
              }}
              className={`w-full py-2.5 flex items-center justify-center transition-colors relative ${
                activeSidebarItem === "files" && isSidebarOpen
                  ? "text-[#FF5722] bg-white/80 dark:bg-slate-900/80 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
              title="File Explorer (Toggle)"
            >
              {activeSidebarItem === "files" && isSidebarOpen && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#FF5722]" />
              )}
              <Files className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                setActiveSidebarItem("search");
                // Focus editor
                const el = document.querySelector(".monaco-editor textarea") as HTMLElement;
                if (el) el.focus();
              }}
              className={`w-full py-2.5 flex items-center justify-center transition-colors relative ${
                activeSidebarItem === "search"
                  ? "text-[#FF5722] bg-white/80 dark:bg-slate-900/80 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
              title="Search in Code"
            >
              {activeSidebarItem === "search" && (
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#FF5722]" />
              )}
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom Activity Icons */}
          <div className="flex flex-col items-center gap-1 w-full">
            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="w-full py-2.5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              title="Keyboard Shortcuts (Ctrl+K)"
            >
              <Keyboard className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsShortcutsOpen(true)}
              className="w-full py-2.5 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              title="Editor Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Collapsible File Explorer Drawer */}
        {isSidebarOpen && activeSidebarItem === "files" && (
          <div className="w-52 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0A0E17] flex flex-col shrink-0 select-none animate-in slide-in-from-left duration-150">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Project Files</span>
              <button
                onClick={() => setIsNewFileDialogOpen(true)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title="Add New File (+)"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-1">
              {currentFiles.map((f, idx) => {
                const isActive = idx === activeFileIndex;
                return (
                  <div
                    key={`${f.name}-${idx}`}
                    onClick={() => setActiveFileIndex(idx)}
                    className={`group flex items-center justify-between px-3 py-1.5 text-xs font-mono cursor-pointer transition-colors ${
                      isActive
                        ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="truncate">{f.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseFile(idx);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-slate-400 hover:text-rose-500 transition-opacity"
                      title={currentFiles.length > 1 ? "Close file" : "Reset file"}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}

              <button
                onClick={() => setIsNewFileDialogOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 mt-2 text-xs text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg mx-2 font-medium border border-dashed border-orange-300 dark:border-orange-500/30 transition-colors w-[calc(100%-1rem)]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Page / File</span>
              </button>
            </div>
          </div>
        )}

        {/* Left Pane: Code Editor */}
        <div
          className={`flex flex-1 flex-col overflow-hidden border-r border-slate-200 dark:border-slate-800/80 ${
            mobileTab === "editor" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Editor Header Toolbar (Tabs + Font controls) */}
          <div className="h-9 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#0D121F] pr-3 transition-colors">
            <EditorTabs
              files={currentFiles}
              activeFileIndex={activeFileIndex}
              onSelectFile={(idx) => setActiveFileIndex(idx)}
              onAddFile={handleAddFile}
              onCloseFile={handleCloseFile}
            />

            {/* Font Size & Info */}
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-mono mr-1 hidden sm:inline uppercase font-bold text-orange-600 dark:text-orange-400">
                {activeFile.language}
              </span>
              <button
                onClick={() => setFontSize((f) => Math.max(11, f - 1))}
                className="p-1 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                title="Decrease font size"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[11px] font-mono w-5 text-center">{fontSize}</span>
              <button
                onClick={() => setFontSize((f) => Math.min(24, f + 1))}
                className="p-1 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                title="Increase font size"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Monaco Editor Component */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              language={activeFile.language}
              value={activeFile.content}
              onChange={handleContentChange}
              fontSize={fontSize}
              onRun={handleRun}
            />
          </div>
        </div>

        {/* Right Pane: Console Output | Web Preview | AI Agent */}
        <div
          className={`w-full md:w-[48%] lg:w-[45%] xl:w-[43%] flex flex-col overflow-hidden ${
            mobileTab !== "editor" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {currentLangConfig.isWebPreview ? (
              <WebPreview html={htmlFile} css={cssFile} javascript={jsFile} />
            ) : (
              <IOPanel
                stdin={stdin}
                onStdinChange={setStdin}
                stdout={stdout}
                stderr={stderr}
                output={output}
                stats={stats}
                isRunning={isRunning}
                onClear={clearOutput}
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar (Signature OneCompiler IDE Footer) */}
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-slate-100/95 dark:bg-[#080C14] px-3 py-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0 select-none">
        {/* Left Status Group */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ready</span>
          </span>

          <span
            onClick={() => {
              const outTab = currentLangConfig.isWebPreview ? "preview" : "output";
              setRightPaneTab(outTab);
              setMobileTab("output");
            }}
            className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#FF5722] cursor-pointer"
          >
            <Terminal className="h-3 w-3 text-orange-500" />
            <span>Terminal</span>
          </span>

          {stats.timeMs !== undefined && (
            <span className="hidden sm:flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Clock className="h-3 w-3 text-amber-500" />
              <span>{stats.timeMs}ms</span>
            </span>
          )}

          {stats.memoryKb !== undefined && (
            <span className="hidden sm:flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Cpu className="h-3 w-3 text-blue-500" />
              <span>{Math.round(stats.memoryKb / 1024 * 10) / 10} MB</span>
            </span>
          )}
        </div>

        {/* Right Status Group */}
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden md:flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            <span>256MB Sandbox</span>
          </span>
          <span className="hidden lg:inline">Judge0 Engine</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Wifi className="h-3 w-3" />
            <span className="hidden sm:inline">Connected</span>
          </span>
        </div>
      </div>

      {/* Modals */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shortId={currentShortId}
      />
      <NewFileDialog
        isOpen={isNewFileDialogOpen}
        onClose={() => setIsNewFileDialogOpen(false)}
        onAddFile={handleCreateFile}
        defaultExtension={currentLangConfig.defaultFileName.split(".").pop() || "txt"}
        existingFiles={currentFiles.map((f) => f.name)}
      />
    </div>
  );
}

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-[#0B0F17] text-slate-600 dark:text-slate-400 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-500 animate-ping"></span>
            <span>Loading SkyroCodeX Editor...</span>
          </div>
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
