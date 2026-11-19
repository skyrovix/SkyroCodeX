"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Play,
  Share2,
  RotateCcw,
  Copy,
  Download,
  Sun,
  Moon,
  Check,
  Keyboard,
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
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const toggleTheme = () => {
    const isCurrentlyDark = (resolvedTheme || theme) === "dark";
    setTheme(isCurrentlyDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md transition-colors">
      <div className="flex h-14 items-center justify-between px-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group py-1">
            <div className="relative h-8 w-8 flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/logo-icon.png"
                alt="SkyroCodeX Icon"
                className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,87,34,0.45)]"
              />
            </div>
            <div className="flex flex-col justify-center">
              {/* Dark mode official wordmark */}
              <img
                src="/logo-wordmark-dark.png"
                alt="SkyroCodeX"
                className="hidden dark:block h-[22px] sm:h-[25px] w-auto object-contain -mb-0.5"
              />
              {/* Light mode official wordmark */}
              <img
                src="/logo-wordmark-light.png"
                alt="SkyroCodeX"
                className="block dark:hidden h-[22px] sm:h-[25px] w-auto object-contain -mb-0.5"
              />
              <span className="text-[8.5px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase pl-0.5">
                BY SKYROVIX
              </span>
            </div>
          </Link>

          {isEditor && onLanguageChange && (
            <div className="ml-2 sm:ml-4">
              <Dropdown
                items={languageDropdownItems}
                selectedId={currentLanguage}
                onSelect={(id) => onLanguageChange(id as SupportedLanguage)}
                buttonClassName="h-8 py-1 px-2.5 text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700/80"
              />
            </div>
          )}
        </div>

        {/* Center / Editor Actions */}
        {isEditor && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Run Button with Flame Orange Glow */}
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
                <span className="hidden md:inline-block ml-1.5 text-[10px] opacity-80 font-mono px-1 py-0.2 bg-white/20 rounded">
                  Ctrl+↵
                </span>
              </Button>
            )}

            {/* Quick Actions */}
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
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
                    <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
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
                <Share2 className="h-3.5 w-3.5 text-orange-500" />
                <span className="hidden xs:inline">Share</span>
              </Button>
            )}
          </div>
        )}

        {/* Right side navigation & theme */}
        <div className="flex items-center gap-2">
          {!isEditor && (
            <Link href="/editor">
              <Button variant="primary" size="sm" className="text-xs h-8 shadow-glow">
                <span>Start Coding</span>
              </Button>
            </Link>
          )}

          {/* Theme switcher toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            onClick={toggleTheme}
            title={mounted ? `Switch to ${(resolvedTheme || theme) === "dark" ? "light" : "dark"} mode` : "Toggle theme"}
          >
            {mounted ? (
              (resolvedTheme || theme) === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700 transition-transform" />
              )
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Auth links */}
          <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-700 dark:text-slate-300">
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
