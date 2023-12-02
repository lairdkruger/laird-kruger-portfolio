<script lang="ts">
	import '$lib/styles/base.css'
	import '$lib/styles/colors.css'
	import '$lib/styles/motion.css'
	import '$lib/styles/spacing.css'
	import '$lib/styles/typography.css'

	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Navigation from '$lib/components/Navigation.svelte'
</script>

<svelte:head>
	<title>LAIRD KRUGER → Digital Creative</title>
	<meta name="description" content="Australia based independent web developer and designer" />
	<meta name="creator" content="Laird Kruger" />
</svelte:head>

<Header />
<Navigation />
<slot />
<Footer />
