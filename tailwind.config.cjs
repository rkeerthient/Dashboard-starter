// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./lib/**/*.{js,jsx}"],
  relative: true,
  jit: true,
  theme: {
    extend: {
      fontFamily: {
        opensans: ["Open-sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        bangers: ["Bangers", "cursive"],
        bowlby: ["Bowlby", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        recursive: ["Recursive", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color, #2563eb)",
        "primary-light": "var(--primary-color-light, #dbeafe)",
        "primary-dark": "var(--primary-color-dark, #1e40af)",
        neutral: "var(--neutral-color, #4b5563)",
        "neutral-light": "var(--neutral-color-light, #9ca3af)",
        "neutral-dark": "var(--neutral-color-dark, #1f2937)",
        containerBG: "#f9fafb",
        fieldBlurBorder: "#e1e5e8",
        fieldFocusBorder: "#1564F9",
        textColor: "#374151",
        disabled: "#e1e5e8",
        active: "#4d6272",
        bgTooltip: "#111827",
        done: "#239f25",
        dropdownBG: "#e1e58",
        dropdownHoverBG: "#8896a1",
        dropdownActiveBG: "#f0f2f4",
        headerBG: "#022169",
        linkColor: "#1463f9",
      },
      borderRadius: {
        cta: "var(--cta-border-radius, 1rem)",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
        },
      },
    },
  },
};
