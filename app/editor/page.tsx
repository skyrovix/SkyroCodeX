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
import { useCodeRunner } from "@/hooks/use-code-runner";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { SUPPORTED_LANGUAGES, getLanguageConfig } from "@/lib/languages";
import { SupportedLanguage } from "@/types/language";
import { generateShortId, downloadFile } from "@/lib/utils";
import { ZoomIn, ZoomOut, Code, Terminal, Eye } from "lucide-react";

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

  const htmlFile = currentFiles.find((f) => f.name.endsWith(".html"))?.content || "";
  const cssFile = currentFiles.find((f) => f.name.endsWith(".css"))?.content || "";
  const jsFile = currentFiles.find((f) => f.name.endsWith(".js"))?.content || "";

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

      {/* Main Split-Pane Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane: Code Editor */}
        <div
          className={`flex flex-1 flex-col overflow-hidden border-r border-slate-200 dark:border-slate-800/80 ${
            mobileTab === "editor" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Editor Header Toolbar (Tabs + Font controls) */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0B0F17] pr-3 transition-colors">
            <EditorTabs
              files={currentFiles}
              activeFileIndex={activeFileIndex}
              onSelectFile={(idx) => setActiveFileIndex(idx)}
            />

            {/* Font Size & Info */}
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <span className="text-[11px] font-mono mr-1 hidden sm:inline uppercase font-semibold text-orange-600 dark:text-orange-400">
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

        {/* Right Pane: Console Output | Web Preview | AI Agent (Qwen) */}
        <div
          className={`w-full md:w-[48%] lg:w-[45%] xl:w-[43%] flex flex-col overflow-hidden ${
            mobileTab !== "editor" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Right Pane Tab Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-[#0B0F17] px-3 py-1.5 text-xs transition-colors shrink-0">
            <div className="flex items-center gap-1.5">
              {!currentLangConfig.isWebPreview && (
                <button
                  onClick={() => {
                    setRightPaneTab("output");
                    setMobileTab("output");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors ${
                    rightPaneTab === "output"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5 text-orange-500" />
                  <span>Output</span>
                </button>
              )}

              {currentLangConfig.isWebPreview && (
                <button
                  onClick={() => {
                    setRightPaneTab("preview");
                    setMobileTab("output");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition-colors ${
                    rightPaneTab === "preview"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5 text-amber-500" />
                  <span>Preview</span>
                </button>
              )}
            </div>
          </div>

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

      {/* Modals */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        shortId={currentShortId}
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
