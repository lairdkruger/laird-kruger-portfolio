<script lang="ts">
	import InformationLayout from '$lib/components/layouts/InformationLayout.svelte'
	import AnimatedDescription from '$lib/components/primitives/AnimatedDescription.svelte'
	import AnimatedHeading from '$lib/components/primitives/AnimatedHeading.svelte'
	import { getPageContext } from '$lib/contexts/page'
	import { page } from '$app/stores'

	const { isTransitioning } = getPageContext($page.url.pathname)
</script>

<InformationLayout>
	<AnimatedHeading slot="heading">Laird Kruger</AnimatedHeading>
	<AnimatedDescription slot="content">
		<p>Creative Developer and Digital Designer</p>
	</AnimatedDescription>
</InformationLayout>

<style>
</style>
