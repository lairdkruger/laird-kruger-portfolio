import { derived, writable } from 'svelte/store'

export const svelteInitialized = writable<boolean>(false)
export const webglInitialized = writable<boolean>(false)

export const siteLoaded = derived(
	[svelteInitialized, webglInitialized],
	([$svelteInitialized, $webglInitialized]) => {
		return $svelteInitialized && $webglInitialized
	}
)
