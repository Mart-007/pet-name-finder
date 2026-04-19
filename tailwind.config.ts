import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {},
        },
    },
    plugins: [tailwindcssAnimate],
} satisfies Config;
