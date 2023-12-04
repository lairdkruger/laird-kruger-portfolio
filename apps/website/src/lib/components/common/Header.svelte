<script lang="ts">
	import { siteLoaded } from '$lib/stores/load'
	import { motionDefault } from '$lib/styles/motion'
	import { tweened } from 'svelte/motion'

	const loadTimeline = tweened(0, motionDefault)
	$: loadTimeline.set($siteLoaded ? 1 : 0)
</script>

<header style="opacity: {$loadTimeline}">
	<h1><a href="/">Laird Kruger</a></h1>
</header>

<style>
	header {
		position: fixed;
		top: var(--margin);
		left: var(--margin);

		mix-blend-mode: var(--mix-blend-mode);
	}
</style>
