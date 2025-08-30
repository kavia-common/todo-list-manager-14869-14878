import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        accent: "#10b981",
        background: "#ffffff",
        muted: "#f8fafc",
        border: "#e5e7eb",
        text: "#0f172a",
      },
    },
  },
  corePlugins: {
    container: false,
  },
  darkMode: ["class"],
} satisfies Config;
