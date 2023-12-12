<script lang="ts">
	import { information } from '$lib/data/blocks'
	import LinkMonolith from '$lib/components/primitives/LinkMonolith.svelte'
</script>

<div class="wrapper">
	<div class="label">
		<h2 class="heading">Information</h2>
	</div>

	<div class="navigation">
		{#each information as info}
			<LinkMonolith route={`/${info.slug}`} label={info.title} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		row-gap: var(--spacing4);
	}

	.navigation {
		display: flex;
		column-gap: var(--spacing8);
	}

	@media (max-width: 640px) {
		.wrapper {
			flex-direction: column-reverse;
		}
	}
</style>
