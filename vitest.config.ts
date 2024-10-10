import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            reportsDirectory: './test/coverage',
            reporter: ['text-summary']
        },
    },
})