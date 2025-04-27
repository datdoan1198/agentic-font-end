import {defineConfig, transformWithEsbuild} from "vite";
import react from "@vitejs/plugin-react";
import {createRequire} from "module";
import path from "path";

const require = createRequire(import.meta.url);

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@ckeditor": path.resolve(__dirname, "node_modules", "@ckeditor"),
        },
    },
    plugins: [
        {
            name: "treat-js-files-as-jsx",
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;

                return transformWithEsbuild(code, id, {
                    loader: "jsx",
                    jsx: "automatic",
                });
            },
        },
        react(),
    ],
    css: {
        modules: {
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        }
    },
    build: {
        outDir: 'dist_lib',
        lib: {
            entry: './src/init.js',
            name: 'AgenticAIChat',
            fileName: '/main',
            formats: ['iife'],
        },
        cssCodeSplit: true,
        rollupOptions: {
            external: [],
            output: {
                assetFileNames: 'widget/[name].[hash][extname]',
                entryFileNames: 'widget/main.js',
            },
        },
    },

    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
});
