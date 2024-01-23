import type { Config } from "tailwindcss";
import pallete from "./constants/pallete";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: { ...pallete },
  },
  plugins: [],
};

export default config;
