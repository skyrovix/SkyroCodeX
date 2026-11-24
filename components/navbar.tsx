"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  BookOpen,
  Briefcase,
  Mail,
  ChevronDown,
  Code2,
  Terminal,
  Play,
  Share2,
  RotateCcw,
  Copy,
  Download,
  Sun,
  Moon,
  Check,
  Keyboard,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Info,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  PythonIcon,
  JavaScriptIcon,
  CppIcon,
  JavaIcon,
  CIcon,
  PhpIcon,
  SqlIcon,
  HtmlIcon,
  CssIcon,
  GoIcon,
} from "@/components/icons/language-icons";

function getLanguageIcon(id: string) {
  switch (id) {
    case "python":
      return <PythonIcon className="h-3.5 w-3.5 shrink-0" />;
    case "javascript":
      return <JavaScriptIcon className="h-3.5 w-3.5 shrink-0" />;
    case "html":
      return <HtmlIcon className="h-3.5 w-3.5 shrink-0" />;
    case "css":
      return <CssIcon className="h-3.5 w-3.5 shrink-0" />;
    case "cpp":
      return <CppIcon className="h-3.5 w-3.5 shrink-0" />;
    case "java":
      return <JavaIcon className="h-3.5 w-3.5 shrink-0" />;
    case "c":
      return <CIcon className="h-3.5 w-3.5 shrink-0" />;
    case "go":
      return <GoIcon className="h-3.5 w-3.5 shrink-0" />;
    case "php":
      return <PhpIcon className="h-3.5 w-3.5 shrink-0" />;
    case "sql":
      return <SqlIcon className="h-3.5 w-3.5 shrink-0" />;
    case "web":
      return <HtmlIcon className="h-3.5 w-3.5 shrink-0" />;
    default:
      return <Terminal className="h-3.5 w-3.5 text-orange-500" />;
  }
}
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
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setProductsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const languageDropdownItems = LANGUAGE_LIST.map((lang) => ({
    id: lang.id,
    label: lang.name,
    badge: lang.version,
    icon: getLanguageIcon(lang.id),
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

  const isHomeActive = pathname === "/";
  const isAboutActive = pathname === "/about";
  const isProductsActive =
    pathname.startsWith("/internship") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/products");
  const isContactActive = pathname === "/contact";
  const isEditorActive = isEditor;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md transition-colors">
      <div className={`flex ${isEditor ? "h-14 sm:h-16" : "h-16"} items-center justify-between px-2.5 sm:px-6 max-w-7xl mx-auto`}>
        {/* Left: Brand Logo & Editor Run Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
          <Link href="/" className="flex items-center gap-1.5 shrink-0 py-1">
            {/* Dark mode official wordmark */}
            <img
              src="/logo-wordmark-dark.png"
              alt="SkyroCodeX"
              className="hidden dark:block h-5 sm:h-7 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
            {/* Light mode official wordmark */}
            <img
              src="/logo-wordmark-light.png"
              alt="SkyroCodeX"
              className="block dark:hidden h-5 sm:h-7 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
            <span className="hidden sm:block text-[8.5px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase pl-0.5">
              BY SKYROVIX
            </span>
          </Link>

          {/* Editor Language Selector & Prominent Run Button */}
          {isEditor && (
            <div className="flex items-center gap-1.5 sm:gap-2 ml-1 sm:ml-3">
              {onLanguageChange && (
                <div className="max-w-[105px] xs:max-w-[130px] sm:max-w-none">
                  <Dropdown
                    items={languageDropdownItems}
                    selectedId={currentLanguage}
                    onSelect={(id) => onLanguageChange(id as SupportedLanguage)}
                    buttonClassName="h-8 py-1 px-2 sm:px-3 text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 font-semibold"
                  />
                </div>
              )}

              {onRun && (
                <Button
                  size="sm"
                  onClick={onRun}
                  isLoading={isRunning}
                  className="font-bold shadow-md shadow-orange-500/30 bg-[#FF5722] hover:bg-[#F4511E] text-white border-0 px-2.5 sm:px-3.5 h-8 text-xs gap-1 sm:gap-1.5 shrink-0"
                  title="Execute code (Ctrl+Enter)"
                >
                  {!isRunning && <Play className="h-3.5 w-3.5 fill-white text-white shrink-0" />}
                  <span>Run</span>
                  <span className="hidden md:inline-block ml-1 text-[10px] opacity-80 font-mono px-1 py-0.2 bg-white/20 rounded">
                    Ctrl+↵
                  </span>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Center: Exact Pill Navigation Menu (Desktop) */}
        {!isEditor && (
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800">
            {/* 1. Home */}
            <Link
              href="/"
              className={`rounded-full px-4 py-1.5 flex items-center gap-2 text-xs sm:text-sm font-bold transition-all ${
                isHomeActive
                  ? "bg-[#FF5722] text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] hover:bg-white dark:hover:bg-slate-800/80"
              }`}
            >
              <Home className={`h-4 w-4 ${isHomeActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
              <span>Home</span>
            </Link>

            {/* 2. About */}
            <Link
              href="/about"
              className={`rounded-full px-4 py-1.5 flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
                isAboutActive
                  ? "bg-[#FF5722] text-white shadow-sm font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] hover:bg-white dark:hover:bg-slate-800/80"
              }`}
            >
              <Info className={`h-4 w-4 ${isAboutActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
              <span>About</span>
            </Link>

            {/* 3. Our Product (Dropdown) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                onMouseEnter={() => setProductsOpen(true)}
                className={`rounded-full px-4 py-1.5 flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-all ${
                  isProductsActive
                    ? "bg-[#FF5722] text-white shadow-sm font-bold"
                    : "text-slate-700 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] hover:bg-white dark:hover:bg-slate-800/80"
                }`}
              >
                <Briefcase className={`h-4 w-4 ${isProductsActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                <span>Our Product</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  } ${isProductsActive ? "text-white" : "text-slate-400"}`}
                />
              </button>

              {/* Dropdown Menu Floating Card */}
              {productsOpen && (
                <div
                  onMouseLeave={() => setProductsOpen(false)}
                  className="absolute left-0 mt-2 w-72 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50"
                >
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                    Skyrovix Products & Ecosystem
                  </div>

                  {/* Sub-item 1: Skyrovix Internship */}
                  <a
                    href="https://skyrovix.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-500/10 dark:hover:bg-orange-500/15 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 mt-0.5 group-hover:scale-110 transition-transform">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                            Skyrovix Internship
                          </span>
                          <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 font-mono">
                          skyrovix.in
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Real-world software engineering cohorts with live mentorship.
                      </p>
                    </div>
                  </a>

                  {/* Sub-item 2: Skyrovix Courses */}
                  <a
                    href="https://skyrovix.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-500/10 dark:hover:bg-orange-500/15 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5 group-hover:scale-110 transition-transform">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                            Skyrovix Courses
                          </span>
                          <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono">
                          skyrovix.online
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        Full-Stack, Python AI, and DSA with browser compilers.
                      </p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* 4. Contact Us */}
            <Link
              href="/contact"
              className={`rounded-full px-4 py-1.5 flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
                isContactActive
                  ? "bg-[#FF5722] text-white shadow-sm font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] hover:bg-white dark:hover:bg-slate-800/80"
              }`}
            >
              <Mail className={`h-4 w-4 ${isContactActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
              <span>Contact Us</span>
            </Link>

            {/* 5. Practice / Compiler shortcut */}
            <Link
              href="/editor"
              className={`rounded-full px-4 py-1.5 flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
                isEditorActive
                  ? "bg-[#FF5722] text-white shadow-sm font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:text-[#FF5722] dark:hover:text-[#FF5722] hover:bg-white dark:hover:bg-slate-800/80"
              }`}
            >
              <Terminal className={`h-4 w-4 ${isEditorActive ? "text-white" : "text-orange-500"}`} />
              <span>Compiler</span>
            </Link>
          </nav>
        )}

        {/* Center / Editor Actions (When on /editor, Desktop only) */}
        {isEditor && (
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
            {/* Quick Actions Toolbar */}
            <div className="flex items-center gap-1">
              {onReset && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-600 dark:text-slate-300"
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
                  className="h-8 w-8 text-slate-600 dark:text-slate-300"
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
                  className="h-8 w-8 text-slate-600 dark:text-slate-300"
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
                  className="h-8 w-8 text-slate-600 dark:text-slate-300"
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
                className="h-8 text-xs gap-1.5 font-semibold"
              >
                <Share2 className="h-3.5 w-3.5 text-orange-500" />
                <span>Share</span>
              </Button>
            )}
          </div>
        )}

        {/* Right side: Editor Backlink or CTA, Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick link back to navigation on Editor */}
          {isEditor ? (
            <Link href="/" className="hidden md:inline-flex">
              <Button variant="ghost" size="sm" className="text-xs h-8 text-slate-600 dark:text-slate-300">
                <Home className="h-3.5 w-3.5 mr-1 text-slate-400" />
                <span>Home</span>
              </Button>
            </Link>
          ) : (
            <Link href="/editor" className="hidden sm:inline-flex lg:hidden">
              <Button variant="primary" size="sm" className="text-xs h-8 shadow-glow font-bold">
                <span>Start Coding</span>
              </Button>
            </Link>
          )}

          {/* Theme switcher toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 shrink-0"
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

          {/* Mobile Menu Hamburger (Visible on small & medium screens) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0B0F17]/98 px-4 py-4 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto">
          {/* Editor-Specific Quick Actions (when on /editor) */}
          {isEditor && (
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/60 p-2.5 space-y-1 border border-slate-200/80 dark:border-slate-800">
              <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Compiler Actions
              </div>

              {onShare && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onShare();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Share2 className="h-4 w-4 text-orange-500" />
                    <span>Share Snippet URL</span>
                  </div>
                </button>
              )}

              {onCopy && (
                <button
                  type="button"
                  onClick={() => {
                    handleCopyClick();
                    setTimeout(() => setMobileMenuOpen(false), 500);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-slate-500" />
                    )}
                    <span>{copied ? "Copied to Clipboard!" : "Copy Code"}</span>
                  </div>
                </button>
              )}

              {onDownload && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDownload();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Download className="h-4 w-4 text-slate-500" />
                    <span>Download Source File</span>
                  </div>
                </button>
              )}

              {onReset && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReset();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="h-4 w-4 text-slate-500" />
                    <span>Reset Starter Template</span>
                  </div>
                </button>
              )}

              {onOpenShortcuts && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenShortcuts();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Keyboard className="h-4 w-4 text-slate-500" />
                    <span>Keyboard Shortcuts</span>
                  </div>
                </button>
              )}
            </div>
          )}
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
              isHomeActive
                ? "bg-[#FF5722] text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link
            href="/about"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
              isAboutActive
                ? "bg-[#FF5722] text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Info className="h-4 w-4" />
            <span>About</span>
          </Link>

          {/* Mobile Our Product Accordion */}
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-2 space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Our Product
            </div>
            <a
              href="https://skyrovix.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4 text-orange-500" />
                <span>Skyrovix Internship</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-mono font-bold">
                <span>skyrovix.in</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>

            <a
              href="https://skyrovix.online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="h-4 w-4 text-amber-500" />
                <span>Skyrovix Courses</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                <span>skyrovix.online</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          </div>

          <Link
            href="/contact"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
              isContactActive
                ? "bg-[#FF5722] text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </Link>

          <Link
            href="/editor"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
              isEditorActive
                ? "bg-[#FF5722] text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Terminal className="h-4 w-4 text-orange-500" />
            <span>Compiler IDE</span>
          </Link>
        </div>
      )}
    </header>
  );
}
