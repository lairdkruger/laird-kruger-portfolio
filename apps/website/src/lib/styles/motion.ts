import { quartOut } from 'svelte/easing'
import type { TweenedOptions } from 'svelte/motion'

export const motionDefault: TweenedOptions<number> = {
	duration: 1200,
	easing: quartOut
}
