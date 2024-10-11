import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
      environment: 'jsdom',
      coverage: {
        provider: "v8",
        reportsDirectory: './test/coverage',
        reporter: ['text', 'text-summary']
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
})