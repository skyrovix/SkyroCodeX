"use client";

import React, { useRef, useEffect, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";

export interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
  fontSize?: number;
  onRun?: () => void;
  readOnly?: boolean;
}

export function CodeEditor({
  language,
  value,
  onChange,
  fontSize = 14,
  onRun,
  readOnly = false,
}: CodeEditorProps) {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Define SkyroCodeX custom dark theme with solar orange highlights
    monaco.editor.defineTheme("skyro-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "ff7700", fontStyle: "bold" },
        { token: "string", foreground: "86efac" },
        { token: "number", foreground: "fcd34d" },
        { token: "function", foreground: "38bdf8" },
        { token: "type", foreground: "fb923c" },
      ],
      colors: {
        "editor.background": "#0B0F17",
        "editor.foreground": "#E2E8F0",
        "editor.lineHighlightBackground": "#161F2E",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#FF5722",
        "editorCursor.foreground": "#FF5722",
        "editorIndentGuide.background": "#1E293B",
        "editorIndentGuide.activeBackground": "#FF5722",
        "editor.selectionBackground": "#FF572233",
      },
    });

    // Define SkyroCodeX custom light theme
    monaco.editor.defineTheme("skyro-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "ea580c", fontStyle: "bold" },
        { token: "string", foreground: "15803d" },
        { token: "number", foreground: "b45309" },
        { token: "function", foreground: "0284c7" },
      ],
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#0F172A",
        "editor.lineHighlightBackground": "#F8FAFC",
        "editorLineNumber.foreground": "#94A3B8",
        "editorLineNumber.activeForeground": "#FF5722",
        "editorCursor.foreground": "#FF5722",
        "editorIndentGuide.background": "#E2E8F0",
        "editorIndentGuide.activeBackground": "#FF5722",
        "editor.selectionBackground": "#FF572225",
      },
    });

    // Add Ctrl+Enter / Cmd+Enter keybinding directly inside Monaco
    if (onRun) {
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRun();
      });
    }

    editor.focus();
  };

  const isDark = mounted ? (resolvedTheme || theme) === "dark" : true;
  const currentTheme = isDark ? "skyro-dark" : "skyro-light";

  // Re-apply theme when resolvedTheme changes
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(currentTheme);
    }
  }, [currentTheme]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white dark:bg-[#0B0F17] transition-colors">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={value}
        theme={currentTheme}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex h-full w-full items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin text-orange-500 mr-2" />
            <span className="text-sm font-mono">Loading Monaco Editor...</span>
          </div>
        }
        options={{
          fontSize,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
          fontLigatures: true,
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          lineNumbers: "on",
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          padding: { top: 12, bottom: 12 },
          suggestOnTriggerCharacters: true,
        }}
      />
    </div>
  );
}
