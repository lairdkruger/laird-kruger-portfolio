<script lang="ts">
	import { projects } from '$lib/data/projects'
	import NavigationMonolith from '../primitives/NavigationMonolith.svelte'
</script>

<div class="wrapper">
	<div class="label">
		<h2 class="heading">Selected Work</h2>
	</div>

	<div class="navigation">
		{#each projects as project}
			<NavigationMonolith route={`/projects/${project.slug}`} />
		{/each}
	</div>
</div>

<style>
	.navigation {
		display: flex;
		column-gap: var(--spacing8);
	}
</style>
