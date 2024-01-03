import { writable } from 'svelte/store'

export const pageTransitionDuration = 600

export const pageTransitionTimeline = writable(0)
export const pageInTransition = writable(false)
export const pageTheme = writable<'light' | 'dark'>('dark')

export const userHasInteracted = writable(false)
export const userFirstInteraction = writable(false)
