<script lang="ts">
	import InformationLayout from '$lib/components/layouts/InformationLayout.svelte'
	import AnimatedDescription from '$lib/components/primitives/AnimatedDescription.svelte'
	import AnimatedHeading from '$lib/components/primitives/AnimatedHeading.svelte'
</script>

<InformationLayout>
	<AnimatedHeading slot="heading">Laird Kruger</AnimatedHeading>
	<AnimatedDescription slot="content">
		<p class="description">Creative Developer and Digital Designer</p>
	</AnimatedDescription>
</InformationLayout>

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
