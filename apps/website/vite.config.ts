import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
// @ts-expect-error https://github.com/Menci/vite-plugin-wasm#notes
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
	plugins: [wasm(), topLevelAwait(), sveltekit()]
})
