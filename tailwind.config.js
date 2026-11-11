/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        night: '#070908',
        surface: '#0B0F0C',
        panel: '#101511',
        ink: '#F2F6F2',
        'ink-soft': '#DCE5DE',
        'ink-muted': '#9AA69E',
        line: 'rgba(255,255,255,0.08)',
        neon: '#6EF59B',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'gray-light': '#F2F2F2',
        'gray-medium': '#5F6368',
        'gray-dark': '#3E3F41',
        'elektra-accent': '#15803D',
        'elektra-accent-light': '#4ADE80',
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '2xl': '20px',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.35)",
        panel: "0 24px 70px -24px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
        glow: "0 0 40px -8px rgba(21,128,61,0.55)",
        'glow-neon': "0 0 36px -6px rgba(110,245,155,0.35)",
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(600%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(-4px)" },
          "50%": { transform: "translateY(6px)" },
        },
        "trace": {
          "0%": { strokeDashoffset: "120" },
          "100%": { strokeDashoffset: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.075, 0.820, 0.165, 1) forwards",
        "slide-in-left": "slide-in-left 0.7s cubic-bezier(0.075, 0.820, 0.165, 1) forwards",
        "slide-in-right": "slide-in-right 0.7s cubic-bezier(0.075, 0.820, 0.165, 1) forwards",
        "marquee": "marquee 32s linear infinite",
        "scan": "scan 5s linear infinite",
        "pulse-soft": "pulse-soft 3.2s ease-in-out infinite",
        "float": "float 7s ease-in-out infinite",
        "trace": "trace 3s cubic-bezier(0.075, 0.820, 0.165, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
