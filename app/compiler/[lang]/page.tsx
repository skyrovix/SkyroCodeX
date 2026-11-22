import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ALL_SEO_LANGUAGES, SEO_LANGUAGES_MAP } from "@/lib/seo-languages";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { SupportedLanguage } from "@/types/language";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

// Generate static routes for all supported languages
export async function generateStaticParams() {
  return ALL_SEO_LANGUAGES.map((item) => ({
    lang: item.id,
  }));
}

// SEO Metadata for search engine indexing
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const seo = SEO_LANGUAGES_MAP[lang as SupportedLanguage];

  if (!seo) {
    return {
      title: "Online Compiler - SkyroCodeX",
      description: "Fast, modern cloud code compiler by Skyrovix.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://skyrocodex.skyrovix.online";
  const canonicalUrl = `${baseUrl}/editor?lang=${seo.id}`;

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
    },
  };
}

// Directly redirect to the full compiler for that specific language
export default async function CompilerPage({ params }: PageProps) {
  const { lang } = await params;
  const targetLang = SUPPORTED_LANGUAGES[lang as SupportedLanguage] ? lang : "python";
  redirect(`/editor?lang=${targetLang}`);
}
