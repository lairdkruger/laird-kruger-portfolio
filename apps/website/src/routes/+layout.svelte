<script lang="ts">
	import '$lib/styles/base.css'
	import '$lib/styles/colors.css'
	import '$lib/styles/motion.css'
	import '$lib/styles/spacing.css'
	import '$lib/styles/typography.css'

	import Header from '$lib/components/common/Header.svelte'
	import Footer from '$lib/components/common/Footer.svelte'
	import Navigation from '$lib/components/common/Navigation.svelte'
	import PageTransition from '$lib/components/layouts/PageTransition.svelte'
	import Canvas from '$lib/components/canvas/Canvas.svelte'
	import Monoliths from '$lib/components/canvas/scenes/Monoliths.svelte'
	import { pageTheme, userHasInteracted } from '$lib/stores/ui.js'
	import { siteLoaded, svelteInitialized } from '$lib/stores/load.js'
	import { tweened } from 'svelte/motion'
	import { motionDefault } from '$lib/styles/motion.js'
	import { onDestroy, onMount } from 'svelte'

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
		if (typeof window !== 'undefined') window.removeEventListener('click', handleClick)
	})

	// Global States
	$: if (typeof window !== 'undefined') {
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
	<title>LAIRD KRUGER → Digital Creative</title>
	<meta name="description" content="Australia based independent web developer and designer" />
	<meta name="creator" content="Laird Kruger" />
</svelte:head>

<Header />
<Navigation />

<Canvas>
	<Monoliths />

	<main style="opacity: {$loadTimeline}">
		{#key data.pathname}
			<PageTransition pathname={data.pathname}>
				<slot />
			</PageTransition>
		{/key}
	</main>
</Canvas>

<Footer />

<style>
	main {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		mix-blend-mode: difference;
	}

	/* Prevent layout shifts on page transitions */
	main > * {
		grid-area: 1;
		min-height: 100lvh;
	}
</style>
