"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { CodeEditor } from "@/components/editor/code-editor";
import { EditorTabs, EditorFile } from "@/components/editor/editor-tabs";
import { IOPanel } from "@/components/editor/io-panel";
import { WebPreview } from "@/components/editor/web-preview";
import { useCodeRunner } from "@/hooks/use-code-runner";
import { getLanguageConfig } from "@/lib/languages";
import { SupportedLanguage } from "@/types/language";
import { Button } from "@/components/ui/button";
import { GitFork, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SharedSnippetPage() {
  const params = useParams();
  const router = useRouter();
  const shortId = params?.shortId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [files, setFiles] = useState<EditorFile[]>([]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [stdin, setStdin] = useState("");

  const { isRunning, stdout, stderr, output, stats, runCode, clearOutput } = useCodeRunner();

  useEffect(() => {
    if (!shortId) return;

    // Check localStorage cache first
    try {
      const cached = localStorage.getItem(`skyro_snippet_${shortId}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        setLanguage(parsed.language || "python");
        setFiles(parsed.files || []);
        setStdin(parsed.stdin || "");
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Could not read local snippet:", e);
    }

    // Attempt to fetch from API
    fetch(`/api/snippets/${shortId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Snippet not found");
        return res.json();
      })
      .then((data) => {
        setLanguage(data.language);
        setFiles(
          data.files || [
            {
              name: getLanguageConfig(data.language).defaultFileName,
              language: getLanguageConfig(data.language).monacoLang,
              content: data.code,
            },
          ]
        );
        setStdin(data.stdin || "");
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Snippet not found or expired.");
        setIsLoading(false);
      });
  }, [shortId]);

  const currentLangConfig = getLanguageConfig(language);
  const activeFile = files[activeFileIndex] || {
    name: currentLangConfig.defaultFileName,
    language: currentLangConfig.monacoLang,
    content: currentLangConfig.starterCode,
  };

  const handleFork = () => {
    // Save to active session and go to editor
    if (typeof window !== "undefined") {
      sessionStorage.setItem("skyro_fork_language", language);
      sessionStorage.setItem("skyro_fork_files", JSON.stringify(files));
      sessionStorage.setItem("skyro_fork_stdin", stdin);
    }
    router.push("/editor");
  };

  const handleRun = async () => {
    if (currentLangConfig.isWebPreview) return;
    await runCode(language, activeFile.content, stdin, files);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-300">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-3" />
        <span className="font-mono text-sm">Loading shared snippet ({shortId})...</span>
      </div>
    );
  }

  if (error || files.length === 0) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-slate-300 px-4 text-center">
        <div className="max-w-md p-8 rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl">
          <h2 className="text-xl font-bold text-slate-100 mb-2">Snippet Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">
            The snippet link &ldquo;{shortId}&rdquo; does not exist or may have expired.
          </p>
          <Link href="/editor">
            <Button variant="primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Open New IDE Session</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const htmlFile = files.find((f) => f.name.endsWith(".html"))?.content || "";
  const cssFile = files.find((f) => f.name.endsWith(".css"))?.content || "";
  const jsFile = files.find((f) => f.name.endsWith(".js"))?.content || "";

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-100">
      {/* Navbar with Fork CTA */}
      <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950 px-4">
        <div className="flex items-center gap-3">
          <Link href="/editor" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to IDE</span>
          </Link>
          <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
            Snippet #{shortId}
          </span>
          <span className="text-xs text-blue-400 font-semibold uppercase">{currentLangConfig.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {!currentLangConfig.isWebPreview && (
            <Button variant="primary" size="sm" onClick={handleRun} isLoading={isRunning} className="h-8">
              <span>Run Code</span>
            </Button>
          )}

          <Button variant="secondary" size="sm" onClick={handleFork} className="h-8 gap-1.5 text-slate-200">
            <GitFork className="h-3.5 w-3.5 text-purple-400" />
            <span>Fork & Edit</span>
          </Button>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden border-r border-slate-800">
          <EditorTabs
            files={files}
            activeFileIndex={activeFileIndex}
            onSelectFile={(idx) => setActiveFileIndex(idx)}
          />
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              language={activeFile.language}
              value={activeFile.content}
              onChange={() => {}}
              readOnly={true}
            />
          </div>
        </div>

        <div className="w-[42%] flex flex-col overflow-hidden">
          {currentLangConfig.isWebPreview ? (
            <WebPreview html={htmlFile} css={cssFile} javascript={jsFile} />
          ) : (
            <IOPanel
              stdin={stdin}
              onStdinChange={() => {}}
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
  );
}
