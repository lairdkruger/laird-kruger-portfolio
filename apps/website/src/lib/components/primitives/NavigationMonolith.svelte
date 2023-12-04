<script lang="ts">
	import { page } from '$app/stores'
	import MonolithSvg from '$lib/svgs/MonolithSvg.svelte'

	export let route: string
	export let label: string

	$: isActive = route === $page.url.pathname
</script>

<a href={route} aria-label={label}>
	<MonolithSvg {isActive} />
</a>

<style>
</style>
