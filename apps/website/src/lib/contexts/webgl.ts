import { getRapier, type Rapier } from '$lib/components/canvas/physics/rapier'
import type { World } from '@dimforge/rapier3d'
import { getContext, setContext } from 'svelte'
import { get, writable, type Writable } from 'svelte/store'
import { WebGLRenderer, PerspectiveCamera, Scene, Vector2, Clock } from 'three'

type WebglFrameCallback = ({ elapsedTime }: { elapsedTime: number }) => void

interface WebglContext {
	scene: Writable<Scene | null>
	camera: Writable<PerspectiveCamera | null>
	renderer: Writable<WebGLRenderer | null>
	rapier: Writable<Rapier | null>
	rapierWorld: Writable<World | null>
	initWebgl: (canvas: HTMLCanvasElement) => void
	onFrame: (callback: WebglFrameCallback) => void
}

export function createWebglContext(key?: string) {
	const contextKey = key || 'webgl'

	const sceneCurrent: Writable<Scene | null> = writable(null)
	const cameraCurrent: Writable<PerspectiveCamera | null> = writable(null)
	const rendererCurrent: Writable<WebGLRenderer | null> = writable(null)
	const rapierCurrent: Writable<Rapier | null> = writable(null)
	const rapierWorldCurrent: Writable<World | null> = writable(null)

	const callbacks: WebglFrameCallback[] = []
	const clock = new Clock()

	function onResize() {
		const camera = get(cameraCurrent)
		const renderer = get(rendererCurrent)

		if (!camera || !renderer) return null
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	async function init(canvas: HTMLCanvasElement) {
		sceneCurrent.set(new Scene())
		cameraCurrent.set(new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
		rendererCurrent.set(
			new WebGLRenderer({
				// Most performant settings when using custom post-processing persistance
				canvas: canvas,
				antialias: false,
				alpha: false,
				powerPreference: 'high-performance',
				stencil: false,
				depth: false
			})
		)

		const camera = get(cameraCurrent)
		camera?.position.set(0, 0, 5)

		const renderer = get(rendererCurrent)
		renderer!.setPixelRatio(window.devicePixelRatio)
		renderer!.setSize(window.innerWidth, window.innerHeight)
		renderer!.setClearColor(0x000000, 0)

		const size = new Vector2()
		renderer!.getSize(size)

		// Physics
		const rapierInstance = await getRapier()
		rapierCurrent.set(rapierInstance)
		const rapier = get(rapierCurrent)!

		const world = new rapier.World({ x: 0.0, y: -9.81, z: 0.0 })
		rapierWorldCurrent.set(world)

		// Events
		window.addEventListener('resize', onResize)

		// Animate
		loop()
	}

	function onFrame(callback: WebglFrameCallback) {
		callbacks.push(callback)
	}

	function render() {
		const camera = get(cameraCurrent)
		const scene = get(sceneCurrent)
		const renderer = get(rendererCurrent)

		const rapierWorld = get(rapierWorldCurrent)

		// Render the scene into render target
		if (!renderer || !scene || !camera || !rapierWorld) {
			return null
		}

		rapierWorld.step()
		renderer.render(scene, camera)
	}

	function loop() {
		const elapsedTime = clock.getElapsedTime()

		callbacks.forEach((callback) => callback({ elapsedTime }))
		render()
		requestAnimationFrame(loop)
	}

	return setContext<WebglContext>(contextKey, {
		scene: sceneCurrent,
		camera: cameraCurrent,
		renderer: rendererCurrent,
		rapier: rapierCurrent,
		rapierWorld: rapierWorldCurrent,
		initWebgl: (canvas: HTMLCanvasElement) => init(canvas),
		onFrame
	})
}

export function getWebglContext(key?: string): WebglContext {
	const contextKey = key || 'webgl'
	const context = getContext(contextKey) as WebglContext
	return context
}
