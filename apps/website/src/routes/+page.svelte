<script>
	import HomePage from '$lib/components/pages/home/HomePage.svelte'
	import { activeProject, activeProjectPosition } from '$lib/stores/projects'
	import { pageTheme } from '$lib/stores/ui'
	import { onMount } from 'svelte'
	import { Vector3 } from 'three'

	onMount(() => {
		pageTheme.set('dark')
		activeProject.set(null)
		activeProjectPosition.set(new Vector3(0, 0, 0))
	})
</script>

<svelte:head>
	<title>LAIRD KRUGER → Digital Creative</title>
	<meta name="description" content="Australia based web developer and digital designer" />
</svelte:head>

<HomePage />
