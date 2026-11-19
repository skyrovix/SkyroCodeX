"use client";

import React, { useRef } from "react";
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
  const { resolvedTheme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define custom theme colors matching Skyrovix dark palette
    monaco.editor.defineTheme("skyro-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "93c5fd", fontStyle: "bold" },
        { token: "string", foreground: "86efac" },
        { token: "number", foreground: "fcd34d" },
        { token: "function", foreground: "c084fc" },
      ],
      colors: {
        "editor.background": "#0B0F19",
        "editor.foreground": "#E2E8F0",
        "editor.lineHighlightBackground": "#161F30",
        "editorLineNumber.foreground": "#475569",
        "editorLineNumber.activeForeground": "#60A5FA",
        "editorCursor.foreground": "#38BDF8",
        "editorIndentGuide.background": "#1E293B",
        "editorIndentGuide.activeBackground": "#3B82F6",
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

  const currentTheme = resolvedTheme === "light" ? "light" : "skyro-dark";

  return (
    <div className="relative h-full w-full overflow-hidden bg-editor-bg">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={value}
        theme={currentTheme}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorDidMount}
        loading={
          <div className="flex h-full w-full items-center justify-center bg-slate-950 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500 mr-2" />
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
