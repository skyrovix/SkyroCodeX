"use client";

import { useEffect } from "react";

export interface HotkeyOptions {
  onRun?: () => void;
  onSave?: () => void;
  onEscape?: () => void;
}

export function useHotkeys({ onRun, onSave, onEscape }: HotkeyOptions) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isMac = typeof window !== "undefined" && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      const isModifier = isMac ? event.metaKey : event.ctrlKey;

      if (isModifier && event.key === "Enter") {
        event.preventDefault();
        onRun?.();
      } else if (isModifier && (event.key === "s" || event.key === "S")) {
        event.preventDefault();
        onSave?.();
      } else if (event.key === "Escape") {
        onEscape?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRun, onSave, onEscape]);
}

