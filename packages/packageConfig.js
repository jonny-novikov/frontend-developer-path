import { defineConfig } from 'vite'
import { resolve } from 'path'

const resolveDist = (path) => resolve(__dirname, 'dist', path)

export const useDefaultViteConfig = (pkgName) => defineConfig({
    base: `/${pkgName}`,
    build: {
        outDir: resolveDist(pkgName)
    },
    plugins: []
})
