<script lang="ts">
	import '$lib/styles/reset.css'
	import '$lib/styles/base.css'
	import '$lib/styles/colors.css'
	import '$lib/styles/motion.css'
	import '$lib/styles/spacing.css'
	import '$lib/styles/typography.css'

	import Header from '$lib/components/common/header/Header.svelte'
	import Footer from '$lib/components/common/footer/Footer.svelte'
	import Navigation from '$lib/components/common/navigation/Navigation.svelte'
	import Canvas from '$lib/components/canvas/Canvas.svelte'
	import Monoliths from '$lib/components/canvas/scenes/Monoliths.svelte'
	import { pageTheme, userHasInteracted } from '$lib/stores/ui'
	import { siteLoaded, svelteInitialized } from '$lib/stores/loading'
	import { tweened } from 'svelte/motion'
	import { motionDefault } from '$lib/styles/motion'
	import { onDestroy, onMount } from 'svelte'
	import { browser } from '$app/environment'

	export let data

	function handleClick() {
		userHasInteracted.set(true)
	}

	onMount(() => {
		svelteInitialized.set(true)
		window.addEventListener('click', handleClick)
	})

	onDestroy(() => {
		svelteInitialized.set(false)
		if (browser) window.removeEventListener('click', handleClick)
	})

	// Global States
	$: if (browser) {
		if ($pageTheme === 'dark') {
			document.body.dataset.theme = 'dark'
		} else {
			document.body.dataset.theme = 'light'
		}
	}

	const loadTimeline = tweened(0, motionDefault)
	$: loadTimeline.set($siteLoaded ? 1 : 0)
</script>

<svelte:head>
	<meta name="creator" content="Laird Kruger" />
	<meta name="author" content="Laird Kruger" />
</svelte:head>

<Header />
<Navigation />

<Canvas>
	<Monoliths />

	<main style="opacity: {$loadTimeline}">
		<!-- Keying triggers component transitions -->
		{#key data.pathname}
			<slot />
		{/key}
	</main>
</Canvas>

<Footer />

<style>
	main {
		mix-blend-mode: difference;
	}
</style>
