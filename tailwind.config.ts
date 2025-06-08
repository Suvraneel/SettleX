import type {Config} from "tailwindcss";

import svgToDataUri from "mini-svg-data-uri";
import {default as flattenColorPalette} from "tailwindcss/lib/util/flattenColorPalette";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                helvetica: ['"Helvetica Neue"', 'sans-serif'],
            },
            fontSize: {
                title: '2.75rem', // 44px
                subtitle: '1rem', // 16px
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)'
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)'
                },
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)'
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)'
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                    foreground_60: 'rgba(var(--muted-foreground-rgb), 0.8)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                    10: 'rgba(var(--accent-rgb), 0.1)',
                    30: 'rgba(var(--accent-rgb), 0.3)',
                    40: 'rgba(var(--accent-rgb), 0.4)',
                    80: 'rgba(var(--accent-rgb), 0.8)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)'
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                chart: {
                    '1': 'var(--chart-1)',
                    '2': 'var(--chart-2)',
                    '3': 'var(--chart-3)',
                    '4': 'var(--chart-4)',
                    '5': 'var(--chart-5)'
                },
                radialblur: '#17C1DE'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                float: {
                    '0%, 100%': {transform: 'translateY(0px)'},
                    '50%': {transform: 'translateY(-20px)'},
                },
                reflect: {
                    '0%, 100%': {transform: 'translateX(0) skewX(-20deg)'},
                    '50%': {transform: 'translateX(10px) skewX(-20deg)'},
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                float: 'float 8s ease-in-out infinite',
                reflect: 'slide-small 2s ease-in-out infinite',
            },
            transitionDelay: {
                2000: '2000ms',
                3000: '3000ms',
                4000: '4000ms',
            },
        }
    },
    plugins: [
        addVariablesForColors,
        minimalistBackgroundMesh,
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("tailwindcss-animate")
    ],
} satisfies Config;

function addVariablesForColors({addBase, theme}: any) {
    const allColors = flattenColorPalette(theme("colors"));
    const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}

function minimalistBackgroundMesh({matchUtilities, theme}: any) {
    matchUtilities(
        {
            "bg-grid": (value: any) => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                )}")`,
            }),
            "bg-grid-small": (value: any) => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                )}")`,
            }),
            "bg-dot": (value: any) => ({
                backgroundImage: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
                )}")`,
            }),
        },
        {values: flattenColorPalette(theme("backgroundColor")), type: "color"}
    );
}