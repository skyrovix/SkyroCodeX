"use client";

import React from "react";
import { FileCode, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PythonIcon,
  JavaScriptIcon,
  CppIcon,
  JavaIcon,
  CIcon,
  PhpIcon,
  SqlIcon,
  HtmlIcon,
  CssIcon,
  GoIcon,
} from "@/components/icons/language-icons";

export interface EditorFile {
  name: string;
  language: string;
  content: string;
}

export interface EditorTabsProps {
  files: EditorFile[];
  activeFileIndex: number;
  onSelectFile: (index: number) => void;
  onAddFile?: () => void;
  onCloseFile?: (index: number) => void;
}

export function EditorTabs({
  files,
  activeFileIndex,
  onSelectFile,
  onAddFile,
  onCloseFile,
}: EditorTabsProps) {
  const getFileIcon = (fileName: string) => {
    const lower = fileName.toLowerCase();
    if (lower.endsWith(".html") || lower.endsWith(".htm")) return <HtmlIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".css")) return <CssIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".js") || lower.endsWith(".ts")) return <JavaScriptIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".py")) return <PythonIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".java")) return <JavaIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".cpp") || lower.endsWith(".cc")) return <CppIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".c")) return <CIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".go")) return <GoIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".php")) return <PhpIcon className="h-3.5 w-3.5 shrink-0" />;
    if (lower.endsWith(".sql")) return <SqlIcon className="h-3.5 w-3.5 shrink-0" />;
    return <FileCode className="h-3.5 w-3.5 text-slate-400" />;
  };

  return (
    <div className="h-9 flex items-center select-none overflow-x-auto scrollbar-none transition-colors">
      <div className="h-full flex items-center">
        {files.map((file, idx) => {
          const isActive = idx === activeFileIndex;
          return (
            <div
              key={`${file.name}-${idx}`}
              onClick={() => onSelectFile(idx)}
              className={cn(
                "group h-full flex items-center gap-2 px-3.5 text-xs font-mono transition-colors cursor-pointer border-r border-slate-200/80 dark:border-slate-800 border-t-2",
                isActive
                  ? "bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 border-t-[#FF5722] font-semibold shadow-sm"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-slate-200 border-t-transparent"
              )}
            >
              {getFileIcon(file.name)}
              <span className="truncate max-w-[130px]">{file.name}</span>

              {/* Close Button - Always visible matching OneCompiler style */}
              {onCloseFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseFile(idx);
                  }}
                  className="rounded p-0.5 ml-0.5 text-slate-400 hover:text-rose-500 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
                  title={files.length > 1 ? `Close ${file.name}` : `Reset / clear ${file.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Plus Button - Styled matching OneCompiler tab */}
        {onAddFile && (
          <button
            type="button"
            onClick={onAddFile}
            className="h-full min-w-[38px] px-3.5 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100 border-r border-slate-200/80 dark:border-slate-800 transition-colors"
            title="Add new file (+)"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
