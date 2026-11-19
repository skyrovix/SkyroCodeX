"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Code2,
  Play,
  Share2,
  RotateCcw,
  Copy,
  Download,
  Sun,
  Moon,
  Sparkles,
  Check,
  Keyboard,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { LANGUAGE_LIST } from "@/lib/languages";
import { SupportedLanguage } from "@/types/language";

export interface NavbarProps {
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onRun?: () => void;
  isRunning?: boolean;
  onReset?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onOpenShortcuts?: () => void;
}

export function Navbar({
  currentLanguage = "python",
  onLanguageChange,
  onRun,
  isRunning = false,
  onReset,
  onCopy,
  onDownload,
  onShare,
  onOpenShortcuts,
}: NavbarProps) {
  const pathname = usePathname();
  const isEditor = pathname.startsWith("/editor") || pathname.startsWith("/s/");
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const languageDropdownItems = LANGUAGE_LIST.map((lang) => ({
    id: lang.id,
    label: lang.name,
    badge: lang.version,
  }));

  const handleCopyClick = () => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1">
                Skyro<span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">CodeX</span>
              </span>
              <span className="text-[9px] font-medium tracking-widest text-slate-400 uppercase -mt-1 hidden sm:block">
                by Skyrovix
              </span>
            </div>
          </Link>

          {isEditor && onLanguageChange && (
            <div className="ml-2 sm:ml-4">
              <Dropdown
                items={languageDropdownItems}
                selectedId={currentLanguage}
                onSelect={(id) => onLanguageChange(id as SupportedLanguage)}
                buttonClassName="h-8 py-1 px-2.5 text-xs bg-slate-900 border-slate-700/80"
              />
            </div>
          )}
        </div>

        {/* Center / Editor Actions */}
        {isEditor && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Run Button */}
            {onRun && (
              <Button
                variant="primary"
                size="sm"
                onClick={onRun}
                isLoading={isRunning}
                className="font-semibold shadow-glow px-3.5"
                title="Execute code (Ctrl+Enter)"
              >
                {!isRunning && <Play className="h-3.5 w-3.5 fill-current mr-1" />}
                <span>Run</span>
                <span className="hidden md:inline-block ml-1.5 text-[10px] opacity-75 font-mono px-1 py-0.2 bg-white/20 rounded">
                  Ctrl+↵
                </span>
              </Button>
            )}

            {/* Quick Actions */}
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-800 pl-2">
              {onReset && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onReset}
                  title="Reset to starter template"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}

              {onCopy && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleCopyClick}
                  title="Copy code to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}

              {onDownload && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onDownload}
                  title="Download code file"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}

              {onOpenShortcuts && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onOpenShortcuts}
                  title="Keyboard shortcuts"
                >
                  <Keyboard className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Share Button */}
            {onShare && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onShare}
                className="h-8 text-xs gap-1.5"
              >
                <Share2 className="h-3.5 w-3.5 text-blue-400" />
                <span className="hidden xs:inline">Share</span>
              </Button>
            )}
          </div>
        )}

        {/* Right side navigation & theme */}
        <div className="flex items-center gap-2">
          {!isEditor && (
            <Link href="/editor">
              <Button variant="primary" size="sm" className="text-xs h-8">
                <span>Start Coding</span>
              </Button>
            </Link>
          )}

          {/* Theme switcher */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-slate-100"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Auth links */}
          <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-800 pl-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-300">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="brand" size="sm" className="h-8 text-xs font-semibold">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
