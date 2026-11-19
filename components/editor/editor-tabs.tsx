"use client";

import React from "react";
import { FileCode, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
    if (fileName.endsWith(".html")) return <span className="text-orange-500 font-bold text-[10px]">&lt;/&gt;</span>;
    if (fileName.endsWith(".css")) return <span className="text-blue-500 font-bold text-[10px]">#</span>;
    if (fileName.endsWith(".js") || fileName.endsWith(".ts")) return <span className="text-amber-500 font-bold text-[10px]">JS</span>;
    if (fileName.endsWith(".py")) return <span className="text-emerald-500 font-bold text-[10px]">PY</span>;
    if (fileName.endsWith(".java")) return <span className="text-rose-500 font-bold text-[10px]">☕</span>;
    if (fileName.endsWith(".cpp") || fileName.endsWith(".c")) return <span className="text-sky-500 font-bold text-[10px]">C++</span>;
    return <FileCode className="h-3.5 w-3.5 text-slate-400" />;
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#0B0F17] px-2 select-none overflow-x-auto scrollbar-none transition-colors">
      <div className="flex items-center gap-1 py-1">
        {files.map((file, idx) => {
          const isActive = idx === activeFileIndex;
          return (
            <div
              key={file.name}
              onClick={() => onSelectFile(idx)}
              className={cn(
                "group flex items-center gap-2 rounded-t-md px-3 py-1.5 text-xs font-mono transition-colors cursor-pointer border-t-2",
                isActive
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-t-orange-500 font-semibold shadow-sm"
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
                  className="rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {onAddFile && (
        <button
          type="button"
          onClick={onAddFile}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          title="Add new file"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
