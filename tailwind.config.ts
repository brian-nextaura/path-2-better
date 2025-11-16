import type { Config } from "tailwindcss";

const config: Config = {
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
        primary: {
          DEFAULT: '#2B6CB0',
          dark: '#2C5282',
          light: '#3182CE',
        },
        secondary: {
          DEFAULT: '#48BB78',
          dark: '#38A169',
          light: '#68D391',
        },
        accent: {
          DEFAULT: '#ED8936',
          dark: '#DD6B20',
          light: '#F6AD55',
        },
        neutral: {
          white: '#FFFFFF',
          gray: '#718096',
          charcoal: '#2D3748',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
