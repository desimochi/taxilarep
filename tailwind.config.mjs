/** @type {import('tailwindcss').Config} */
export default {
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
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  fadeInUp: {
			"0%": { opacity: 0, transform: "translateY(20px)" },
			"100%": { opacity: 1, transform: "translateY(0)" },
		  },
		  spinSlow: {
			"0%": { transform: "rotate(0deg)" },
			"100%": { transform: "rotate(360deg)" },
		  },
		},
		animation: {
		  fadeInUp: "fadeInUp 0.5s ease-out",
		  spinSlow: "spinSlow 2s linear infinite",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  