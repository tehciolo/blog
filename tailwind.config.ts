import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        "holy": "auto 1fr auto",
      },
    }
  }
} satisfies Config;
