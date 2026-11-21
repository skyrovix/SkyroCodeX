import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ALL_SEO_LANGUAGES,
  SEO_LANGUAGES_MAP,
  getLanguageSeoData,
} from "@/lib/seo-languages";
import { SUPPORTED_LANGUAGES, getLanguageConfig } from "@/lib/languages";
import { SupportedLanguage } from "@/types/language";
import { CompilerPlayground } from "./compiler-playground";
import {
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

// Generate static routes for all 9 supported languages at build time
export async function generateStaticParams() {
  return ALL_SEO_LANGUAGES.map((item) => ({
    lang: item.id,
  }));
}

// Generate Master SEO Metadata for each programming language
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const seo = SEO_LANGUAGES_MAP[lang as SupportedLanguage];

  if (!seo) {
    return {
      title: "Online Compiler - SkyroCodeX",
      description: "Fast, modern cloud code compiler by Skyrovix.",
    };
  }

  const canonicalUrl = `https://skyrocodex.skyrovix.com/compiler/${seo.id}`;

  return {
    title: seo.seoTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.seoTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      siteName: "SkyroCodeX by Skyrovix",
      type: "website",
      images: [
        {
          url: "/logo-full.jpg",
          width: 1200,
          height: 630,
          alt: `${seo.name} Online Compiler - SkyroCodeX`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.seoTitle,
      description: seo.metaDescription,
      images: ["/logo-full.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CompilerPage({ params }: PageProps) {
  const { lang } = await params;
  const seo = SEO_LANGUAGES_MAP[lang as SupportedLanguage];

  if (!seo) {
    notFound();
  }

  const langConfig = getLanguageConfig(seo.id);

  // Generate Google Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: `${seo.name} Online Compiler`,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "All",
        url: `https://skyrocodex.skyrovix.com/compiler/${seo.id}`,
        description: seo.metaDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@type": "EducationalOrganization",
          name: "Skyrovix",
          url: "https://skyrovix.in",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://skyrocodex.skyrovix.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Compilers",
            item: "https://skyrocodex.skyrovix.com/editor",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${seo.name} Compiler`,
            item: `https://skyrocodex.skyrovix.com/compiler/${seo.id}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: seo.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const otherLanguages = ALL_SEO_LANGUAGES.filter((item) => item.id !== seo.id);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* JSON-LD Script for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/editor" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Compilers
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {seo.name}
              </span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-600 dark:text-orange-400 text-xs font-bold">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Official {seo.name} Compiler</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">
                    v{seo.version}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {seo.headline}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {seo.subheadline}
                </p>
              </div>

              {/* Direct Fullscreen Action */}
              <div className="flex sm:flex-col gap-3 shrink-0">
                <Link href={`/editor?lang=${seo.id}`}>
                  <Button variant="primary" className="w-full font-bold gap-2 shadow-glow h-11 px-5">
                    <Zap className="h-4 w-4" />
                    <span>Launch in Full IDE</span>
                  </Button>
                </Link>
                <Link href="/editor">
                  <Button variant="outline" className="w-full font-semibold text-xs h-9">
                    <span>Explore All Languages</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* INTERACTIVE LIVE PLAYGROUND */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Live {seo.name} Sandbox
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                Run directly in browser or open in full IDE
              </span>
            </div>

            <CompilerPlayground
              languageId={seo.id}
              languageName={seo.name}
              initialCode={langConfig.starterCode}
              isWebPreview={langConfig.isWebPreview}
            />
          </section>

          {/* RUNTIME SPECS & FEATURES */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Features List */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  Engine Architecture
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Why Developers Choose SkyroCodeX for {seo.name}
                </h2>
              </div>

              <div className="space-y-3">
                {seo.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3"
                  >
                    <div className="mt-0.5 p-1 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 shrink-0">
                      <Zap className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Use Cases */}
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-orange-500" />
                  <span>Popular Use Cases</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {seo.useCases.map((uc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0"></span>
                      <span>{uc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Specifications Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Cpu className="h-5 w-5 text-orange-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Technical Specifications
                </h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400">Runtime Engine</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">
                    {seo.runtimeSpec.engine}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400">Version</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">
                    {seo.runtimeSpec.version}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400">Execution Timeout</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">
                    {seo.runtimeSpec.timeout}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800/60">
                  <span className="text-slate-500 dark:text-slate-400">Memory Ceiling</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">
                    {seo.runtimeSpec.memoryLimit}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 dark:text-slate-400">Security Boundary</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {seo.runtimeSpec.isolation}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/editor?lang=${seo.id}`} className="block">
                  <Button variant="secondary" className="w-full text-xs font-bold gap-1.5">
                    <span>Open {seo.name} in Monaco IDE</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* FREQUENTLY ASKED QUESTIONS (SEO FAQ ACCORDION) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-orange-500" />
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Common questions about compiling and running {seo.name} online
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {seo.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* INTERNAL LINKING MESH: ALL OTHER COMPILERS */}
          <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Explore More Runtimes
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                Other Online Compilers Available in SkyroCodeX
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {otherLanguages.map((other) => (
                <Link
                  key={other.id}
                  href={`/compiler/${other.id}`}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 hover:shadow-sm transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        {other.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      v{other.version}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-orange-600 dark:text-orange-400">
                    <span>Run code</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

