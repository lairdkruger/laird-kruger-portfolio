import { webglInitialized } from '$lib/stores/loading'
import { userHasInteracted } from '$lib/stores/ui'
import RAPIER from '@dimforge/rapier3d-compat'
import type { World } from '@dimforge/rapier3d-compat'
import { getContext, setContext } from 'svelte'
import { get, writable, type Writable } from 'svelte/store'
import { WebGLRenderer, PerspectiveCamera, Scene, Vector2, Clock, Raycaster } from 'three'

type WebglFrameCallback = ({ elapsedTime }: { elapsedTime: number }) => void
type EventCallback = () => void

interface WebglContext {
	scene: Writable<Scene | null>
	camera: Writable<PerspectiveCamera | null>
	renderer: Writable<WebGLRenderer | null>
	raycaster: Writable<Raycaster | null>
	pointer: Writable<Vector2>
	rapierWorld: Writable<World | null>
	initWebgl: (canvas: HTMLCanvasElement) => void
	onClick: (callback: EventCallback) => void
	onResize: (callback: EventCallback) => void
	onFrame: (callback: WebglFrameCallback) => void
}

export function createWebglContext(key?: string) {
	const contextKey = key || 'webgl'

	// Context properties are dynamically assigned
	// Due to the webgl initialization being an async process requiring a post-mounted canvas
	const sceneCurrent: Writable<Scene | null> = writable(null)
	const cameraCurrent: Writable<PerspectiveCamera | null> = writable(null)
	const rendererCurrent: Writable<WebGLRenderer | null> = writable(null)

	const pointerCurrent: Writable<Vector2> = writable<Vector2>(new Vector2(0, 0))
	const raycasterCurrent: Writable<Raycaster | null> = writable(null)

	const rapierWorldCurrent: Writable<World | null> = writable(null)

	const onFrameCallbacks: WebglFrameCallback[] = []
	const onClickCallbacks: EventCallback[] = []
	const onResizeCallbacks: EventCallback[] = []
	const clock = new Clock()

	function handleResize() {
		const camera = get(cameraCurrent)
		const renderer = get(rendererCurrent)

		if (!camera || !renderer) return null
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)

		for (const callback of onResizeCallbacks) {
			callback()
		}
	}

	function handlePointerMove(event: MouseEvent) {
		const x = (event.clientX / window.innerWidth) * 2 - 1
		const y = -(event.clientY / window.innerHeight) * 2 + 1
		const vector = new Vector2(x, y)
		pointerCurrent.set(vector)
	}

	function handleClick() {
		userHasInteracted.set(true)
		for (const callback of onClickCallbacks) {
			callback()
		}
	}

	async function init(canvas: HTMLCanvasElement) {
		sceneCurrent.set(new Scene())
		cameraCurrent.set(new PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 20))
		rendererCurrent.set(
			new WebGLRenderer({
				canvas: canvas,
				antialias: true,
				alpha: false,
				powerPreference: 'high-performance',
				stencil: false
			})
		)

		pointerCurrent.set(new Vector2())
		raycasterCurrent.set(new Raycaster())

		const camera = get(cameraCurrent)
		camera?.position.set(0, 0, -8)
		camera?.lookAt(0, 0, 0)

		const renderer = get(rendererCurrent)
		renderer!.setPixelRatio(window.devicePixelRatio)
		renderer!.setSize(window.innerWidth, window.innerHeight)
		renderer!.setClearColor(0x000000, 0)

		const size = new Vector2()
		renderer!.getSize(size)

		// Physics
		await RAPIER.init()

		const world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 })
		rapierWorldCurrent.set(world)

		// Events
		window.addEventListener('resize', () => {
			handleResize()
		})
		window.addEventListener('pointermove', (event) => {
			handlePointerMove(event)
		})
		canvas.addEventListener('pointerdown', (event) => {
			handlePointerMove(event)
			handleClick()
		})

		handleResize()
		loop()

		webglInitialized.set(true)
	}

	function onFrame(callback: WebglFrameCallback) {
		onFrameCallbacks.push(callback)
	}

	function onClick(callback: EventCallback) {
		onClickCallbacks.push(callback)
	}

	function onResize(callback: EventCallback) {
		onResizeCallbacks.push(callback)
	}

	function render() {
		const camera = get(cameraCurrent)
		const scene = get(sceneCurrent)
		const renderer = get(rendererCurrent)

		const raycaster = get(raycasterCurrent)
		const pointer = get(pointerCurrent)

		const rapierWorld = get(rapierWorldCurrent)

		// Render the scene into render target
		if (!renderer || !scene || !camera || !rapierWorld || !raycaster) {
			return null
		}

		raycaster.setFromCamera(pointer, camera)
		rapierWorld.step()
		renderer.render(scene, camera)
	}

	function loop() {
		const elapsedTime = clock.getElapsedTime()

		for (const callback of onFrameCallbacks) {
			callback({ elapsedTime })
		}

		render()
		requestAnimationFrame(loop)
	}

	return setContext<WebglContext>(contextKey, {
		scene: sceneCurrent,
		camera: cameraCurrent,
		renderer: rendererCurrent,
		raycaster: raycasterCurrent,
		pointer: pointerCurrent,
		rapierWorld: rapierWorldCurrent,
		initWebgl: (canvas: HTMLCanvasElement) => init(canvas),
		onClick: onClick,
		onResize: onResize,
		onFrame: onFrame
	})
}

export function getWebglContext(key?: string): WebglContext {
	const contextKey = key || 'webgl'
	const context = getContext(contextKey) as WebglContext
	return context
}
