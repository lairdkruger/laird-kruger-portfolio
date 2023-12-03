<script>
	import HomePage from '$lib/components/pages/home/HomePage.svelte'
	import { pageTheme } from '$lib/stores/ui'
	import { onMount } from 'svelte'

	onMount(() => {
		pageTheme.set('dark')
	})
</script>

<HomePage />
