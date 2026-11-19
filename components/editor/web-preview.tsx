"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, RotateCw, ExternalLink } from "lucide-react";
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
    // Auto-update after brief debounce
    const timer = setTimeout(() => {
      setSrcDoc(assembleDocument());
    }, 400);

    return () => clearTimeout(timer);
  }, [html, css, javascript]);

  return (
    <div className="flex h-full w-full flex-col bg-slate-950 border-t md:border-t-0 md:border-l border-slate-800">
      {/* Header toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-3 py-1.5">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
          <Eye className="h-4 w-4 text-blue-400" />
          <span>Interactive Web Preview</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800/40 font-mono">
            Sandboxed
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:text-slate-200"
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

