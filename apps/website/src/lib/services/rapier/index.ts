// Because Rapier is actually a WebAssembly module, it has to be loaded asynchronously
// https://rapier.rs/docs/user_guides/javascript/getting_started_js/

export type Rapier = typeof import('@dimforge/rapier3d')

export function getRapier() {
	return import('@dimforge/rapier3d')
}
