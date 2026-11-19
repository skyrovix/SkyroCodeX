"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface WebPreviewProps {
  html: string;
  css: string;
  javascript: string;
}

export function WebPreview({ html, css, javascript }: WebPreviewProps) {
  const [srcDoc, setSrcDoc] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const assembleDocument = () => {
    // Strip external references to local tabs since they are injected inline
    const sanitizedHtml = html
      .replace(/<link[^>]+href=["']styles\.css["'][^>]*>/gi, "")
      .replace(/<script[^>]+src=["']script\.js["'][^>]*><\/script>/gi, "");

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    /* User CSS */
    ${css}
  </style>
</head>
<body>
  ${sanitizedHtml}
  <script>
    try {
      ${javascript}
    } catch (err) {
      console.error("Preview runtime error:", err);
    }
  </script>
</body>
</html>
    `;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSrcDoc(assembleDocument());
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSrcDoc(assembleDocument());
    }, 400);

    return () => clearTimeout(timer);
  }, [html, css, javascript]);

  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-[#0B0F17] border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 transition-colors">
      {/* Header toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 px-3 py-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
          <Eye className="h-4 w-4 text-orange-500" />
          <span>Interactive Web Preview</span>
          <span className="text-[10px] text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/80 px-1.5 py-0.5 rounded border border-orange-200 dark:border-orange-800/40 font-mono font-medium">
            Sandboxed
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            onClick={handleRefresh}
            title="Refresh preview"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Sandboxed iframe container */}
      <div className="relative flex-1 w-full bg-white overflow-hidden">
        <iframe
          ref={iframeRef}
          title="SkyroCodeX Sandboxed Web Preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
