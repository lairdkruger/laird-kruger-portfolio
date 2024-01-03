export function browserIsTouchDevice() {
	return matchMedia('(pointer: coarse)').matches
}

export function userPrefersReducedMotion() {
	return matchMedia('(prefers-reduced-motion: reduce)').matches
}
