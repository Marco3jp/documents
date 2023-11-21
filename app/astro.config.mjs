import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';

// https://astro.build/config
export default defineConfig({
    site: "https://marco3jp.github.io",
    base: "/documents/",
    build: {
        format: 'file'
    },
    integrations: [react(), tailwind()],
    markdown: {
        rehypePlugins: [rehypeHeadingIds],
        remarkPlugins: [remarkBreaks],
        shikiConfig: {
            theme: 'dracula',
            wrap: true
        }
    }
});
