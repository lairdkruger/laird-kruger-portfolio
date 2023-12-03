import { writable } from 'svelte/store'
import { Vector3 } from 'three'

export const activeProject = writable<string | null>(null)

export const activeProjectPosition = writable<Vector3>(new Vector3(0, 0, 0))
