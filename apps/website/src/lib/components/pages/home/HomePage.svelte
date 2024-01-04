<script lang="ts">
	import InformationLayout from '$lib/components/layouts/InformationLayout.svelte'
	import AnimatedDescription from '$lib/components/transitions/AnimatedDescription.svelte'
	import AnimatedHeading from '$lib/components/transitions/AnimatedHeading.svelte'
	import { svelteInitialized } from '$lib/stores/loading'
</script>

{#if $svelteInitialized}
	<InformationLayout>
		<AnimatedHeading slot="heading">Laird Kruger</AnimatedHeading>

		<AnimatedDescription slot="content">
			<p class="description">Creative Developer and Digital Designer</p>
		</AnimatedDescription>
	</InformationLayout>
{/if}

<style>
	.description {
		width: 512px;
		max-width: calc(100vw - 2 * var(--margin));

		display: flex;
		flex-direction: column;
		row-gap: var(--spacing24);
		align-items: center;
	}
</style>
