import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        tailwindcss(),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: new URL('./src', import.meta.url).pathname,
            },
        ],
    },
    server: {
        port: 3000,
    },
});
