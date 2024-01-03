<script lang="ts">
	import { onMount } from 'svelte'
	import { createWebglContext } from '$lib/contexts/webgl'
	import { tweened } from 'svelte/motion'
	import { motionDefault } from '$lib/styles/motion'
	import { siteLoaded } from '$lib/stores/loading'
	import { browser } from '$app/environment'

	// References
	let canvas: HTMLCanvasElement

	// Canvas
	const { initWebgl } = createWebglContext()

	onMount(() => {
		initWebgl(canvas)
	})

	const loadTimeline = tweened(0, { ...motionDefault, delay: 0 })
	const mobileOpacity = 0.35

	$: {
		if (browser) loadTimeline.set($siteLoaded ? (window.innerWidth <= 640 ? mobileOpacity : 1) : 0)
	}
</script>

<canvas class="canvas" bind:this={canvas} style="opacity: {$loadTimeline}" />
<slot />

<style>
	.canvas {
		position: fixed;
		z-index: -1;
		top: 0;
		left: 0;
		pointer-events: auto;
	}
</style>
