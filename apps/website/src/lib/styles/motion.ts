import { quartOut } from 'svelte/easing'
import type { SpringOpts, TweenedOptions } from 'svelte/motion'

export const motionDefault: TweenedOptions<number> = {
	duration: 1200,
	easing: quartOut
}

export const springConfigExtraSmooth: SpringOpts = {
	stiffness: 0.02,
	damping: 0.94,
	precision: 0.0005
}
