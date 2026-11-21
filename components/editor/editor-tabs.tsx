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
    if (lower.endsWith(".css")) return <span className="text-blue-500 font-bold text-[10px] font-mono">#</span>;
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
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#0D121F] px-2 select-none overflow-x-auto scrollbar-none transition-colors">
      <div className="flex items-center gap-1">
        {files.map((file, idx) => {
          const isActive = idx === activeFileIndex;
          return (
            <div
              key={file.name}
              onClick={() => onSelectFile(idx)}
              className={cn(
                "group flex items-center gap-2 rounded-t-md px-3.5 py-2 text-xs font-mono transition-colors cursor-pointer border-t-2 border-r border-slate-200/60 dark:border-slate-800/60",
                isActive
                  ? "bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 border-t-[#FF5722] font-semibold shadow-sm"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-900/60 hover:text-slate-900 dark:hover:text-slate-200 border-t-transparent"
              )}
            >
              {getFileIcon(file.name)}
              <span className="truncate max-w-[120px]">{file.name}</span>

              {files.length > 1 && onCloseFile && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseFile(idx);
                  }}
                  className="rounded p-0.5 opacity-60 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}

        {onAddFile && (
          <button
            type="button"
            onClick={onAddFile}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors ml-1"
            title="Add new file"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
