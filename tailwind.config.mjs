import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#4cc2ff',
          secondary: '#8b7cf6',
        },
        surface: '#12141b',
        'surface-2': '#171a23',
      },
    },
  },
  plugins: [],
} satisfies Config;