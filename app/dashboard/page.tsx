"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Plus, Code2, Trash2, ExternalLink, Calendar } from "lucide-react";
import { getLanguageConfig } from "@/lib/languages";

interface LocalSnippet {
  shortId: string;
  language: string;
  files: Array<{ name: string; content: string }>;
  createdAt: string;
}

export default function DashboardPage() {
  const [snippets, setSnippets] = useState<LocalSnippet[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items: LocalSnippet[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("skyro_snippet_")) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || "{}");
            items.push(data);
          } catch (e) {
            console.error(e);
          }
        }
      }
      setSnippets(items);
    }
  }, []);

  const handleDelete = (shortId: string) => {
    if (confirm("Delete this snippet from your local cache?")) {
      localStorage.removeItem(`skyro_snippet_${shortId}`);
      setSnippets((prev) => prev.filter((s) => s.shortId !== shortId));
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Your Workspace & Snippets</h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your saved code projects and cloud executions.
            </p>
          </div>

          <Link href="/editor">
            <Button variant="primary" size="sm" className="gap-2 shadow-glow">
              <Plus className="h-4 w-4" />
              <span>New Snippet</span>
            </Button>
          </Link>
        </div>

        {snippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/30">
            <Code2 className="h-10 w-10 text-slate-400 dark:text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No snippets saved yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6">
              Open the online compiler, write code in any of our 9+ supported languages, and click &ldquo;Share&rdquo; to save it here.
            </p>
            <Link href="/editor">
              <Button variant="primary" className="shadow-glow">Launch Compiler</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {snippets.map((snippet) => {
              const langConfig = getLanguageConfig(snippet.language);
              return (
                <div
                  key={snippet.shortId}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 hover:border-orange-500/50 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/80 px-2 py-0.5 rounded border border-orange-200 dark:border-orange-900/40">
                        {langConfig.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">#{snippet.shortId}</span>
                    </div>

                    <div className="text-xs font-mono text-slate-600 dark:text-slate-400 line-clamp-3 bg-slate-50 dark:bg-slate-950 p-2.5 rounded border border-slate-200 dark:border-slate-800/80 my-2">
                      {snippet.files?.[0]?.content || "No source code"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800/60 mt-2 text-xs">
                    <span className="text-slate-500 text-[11px] flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(snippet.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(snippet.shortId)}
                        className="text-slate-400 hover:text-rose-500 p-1 rounded"
                        title="Delete snippet"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <Link href={`/s/${snippet.shortId}`}>
                        <Button variant="secondary" size="sm" className="h-7 text-xs gap-1">
                          <span>Open</span>
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
