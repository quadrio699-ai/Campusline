import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEF2F6",
        "paper-raised": "#FFFFFF",
        ink: "#1C2438",
        "ink-muted": "#535F79",
        stamp: "#C1442D",
        "stamp-dark": "#9C3520",
        perf: "#C3CBD6",
        gold: "#C89B3C",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        ticket: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
