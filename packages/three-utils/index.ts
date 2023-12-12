import type { PerspectiveCamera } from 'three'

// Returns scene height at zDepth from a perspective camera
export function visibleHeightAtZDepth(zDepth: number, camera: PerspectiveCamera) {
	const distance = Math.abs(zDepth - camera.position.z)
	const fovRadians = (camera.fov * Math.PI) / 180
	const height = Math.tan(fovRadians * 0.5) * distance * 2
	return height
}

// Returns scene width at zDepth from a perspective camera
export function visibleWidthAtZDepth(zDepth: number, camera: PerspectiveCamera) {
	const height = visibleHeightAtZDepth(zDepth, camera)
	const width = height * camera.aspect
	return width
}
