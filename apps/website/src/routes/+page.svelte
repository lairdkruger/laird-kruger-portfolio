<script>
	import HomePage from '$lib/components/pages/home/HomePage.svelte'
	import { pageTheme } from '$lib/stores/ui'
	import { onMount } from 'svelte'

	onMount(() => {
		pageTheme.set('dark')
	})
</script>

<svelte:head>
	<title>LAIRD KRUGER → Digital Creative</title>
	<meta name="description" content="Australia based web developer and digital designer" />
</svelte:head>

<HomePage />
