import { writable } from 'svelte/store'

export const pageTransitionDuration = 600
export const pageTransitionTimeline = writable(0)
export const pageInTransition = writable(false)
