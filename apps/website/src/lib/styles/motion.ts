import { cubicOut } from 'svelte/easing'
import type { SpringOpts } from 'svelte/motion'
import type { TransitionConfig } from 'svelte/transition'

export const motionDefault: TransitionConfig = {
	duration: 1400,
	easing: cubicOut
}

export const springConfigExtraSmooth: SpringOpts = {
	stiffness: 0.008,
	damping: 0.94,
	precision: 0.0005
}
