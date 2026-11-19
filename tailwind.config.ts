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
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#ff5722", // SkyroCodeX Solar Orange
          600: "#f97316",
          700: "#ea580c",
          800: "#c2410c",
          900: "#7c2d12",
          950: "#431407",
        },
        accent: {
          orange: "#FF5722",
          amber: "#F59E0B",
          fire: "#FF3D00",
          emerald: "#10B981",
          cyan: "#06B6D4",
          rose: "#F43F5E",
        },
        editor: {
          darkBg: "#0B0F17",
          darkPanel: "#111827",
          darkBorder: "#1E293B",
          darkHover: "#1F293D",
          lightBg: "#FFFFFF",
          lightPanel: "#F8FAFC",
          lightBorder: "#E2E8F0",
          lightHover: "#F1F5F9",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(255, 87, 34, 0.45)",
        "glow-amber": "0 0 25px -5px rgba(245, 158, 11, 0.45)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
