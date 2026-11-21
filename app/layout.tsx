import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://skyrocodex.skyrovix.com"),
  title: {
    default: "SkyroCodeX — Online Code Compiler & IDE by Skyrovix",
    template: "%s | SkyroCodeX",
  },
  description:
    "Fast, modern online code compiler & cloud IDE supporting Python, JavaScript, C++, Java, C, Go, PHP, SQL, and Web preview with instant sandboxed execution. Built by Skyrovix.",
  keywords: [
    "online compiler",
    "online ide",
    "skyrocodex",
    "skyrovix",
    "code runner",
    "python online compiler",
    "c++ online compiler",
    "java online compiler",
    "javascript runner",
    "sql online compiler",
    "monaco editor in browser",
    "cloud compiler",
    "sandboxed code execution",
    "web preview ide",
  ],
  authors: [{ name: "Skyrovix", url: "https://skyrovix.in" }],
  creator: "Hariharan S.",
  publisher: "Skyrovix",
  alternates: {
    canonical: "https://skyrocodex.skyrovix.com",
  },
  openGraph: {
    title: "SkyroCodeX — Online Code Compiler & IDE by Skyrovix",
    description: "Write, compile, and execute code in 9+ languages with pre-warmed container sandboxing. Zero setup, real-time output, and instant sharing.",
    url: "https://skyrocodex.skyrovix.com",
    siteName: "SkyroCodeX",
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
    title: "SkyroCodeX — Online Code Compiler & IDE by Skyrovix",
    description: "Write, compile, and execute code in 9+ languages with pre-warmed container sandboxing. Zero setup, real-time output, and instant sharing.",
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
        name: "SkyroCodeX",
        url: "https://skyrocodex.skyrovix.com",
        description: "Fast, modern online code compiler and IDE supporting Python, JavaScript, Java, C, C++, Go, PHP, SQL, and Web preview.",
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
          target: "https://skyrocodex.skyrovix.com/compiler/{search_term_string}",
          "query-input": "required name=search_term_string",
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
