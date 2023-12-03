<script lang="ts">
	import InformationLayout from '$lib/components/layouts/InformationLayout.svelte'
	import AnimatedContent from '$lib/components/primitives/AnimatedContent.svelte'
	import AnimatedHeading from '$lib/components/primitives/AnimatedHeading.svelte'
	import { getPageContext } from '$lib/contexts/page'
	import { page } from '$app/stores'

	const { isTransitioning } = getPageContext($page.url.pathname)

	$: console.log($isTransitioning)
</script>

<InformationLayout>
	<AnimatedHeading slot="heading">Laird Kruger</AnimatedHeading>
	<AnimatedContent slot="content">
		<p>Creative Developer and Digital Designer</p>
	</AnimatedContent>
</InformationLayout>

<style>
</style>
