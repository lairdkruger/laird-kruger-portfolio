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
	import { pageTheme } from '$lib/stores/ui.js'

	export let data

	$: if (typeof window !== 'undefined') {
		if ($pageTheme === 'dark') {
			document.body.dataset.theme = 'dark'
		} else {
			document.body.dataset.theme = 'light'
		}
	}
</script>

<svelte:head>
	<title>LAIRD KRUGER → Digital Creative</title>
	<meta name="description" content="Australia based independent web developer and designer" />
	<meta name="creator" content="Laird Kruger" />
</svelte:head>

<Canvas>
	<Monoliths />
</Canvas>

<Header />
<Navigation />
<main>
	{#key data.pathname}
		<PageTransition pathname={data.pathname}>
			<slot />
		</PageTransition>
	{/key}
</main>
<Footer />

<style>
	main {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}

	/* Prevent layout shifts on page transitions */
	main > * {
		grid-area: 1;
		min-height: 100lvh;
	}
</style>
