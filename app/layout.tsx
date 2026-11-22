import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://skyrocodex.skyrovix.online"),
  title: {
    default: "Online Compiler & Cloud IDE | Run Python, HTML, C++, Java Online - SkyroCodeX",
    template: "%s | SkyroCodeX Online Compiler",
  },
  description:
    "Fast, free online code compiler & cloud IDE. Write, compile, and execute Python, HTML, CSS, JavaScript, C++, Java, C, Go, PHP, and SQL in your browser with instant output, live preview, stdin input, and zero setup. Built by Skyrovix.",
  keywords: [
    "online compiler",
    "free online compiler",
    "best online compiler",
    "online code editor",
    "online code runner",
    "online ide",
    "run code online",
    "execute code online",
    "browser code compiler",
    "cloud compiler",
    "compiler with stdin",
    "html online compiler",
    "online html compiler",
    "html compiler online",
    "run html online",
    "html editor online with live preview",
    "free html online compiler",
    "html5 online compiler",
    "html css js online compiler",
    "live html preview",
    "python online compiler",
    "online python compiler",
    "run python online",
    "python 3 compiler online",
    "c++ online compiler",
    "online c++ compiler",
    "g++ online compiler",
    "run c++ online",
    "c online compiler",
    "online c compiler",
    "gcc online compiler",
    "run c online",
    "java online compiler",
    "online java compiler",
    "run java online",
    "javascript online compiler",
    "online javascript compiler",
    "node js online compiler",
    "sql online compiler",
    "online sql compiler",
    "sqlite online compiler",
    "css online compiler",
    "php online compiler",
    "go online compiler",
    "skyrocodex",
    "skyrovix",
  ],
  authors: [{ name: "Skyrovix", url: "https://skyrovix.in" }],
  creator: "Hariharan S.",
  publisher: "Skyrovix",
  alternates: {
    canonical: "https://skyrocodex.skyrovix.online",
  },
  openGraph: {
    title: "Online Compiler & Cloud IDE | Run Code Online - SkyroCodeX",
    description: "Write, compile, and execute code in Python, HTML/CSS/JS, C++, Java, C, Go, PHP, and SQL with pre-warmed container sandboxing. Zero setup, real-time output, and instant sharing.",
    url: "https://skyrocodex.skyrovix.online",
    siteName: "SkyroCodeX Online Compiler",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo-full.jpg",
        width: 1200,
        height: 630,
        alt: "SkyroCodeX - Online Code Compiler & IDE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Compiler & Cloud IDE | SkyroCodeX by Skyrovix",
    description: "Write, compile, and execute code in Python, HTML/CSS/JS, C++, Java, and more with instant execution and live web preview.",
    images: ["/logo-full.jpg"],
    creator: "@skyrovix",
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
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF5722",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const masterOrgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "SkyroCodeX Online Compiler",
        url: "https://skyrocodex.skyrovix.online",
        description: "Fast, modern online code compiler and IDE supporting Python, HTML/CSS/JS, C++, Java, C, Go, PHP, and SQL.",
        publisher: {
          "@type": "EducationalOrganization",
          name: "Skyrovix",
          url: "https://skyrovix.in",
          legalName: "Skyrovix",
          taxID: "UDYAM-TN-17-0076606",
          founder: {
            "@type": "Person",
            name: "Hariharan S.",
            jobTitle: "Founder & Lead Developer",
            sameAs: "https://www.linkedin.com/in/hariharan-s-92b566381",
          },
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://skyrocodex.skyrovix.online/compiler/{search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "SkyroCodeX Online Compiler & IDE",
        operatingSystem: "All",
        applicationCategory: "DeveloperApplication",
        url: "https://skyrocodex.skyrovix.online",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "1480",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "Skyrovix",
        url: "https://skyrovix.in",
        sameAs: [
          "https://www.linkedin.com/in/hariharan-s-92b566381",
          "https://skyrovix.online",
        ],
        founder: {
          "@type": "Person",
          name: "Hariharan S.",
          jobTitle: "Founder & Lead Developer",
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(masterOrgSchema) }}
        />
      </head>
      <body className="min-h-screen font-sans bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
