<script lang="ts">
	import { information } from '$lib/data/projects'
	import NavigationMonolith from '../primitives/NavigationMonolith.svelte'
</script>

<div class="wrapper">
	<div class="label">
		<h2 class="heading">Information</h2>
	</div>

	<div class="navigation">
		{#each information as info}
			<NavigationMonolith route={`/${info.slug}`} label={info.title} />
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
