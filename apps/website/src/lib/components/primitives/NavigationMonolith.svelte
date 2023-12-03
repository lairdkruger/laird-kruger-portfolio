<script lang="ts">
	import { page } from '$app/stores'
	import MonolithSvg from '$lib/svgs/MonolithSvg.svelte'

	export let route: string

	$: isActive = route === $page.url.pathname
	$: console.log(isActive, route, $page.url.pathname)
</script>

<a href={route}>
	<MonolithSvg {isActive} />
</a>

<style>
</style>
