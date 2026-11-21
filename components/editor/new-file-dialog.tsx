"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, X, FileCode, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFile: (fileName: string) => void;
  defaultExtension: string;
  existingFiles: string[];
}

export function NewFileDialog({
  isOpen,
  onClose,
  onAddFile,
  defaultExtension,
  existingFiles,
}: NewFileDialogProps) {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compute common suggestions based on extension
  const getSuggestions = (ext: string) => {
    switch (ext.toLowerCase()) {
      case "py":
        return ["helper.py", "utils.py", "test.py", "data.txt"];
      case "js":
      case "ts":
        return ["helper.js", "utils.js", "data.json", "config.js"];
      case "html":
      case "htm":
        return ["style.css", "script.js", "about.html", "data.json"];
      case "cpp":
      case "cc":
        return ["helper.h", "solution.cpp", "input.txt"];
      case "c":
        return ["helper.h", "solution.c", "input.txt"];
      case "java":
        return ["Helper.java", "Solution.java", "input.txt"];
      case "sql":
        return ["queries.sql", "schema.sql", "seed.sql"];
      case "go":
        return ["helper.go", "utils.go", "types.go"];
      case "php":
        return ["helper.php", "config.php", "data.json"];
      default:
        return [`helper.${ext}`, `utils.${ext}`, "data.txt"];
    }
  };

  useEffect(() => {
    if (isOpen) {
      const ext = defaultExtension.replace(/^\./, "");
      const baseNum = existingFiles.length + 1;
      const initial = `file${baseNum}.${ext}`;
      setFileName(initial);
      setError(null);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Select base name without extension
          const dotIdx = initial.lastIndexOf(".");
          if (dotIdx > 0) {
            inputRef.current.setSelectionRange(0, dotIdx);
          } else {
            inputRef.current.select();
          }
        }
      }, 50);
    }
  }, [isOpen, defaultExtension, existingFiles.length]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = fileName.trim();
    if (!trimmed) {
      setError("File name cannot be empty.");
      return;
    }
    if (existingFiles.some((f) => f.toLowerCase() === trimmed.toLowerCase())) {
      setError("A file with this name already exists.");
      return;
    }
    onAddFile(trimmed);
    onClose();
  };

  const suggestions = getSuggestions(defaultExtension.replace(/^\./, ""));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E131F] p-5 shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-[#FF5722]">
              <Plus className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Add New File / Page
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Create a new source file in your workspace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              File Name (with extension)
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={fileName}
                onChange={(e) => {
                  setFileName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. helper.py"
                className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
              />
            </div>
            {error && (
              <p className="text-[11px] text-rose-500 font-medium mt-1.5">
                {error}
              </p>
            )}
          </div>

          {/* Quick Suggestions */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
              Suggestions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => {
                    setFileName(sug);
                    setError(null);
                  }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                    fileName === sug
                      ? "border-[#FF5722] bg-orange-500/10 text-[#FF5722] font-semibold"
                      : "border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs h-8"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="text-xs h-8 bg-[#FF5722] hover:bg-[#F4511E] text-white font-semibold gap-1.5"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Create File</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

