import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "SkyroCodeX — Online Code Compiler & IDE by Skyrovix",
  description:
    "Fast, modern online code compiler and IDE supporting Python, JavaScript, Java, C, C++, Go, PHP, SQL, and Web preview with sandboxed execution.",
  keywords: [
    "online compiler",
    "online ide",
    "skyrocodex",
    "skyrovix",
    "code runner",
    "python compiler",
    "monaco editor",
  ],
  authors: [{ name: "Skyrovix", url: "https://skyrovix.com" }],
  openGraph: {
    title: "SkyroCodeX — Online Code Compiler & IDE",
    description: "Code. Run. Share. Instantly. Powered by isolated container sandboxing.",
    url: "https://skyrocodex.skyrovix.com",
    siteName: "SkyroCodeX",
    type: "website",
    images: [{ url: "/logo-full.jpg" }],
  },
  icons: {
    icon: "/logo-icon.png",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 antialiased selection:bg-orange-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
