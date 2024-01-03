import { writable } from 'svelte/store'
import { browserIsTouchDevice } from 'browser-utils'
import { browser } from '$app/environment'

function createBrowserIsTouchDevice() {
	const { subscribe, set } = writable(false)

	if (browser) {
		set(browserIsTouchDevice())
	}

	return {
		subscribe
	}
}

export const isTouchDevice = createBrowserIsTouchDevice()
