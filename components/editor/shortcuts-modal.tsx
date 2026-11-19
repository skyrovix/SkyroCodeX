"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";

export interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  const shortcuts = [
    { key: "Ctrl + Enter", mac: "⌘ + Enter", action: "Run / Execute code" },
    { key: "Ctrl + S", mac: "⌘ + S", action: "Save snippet to cloud / local" },
    { key: "Ctrl + /", mac: "⌘ + /", action: "Toggle line comment" },
    { key: "Ctrl + F", mac: "⌘ + F", action: "Find & replace in editor" },
    { key: "Alt + Shift + F", mac: "⌥ + ⇧ + F", action: "Format document" },
    { key: "Ctrl + D", mac: "⌘ + D", action: "Add selection to next find match" },
    { key: "Esc", mac: "Esc", action: "Close modal / unfocus" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Keyboard Shortcuts"
      description="Boost your productivity with quick navigation shortcuts."
    >
      <div className="space-y-2 mt-2">
        {shortcuts.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-2.5 text-xs"
          >
            <span className="text-slate-800 dark:text-slate-300 font-medium">{s.action}</span>
            <div className="flex items-center gap-1 font-mono">
              <kbd className="rounded bg-white dark:bg-slate-800 px-2 py-1 text-[11px] text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-sm">
                {s.key}
              </kbd>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
