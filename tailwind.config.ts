import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd7ff",
          300: "#8ebdff",
          400: "#5998ff",
          500: "#3273fb",
          600: "#1b54f0",
          700: "#143edc",
          800: "#1734b2",
          900: "#18308c",
          950: "#101e55",
        },
        accent: {
          purple: "#8B5CF6",
          cyan: "#06B6D4",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
        editor: {
          bg: "#0B0F19",
          panel: "#111827",
          sidebar: "#0D1322",
          border: "#1F293D",
          hover: "#1E293B",
          active: "#25334E",
          text: "#E2E8F0",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.4)",
        "glow-purple": "0 0 25px -5px rgba(139, 92, 246, 0.4)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
