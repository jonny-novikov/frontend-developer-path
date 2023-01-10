import { defineConfig } from 'vite'
import { resolve } from 'path'

const resolvePackage = (pkgName) => resolve(__dirname, `${pkgName}/dist/index.html`)

export default defineConfig({
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html')
			},
		},
	},
	plugins: []
})
