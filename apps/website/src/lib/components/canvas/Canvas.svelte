<script lang="ts">
	import { onMount } from 'svelte'
	import { createWebglContext } from '$lib/contexts/webgl'

	// References
	let canvas: HTMLCanvasElement

	// Canvas
	const { initWebgl } = createWebglContext()

	onMount(() => {
		initWebgl(canvas)
	})
</script>

<canvas class="canvas" bind:this={canvas} />
<slot />

<style>
	.canvas {
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
	}
</style>
